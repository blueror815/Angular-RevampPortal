(function () {
  'use strict';

  /* jshint maxlen: false */

  angular
    .module('revapm.Portal.Apps')
    .controller('AppVersionsController', AppVersionsController);

  /*@ngInject*/
  function AppVersionsController($scope, Apps, $stateParams, AlertService, $timeout, $window, $filter) {

    $scope._loading = true;
    $scope.id = $stateParams.id;

    $scope.app = Apps.get({id: $stateParams.id});
    $scope.versions = [];
    $scope.currentVersion = {};



    $scope.initVersions = function(){
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
    };

    /**
     * Format options for select box
     * @param  {Object} item
     * @return {string}
     */
    $scope.format = function(item) {
      var updated_by = (item.updated_by) ?
       ' Updated by ' + item.updated_by :
       ' Updated ';
      return 'Version ' + item.app_published_version + ' Last updated at ' + $filter('date')(new Date(item.updated_at), 'MMM dd, yyyy H:mm:ss a');
    };

    $scope.onChangeVersion = function() {
      if (!$scope.currentVersion) {
        $scope.obj.data = '{}';
        return;
      }
      var idx = _.findIndex($scope.versions, {updated_at: $scope.currentVersion});
      $scope._loading = true;
      Apps
        .get({id: $stateParams.id, version: idx+1})
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

    Apps
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
