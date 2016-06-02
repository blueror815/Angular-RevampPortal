(function() {
  'use strict';
  angular
    .module('revapm.Portal.Signup')
    .controller('SignupBillingPlansController', SignupBillingPlansController);
  /**
   * @name SignupBillingPlansController
   * @description
   *
   *
   * @param {[type]} $scope        [description]
   * @param {[type]} Users         [description]
   * @param {[type]} AlertService  [description]
   * @param {[type]} $stateParams  [description]
   * @param {[type]} $localStorage [description]
   * @param {[type]} Countries     [description]
   */
  function SignupBillingPlansController($scope, Users, AlertService, $stateParams, $localStorage, Countries, $uibModal) {
    'ngInject';
    var billing_plan_handler = $stateParams.billing_plan_handler;
    var $ctrl = this;

    this.isRegistryFinish = false;

    this.countries = Countries.query();

    this.model = {
      'billing_plan': billing_plan_handler,
      'country': 'US',
      // TODO: delete data after finish tests
      // 'email': 'nikolay.gerzhan@gmail.com',
      // 'email': 'demo@demo.com',
      // 'last_name': 'DEMO ',
      // 'first_name': 'Simple Registry',
      // 'address1': 'Мужества 22-18',
      // 'city': 'Красноярск',
      // 'zipcode': '660043',
      // 'password': '12345678',
      // 'passwordConfirm': '12345678',
      // 'phone_number': '89832877503',
      // 'company_name': 'Demo',
      // 'state': 'Krasnoyrskiy kray',
      // 'city': 'Krasnoyrsk'
    };
    /**
     * @name  onSignUp
     * @description]
     *
     * Call API for registration new User
     *
     * @param  {Object} model
     * @return
     */
    this.onSignUp = function onSignUp(model) {
      this._loading = true;
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        AlertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.userData = _.clone(model);
      AlertService.clear();

      Users.signup(model)
        .$promise
        .then(function(data) {
          $ctrl.user = model;
          $ctrl.isRegistryFinish = true;
        })
        .catch(function(err) {
          AlertService.danger(err, 5000);
        });
    };
    /**
     * @name  onShortSignUp
     * @description]
     *
     * Call API for registration new User
     *
     * @param  {Object} model
     * @return
     */
    this.onSignUpShort = function onSignUpShort(model) {
      this._loading = true;

      if (!model) {
        return;
      }
      // if (model.passwordConfirm !== model.password) {
      //   AlertService.danger('Passwords did not match', 5000);
      //   return;
      // }
      $scope.userData = _.clone(model);
      AlertService.clear();

      Users.signupShort(model)
        .$promise
        .then(function(data) {
          $ctrl.user = model;
          $ctrl.isRegistryFinish = true;
        })
        .catch(function(err) {
          AlertService.danger(err, 5000);
        });
    };
    /**
     * @name  onRepeatSendRegistrationEmail
     * @description
     *
     * @param  {String} email
     * @param  {String} password
     * @return
     */
    this.onRepeatSendRegistrationEmail = function(email, password) {

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
        //AlertService.success(data.message, 6000);
      });
    };

    this._loading = false;
  }
})();
