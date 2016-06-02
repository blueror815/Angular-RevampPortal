(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('ForgotPasswordController', ForgotPasswordController);

  /*@ngInject*/
  function ForgotPasswordController($scope, $uibModalInstance, $config, $uibModal, User, AlertService) {

    $scope.data = {
      email: '',
      loading: false
    };

    $scope.close = function() {
      $scope.data.loading = false;
      $uibModalInstance.dismiss();
    };

    $scope.forgot = function() {
      if (!$scope.data.email) {
        // Show error
        AlertService.danger('Wrong email address');
      } else {
        $scope.data.loading = true;
        User.forgotPassword($scope.data.email)
          .then(function(data) {
            if (data && data.data && data.data.message) {
              // Show message
              $uibModalInstance.close(data.data.message);
            }
          })
          .catch(function(err) {
            if (err.status === $config.STATUS.SUBSCRIPTION_REQUIRED) {
              $scope.resendRegistrationEmail($scope.data.email);

            } else {
              AlertService.danger(err.data.message);
            }

          })
          .finally(function() {
            $scope.data.loading = false;
          });
        //$uibModalInstance.close();
      }
    };

    $scope.resendRegistrationEmail = function(email, password) {
      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/resend-subscription-info.html',
        controller: 'resendRegistrationEmailController',
        size: 'md',
        resolve: {
          auth: function() {
            return {
              email: email,
              password: password
            };
          }
        }
      });

      modalInstance.result.then(function(data) {
        $uibModalInstance.close();
      });
    };
  }
})();
