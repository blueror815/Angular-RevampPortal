(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .filter('firstUpper', function() {
      return function(input, scope) {
        return input ? input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase() : '';
      };
    })
    .directive('subscriptionSummary', function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          subscription: '=ngModel'
        },
        templateUrl: '/parts/profile/directives/subscription-summary.tpl.html',
      };
    });
})(angular);
