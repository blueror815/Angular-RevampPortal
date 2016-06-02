(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('resendRegistrationEmailController', resendRegistrationEmailController);

  /*@ngInject*/
  function resendRegistrationEmailController($scope, $uibModalInstance, User, Users, AlertService, auth) {
    $scope.data = auth;
    $scope.data.loading = false;

    $scope.close = function() {
      $scope.data.loading = false;
      $uibModalInstance.dismiss();
    };

    $scope.onResendEmail = function() {
      if (!$scope.data.email) {
        // Show error
        AlertService.danger('Wrong email address');
      } else {
        $scope.data.loading = true;
        Users.resend({
            email: $scope.data.email
          }).$promise
          .then(function(data) {
            if (!!data && data.message) {
              // Show message
              AlertService.success(data.message, 6000);
              $uibModalInstance.close(data.message);
            }
          }, function(err) {
            // TODO: check work message
            AlertService.danger(err.data.message);
            // console.log('err',err);
          })
          .catch(function(err) {
            AlertService.danger(err.data.message);
          })
          .finally(function() {
            $scope.data.loading = false;
          });
        //$uibModalInstance.close();
      }
    };
  }
})();
