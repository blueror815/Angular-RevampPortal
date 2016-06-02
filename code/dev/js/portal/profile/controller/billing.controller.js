(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('BillingController', BillingController)
    .filter('AbsUnit', function() {
      return function(amount) {
        return Math.abs(amount);
      };
    })
    .filter('MonetaryUnit', function() {
      return function(amount) {
        return (amount / 100).toFixed(2);
      };
    });

  /*@ngInject*/
  function BillingController($scope, $state, User, Companies, BillingPlans, CRUDController, $injector, $stateParams, AlertService) {

    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.accounts = [];
    $scope.account = User.getSelectedAccount();

    $scope.onAccountSelect = function(acc) {
      $scope._loading = true;
      User.selectAccount(acc);
      $scope.account = acc;

      $scope.account = User.getSelectedAccount();
      $state.reload();
    };

    $scope.initBillingInfo = function() {
      User.getUserAccounts()
        .then(function(accs) {
          $scope._loading = true;

          $scope.accounts = accs.length > 1 ? accs.slice(1) : accs;

          if (!$scope.account || !$scope.account.acc_id) {
            $scope.account = $scope.accounts[0];
          }
          $scope.user = User.getUser();
          $scope.setResource(BillingPlans);
          return $scope.list();
        })
        .catch(function(err) {
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function() {
          $scope._loading = false;
        });

    };

    $scope.isSelectedPlan = function(id) {
      return ($scope.account.plan_id === id);
    };
    /**
     * @name  chooseBillingPlan
     * @description
     *
     *
     * @param  {[type]} plan    [description]
     * @param  {[type]} account [description]
     * @return {[type]}         [description]
     */
    $scope.chooseBillingPlan = function(plan, account) {
      function CompaniesUpdate() {
        $scope._loading = true;
        Companies
          .update({
            id: account.acc_id,
            billing_plan: plan.id,
            companyName: account.acc_name
          })
          .$promise
          .then(function() {
            User.getUserAccounts(true)
              .then(function(accs) {

                AlertService.success('Successfully changed the billing plan', 5000);
                accs.forEach(function(acc) {
                  if (acc.acc_id === account.acc_id) {
                    User.selectAccount(acc);
                    $scope.account = User.getSelectedAccount();
                  }
                });
              });
          })
          .catch(function(err) {
            var message = 'Oops! Something went wrong';
            if (err.data && err.data.message) {
              message = err.data.message;
            }
            AlertService.danger(message);
          })
          .finally(function() {
            $scope._loading = false;
          });
      }
      Companies.subscriptionPreview({
          id: account.acc_id,
          billing_handle: plan.chargify_handle
        }).$promise
        .then(function onSuccessGetPreviewSubscriptionInfo(data) {
          // NOTE: show details confirm modal window
          $scope.confirm('confirmModalUpgrade.html', {
              plan: plan,
              migration: data.migration,
              credit_card: data.credit_card
            })
            .then(CompaniesUpdate);
        }, function onErrorGetPreviewSubscriptionInfo() {
          // NOTE: show simple confirm modal window
          $scope.confirm('confirmModal.html', plan)
            .then(CompaniesUpdate);
        })
        .catch(function(err) {
          var message = 'Oops! Something went wrong';
          if (err.data && err.data.message) {
            message = err.data.message;
          }
          AlertService.danger(message);
          $scope._loading = false;
        });
    };
  }
})();
