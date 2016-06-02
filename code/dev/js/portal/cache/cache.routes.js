(function () {
  'use strict';

  angular
    .module('revapm.Portal.Cache')
    .config(CacheRoutingConfig);

  /*@ngInject*/
  function CacheRoutingConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.cache', {
        url: '/cache/purge',
        views: {
          main: {
            controller: 'CachePurgeController',
            templateUrl: 'parts/cache/purge.html'
          }
        }
      })
      .state('index.webApp.advanced', {
        url: '/cache/advanced',
        views: {
          main: {
            controller: 'CachePurgeController',
            templateUrl: 'parts/cache/purge_advanced.html'
          }
        }
      });
  }
})();
