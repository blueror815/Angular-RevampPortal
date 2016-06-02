(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Activity', ActivityResource);

  /*@ngInject*/
  function ActivityResource(Resource, $config) {

    return Resource($config.API_URL + '/activity/:action', {action: ''}, {
      query: {method: 'GET', isArray: false},
      summary: {method: 'GET', isArray: false}
    });

  }
})();
