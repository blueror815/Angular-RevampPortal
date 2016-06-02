(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .controller('AppsController', AppsController);

  /*@ngInject*/
  function AppsController($scope,
                          $timeout,
                          $anchorScroll,
                          User,
                          Companies,
                          Apps,
                          CRUDController,
                          $injector,
                          $state,
                          $stateParams,
                          AlertService,
                          $localStorage,
                          $q) {
    //Invoking crud actions
    $injector.invoke(CRUDController,
       this, {$scope: $scope, $stateParams: $stateParams});

    //Set state (ui.router)
  //  $scope.setState('index.apps');

    $scope.setResource(Apps);

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

    $scope.$state = $state;
    //// Fetch list of records
    $scope._baseFilter = {app_platform: $state.current.data.platform_code};

    $scope.$on('$stateChangeSuccess', function(state) {
      $scope
        .list()
        .then(setAccountName)
        .then(function() {
          if ($scope.elementIndexForAnchorScroll) {
            setTimeout(function() {
              $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
              $scope.$digest();
            }, 500);
          }
        });
    });


    $scope.companies = [];
    $scope.model = {
      configs: [{}]
    };
    $scope.copyForEditor = {};
    $scope.obj = {
      data: {},
      options: {
        mode: 'code',
        modes: ['code', 'view'],
        error: function(err) {
          alert(err.toString());
        }
      }
    };

    $scope.filterKeys = ['app_name', 'app_platform', 'companyName', 'last_app_published_version', 'updated_at'];


    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.model.account_id = $scope.auth.getUser().companyId[0];

    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domainList = domains.map(function (d) {
          return d.domain_name;
        });
      });

    $scope.fetchCompanies = function(companyIds) {
      var promises = [];
      companyIds.forEach(function (id) {
        promises.push(Companies.get({id: id}).$promise);
      });
      $q.all(promises).then(function (data) {
        $scope.companies = data;
      });
    };

    $scope.switch = function (item){
      if(item.show === true ){
        item.show = false;
      } else {
        item.show = true;
      }
    };
    $scope.initEdit = function (id) {
      $scope.get(id)
        .then(function() {
            $timeout(function() {
              $scope.copyForEditor = _.clone($scope.model);
              delete $scope.copyForEditor.$promise;
              delete $scope.copyForEditor.$resolved;
              delete $scope.copyForEditor.id;
              delete $scope.copyForEditor.account_id;
              delete $scope.copyForEditor.app_platform;
              delete $scope.copyForEditor.sdk_key;
              delete $scope.copyForEditor.created_at;
              delete $scope.copyForEditor.updated_at;
              delete $scope.copyForEditor.updated_by;
              delete $scope.copyForEditor.created_by;
            }, 2000);
          })
        .catch(function (err) {
          $scope.alertService.danger('Could not load app details');
        });
    };

    $scope.initNew = function () {
      $scope.platforms = [
        {name: 'iOS', code: 'iOS', disabled: false},
        {name: 'Android', code: 'Android', disabled: false},
        {name: 'Windows Mobile', code: 'Windows_Mobile', disabled: false}
      ];
      var idx = _.findIndex($scope.platforms,
        {code: $state.current.data.platform_code});
      $scope.model.app_platform = $scope.platforms[idx];
    };

    if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
      // Loading list of companies
      Companies.query(function (list) {
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

    $scope.getApp = function(id) {
      $scope.get(id)
        .catch(function (err) {
          $scope.alertService.danger('Could not load app details');
        });
    };

    $scope.createApp = function (model) {
      var modelCopy = _.clone(model);
      delete modelCopy.configs;
      modelCopy.app_platform = model.app_platform.code;
      $scope.create(modelCopy)
        .then(function () {
          model.app_name = '';
          $scope.alertService.success('App registered', 5000);
        })
        .catch(function (err) {
          $scope.alertService.danger(err);
        });
    };

    $scope.cleanModel = function (model) {
        var modelCopy = _.clone(model);
        var params = {id: model.id};
        modelCopy.account_id = $scope.model.account_id;
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

    $scope.updateApp = function (model) {
      $scope.confirm('confirmUpdateModal.html', model).then(function () {
        $scope._loading = true;
        var params = {id: $scope.model.id};
        $scope.update(params, $scope.cleanModel(model))
          .then(function () {
            $scope.alertService.success('App updated', 5000);
          })
          .catch(function (err) {
            $scope
              .alertService
              .danger(err.data.message || 'Oops something went wrong', 5000);
          })
          .finally(function () {
            delete model.$promise;
            delete model.$resolved;
            delete model.$rejected;
            _.assign($scope.model, model);
            $scope._loading = false;
          });
      });
    };

    $scope.verify = function(model) {
      if (!$scope.model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope._loading = true;
      Apps.update({
          id: $scope.model.id,
          options: 'verify_only'
        }, $scope.cleanModel(model))
        .$promise
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

    $scope.publish = function(model) {
      if (!$scope.model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope.confirm('confirmPublishModal.html', model).then(function () {
        $scope._loading = true;
        Apps.update({
            id: $scope.model.id,
            options: 'publish'
          }, $scope.cleanModel(model))
          .$promise
          .then(function(data) {
            $scope
            .alertService
            .success('App configuration is published', 5000);
          })
          .catch(function(err) {
            AlertService.danger(err);
          })
          .finally(function() {
            _.assign($scope.model, model);
            $scope._loading = false;
          });
      });
    };

    $scope.deleteApp = function(model) {
      $scope.confirm('confirmModal.html', model).then(function () {
        var appName = model.app_name;
        $scope
          .delete(model)
          .then(function (data) {
            $scope.alertService.success('App ' + appName + ' deleted.');
          })
          .catch(function (err) {
            $scope.alertService.danger(err);
          })
          .finally(function () {
            if($scope.page.current > $scope.page.pages.length){
              $scope.prevPage();
            }
          });
      });
    };

    $scope.storeToStorage = function (app) {
      var newApp = {
        app_id: app.id,
        id: app.id,
        app_name: app.app_name,
        sdk_key: app.sdk_key
      };
      $localStorage.selectedApplication = newApp;
    };


    /**
     * Get editor instance
     */
    $scope.jsonEditorEvent = function(instance){
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function(val){
      // if editor text is empty just return
      if(!val) {
        $scope.jsonIsInvalid = true;
        return;
      }

      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch(err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });

    $scope.switchKeyVisibility = function(item){
      item.showKey = !item.showKey;
    };

    $scope.copyCallback = function(err){
      if(err){
        $scope.alertService.danger('Copying failed, please try manual approach', 2000);
      } else {
        $scope.alertService.success('The SDK key has been copied to the clipboard', 2000);
      }
    };
  }
})();
