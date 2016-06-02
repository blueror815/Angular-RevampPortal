(function() {
  'use strict';

  angular
    .module('revapm.Portal.SSL_certs')
    .controller('SSL_certsCrudController', SSL_certsCrudController);

  /*@ngInject*/
  function SSL_certsCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    SSL_certs,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.isAdvancedMode = $stateParams.isAdvanced || false;
    $scope.jsoneditor = {
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function(err) {
          $scope.toaster.error(err);
        }
      }
    };
    //Set state (ui.router)
    $scope.setState('index.webApp.ssl_certs');

    $scope.setResource(SSL_certs);

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

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
          .then(setAccountName)
          .then(function() {
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function() {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      }
    });

    $scope.filterKeys = ['cert_name', 'companyName', 'expires_at', 'domains', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};
    // TODO: Change to real types
    $scope.certs_types = [{
      id: 'shared',
      typeName: 'Shared RevAPM Certificate'
    }, {
      id: 'private',
      typeName: 'Private With Customer-Provided Key'
    }];

    $scope.fetchCompanies = function(companyIds) {
      var promises = [];
      companyIds.forEach(function(id) {
        promises.push(Companies.get({
          id: id
        }).$promise);
      });
      $q.all(promises).then(function(data) {
        $scope.companies = data;
      });
    };
    /**
     * @name prepareSSL_certToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareSSL_certToUpdate = function(model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      delete model.id;
      delete model.created_by;
      delete model.created_at;
      delete model.updated_at;
      delete model.expires_at;
      delete model.domains;
      delete model.last_published_ssl_config_version;

      return model;
    };

    $scope.setAccountId = function() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        Companies.query(function(list) {
          $scope.companies = list;
          if ($scope.companies.length === 1) {
            $scope.model.account_id = $scope.companies[0].id;
          }
        });
      } else if (!angular.isArray($scope.auth.getUser().companyId)) {
        $scope.model.account_id = $scope.auth.getUser().companyId;
      } else if ($scope.auth.getUser().companyId.length === 1) {
        $scope.model.account_id = $scope.auth.getUser().companyId[0];
      } else {
        $scope.fetchCompanies($scope.auth.getUser().companyId);
      }
    };

    $scope.setAccountId();

    $scope.getSSL_cert = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.toaster.error('Could not load SSL certificate details');
        });

    };
    /**
     * @name  deleteSSL_cert
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteSSL_cert = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        var certName = model.cert_name;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.toaster.success(data);
            $scope.list()
              .then(setAccountName);
          })
          .catch(function(err) {
            $scope.toaster.error(err);
          });
      });
    };
    /**
     * @name  createSSL_cert
     * @description
     *
     * Create new SSL certificate
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.createSSL_cert = function(model) {
      model.cert_type = 'private'; // TODO:
      $scope
        .create(model)
        .then(function(data) {
          $scope.toaster.success(data);
          $scope.setAccountId();
        })
        .catch(function(err) {
          $scope.toaster.error(err);
        });
    };
    /**
     * @name  publishSSL_cert
     * @description
     *
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.publishSSL_cert = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', model).then(function() {
        model = $scope.prepareSSL_certToUpdate(model);
        $scope.update({
            id: modelId,
            options: 'publish'
          }, model)
          .then(function(data) {
            $scope.toaster.success(data);
          })
          .catch(function(err) {
            $scope.toaster.error(err);
          });
      });
    };
    /**
     * @name  validateSSL_cert
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.validateSSL_cert = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareSSL_certToUpdate(model);
      $scope.update({
          id: modelId,
          options: 'verify_only'
        }, model)
        .then(function(data) {
          $scope.toaster.success(data);
        })
        .catch(function(err) {
          $scope.toaster.error(err);
        });
    };
    /**
     * @name  updateSSL_cert
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.updateSSL_cert = function(model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareSSL_certToUpdate(model);
        $scope.update({
            id: modelId
          }, model)
          .then(function(data) {
            $scope.toaster.success(data);
          })
          .catch(function(err) {
            $scope.toaster.error(err);
          });
      });
    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };
    // TODO: change rule
    $scope.disableSubmit = function(model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.cert_name ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.public_ssl_cert ||
          !model.private_ssl_key;
      } else {
        return $scope._loading ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.public_ssl_cert ||
          !model.private_ssl_key;
      }
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
  }
})();
