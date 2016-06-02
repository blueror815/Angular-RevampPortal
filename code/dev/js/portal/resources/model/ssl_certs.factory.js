(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('SSL_certs', SSL_certsResource);

  /*@ngInject*/
  function SSL_certsResource(Resource, $config) {

    return Resource($config.API_URL + '/ssl_certs/:id', {
      id: '@id'
    }, {
      status: {
        url: $config.API_URL + '/ssl_certs/:id/config_status',
        method: 'GET',
        isArray: false
      }
    });
  }
})();
