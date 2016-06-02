(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .directive('domainStagingStatus', domainStagingStatus);

  /*@ngInject*/
  function domainStagingStatus(DomainsConfig, $config, $interval, $rootScope, $state) {
    return {
      template: '<i class="glyphicon" ng-class="iconStaging" uib-tooltip="{{tooltipStaging}}"></i>' +
                '&nbsp;&nbsp;&nbsp;' +
                '<i class="glyphicon" ng-class="iconGlobal" uib-tooltip="{{tooltipGlobal}}"></i>',
      scope: {
        ngId: '=' // Domain id
      },
      /*@ngInject*/
      controller: function ($scope) {
        var intervalPromise;
        var domainId;

        $scope.iconStaging = 'glyphicon-refresh spin';
        $scope.tooltipStaging = 'Staging Status';
        $scope.iconGlobal = 'glyphicon-refresh spin';
        $scope.tooltipGlobal = 'Global Status';
        $scope.shouldRefresh = true;

        $scope.startRefresh = function() {
          if (!domainId || !$scope.shouldRefresh ||
            $state.includes('index.webApp.domains.new') ||
            $state.includes('index.webApp.domains.edit') ||
            $state.includes('index.webApp.domains.advanced') ||
            $state.includes('index.webApp.domains.versions')) {
            return;
          }
          intervalPromise = $interval($scope.fetchStatus, $config.DOMAIN_STATUS_REFRESH_INTERVAL, 1);
        };

        $scope.stopRefresh = function () {
          if (angular.isDefined(intervalPromise)) {
            $interval.cancel(intervalPromise);
            intervalPromise = undefined;
            $scope.shouldRefresh = false;
          }
        };

        $scope.fetchStatus = function(id) {
          if (!id && !domainId) {
            return;
          }
          if (!id && domainId) {
            id = domainId;
          }

          DomainsConfig
            .status({id: id})
            .$promise
            .then(function (data) {
              if ($config.DOMAIN_STAGING_STATUS_ICONS[data.staging_status]) {
                $scope.iconStaging = $config.DOMAIN_STAGING_STATUS_ICONS[data.staging_status];
              }
              $scope.tooltipStaging = 'Staging Status: ' + data.staging_status;
              if ($config.DOMAIN_PRODUCTION_STATUS_ICONS[data.global_status]) {
                $scope.iconGlobal = $config.DOMAIN_PRODUCTION_STATUS_ICONS[data.global_status];
              }
              $scope.tooltipGlobal = 'Global Status: ' + data.global_status;
              $scope.startRefresh();
            })
            .catch(function (err) {
              console.log(err);
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
          domainId = newValue;
          $scope.shouldRefresh = true;
          $scope.fetchStatus(newValue);
        });
      }
    };
  }
})();
