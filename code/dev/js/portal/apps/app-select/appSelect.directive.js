(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .directive('appSelect', appSelectDirective);

  /*@ngInject*/
  function appSelectDirective(User, AlertService) {

    return {
      restrict: 'AE',
      templateUrl: 'parts/apps/app-select.html',
      scope: {
        ngModel: '=',
        onSelect: '&'
      },
      /*@ngInject*/
      controller: function ($scope) {
        $scope.apps = [];
        $scope._loading = true;
        $scope.onAppSelect = function ( app ) {
          $scope.ngModel = app;
          User.selectApplication( app );
        };

        if ( !$scope.ngModel && User.getSelectedApplication() ) {
          $scope.ngModel = User.getSelectedApplication();
        }

        //  ---------------------------------
        // Load user applications
        User.getUserApps()
          .then(function ( apps ) {
            $scope.apps = apps;
          })
          .catch(function () {
            AlertService.danger('Oops! Something went wrong');
          })
          .finally(function () {
            $scope._loading = false;
          });

        //  ---------------------------------
        $scope.$watch('ngModel', function () {
          if ( $scope.onSelect ) {
            $scope.onSelect();
          }
        });

      }
    };
  }
})();
