(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('alert', alertDirective);

  /*@ngInject*/
  function alertDirective() {
    return {
      transclude: true,
      template: '<div ng-class="class" ng-transclude></div>',
      scope: {
        type: '@'
      },

      controller: function($scope) {
        $scope.class = 'alert';

        if ($scope.type) {
          $scope.class = 'alert alert-'+$scope.type;
        }
      }
    };
  }

})();
