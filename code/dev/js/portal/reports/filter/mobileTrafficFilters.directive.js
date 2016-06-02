(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTrafficFilters', mobileTrafficFilters);

  /*@ngInject*/
  function mobileTrafficFilters() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/mobile-traffic-filters.html',
      scope: {
        ngFilters: '=',
        onFilter: '&',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '=',
        flDisabled: '='
      },
      /*@ngInject*/
      controller: function ($scope) {
        $scope.span = '1';
        $scope.update = function () {

          if (!$scope.ngFilters) {
            $scope.ngFilters = {};
          }
          $scope.ngFilters.from_timestamp = moment().subtract( $scope.span, 'days' ).valueOf();
          $scope.ngFilters.to_timestamp = Date.now();
          $scope.onFilter();
        };
      }
    };
  }
})();
