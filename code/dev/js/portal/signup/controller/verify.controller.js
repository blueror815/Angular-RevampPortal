(function() {
  'use strict';
  // NOTE: functionality is depricated - we no more verify user by token.
  angular
    .module('revapm.Portal.Signup')
    .controller('VerifyController', VerifyController);

  /*@ngInject*/
  function VerifyController($scope,
    Users,
    User,
    $stateParams,
    $state,
    AlertService,
    $localStorage,
    $timeout,
    $window) {
    var $ctrl = this;
    $scope.user = User.getUser();

    $scope.resendToken = function(model) {
      Users.resend({
          email: model.email
        })
        .$promise
        .then(function() {
          AlertService.success('Verification link is sent to ' + model.email, 5000);
        })
        .catch(AlertService.danger);
    };

    $ctrl.redirectToIndex = function redirectToIndex() {
      $scope.steps = 'verify-token-success';
      $timeout(function() {
        $state.go('index');
      }, 5000);
    };

    if ($stateParams.token) {
      $scope.steps = 'verify-token';
      Users.verify({
          token: $stateParams.token
        })
        .$promise
        .then(function successVerify(res) {
          $localStorage.user = {
            email: res.email
          };
          AlertService.success('Verification was successful', 5000);
          // TODO: inform into modal window
          return User.updateToken(res.token)
            .then(User.reloadUser)
            .then(function() {
              // NOTE: auto login success
            }, function(err) {
              // NOTE: user success verify, but can't make auto-login
              AlertService.danger(err.message);
            })
            .finally($ctrl.redirectToIndex);
        })
        .catch(function(err) {
          $timeout(function() {
            $scope.steps = 'verify-token-error';
          }, 3000);
        });
    }
  }
})();
