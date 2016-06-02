(function() {
  'use strict';

  angular
    .module('revapm.Portal.Keys')
    .controller('KeysListController', KeysListController);

  // @ngInject
  function KeysListController($scope, $rootScope, $q, CRUDController, ApiKeys, $injector, $stateParams, Companies, DomainsConfig, $state, $uibModal, clipboard) {

    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    if ($scope.auth.isUser()) {
      $state.go('index.accountSettings.profile');
      return;
    }
    //Set state (ui.router)
    $scope.setState('index.accountSettings.keys');

    $scope.setResource(ApiKeys);

    /**
     * @name setAccountName
     * @description
     *
     */
    function setAccountName() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        return Companies.query(function(list) {
          _.forEach($scope.records, function(item) {
            var index = _.findIndex(list, {
              id: item.account_id
            });
            if (index >= 0) {
              item.companyName = list[index].companyName;
            }
          });
        });
      } else {
        return $q.when();
      }
    }

    Companies
      .query()
      .$promise
      .then(function(data) {
        $scope.companies = data;
      })
      .catch(function(err) {
        if (err.status === 403) {
          // Fetch id
          var user = $scope.auth.getUser();
          $scope.companies = [{
            id: user.companyId[0]
          }];
        }
      });

    $scope.domains = DomainsConfig.query();

    /**
     * Delete API key from system
     *
     * @param {Object} model
     */
    $scope.deleteKey = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        $scope
          .delete(model)
          .then(function() {
            $scope.alertService.success('API Key success delete');
            $rootScope.$broadcast('update:searchData');
          })
          .catch($scope.alertService.danger);
      });
    };

    /**
     * Call API for create a new key in system
     *
     * @param {Object} account
     * @returns {Promise}
     */
    $scope.createKey = function(account) {
      if (!account || !account.id) {
        return;
      }
      $scope._loading = true;
      $scope.alertService.clear();
      return ApiKeys
        .create({
          account_id: account.id
        })
        .$promise
        .then(function(data) {
          $rootScope.$broadcast('update:searchData');
          $scope.alertService.success('API Key created', 5000);
          $scope.list()
            .then(setAccountName);
          return data;
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    /**
     * Should open dialog for selecting company account
     */
    $scope.openCreateDialog = function() {
      $scope.alertService.clear();
      if ($scope.companies && $scope.companies.length === 1) {
        // select only one and create
        return $scope.createKey($scope.companies[0]);
      }
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'parts/keys/dialog/create.html',
        controller: 'KeysCreateController',
        size: 'md',
        resolve: {
          companies: function() {
            return $scope.companies;
          }
        }
      });

      /**
       * Handle ok button on create
       */
      modalInstance.result.then($scope.createKey);
    };

    /**
     * Should open dialog for selecting company account
     */
    $scope.openUpdateDialogFor = function(keyId) {
      $scope.alertService.clear();
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'parts/keys/dialog/edit.html',
        controller: 'KeysEditController',
        size: 'md',
        resolve: {
          data: function() {
            return {
              companies: $scope.companies,
              domains: $scope.domains,
              keyId: keyId
            };
          }
        }
      });

      /**
       * Handle ok button on update
       */
      modalInstance.result
        .then(function(account) {
          $scope.alertService.success('API Key updated', 5000);
          $scope.list()
            .then(setAccountName);
        });
    };

    /**
     * Function will remove all data that should not be sent to server
     *
     * @param {Object} data
     * @returns {Object}
     */
    function clearUpdateData(data) {
      var fields = ['key_name', 'account_id', 'domains', 'allowed_ops', 'read_only_status', 'active'];
      return _.pick(_.clone(data), fields);
      //var result = _.pick(_.clone(data), fields);
      //return result;
    }

    /**
     * Toggle active state for given key
     *
     * @param {Object} key
     * @param {string} property
     * @returns {Promise}
     */
    $scope.toggleProperty = function(key, property) {
      if (!key || !key.id || key.loading) {
        return;
      }
      key[property] = !key[property];
      key.loading = true;
      return ApiKeys
        .update({
          id: key.id
        }, clearUpdateData(key))
        .$promise
        .then(function(data) {
          return data;
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          key.loading = false;
        });
    };

    // Fetch list of users
    $scope.list()
        .then(setAccountName);

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.switchKeyVisibility = function(item) {
      item.showKey = !item.showKey;
    };

    $scope.copyCallback = function(err) {
      if (err) {
        $scope.alertService.danger('Copying failed, please try manual approach', 2000);
      } else {
        $scope.alertService.success('The API key has been copied to the clipboard', 2000);
      }
    };
  }
})();
