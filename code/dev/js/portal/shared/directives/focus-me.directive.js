(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('focusMe', function ($timeout) {
      return {
        link: function(scope, element, attrs) {
          scope.$watch(attrs.focusMe, function(value) {
            if(value) {
              $timeout(function() {
                element[0].focus();
              });
            }
          });
        }
      };
    });
})(angular);
