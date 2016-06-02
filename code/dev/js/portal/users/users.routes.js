(function () {
  'use strict';

  angular
    .module('revapm.Portal.Users')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.users', {
        url: '/users',
        views: {
          main: {
            controller: 'UsersCrudController',
            templateUrl: 'parts/users/list.html'
          }
        }
      })
      .state('index.accountSettings.users.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/users/new.html'
          }
        }
      })
      .state('index.accountSettings.users.edit', {
        url: '/edit/:id',
        views: {
          page: {
            controller: 'UsersCrudController',
            templateUrl: 'parts/users/edit.html'
          }
        }
      });
  }
})();
