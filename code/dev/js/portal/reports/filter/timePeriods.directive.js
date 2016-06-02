(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('filterTimePeriods', filterTimePeriods);

  /*@ngInject*/
  function filterTimePeriods() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/time-period.html',
      scope: {
        ngFilters: '=',
        onFilter: '&',
        flCountry: '=',
        flOs: '=',
        flDevice: '='
      },
      controller: FilterTimePeriodCtrl
    };

    return directive;
  }

  FilterTimePeriodCtrl.$inject = [
    '$scope',
    'filterGeneratorService'
  ];

  function FilterTimePeriodCtrl(
    $scope,
    filterGeneratorService
  ) {
    $scope.delay = '1';
    $scope.updateFilters = updateFilters;

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

      _.forIn(eventDataObject.data, function(value, key){
        $scope.ngFilters[key] = value;
      });

      //clear all empty fields in the filter object
      _.forIn($scope.ngFilters, function(value, key) {
        if (!eventDataObject.data[key]) {
          delete $scope.ngFilters[key];
        }
      });
      

      $scope.onFilter();
    }

    /**
     * @name updateFilters
     * @desc update filters
     * @kind function
     */
    function updateFilters() {
      if (!$scope.ngFilters) {
        $scope.ngFilters = {};
      }
      $scope.ngFilters.from_timestamp = moment(Date.now()).subtract(parseInt($scope.delay), 'days').valueOf();
      $scope.ngFilters.to_timestamp = Date.now();

      $scope.onFilter();
    }
  }
})();
