(function() {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('CompaniesCrudController', CompaniesCrudController);

  /*@ngInject*/
  function CompaniesCrudController($scope, CRUDController, Companies, User, BillingPlans, $injector, $stateParams, $config, $state, $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    // Set resource to work with data
    $scope.setResource(Companies);
    //Set state (ui.router)
    $scope.setState('index.accountSettings.companies');

    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
          .then(function() {
            if ($scope.elementIndexForAnchorScroll !== undefined) {
              setTimeout(function() {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
            return BillingPlans.query().$promise;

          })
          .then(function(res) {
            $scope.records = $scope.records.map(function(r) {
              var idx = _.findIndex(res, {
                id: r.billing_plan
              });
              if (idx >= 0) {
                r.subscription_name = res[idx].name;
                return r;
              }
              r.subscription_name = 'Manual';
              return r;
            });
          });
      }
    });

    $scope.filterKeys = ['companyName', 'comment', 'createdBy', 'updated_at', 'created_at'];

    $scope.getCompany = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger('Could not load company details');
        });
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.deleteCompany = function(model) {
      $scope
        .confirm('confirmModal.html', model)
        .then(function() {
          return $scope
            .delete(model);
        })
        .catch($scope.alertService.danger);
    };

    $scope.createCompany = function(model) {
      if (!model) {
        return;
      }
      $scope
        .create(model)
        .then(function() {
          $scope.alertService.success('Company created', 5000);
          $scope.auth.reloadUser();
        })
        .catch($scope.alertService.danger);
    };

    $scope.updateCompany = function(model) {
      $scope.update(model)
        .then(function() {
          $scope.alertService.success('Company updated', 5000);
        })
        .catch($scope.alertService.danger);
    };

    $scope.onGoToUsageReport = function(model) {
      // NOTE: make data format for using into state 'index.billing.usage'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.usage');
    };

    $scope.onGoToBillingPlans = function(model) {
      // NOTE: make data format for using into state 'index.billing.plans'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.plans');
    };

    $scope.onGoToBillingStatement = function(model) {
      // NOTE: make data format for using into state 'index.billing.statements'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.statements');
    };
  }
})();
