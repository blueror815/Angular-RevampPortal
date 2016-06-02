(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('TwoFactorAuthCodeModalController', TwoFactorAuthCodeModalController);

  /*@ngInject*/
  function TwoFactorAuthCodeModalController($scope, $uibModalInstance, auth, User, AlertService, $config) {
    $scope.data = {
      code: '',
      loading: false
    };

    $scope.close = function() {
      $scope.data.loading = false;
      $uibModalInstance.dismiss();
    };

    $scope.login = function() {
      if (!$scope.data.code) {
        AlertService.danger('Please enter One Time Password', 3000);
        return;
      }
      AlertService.clear();
      $scope.data.loading = true;
      try {
        User.login(auth.email, auth.password, $scope.data.code)
          .then(function(data) {
            $uibModalInstance.close(data);
          })
          .catch(function (err) {
            if (err.status === $config.STATUS.UNAUTHORIZED) {
              AlertService.danger('Wrong one Time Password', 5000);
            }
            if (err.data.message) {
              AlertService.danger(err.data.message, 5000);
            }
          })
          .finally(function () {
            $scope.data.loading = false;
          });
      } catch(e) {
        AlertService.danger(e.message);
        $scope.data.loading = false;
      }
    };


  }
})();
