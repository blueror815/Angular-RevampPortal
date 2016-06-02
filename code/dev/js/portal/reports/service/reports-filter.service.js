/* reports-filter.service.js */

/** 
 * @service reportsFilterService
 * @module 'revapm.Portal.Reports'
 * @desc service for the getting data for the global filter reports
 */
(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .service('reportsFilterService', reportsFilterService);

  reportsFilterService.$inject = [
    'Stats'
  ];

  function reportsFilterService(
    Stats
  ) {
    /**
     * Api methods
     *
     * @type {Object}
     */
    var api = {
      getDevices: getDevices,
      getOs: getOs,
      getProtocol: getProtocol,
      getHttpMethod: getHttpMethod,
      getHttpProtocol: getHttpProtocol
    };

    return api;

    //////////////////

    /**
     * @name getDevices
     * @desc get formatted devices
     * @kind function
     * @params {String} domain id
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
     * @desc get formatted operation systems
     * @kind function
     * @params {String} domain id
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
     * @desc get formatted protocols
     * @kind function
     * @params {String} domain id
     * @returns {Promise}
     */
    function getProtocol(domainId) {
      return Stats
        .protocol({ domainId: domainId })
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            angular.forEach(data.data, function(os) {
              var protocol = 'Unknows';
              if (os.key === 80) {
                protocol = 'HTTP';
              }
              if (os.key === 443) {
                protocol = 'HTTPS';
              }
              $scope.protocol.labels.push(protocol);
              $scope.protocol.data.push(os.count);
            });
          }
        });
    }

    /**
     * @name getHttpMethod
     * @desc get formatted http methods
     * @kind function
     * @params {String} domain id
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
     * @desc get formatted http protocols
     * @kind function
     * @params {String} domain id
     * @returns {Promise}
     */
    function getHttpProtocol(domainId) {
      return Stats
        .httpProtocol({ domainId: domainId })
        .$promise
        .then(defaultResponseHandler);
    }

    /**
     * @name defaultResponseHandler
     * @access private
     * @desc default response handler
     * @kind function
     * @params {Object} response object
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
