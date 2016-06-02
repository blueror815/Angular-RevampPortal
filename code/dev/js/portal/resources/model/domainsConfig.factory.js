(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('DomainsConfig', DomainsResource);

  /*@ngInject*/
  function DomainsResource(Resource, $config) {

    return Resource($config.API_URL + '/domain_configs/:id', {id: '@id'}, {
      status: {
        url: $config.API_URL + '/domain_configs/:id/config_status',
        method: 'GET',
        isArray: false
      },
      versions: {
        url: $config.API_URL + '/domain_configs/:id/versions',
        method: 'GET',
        isArray: true
      }
    });
  }
})();
