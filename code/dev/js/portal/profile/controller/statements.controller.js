(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('StatementsController', StatementsController);

  /*@ngInject*/
  function StatementsController($scope, $state, FileSaver, User, Companies, DTOptionsBuilder, DTColumnDefBuilder, AlertService, $stateParams) {
    $scope.params = $stateParams;
    $scope.user = User.getUser();
    $scope._error = false;
    $scope.account = User.getSelectedAccount();
    var pageLength = 10;

    $scope.statementsDtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>');

    $scope.onAccountSelect = function(acc) {
      User.selectAccount(acc);
      $scope.account = acc;
      $state.reload();
    };

    $scope.initStatements = function() {
      $scope._loading = true;

      User.getUserAccounts()
        .then(function(accs) {
          $scope.accounts = accs.length > 1 ? accs.slice(1) : accs;

          if (!$scope.account || !$scope.account.acc_id) {
            $scope.account = $scope.accounts[0];
          }

          return Companies.statements({
            id: $scope.account.acc_id
          }).$promise;
        })
        .then(function(statements) {
          $scope.statements = statements;
          return Companies.transactions({
            id: $scope.account.acc_id
          }).$promise;
        })
        .then(function(transactions) {
          $scope.transactions = transactions.map(function(t) {
            t.transaction_type = _.capitalize(t.transaction_type);
            t.success = JSON.parse(t.success);
            return t;
          });
        })
       .then(function() {
          return Companies.subscriptionSummary({
            id: $scope.account.acc_id
          }).$promise.then(function(subscription) {
            $scope.summary = subscription;
            return  subscription;
          });
        })
        .catch(function(err) {
          $scope._loading = false;
          $scope._error = err.data;
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function() {
          $scope.transactionsDtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(pageLength)
            .withBootstrap()
            .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
            .withOption('paging', ($scope.transactions.length > pageLength));
          $scope.statementsDtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(pageLength)
            .withBootstrap()
            .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
            .withOption('paging', ($scope.statements.length > pageLength));
          $scope._loading = false;
        });

    };

    $scope.initStatement = function() {
      $scope._loading = true;
      User.getUserAccounts()
        .then(function(accs) {
          $scope.accounts = accs.length > 1 ? accs.slice(1) : accs;

          if (!$scope.account || !$scope.account.acc_id) {
            $scope.account = $scope.accounts[0];
          }
          return Companies.statement({
            id: $scope.account.acc_id,
            statement: $stateParams.id
          }).$promise;
        })
        .then(function(statement) {
          $scope.statement = statement;
        })
        .catch(function(err) {
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function() {
          $scope._loading = false;
        });

    };

    $scope.savePdfStatement = function(id) {
      Companies.getPdfStatement({
          id: $scope.account.acc_id,
          statement: $stateParams.id
        })
        .$promise
        .then(function(res) {
          FileSaver.saveAs(res.response, id + '.pdf');
        })
        .catch(function(err) {
          AlertService.danger('Oops! Something went wrong');
        });
    };

  }
})();
