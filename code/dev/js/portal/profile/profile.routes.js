(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.profile', {
        url: '/profile',
        views: {
          main: {
            controller: 'ProfileEditController',
            templateUrl: 'parts/profile/edit.html'
          }
        }
      })
      .state('index.accountSettings.company', {
        url: '/profile/company',
        views: {
          main: {
            controller: 'CompanyProfileEditController',
            templateUrl: 'parts/profile/edit-company.html'
          }
        }
      })
      .state('index.billing.plans', {
        url: '/profile/plans',
        views: {
          main: {
            controller: 'BillingController',
            templateUrl: 'parts/profile/billing.html'
          }
        }
      })
      .state('index.billing.statements', {
        url: '/profile/statements',
        views: {
          main: {
            controller: 'StatementsController',
            templateUrl: 'parts/profile/statements.html'
          }
        }
      })
      .state('index.billing.statement', {
        url: '/profile/statements/:id',
        views: {
          main: {
            controller: 'StatementsController',
            templateUrl: 'parts/profile/statement.html'
          }
        }
      })
      .state('index.accountSettings.activitylog', {
        url: '/activitylog',
        views: {
          main: {
            controller: 'ActivityLogController',
            templateUrl: 'parts/profile/activity-log.html'
          }
        }
      })
      .state('index.accountSettings.2fa', {
        url: '/2fa',
        views: {
          main: {
            controller: 'TwoFactorAuthController',
            templateUrl: 'parts/profile/two-factor-auth.html'
          }
        }
      });
  }
})();
