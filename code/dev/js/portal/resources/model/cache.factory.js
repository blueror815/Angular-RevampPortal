(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Cache', CacheResource);

  /*@ngInject*/
  function CacheResource(Resource, $config) {

    return Resource($config.API_URL + '/purge/:requestId', {requestId: ''}, {
      purge: { method: 'POST', isArray: false },
      status: { method: 'GET', isArray: false }
    });

  }
})();
