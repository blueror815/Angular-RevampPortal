(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .directive('disableTwoFactorAuth', disableTwoFactorAuthDirective);

  /*@ngInject*/
  function disableTwoFactorAuthDirective(User, Users, TwoFactorAuth, AlertService, $uibModal) {

    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'parts/auth/2fa/disable-two-factor-auth.html',
      scope: {
        ngUserId: '='
      },
      /*@ngInject*/
      controller: function ($scope) {

        /**
         * Loading flag
         *
         * @type {boolean}
         * @private
         */
        $scope._loading = false;

        /**
         * Current logged in user
         *
         * @type {Object|null|*}
         */
        $scope.currentUser = User.getUser();

        /**
         * Is 2fa enabled for given user
         *
         * @type {boolean}
         */
        $scope.twoFactorAuthEnabled = false;

        /**
         * Check if given user is mine
         *
         * @type {boolean}
         */
        $scope.isMyUser = false;

        /**
         * Load user details to check if 2fa enabled
         */
        $scope.loadUserDetails = function() {
          $scope.isMyUser = false;
          if (!$scope.ngUserId) {
            console.log('You did not provide userId. User ng-user-id for directive !');
            return;
          }
          // Disable till load complete
          $scope.twoFactorAuthEnabled = false;
          $scope._loading = true;
          // Load details
          Users
            .get({id: $scope.ngUserId})
            .$promise
            .then(function (data) {
              $scope.twoFactorAuthEnabled = Boolean(data.two_factor_auth_enabled);
              $scope.isMyUser = Boolean($scope.ngUserId === data.user_id);
            })
            .catch(function (err) {
              AlertService.danger(err);
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        /**
         * Disables 2fa for user
         *
         * @param {string?} [oneTimePassword]
         */
        $scope._disable = function(oneTimePassword) {
          // Check if 2fa enabled
          if (!$scope.twoFactorAuthEnabled) {
            return;
          }
          // Check pass existance
          //if (!oneTimePassword && $scope.isMyUser) {
          //  AlertService.danger('Please enter your One Time Password');
          //  return;
          //}
          // Check user Id existence
          if (!$scope.ngUserId) {
            console.log('You did not provide userId. User ng-user-id for directive !');
            return;
          }
          // Set loading flag
          $scope._loading = true;
          // Set data that will be set for request
          var data = {};
          // Have to set one time password for my user
          //if ($scope.isMyUser) {
          //  data = {
          //    oneTimePassword: oneTimePassword
          //  };
          //}
          // Call method
          TwoFactorAuth
            .disable({
              userId: $scope.ngUserId
            }, data)
            .$promise
            .then(function (data) {
              if ($scope.currentUser.user_id === $scope.ngUserId) {
                User.reloadUser();
              }
              AlertService.success(data.message);
              $scope.twoFactorAuthEnabled = false;
            })
            .catch(function (err) {
              AlertService.danger(err);
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        /**
         * Show confirmation popup and will disable 2fa on ok
         */
        $scope.disable = function() {
          $scope.confirm().then($scope._disable);
        };

        /**
         * Show confirmation popup
         *
         * @returns {Promise}
         */
        $scope.confirm = function() {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'confirm2FaDisable.html',
            controller: 'ConfirmModalInstanceCtrl',
            size: 'md',
            resolve: {
              model: {
                isMyUser: $scope.isMyUser,
                user: $scope.currentUser
              }
            }
          });

          return modalInstance.result;
        };

        /**
         * Handle userId change
         */
        $scope.$watch('ngUserId', function() {
          if (!$scope.ngUserId) {
            return;
          }
          $scope.loadUserDetails();
        });
      }
    };
  }
})();
