(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .config(UsageRoutes);

  /*@ngInject*/
  function UsageRoutes($stateProvider) {
    $stateProvider
      .state('index.billing.usage', {
        url: '/usage',
        views: {
          main: {
            controller: 'UsageWebController',
            templateUrl: 'parts/reports/usage-web.html'
          }
        }
      })
      .state('index.billing.company', {
        url: '/account',
        views: {
          main: {
            controller: 'CompanyProfileEditController',
            templateUrl: 'parts/profile/edit-company.html '
          }
        }
      });
  }
})();
