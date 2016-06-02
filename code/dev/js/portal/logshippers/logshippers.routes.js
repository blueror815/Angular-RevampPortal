(function() {
  'use strict';

  angular
    .module('revapm.Portal.LogShippers')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.logshippers', {
        url: '/logshippers',
        views: {
          main: {
            controller: 'LogShippersCrudController',
            templateUrl: 'parts/logshippers/list.html'
          }
        }
      })
      .state('index.accountSettings.logshippers.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/logshippers/new.html',
            // controller: 'LogShippersCrudController'
          }
        }
      })
      .state('index.accountSettings.logshippers.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/logshippers/edit.html',
            controller: 'LogShippersCrudController'
          }
        }
      })
      // TODO:delete
      // .state('index.accountSettings.logshippers.android.configure', {
      //   url: '/configure/:id',
      //   views: {
      //     page: {
      //       templateUrl: 'parts/apps/configure.html',
      //       controller: 'LogShippersCrudController'
      //     }
      //   }
      // })
      // TODO:delete
    // .state('index.accountSettings.logshippers.versions', {
    //   url: '/versions/:id/',
    //   views: {
    //     page: {
    //       templateUrl: 'parts/apps/versions.html',
    //       controller: 'AppVersionsController'
    //     }
    //   }
    // })
    ;
  }
})();
