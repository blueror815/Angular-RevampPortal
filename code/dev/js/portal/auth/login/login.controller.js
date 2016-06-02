(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('LoginController', LoginController);

  /*@ngInject*/
  function LoginController($scope, User, $state, AlertService, DashboardSrv, $config, $uibModal, $location) {

    document.querySelector('body').style.paddingTop = '0';

    $scope._loading = false;

    $scope.style = {
      height: document.documentElement.clientHeight + 'px'
    };

    var images = [
      'images/bg/bay_bridge.jpg',
      'images/bg/burney_falls.jpg',
      'images/bg/golden_gate.jpg',
      'images/bg/mirror_lake.jpg',
      'images/bg/painted_ladies.jpg',
      'images/bg/tunnel_view.jpg',
      'images/bg/twin_peaks.jpg',
      'images/bg/yosemite_hill.jpg',
      'images/bg/yosemite_valley.jpg',
    ];

    $scope.randomImage = images[Math.floor(Math.random() * images.length)];
    $scope.randomImageStyle = {
      'background-image': 'url(' + $scope.randomImage + ')'
    };

    $scope.login = function(email, pass) {
      AlertService.clear();
      $scope._loading = true;
      try {
        User.login(email, pass)
          .then(function(data) {
            DashboardSrv.getAll().then(function(dashboards) {
              if (dashboards && dashboards.length) {
                $location.path('dashboard/' + dashboards[0].id);
              } else {
                $state.go('index.reports.proxy');
              }
            });
          })
          .catch(function(err) {
            if (!err.status) {

            }
            if (err.status === $config.STATUS.TWO_FACTOR_AUTH_REQUIRED) {
              $scope.enter2faCode(email, pass);
            }
            if (err.status === $config.STATUS.SUBSCRIPTION_REQUIRED) {
              $scope.resendRegistrationEmail(email, pass);
            }
            if (err.status === $config.STATUS.UNAUTHORIZED) {
              AlertService.danger('Wrong username or password', 5000);
            }
            if (!!err.data) {
              if (err.data.message && (err.status !== $config.STATUS.SUBSCRIPTION_REQUIRED)) {
                AlertService.danger(err.data.message, 5000);
              }
            } else {
              AlertService.danger('Something get wrong', 5000);
            }
          })
          .finally(function() {
            $scope._loading = false;
          });
      } catch (e) {
        AlertService.danger(e.message);
        $scope._loading = false;
      }
    };

    if (localStorage && localStorage.email && localStorage.password) {
      $scope.login(localStorage.email, localStorage.password);
    }

    $scope.enter2faCode = function(email, password) {
      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/two-factor-auth-code.html',
        controller: 'TwoFactorAuthCodeModalController',
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
        $state.go('index');
      });
    };

    $scope.forgotPassword = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/forgot-password.html',
        controller: 'ForgotPasswordController',
        size: 'md' //,
          //resolve: {
          //  items: function () {
          //    return $scope.items;
          //  }
          //}
      });

      modalInstance.result.then(function(message) {
        if (!!message) {
          AlertService.success(message, 5000);
        }
      });
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
        // $state.go('index');
         // $uibModalInstance.close();
      });
    };
  }
})();
