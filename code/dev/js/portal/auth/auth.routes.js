(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          layout: {
            controller: 'LoginController',
            templateUrl: 'parts/auth/login.html'
          }
        }
      })
      .state('index.restore', {
        url: '/password/reset/:token',
        views: {
          page: {
            controller: 'PasswordRestoreController',
            templateUrl: 'parts/auth/reset-password.html'
          }
        }
      });
  }
})();
