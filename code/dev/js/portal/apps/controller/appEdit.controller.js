(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .controller('AppEditController', AppEditController);

  /*@ngInject*/
  function AppEditController($scope,
                          $rootScope,
                          Apps,
                          User,
                          CRUDController,
                          $injector,
                          $state,
                          $stateParams,
                          AlertService
  ) {
    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {$scope: $scope, $stateParams: $stateParams});

    $scope.setResource(Apps);
    $scope.$state = $state;

    $scope.model = { //Data we use in API calls
      configs: [{}]
    };
    $scope.SDKVersionsInConfigs = [];


    $scope.configuration = {};
    $scope.domainsListPlaceholder = 'Add domains...';
    $scope.fieldsToShow = [];

    $scope.model.configs.domains_white_list = [];
    $scope.model.configs.domains_black_list = [];
    $scope.domainList  = [];
    $scope.allUserDomains = [];

    $scope.protocols = ['standard', 'quic', 'rmp'];

    $scope.initEdit = function (id) {
      $scope._loading = true;
      $scope.get(id)
        .then(function () {
          $scope.configuration = $scope.model.configs[0];
          $scope.SDKVersionsInConfigs = $scope.model.configs.map(function (config) {
            return config.sdk_release_version;
          });
        })
        .then(function () {
          Apps.sdkReleases()
            .$promise
            .then(function (data) {
              $scope.availableSDKVersions = _.xor(data[$state.current.data.platform],
                $scope.SDKVersionsInConfigs);
            });
          $scope.selectedSDKVersion = $scope.SDKVersionsInConfigs[0];
          $scope.fieldsToShow = _.keys($scope.model.configs[0]);

          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {

            User.getUserDomains(true)
              .then(function (domains) {
                $scope.allUserDomains = domains;
                var domainList = _.filter($scope.allUserDomains ,
                  {account_id: $scope.model.account_id}).map(function (d) {
                  return d.domain_name;
                });
                $scope.domainList = _.uniq(domainList);
              });
          }else{
            User.getUserDomains(true)
              .then(function (domains) {
                $scope.allUserDomains = domains;
                $scope.domainList = domains.map(function (d) {
                  return d.domain_name;
                });
              });
          }
        })
        .catch(function (err) {
          $scope.alertService.danger('Could not load app details');
        })
        .finally(function () {
          $scope.$watch('selectedSDKVersion', function () {
            onSelectedSDKVersionChange();
          });
          $scope._loading = false;
        });
    };

    var onSelectedSDKVersionChange = function () {
      var idx = _.findIndex($scope.model.configs,
        {sdk_release_version: $scope.selectedSDKVersion});
      $scope.configuration = $scope.model.configs[idx];
      if(!$scope.configuration.allowed_transport_protocols) {
        $scope.configuration.allowed_transport_protocols = [];
      }
      if(!$scope.configuration.domains_white_list){
        $scope.configuration.domains_white_list = [];
      }
      if(!$scope.configuration.domains_black_list){
        $scope.configuration.domains_black_list = [];
      }

      $scope.fieldsToShow = _.keys($scope.model.configs[idx]);
    };

    $scope.toggleProtocolSelection = function (protocol, model) {
      var idx = model
        .allowed_transport_protocols
        .indexOf(protocol);

      if (idx > -1) {
        model
          .allowed_transport_protocols
          .splice(idx, 1);
      }
      else {
        model
          .allowed_transport_protocols
          .push(protocol);
      }
    };

    $scope.isVersion = function (version) {
      return (version === $scope.selectedSDKVersion);
    };

    $scope.isShown = function (name) {
      return ($scope.fieldsToShow.findIndex(name) > -1);
    };

    $scope.addNewSDKConfig = function (version, model) {
      $scope.availableSDKVersions = _.without($scope.availableSDKVersions, version);
      model.configs.push({sdk_release_version: version});
      $scope.SDKVersionsInConfigs.push(version);
      $scope.selectedSDKVersion = version;
      $scope.configuration = {
        sdk_release_version: version,
        allowed_transport_protocols: [],
        domains_white_list: [],
        domains_black_list: []
      };
    };




    $scope.updateConfig = function (model, config) {
      $scope.confirm('confirmUpdateModal.html', model).then(function () {
        var idx = _.findIndex(model.configs,
          {sdk_release_version: config.sdk_release_version});

        model.configs[idx] = config;

        $scope.update({id: model.id}, $scope.cleanModel(model))
          .then(function () {
            $scope.alertService.success('App updated', 5000);
          })
          .catch(function (err) {
            $scope
              .alertService
              .danger(err.data.message || 'Oops something went wrong', 5000);
          });
      });
    };

    $scope.verify = function(model, config) {
      var idx = _.findIndex(model.configs,
        {sdk_release_version: config.sdk_release_version});

      model.configs[idx] = config;

      $scope._loading = true;
      $scope.update({
          id: model.id,
          options: 'verify_only'
        }, $scope.cleanModel(model))
        .then(function(data) {
          $scope.alertService.success('App configuration is correct', 5000);
        })
        .catch(function(err) {
          AlertService.danger(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.publish = function(model, config) {
      if (!model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope.confirm('confirmPublishModal.html', model).then(function () {
        var idx = _.findIndex(model.configs,
          {sdk_release_version: config.sdk_release_version});

        model.configs[idx] = config;

        $scope._loading = true;
        Apps.update({
            id: model.id,
            options: 'publish'
          }, $scope.cleanModel(model))
          .$promise
          .then(function(data) {
            $rootScope.$broadcast('update:searchData');
            $scope
              .alertService
              .success('App configuration is published', 5000);
          })
          .catch(function(err) {
            AlertService.danger(err);
          })
          .finally(function() {
            $scope._loading = false;
          });
      });
    };

    $scope.cleanModel = function (model) {
      var modelCopy = _.clone(model);
      var params = {id: model.id};
      delete modelCopy.$promise;
      delete modelCopy.$resolved;
      delete modelCopy.id;
      delete modelCopy.app_platform;
      delete modelCopy.sdk_key;
      delete modelCopy.created_at;
      delete modelCopy.updated_at;
      delete modelCopy.updated_by;
      delete modelCopy.created_by;

      return modelCopy;
    };
    /**
     * @name  getAccountDomainNameList
     * @description
     *
     * @param  {[type]} account_id [description]
     * @return {[type]}            [description]
     */
    $scope.getAccountDomainNameList = function(account_id) {
      if (!account_id) {
        account_id = $scope.model.account_id;
      }
      return _.filter($scope.allUserDomains, {
        account_id: account_id
      }).map(function(d) {
        return d.domain_name;
      });
    };

    /**
     * @name  onAccountSelect
     * @description
     *   Clear selected domain names after change Account
     * @return {[type]} [description]
     */
    $scope.onAccountSelect = function(){
        $scope.configuration.domains_provisioned_list = [];
    };
  }
})();

