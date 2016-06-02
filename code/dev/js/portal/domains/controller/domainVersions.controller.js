(function () {
  'use strict';

  /* jshint maxlen: false */

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainVersionsController', DomainVersionsController);

  /*@ngInject*/
  function DomainVersionsController($scope, DomainsConfig, $stateParams, AlertService, $timeout, $window, $filter) {

    $scope._loading = true;
    $scope.id = $stateParams.id;

    $scope.domain = DomainsConfig.get({id: $stateParams.id});
    $scope.versions = [];
    $scope.currentVersion = {};

    $scope.obj = {
      data: 'Configuration will appear here',
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function (err) {
          $window.alert(err.toString());
        }
      }
    };

    /**
     * Format options for select box
     * @param  {Object} item
     * @return {string}
     */
    $scope.format = function(item) {
      return 'Version ' + item.last_published_domain_version + ' Last updated at ' + $filter('date')(new Date(item.updated_at), 'MMM dd, yyyy H:mm:ss a');
    };

    $scope.onChangeVersion = function() {
      if (!$scope.currentVersion) {
        $scope.obj.data = '';
        return;
      }
      $scope._loading = true;
      DomainsConfig
        .get({id: $stateParams.id, version: $scope.currentVersion})
        .$promise
        .then(function (data) {
          $scope.obj.data = JSON.stringify(data, null, 2);
        })
        .catch(function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    DomainsConfig
      .versions({id: $stateParams.id})
      .$promise
      .then(function (data) {
        if (angular.isArray(data)) {
          $scope.versions = data;
        }
      })
      .catch(function (err) {
        AlertService.danger(err);
      })
      .finally(function () {
        $scope._loading = false;
      });

    $timeout(function () {
      $scope.obj.options.mode = 'code';
    }, 10);
  }
})();
