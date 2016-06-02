(function () {
  'use strict';

  angular.module('revapm.Portal.Auth', [
    'ngStorage',
    'revapm.Portal.Shared',
    'revapm.Portal.Config',
    'revapm.Portal.Resources',
    'base64',
    'ui.router'
  ]).run(authRun);

  /*@ngInject*/
  function authRun($http, $localStorage) {
    // Dirty check for already loggined user.
    if ($localStorage.Authorization) {
      $http.defaults.headers.common.Authorization = $localStorage.Authorization;
    }
  }
})();
