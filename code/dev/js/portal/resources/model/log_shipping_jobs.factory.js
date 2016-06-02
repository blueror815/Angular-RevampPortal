(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('LogShippingJobs', LogShippingJobs);

  /*@ngInject*/
  function LogShippingJobs(Resource, $config) {

    return Resource($config.API_URL + '/log_shipping_jobs/:id', {
      id: '@id'
    }, {
      status: {
        url: $config.API_URL + '/log_shipping_jobs/:id/status',
        method: 'GET',
        isArray: false
      }
    });
  }
})();
