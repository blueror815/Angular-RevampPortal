(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('PasswordRestoreController', PasswordRestoreController);

  /*@ngInject*/
  function PasswordRestoreController($scope, User, $stateParams, AlertService, $timeout, $state) {

    $scope.alerts = AlertService;
    $scope.token = $stateParams.token;

    $scope.password = '';
    $scope.passwordRepeat = '';
    $scope.loading = false;

    $scope.reset = function() {
      AlertService.clear();
      if (!$scope.password || !$scope.passwordRepeat || $scope.password !== $scope.passwordRepeat) {
        AlertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.loading = true;
      User.resetPassword($scope.token, $scope.password)
        .then(function (data) {
          if (data.data && data.data.message) {
            AlertService.success(data.data.message, 5000);
            $timeout(function () {
              $state.go('login');
            }, 3000);
          }
        })
        .catch(function (err) {
          if (err.data && err.data.message) {
            AlertService.danger(err.data.message, 5000);

          }
        })
        .finally(function () {
          $scope.loading = false;
        });
    };
  }
})();
