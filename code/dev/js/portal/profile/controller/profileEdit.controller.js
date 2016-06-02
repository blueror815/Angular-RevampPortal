(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('ProfileEditController', ProfileEditController);

  /*@ngInject*/
  function ProfileEditController($scope, User, AlertService) {

    $scope.user = User.getUser();

    $scope.pass = {
      current_password: '',
      new_password: '',
      confirm_password: ''
    };

    $scope.clearPassword = function () {
      $scope.pass = {
        current_password: '',
        new_password: '',
        confirm_password: ''
      };
    };

    /**
     * Update current users password
     *
     * @returns {Promise}
     */
    $scope.updatePassword = function () {
      if (!_.trim($scope.pass.current_password) || !_.trim($scope.pass.new_password)) {
        AlertService.danger('Please fill all fields. (New password should be at least 8 charecters length)', 5000);
        return;
      }
      if ($scope.pass.new_password !== $scope.pass.confirm_password) {
        AlertService.danger('Passwords did not match', 5000);
        return;
      }
      return User.updatePassword($scope.pass.current_password, $scope.pass.new_password)
        .then(function (data) {
          $scope.clearPassword();
          AlertService.success('Your password updated', 5000);
          return data;
        })
        .catch(function (err) {
          if (err.data && err.data.message) {
            AlertService.danger(err.data.message);
          } else {
            AlertService.danger('Something goes wrong');
          }
        });
    };

    $scope.updateProfile = function (user) {
      $scope.updatePassword();
    };

  }
})();
