(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTopObjects', mobileTopObjectsDirective);

  /*@ngInject*/
  function mobileTopObjectsDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-base-top-objects.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '=',
        flDisabled: '=',
        reportType: '@',
        heading: '@'
      },
      /*@ngInject*/
      controller: function ($scope, Stats) {

        $scope.span = '24';
        $scope._loading = false;
        $scope.items = [];

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null,
          count: 10
        };
        if ( $scope.reportType ) {
          $scope.filters.report_type = $scope.reportType;
        }

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          $scope.items = [];

          return Stats.sdk_top_objects( $scope.filters )
            .$promise
            .then( function( data ) {
              $scope.items = data.data;
              // console.log( data );
            })
            .finally( function() {
              $scope._loading = false;
            } );
        };

        //  ---------------------------------
        $scope.$watch( 'ngApp', function() {
          if ( $scope.ngAccount || $scope.ngApp ) {
            $scope.reload();
          }
        });


      }
    };
  }
})();
