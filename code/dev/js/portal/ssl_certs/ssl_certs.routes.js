(function () {
  'use strict';

  angular
    .module('revapm.Portal.SSL_certs')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.ssl_certs', {
        url: '/ssl_certs',
        views: {
          main: {
            controller: 'SSL_certsCrudController',
            templateUrl: 'parts/ssl_certs/list.html'
          }
        }
      })
      .state('index.webApp.ssl_certs.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/ssl_certs/new.html'
            //controller: 'DomainsNewController'
          }
        }
      })
      .state('index.webApp.ssl_certs.edit', {
        url: '/edit/:id?isAdvanced',
        views: {
          page: {
            templateUrl: 'parts/ssl_certs/edit.html',
            controller: 'SSL_certsCrudController'
          }
        }
      });
  }
})();
