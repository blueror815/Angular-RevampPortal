(function () {
  'use strict';

  angular
    .module('revapm.Portal.Keys')
    .controller('KeysEditController', KeysEditController);

  // @ngInject
  function KeysEditController($scope, $rootScope, $injector, $stateParams, $location, CRUDController, ApiKeys, Companies, DomainsConfig, AlertService) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    Companies
      .query()
      .$promise
      .then(function (data) {
        $scope.companies = data;
      })
      .catch(function (err) {
        if (err.status === 403) {
          // Fetch id
          var user = $scope.auth.getUser();
          $scope.companies = [{
            id: user.companyId[0]
          }];
        }
      });

    DomainsConfig.query()
      .$promise
      .then(function (data) {
        $scope.domains = data;
      })
      .catch(function (err) {
        $scope.domains = [];
      });


    /**
     * Loading flag
     *
     * @type {boolean}
     * @private
     */
    $scope._loading = false;

    /**
     * Selected account id
     *
     * @type {null|string}
     */
    $scope.selected = null;

    /**
     * Current kay object
     *
     * @type {null}
     */
    $scope.key = null;

    /**
     * List of domains related to selected account
     *
     * @type {Array}
     */
    $scope.selectedDomains = [];

    /**
     * Select domains that relates to key's account
     *
     * @param {string} accountId
     */
    $scope.selectDomains = function(accountId) {
      $scope.selectedDomains = [];
      if (!accountId) {
        return;
      }
      angular.forEach($scope.domains, function (domain) {
        if (domain.account_id === accountId) {
          $scope.selectedDomains.push(domain);
        }
      });
    };

    /**
     * Load key details
     *
     * @param {string|number} id
     */
    $scope.loadKeyDetails = function(id) {
      if (!id) {
        return;
      }
      $scope._loading = true;
      $scope.key = null;
      ApiKeys
        .get({id: id})
        .$promise
        .then(function (key) {
          $scope.key = key;
        })
        .catch(function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    /**
     * On selected account
     *
     * @param {Object} model
     */
    $scope.onModelSelect = function(model) {
      $scope.selected = model;
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
     * Click on update button
     */
    $scope.update = function () {
      if (!$scope.key || !$scope.key.id) {
        return;
      }
      $scope._loading = true;
      ApiKeys
        .update({id: $scope.key.id}, clearUpdateData($scope.key))
        .$promise
        .then(function (data) {
          $rootScope.$broadcast('update:searchData');
          AlertService.success('API Key updated');
          $scope.$parent.list();
        })
        .catch(function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };


    $scope.goToList = function () {
      $location.path('/keys');
    };

    $scope.$watch('key.account_id', function(account_id) {
      $scope.selectDomains(account_id);
    });

    $scope.switchKeyVisibility = function(item){
      item.showKey = !item.showKey;
    };

    $scope.copyCallback = function(err){
      if(err){
        $scope.alertService.danger('Copying failed, please try manual.', 2000);
      } else {
        $scope.alertService.success('The API key has been copied to the clipboard.', 2000);
      }
    };
  }
})();
