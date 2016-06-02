(function () {
  'use strict';

  angular
    .module('revapm.Portal.Keys')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.keys', {
        url: '/keys',
        views: {
          main: {
            controller: 'KeysListController',
            templateUrl: 'parts/keys/list.html'
          }
        }
      })
      .state('index.accountSettings.keys.edit', {
        url: '/edit/:id',
        views: {
          page: {
            controller: 'KeysEditController',
            templateUrl: 'parts/keys/edit.html'
          }
        }
      });
  }
})();
