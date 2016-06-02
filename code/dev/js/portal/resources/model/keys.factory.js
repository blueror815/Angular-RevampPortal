(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('ApiKeys', KeysResource);

  /*@ngInject*/
  function KeysResource(Resource, $config) {

    return Resource($config.API_URL + '/api_keys/:id', {id: '@id'}, {});
  }
})();
