(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .directive('appStagingStatus', appStagingStatus);

  /*@ngInject*/
  function appStagingStatus(Apps, $config, $interval, $rootScope, $state) {
    return {
      template: '<i class="glyphicon" ng-class="iconStaging" uib-tooltip="{{tooltipStaging}}"></i>' +
      '&nbsp;&nbsp;&nbsp;' +
      '<i class="glyphicon" ng-class="iconGlobal" uib-tooltip="{{tooltipGlobal}}"></i>',
      scope: {
        ngId: '=' // App id
      },
      /*@ngInject*/
      controller: function ($scope) {
        var intervalPromise;
        var appId;

        $scope.iconStaging = 'glyphicon-refresh spin';
        $scope.tooltipStaging = 'Staging Status';
        $scope.iconGlobal = 'glyphicon-refresh spin';
        $scope.tooltipGlobal = 'Global Status';

        $scope.shouldRefresh = true;

        $scope.startRefresh = function() {
          if (!appId ||
            !$scope.shouldRefresh ||
            $state.includes('index.apps.*.new') ||
            $state.includes('index.apps.*.edit') ||
            $state.includes('index.apps.*.configure') ||
            $state.includes('index.apps.*.versions')) {
            return;
          }
          intervalPromise = $interval($scope.fetchStatus,
             $config.APP_STATUS_REFRESH_INTERVAL, 1);
        };

        $scope.stopRefresh = function () {
          if (angular.isDefined(intervalPromise)) {
            $interval.cancel(intervalPromise);
            intervalPromise = undefined;
            $scope.shouldRefresh = false;
          }
        };

        $scope.fetchStatus = function(id) {
          if (!id && !appId) {
            return;
          }
          if (!id && appId) {
            id = appId;
          }

          Apps
            .status({id: id})
            .$promise
            .then(function (data) {
              if ($config.DOMAIN_STAGING_STATUS_ICONS[data.staging_status]) {
                $scope
                .iconStaging = $config.DOMAIN_STAGING_STATUS_ICONS[data.staging_status];
              }
              $scope
              .tooltipStaging = 'Staging Status: ' + data.staging_status;
              if ($config.DOMAIN_PRODUCTION_STATUS_ICONS[data.global_status]) {
                $scope
                .iconGlobal = $config.DOMAIN_PRODUCTION_STATUS_ICONS[data.global_status];
              }
              $scope.tooltipGlobal = 'Global Status: ' + data.global_status;
              $scope.startRefresh();
            })
            .catch(function (err) {
              $scope.iconStaging = 'glyphicon-remove text-danger';
              $scope.tooltipStaging = 'Staging Status: Error';
              $scope.iconGlobal = 'glyphicon-remove text-danger';
              $scope.tooltipGlobal = 'Global Status: Error';
              $scope.stopRefresh();
            });
        };

        $scope.$on('$destroy', function () {
          $scope.stopRefresh();
        });

        $rootScope.$on('$stateChangeStart', function (event) {
          $scope.stopRefresh();
        });

        $scope.$watch('ngId', function (newValue) {
          if (!newValue) {
            return;
          }
          appId = newValue;
          $scope.shouldRefresh = true;
          $scope.fetchStatus(newValue);
        });
      }
    };
  }
})();
