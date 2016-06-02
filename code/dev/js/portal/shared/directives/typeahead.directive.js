(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('typeaheadToggle', function ($rootScope) {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          element.bind('click', function () {
            ctrl.$setViewValue($rootScope.searchTerm || ' ');
          });
          element.bind('blur', function () {
            ctrl.$setViewValue();
          });
        }
      };
    });
})(angular);
