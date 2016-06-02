(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('filterTopObjects', filterTopObjects);

  /*@ngInject*/
  function filterTopObjects() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/top-objects-filter.html',
      scope: {
        ngFilters: '=',
        onFilter: '&',
        flCountry: '=',
        flOs: '=',
        flDevice: '='
      },
      /*@ngInject*/
      controller: function($scope, filterGeneratorService) {
        $scope.delay = '24';
        if (!$scope.ngFilters) {
          $scope.ngFilters = {};
        }
        $scope.ngFilters.count = '20';

        filterGeneratorService.subscribeOnFilterChangeEvent($scope, callbackOnGlobalFilterChange);

        //////////////////

        /**
         * @name callbackOnGlobalFilterChange
         * @desc triggers when global filter changes
         * @kind function
         * @params {Object} Event object
         * @params {Object} Data passed with event
         */
        function callbackOnGlobalFilterChange($event, eventDataObject) {
          //$scope.updateFilters();
          if (!$scope.ngFilters) {
            $scope.ngFilters = {};
          }

          _.forIn(eventDataObject.data, function(value, key) {
            $scope.ngFilters[key] = value;
          });

          //clear all empty fields in the filter object
          _.forIn($scope.ngFilters, function(value, key) {
            if (!eventDataObject.data[key]) {
              delete $scope.ngFilters[key];
            }
          });

          if ($scope.ngFilters.from_timestamp < moment().subtract(1, 'days').valueOf()) {
            $scope.ngFilters.from_timestamp = moment().subtract(1, 'days').valueOf();
          }
          if ($scope.ngFilters.to_timestamp > Date.now()) {
            $scope.ngFilters.to_timestamp = Date.now();
          }


          $scope.onFilter();
        }

        $scope.updateFilters = function() {

          $scope.ngFilters.from_timestamp = moment(Date.now()).subtract(parseInt($scope.delay), 'hours').valueOf();
          $scope.ngFilters.to_timestamp = Date.now();

          $scope.onFilter();
        };
      }
    };
  }
})();
