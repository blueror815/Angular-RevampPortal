(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTopObjectsFilters', mobileTopObjectsFilters);

  /*@ngInject*/
  function mobileTopObjectsFilters() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/mobile-top-objects-filters.html',
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
        $scope.span = '24';
        $scope.count = '10';

        $scope.update = function () {

          if (!$scope.ngFilters) {
            $scope.ngFilters = {};
          }
          $scope.ngFilters.count = parseInt( $scope.count );
          $scope.ngFilters.from_timestamp = moment().subtract( $scope.span, 'hours' ).valueOf();
          $scope.ngFilters.to_timestamp = Date.now();
          $scope.onFilter();
        };
      }
    };
  }
})();
