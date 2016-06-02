(function() {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .config(routesConfig);

  /* @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider, $config) {
    $urlRouterProvider.when('/signup', '/signup/plans');
    // NOTE: Must to be only one type of registration
    if ($config.ENABLE_SIMPLIFIED_SIGNUP_PROCESS === true) {
      $urlRouterProvider.when('/signup/to/:billing_plan_handler', '/signup/:billing_plan_handler');
    } else {
      $urlRouterProvider.when('/signup/:billing_plan_handler', '/signup/to/:billing_plan_handler');
    }
    $stateProvider
      .state('signup', {
        abstract: false,
        url: '/signup',
        views: {
          layout: {
            templateUrl: 'parts/signup/signup.html'
          }
        }
      })
      // step N1 - choose billing plan
      .state('signup.billing_plans', {
        url: '/plans',
        views: {
          form: {
            controller: 'SignupController',
            templateUrl: 'parts/signup/form-billing-plans.tpl.html'
          }
        }
      })
      // step 2.1 - enter contact information
      .state('signup.contact_info', {
        url: '/to/:billing_plan_handler',
        views: {
          form: {
            controller: 'SignupBillingPlansController',
            controllerAs: '$ctrl',
            templateUrl: 'parts/signup/form-contact-info.tpl.html'

          }
        }
      })
      // step 2.2 - enter contact information - simple mode
      .state('signup.contact_info2', {
        url: '/:billing_plan_handler',
        views: {
          form: {
            controller: 'SignupBillingPlansController',
            controllerAs: '$ctrl',
            templateUrl: 'parts/signup/form-short-signup.tpl.html'
          }
        }
      })
      // step 3 - inform user about success registration and show information about waiting email
      .state('success', {
        url: '/signup/success',
        views: {
          layout: {
            controller: 'SignupController',
            templateUrl: 'parts/signup/end.html'
          }
        }
      })
      .state('email_sent', {
        url: '/signup/email',
        views: {
          layout: {
            controller: 'VerifyController',
            templateUrl: 'parts/signup/email_sent.html'
          }
        }
      })
      .state('verify', {
        url: '/profile/verify/:token',
        views: {
          layout: {
            controller: 'VerifyController',
            templateUrl: 'parts/signup/verify.html'
          }
        }
      })
      .state('resend_token', {
        url: '/profile/verify/resend_token',
        views: {
          layout: {
            controller: 'VerifyController',
            templateUrl: 'parts/signup/resend.html'
          }
        }
      });
  }
})();
