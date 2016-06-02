(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .directive('logshippersStagingStatus', logshippersStagingStatus);

  /*@ngInject*/
  function logshippersStagingStatus(LogShippingJobs, $config, $interval, $rootScope, $state) {
    return {
      template: '<div><i class="glyphicon" ng-class="iconStaging" uib-tooltip="{{tooltipStaging}}"></i> {{operationalModeName}}</div>',
      scope: {
        ngId: '=', // Log Shipper id
        currentState: '=',
        onChangeState: '&'
      },
      /*@ngInject*/
      controller: function ($scope) {
        var intervalPromise;
        var logShipperId;

        $scope.iconStaging = 'glyphicon-refresh spin';
        $scope.tooltipStaging = 'Staging Status';
        $scope.shouldRefresh = true;

        $scope.startRefresh = function() {
          if (!logShipperId || !$scope.shouldRefresh ||
            $state.includes('index.accountSettings.logshippers.new') ||
            $state.includes('index.accountSettings.logshippers.edit') ||
            $state.includes('index.accountSettings.logshippers.versions')) {
            return;
          }
          intervalPromise = $interval($scope.fetchStatus, $config.LOGSHIPPERS_STATUS_REFRESH_INTERVAL, 1);
        };

        $scope.stopRefresh = function () {
          if (angular.isDefined(intervalPromise)) {
            $interval.cancel(intervalPromise);
            intervalPromise = undefined;
            $scope.shouldRefresh = false;
          }
        };

        $scope.fetchStatus = function(id) {
          if (!id && !logShipperId) {
            return;
          }
          if (!id && logShipperId) {
            id = logShipperId;
          }

          LogShippingJobs
            .status({id: id})
            .$promise
            .then(function (data) {
              if ($config.LOGSHIPPERS_STAGING_STATUS_ICONS[data.general_job_status]) {
                $scope.iconStaging = $config.LOGSHIPPERS_STAGING_STATUS_ICONS[data.general_job_status];
              }
              $scope.tooltipStaging = 'Log Shipping Status: ' + data.general_job_status;
              $scope.operationalModeName = $config.LOGSHIPPERS_OPERATIONAL_MODES[data.general_job_status];

              $scope.startRefresh();
              $scope.onChangeState();
              $scope.currentState = $scope.operationalModeName;
            })
            .catch(function (err) {
              console.log(err);
              $scope.iconStaging = 'glyphicon-remove text-danger';
              $scope.tooltipStaging = 'Log Shipping Status: Error';
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
          logShipperId = newValue;
          $scope.shouldRefresh = true;
          $scope.fetchStatus(newValue);
        });
      }
    };
  }
})();
