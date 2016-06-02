(function () {
  'use strict';

  angular
    .module('revapm.Portal.ImportConfig')
    .config(ImportConfigRoutingConfig);

  /*@ngInject*/
  function ImportConfigRoutingConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.importConfig', {
        url: '/import-config',
        views: {
          main: {
            controller: 'ImportConfigController',
            templateUrl: 'parts/import-config/import-config.html'
          }
        }
      });
  }
})();
