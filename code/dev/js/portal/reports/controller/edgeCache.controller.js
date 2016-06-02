

/**
 * @controller EdgeCacheReportsController
 * @module 'revapm.Portal.Reports'
 * @desc controller for the Web Analytics/Edge Cache Reports view
 */
(function(angular, _, empty) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('EdgeCacheReportsController', EdgeCacheReportsController);


  EdgeCacheReportsController.$inject = [
    '$scope',
    'Stats',
    'filterGeneratorConst',
    'filterGeneratorService'
  ];

  /*@ngInject*/
  function EdgeCacheReportsController(
    $scope,
    Stats,
    filterGeneratorConst,
    filterGeneratorService
  ) {
    var CHART_FILTERS_FIELDS = ['from_timestamp', 'to_timestamp', 'country'];

    var vm = this;
    var filter = {
        from_timestamp: moment().subtract(1, 'days').valueOf(),
        to_timestamp: Date.now()
      };

    //ui data model
    vm.model = {
      total: {},
      domain: empty,
      filtersList: [filterGeneratorConst.COUNTRIES, filterGeneratorConst.OS, filterGeneratorConst.DEVICES]
    };

    //ui actions
    vm.actions = {
      onDomainChange: onDomainChange
    };

    init();

    /////////////

    /**
     * @name init
     * @desc init controller logic function
     * @kind function
     */
    function init() {
      filterGeneratorService.subscribeOnFilterChangeEvent($scope, function($event, filterData) {
        _.forEach(CHART_FILTERS_FIELDS, function(objKey) {
          if (filterData.data[objKey]) {
            filter[objKey] = filterData.data[objKey];
          } else {
            delete filter[objKey];
          }
        });

        if (filter.from_timestamp < moment().subtract(1, 'days').valueOf()) {
          filter.from_timestamp = moment().subtract(1, 'days').valueOf();
        }
        if (filter.to_timestamp > Date.now()) {
          filter.to_timestamp = Date.now();
        }
        getFilterData();
      });
    }

    /**
     * @name onDomainChange
     * @desc when domain changes
     * @kind function
     */
    function onDomainChange() {
      if (vm.model.domain) {
        filter.domainId = vm.model.domain.id;
        getFilterData();
      }
    }

    /**
     * @name getFilterData
     * @desc get Filter data
     * @kind function
     */
    function getFilterData() {
      reloadCacheStatus(filter);
      getTotal();
    }

    /**
     * @name reloadCacheStatus
     * @desc reloads cache status chart data
     * @kind function
     */
    function reloadCacheStatus(filters) {
      filters = filters;
      $scope.cacheStatus = [];
      Stats
        .cacheStatus(filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            _.forEach(data.data, function(val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            $scope.cacheStatus = newData;
          }
        });
    }

    /**
     * @name getTotal
     * @desc gets data for the total
     * @kind function
     */
    function getTotal() {
      vm.model.total = {
        traficThisMonth: 123,
        cacheHitRate: 68,
        failedRequests: 0.01,
        ajaxHttpResponses: 0.01,
        averageResponseTime: 1243,
        averageTTFBTime: 45
      };
    }
  }
})(angular, _);
