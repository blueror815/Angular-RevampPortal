(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .config(ReportsRoutes);

  /*@ngInject*/
  function ReportsRoutes($stateProvider) {
    $stateProvider
      .state('index.mobile.traffic', {
        url: '/mobile/traffic',
        views: {
          main: {
            controller: 'MobileTrafficController',
            templateUrl: 'parts/reports/mobile-traffic.html'
          }
        }
      })
      .state('index.mobile.tops', {
        url: '/mobile/tops',
        views: {
          main: {
            controller: 'MobileTopsController',
            templateUrl: 'parts/reports/mobile-tops.html'
          }
        }
      })
      .state('index.mobile.objects', {
        url: '/mobile/top_objects',
        views: {
          main: {
            controller: 'MobileTopObjectsController',
            templateUrl: 'parts/reports/mobile-top-objects.html'
          }
        }
      })
      .state('index.mobile.distributions', {
        url: '/mobile/distributions',
        views: {
          main: {
            controller: 'MobileDistributionsController',
            templateUrl: 'parts/reports/mobile-distributions.html'
          }
        }
      })
      .state('index.mobile.ab', {
        url: '/mobile/ab',
        views: {
          main: {
            controller: 'MobileAbController',
            templateUrl: 'parts/reports/mobile-ab.html'
          }
        }
      });
  }
})();
