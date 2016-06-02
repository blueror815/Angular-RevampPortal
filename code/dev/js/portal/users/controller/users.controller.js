(function() {
  'use strict';

  angular
    .module('revapm.Portal.Users')
    .controller('UsersCrudController', UsersCrudController);

  // @ngInject
  function UsersCrudController($scope, $q, CRUDController, Users, User, $injector, $state, $stateParams, Companies, DomainsConfig, $anchorScroll) {

    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    if ($scope.auth.isUser()) {
      $state.go('index.accountSettings.profile');
      return;
    }
    // NOTE: init load dependencies for Add New User Page
    if ($state.current.name === 'index.accountSettings.users.new') {
      dependencies();
    }
    //Set state (ui.router)
    $scope.setState('index.accountSettings.users');

    $scope.setResource(Users);

    $scope.roles = ['user', 'admin'];
    // Adding additional user roles for RevAdmin
    if ($scope.auth.isRevadmin() || $scope.auth.isReseller()) {
      $scope.roles.push('reseller');
    }

    // $scope.filterKeys = ['firstname', 'lastname', 'email', 'role', 'updated_at', 'last_login_at'];

    $scope.companies = [];

    $scope.domains = [];

    if (!$scope.model) {
      initModel();
    }

    function initModel() {
      $scope.model = {
        theme: 'light',
        access_control_list: {
          dashBoard: true,
          reports: false,
          configure: false,
          test: false,
          readOnly: false
        }
      };
    }
    /**
     * @name  dependencies
     * @description
     *  Release controller data dependencies
     * @return {Promise}
     */
    function dependencies() {
      return $q.all([
          Companies.query().$promise,
          DomainsConfig.query().$promise
        ])
        .then(function(dataRefs) {
          //
          $scope.companies = dataRefs[0];
          $scope.domains = dataRefs[1];
        });
    }

    $scope.initNew = function() {
      initModel();
      // $scope.setAccountId(); // TODO: use CRUD method
    };

    $scope.getUser = function(id) {
      $scope._loading = true;
      $scope.get(id)
        .then(dependencies)
        .then(function firstValidationDomainNames() {
          $scope.model.domain = _.intersection(_.findByValues($scope.domains, 'account_id', $scope.model.companyId)
            .map(function(item) {
              return item.domain_name;
            }), $scope.model.domain);
          return $scope.model.domain;
        })
        .catch(function(err) {
          $scope.toaster.error(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.deleteUser = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        $scope
          .delete(model)
          .then(function(data) {
            $scope.toaster.success(data);
          })
          .catch(function(err) {
            $scope.toaster.error(err);
          });
      });
    };

    $scope.updateUser = function(model) {
      if (!model) {
        return;
      }
      // copy user id
      model.id = model.user_id;
      $scope
        .update(model)
        .then(function(data) {
          // NOTE: update current user info
          if (model.user_id === User.getUser().user_id) {
            User.reloadUser();
          }
          $scope.toaster.success(data);
        })
        .catch(function(err) {
          $scope.toaster.error(err);
        });
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.createUser = function(model) {
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        $scope.toaster.error('Passwords did not match');
        return;
      }
      delete model.passwordConfirm;
      model.access_control_list.dashBoard = true;
      //      model.email = angular.copy(model.user_email);
      //      delete model.user_email;
      $scope.create(model)
        .then(function(data) {
          initModel();
          $scope.toaster.success(data);
        })
        .catch(function(err) {
          $scope.toaster.error(err);
        });
    };

    $scope.disableSubmit = function(model, isEdit) {
      if ((User.isRevadmin() || User.isReseller()) && !model.companyId || (model.companyId && model.companyId.length === 0)) {
        return true;
      }

      if (isEdit) {
        return $scope._loading ||
          !model.email ||
          !model.access_control_list ||
          !model.firstname ||
          !model.lastname ||
          !model.role;
      } else {
        return $scope._loading ||
          !model.email ||
          !model.access_control_list ||
          !model.firstname ||
          !model.lastname ||
          !model.password ||
          !model.passwordConfirm ||
          !model.role;
      }
    };

    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function(state) {
      $scope
        .list()
        .then(dependencies)
        .then(function setCompaniesName() {
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
            // NOTE: set companies(account) name (must be aplay method "dependencies" first)
            var list = $scope.companies;
            _.forEach($scope.records, function(item) {
              if (item.companyId.length === 1) {
                var index = _.findIndex(list, {
                  id: item.companyId[0]
                });
                if (index >= 0) {
                  item.companyName = list[index].companyName;
                }
              } else {
                if (item.companyId.length > 1) {
                  item.companyName = '';
                  angular.forEach(item.companyId, function(account_id, key) {
                    var index = _.findIndex(list, {
                      id: account_id
                    });
                    if (index >= 0) {
                      if (key !== item.companyId.length && key !== 0) {
                        item.companyName = item.companyName + ', ';
                      }
                      item.companyName = item.companyName + list[index].companyName;
                    }
                  });
                }
              }
            });
            $q.when(list);
          } else {
            return $q.when();
          }
        })
        .then(function() {
          if ($scope.elementIndexForAnchorScroll) {
            setTimeout(function() {
              $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
              $scope.$digest();
            }, 500);
          }
        });
    });

    // NOTE: mixin lodash for find objects
    _.mixin({
      'findByValues': function(collection, property, values) {
        return _.filter(collection, function(item) {
          return _.contains(values, item[property]);
        });
      }
    });
    /**
     * @name  getAccountDomainNameList
     * @description
     *
     * @param  {[type]} account_id [description]
     * @return {[type]}            [description]
     */
    $scope.getAccountDomainNameList = function(account_id) {
      if (!account_id) {
        account_id = $scope.model.companyId||$scope.model.account_id;
      }
      var data = _.findByValues($scope.domains, 'account_id', account_id);
      return data;
    };

    /**
     * @name  getDomainPlaceholder
     * @description [description]
     * @return {String}
     */
    $scope.getDomainPlaceholder = function() {
      var list = $scope.getAccountDomainNameList();
      return (list.length > 0) ? 'Select domains...' : 'Domains list is empty...';
    };

    // NOTE: watch on change companyId for update available domain names
    $scope.$watch('model.companyId', function(newVal, oldVal) {
      if (newVal !== undefined && oldVal !== undefined) {
        var data = _.findByValues($scope.domains, 'account_id', $scope.model.companyId).map(function(item) {
          return item.domain_name;
        });
        $scope.model.domain = _.intersection(data, $scope.model.domain);
      }
    });

  }
})();
