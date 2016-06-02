(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .config(ReportsRoutes);

  /*@ngInject*/
  function ReportsRoutes($stateProvider) {
    $stateProvider
      .state('index.reports.general', {
        url: '/reports/general',
        views: {
          main: {
            controller: 'GeneralCtrl',
            controllerAs: 'vm',
            templateUrl: 'parts/reports/general.html'
          }
        }
      })
      .state('index.reports.proxy', {
        url: '/reports/proxy',
        views: {
          main: {
            controller: 'ReportsProxyTrafficController',
            templateUrl: 'parts/reports/proxy.html'
          }
        }
      })
      .state('index.reports.edge-cache', {
        url: '/reports/edge-cache',
        views: {
          main: {
            controller: 'EdgeCacheReportsController',
            controllerAs: 'vm',
            templateUrl: 'parts/reports/edge-cache.html'
          }
        }
      })
      .state('index.reports.topreports', {
        url: '/reports/topreports',
        views: {
          main: {
            controller: 'TopReportsTrafficController',
            templateUrl: 'parts/reports/top-reports.html'
          }
        }
      })
      .state('index.reports.top', {
        url: '/reports/top',
        views: {
          main: {
            controller: 'TopObjectsController',
            templateUrl: 'parts/reports/top.html'
          }
        }
      })
      .state('index.reports.fbt', {
        url: '/reports/fbt',
        views: {
          main: {
            controller: 'FBTReportsController',
            templateUrl: 'parts/reports/fbt.html'
          }
        }
      })
      .state('index.reports.mob', {
        url: '/reports/mobile',
        views: {
          main: {
            controller: 'MobileReportsController',
            templateUrl: 'parts/reports/mobile.html'
          }
        }
      })
      .state('index.reports.heatmaps', {
        url: '/reports/heatmaps',
        views: {
          main: {
            controller: 'TrafficHeatmapsController',
            templateUrl: 'parts/reports/heatmaps.html'
          }
        }
      })
      .state('index.reports.lm_rtt_heatmaps', {
        url: '/reports/lm_rtt_heatmaps',
        views: {
          main: {
            controller: 'LMRTTHeatmapsController',
            templateUrl: 'parts/reports/lm-rtt-heatmaps.html'
          }
        }
      });
  }
})();
