(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('CompanyProfileEditController', CompanyProfileEditController);

  /*@ngInject*/
  function CompanyProfileEditController($scope,
    $q,
    $timeout,
    User,
    BillingPlans,
    Apps,
    Companies,
    Countries,
    CRUDController,
    $injector,
    $state,
    $stateParams,
    AlertService) {
    $scope.countries = Countries.query();
    $scope.billing_plans = [{
      id: null,
      name: 'Manual'
    }];
    BillingPlans.query().$promise
      .then(function(bp) {
        angular.forEach(bp, function(item) {
          $scope.billing_plans.push(item);
        });
      });
    $scope.zipRegex = '[0-9]{1,10}';
    $scope.phoneRegex = '[0-9, \\s, \\+, \\-, \\(, \\)]{1,20}';
    $scope.user = User.getUser();
    $scope.user.isAdmin = User.isAdmin();
    // console.log($scope.user.access_control_list.readOnly)
    $scope._disabled = ($scope.user.access_control_list.readOnly) ? $scope.user.access_control_list.readOnly : false;
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.setResource(Companies);
    $scope.getCompany = function(id) {
      $scope.get(id)
        .then(function() {
          if (!$scope.model.subscription_id) {
            $scope.billing_plans.selected = $scope.billing_plans[0];
          } else {
            $scope.billing_plans.shift();
          }
        })
        .catch(function(err) {
          $scope.alertService.danger('Could not load company details');
        });
    };

    $scope.initEditCompany = function() {
      if ($stateParams.id) {
        $scope.getCompany($stateParams.id);
      } else {
        $scope.getCompany($scope.user.companyId);
      }
    };

    $scope.updateCompany = function(company) {
      // TODO: add check
      $scope.confirm('confirmUpdateModal.html', company)
        .then(function() {
          $scope._loading = true;
          $scope.update({
              id: company.id
            }, company)
            .then(function() {
              AlertService.success('Successfully updated company profile');
            })
            .catch(function(err) {
              AlertService.danger('Oops! Something went wrong');
            })
            .finally(function() {
              $scope._loading = false;
            });
        });
    };
    /**
     * @name createBillingProfile
     * @description
     *
     * Send command to create new customer in Chargify
     *
     * @param  {Object} company [description]
     * @return
     */
    $scope.createBillingProfile = function(company) {

      $scope.confirm('confirmCreateBillingProfileModal.html', company)
        .then(function() {
          $scope._loading = true;
          // NOTE: Update information about Company(Account)
          $scope.update({
              id: company.id
            }, company)
            .then(function(data) {
              return Companies.createBillingProfile({
                id: company.id
              }, company).$promise;
            })
            .then(function(account) {
              $scope.model.billing_id = account.billing_id;
              AlertService.success('Successfully created billing profile');
            })
            .catch(function(err) {
              AlertService.danger('Oops! Something went wrong');
            })
            .finally(function() {
              $scope._loading = false;
            });
        });
    };
    /**
     * @name  deleteCompanyProfile
     * @description
     *
     *  Delete Account
     *
     * @param  {[type]} company [description]
     * @return {[type]}         [description]
     */
    $scope.deleteCompanyProfile = function(company) {
      $scope._loading = true;
      $q.all([User.getUserDomains(true), Apps.query().$promise, BillingPlans.get({
          id: company.billing_plan
        }).$promise]).then(
          function(results) {
            var _model = {
              company: company,
              domains: results[0],
              apps: results[1],
              bp: results[2],
              isCanBeDeleted: (results[0].length === 0 && results[1].length === 0) ? true : false
            };
            $scope.confirm('confirmDeleteModal.html', _model)
              .then(function(data) {
                $scope._loading = true;
                User.deleteAccountProfile(company.id, {
                    cancellation_message: _model.cancellation_message
                  })
                  .then(function() {
                    AlertService.success('Successfully deleted account profile');
                    $timeout(function() {
                      $state.go('index');
                    }, 10);
                  })
                  .catch(function(err) {
                    AlertService.danger('Oops! Something went wrong');
                  })
                  .finally(function() {
                    $scope._loading = false;
                  });
              });
          }
        )
        .catch(function(err) {
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function() {
          $scope._loading = false;
        });
    };
    /**
     * @name  isCanDeleteCompanyProfile
     * @description
     *
     * Check rules for Delete Company Profile
     *    - Account is self-registered AND
     *    - Account has a valid billing plan AND
     *    - (Account is in trial mode  OR
     *    - Account is not at trial mode and has a valid payment method)
     * @return {Boolean}
     */
    $scope.isCanDeleteCompanyProfile = function() {
      var model = $scope.model;
      return (model.self_registered === true && model.billing_plan.length > 0 &&
        (model.subscription_state === 'trialing' ||
          (model.subscription_state !== 'trialing' && model.valid_payment_method_configured === true)));
    };

  }
})();
