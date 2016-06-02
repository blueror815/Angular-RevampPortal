/* filter-generator.service.js */

/** 
 * @name filterGeneratorService
 * @module 'revapm.Portal.Shared'
 * @desc filter generator
 */
(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .service('filterGeneratorService', filterGeneratorService);

  filterGeneratorService.$inject = [
    '$rootScope',
    '$config',
    'filterGeneratorConst',
    'Countries',
    'Stats'
  ];

  function filterGeneratorService(
    $rootScope,
    $config,
    filterGeneratorConst,
    Countries,
    Stats
  ) {
    var api = {
      broadcastFilterChangeEvent: broadcastFilterChangeEvent,
      subscribeOnFilterChangeEvent: subscribeOnFilterChangeEvent,
      getFilterByFilterKey: getFilterByFilterKey,

      getDevices: getDevices,
      getOs: getOs,
      getProtocol: getProtocol,
      getHttpMethod: getHttpMethod,
      getHttpProtocol: getHttpProtocol,
      getCountry: getCountry
    };

    return api;

    ////////////

    /**
     * @name broadcastFilterChangeEvent
     * @desc broadcasts in the rootScope filter change event and sends filter values
     * @kind function
     * @param {Array} Array of the new values
     */
    function broadcastFilterChangeEvent(values) {
      $rootScope.$emit($config.EVENTS.FILTER_CHANGED, { data: values });
    }

    /**
     * @name subscribeOnFilterChangeEvent
     * @desc subscribes on the filter change event and clears the event on the scope destroy
     * @kind function
     * @param {Object} $Scope of the controller
     * @param {Function} callback to trigger on the event
     */
    function subscribeOnFilterChangeEvent($scope, callback) {
      var event = $rootScope.$on($config.EVENTS.FILTER_CHANGED, callback);

      $scope.$on('$destroy', function() {
        event();
      });
    }

    /**
     * @name getFilterByFilterKey
     * @desc returns filter by filter key
     * @kind function
     * @param {String} Filter Key
     */
    function getFilterByFilterKey(filterKey) {
      var filters = {};

      filters[filterGeneratorConst.COUNTRIES] = {
        name: 'Country',
        allTitle: 'Countries',
        vals: Countries.query(),
        //key for the filter in the chart, used for the request params
        key: 'country'
      };

      filters[filterGeneratorConst.OS] = {
        name: 'OS',
        allTitle: 'OS',
        get: getOs,
        vals: [],
        //key for the filter in the chart, used for the request params
        key: 'os'
      };

      filters[filterGeneratorConst.DEVICES] = {
        name: 'Device',
        allTitle: 'Devices',
        get: getDevices,
        vals: [],
        //key for the filter in the chart, used for the request params
        key: 'device'
      };

      return filters[filterKey];
    }

    /**
     * @name getDevices
     * @desc gets formatted devices
     * @kind function
     * @param {String} domain id
     * @returns {Promise}
     */
    function getDevices(domainId) {
      return Stats
        .device({ domainId: domainId })
        .$promise
        .then(defaultResponseHandler);
    }

    /**
     * @name getOs
     * @desc gets formatted operation systems
     * @kind function
     * @param {String} domain id
     * @returns {Promise}
     */
    function getOs(domainId) {
      return Stats
        .os({ domainId: domainId })
        .$promise
        .then(defaultResponseHandler);
    }

    /**
     * @name getProtocol
     * @desc gets formatted protocols
     * @kind function
     * @param {String} domain id
     * @returns {Promise}
     */
    function getProtocol(domainId) {
      return Stats
        .protocol({ domainId: domainId })
        .$promise
        .then(function(data) {
          var formattedData = {
            labels: [],
            data: []
          };

          if (data.data && data.data.length > 0) {
            _.forEach(data.data, function(os) {
              var protocol = 'Unknows';
              if (os.key === 80) {
                protocol = 'HTTP';
              }
              if (os.key === 443) {
                protocol = 'HTTPS';
              }
              formattedData.labels.push(protocol);
              formattedData.data.push(os.count);
            });
          }

          return formattedData;
        });
    }

    /**
     * @name getHttpMethod
     * @desc gets formatted http methods
     * @kind function
     * @param {String} domain id
     * @returns {Promise}
     */
    function getHttpMethod(domainId) {
      return Stats
        .httpMethod({ domainId: domainId })
        .$promise
        .then(defaultResponseHandler);
    }

    /**
     * @name getHttpProtocol
     * @desc gets formatted http protocols
     * @kind function
     * @param {String} domain id
     * @returns {Promise}
     */
    function getHttpProtocol(domainId) {
      return Stats
        .httpProtocol({ domainId: domainId })
        .$promise
        .then(defaultResponseHandler);
    }

    /**
     * @name getCountry
     * @desc gets list of countries
     * @kind function
     * @param {String} domain id
     * @returns {Promise}
     */
    function getCountry(domainId) {
      return Stats
        .country({ domainId: domainId })
        .$promise
        .then(defaultResponseHandler);
    }

    /**
     * @name defaultResponseHandler
     * @access private
     * @desc default response handler
     * @kind function
     * @param {Object} response object
     */
    function defaultResponseHandler(response) {
      var formattedData = {
        labels: [],
        data: []
      };

      if (response.data && response.data.length > 0) {
        _.forEach(response.data, function(data) {
          formattedData.labels.push(data.key);
          formattedData.data.push(data.count);
        });
      }

      return formattedData;
    }
  }
})(angular);
