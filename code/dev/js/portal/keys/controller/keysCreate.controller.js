(function () {
  'use strict';

  angular
    .module('revapm.Portal.Keys')
    .controller('KeysCreateController', KeysCreateController);

  // @ngInject
  function KeysCreateController($scope, $uibModalInstance, companies) {

    /**
     * List of companies provided from other controller
     */
    $scope.companies = companies;

    /**
     * Selected account id
     *
     * @type {null|string}
     */
    $scope.selected = null;

    /**
     * On selected account
     *
     * @param {Object} model
     */
    $scope.onModelSelect = function(model) {
      $scope.selected = model;
    };

    /**
     * Click on ok button
     */
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected);
    };

    /**
     * Close dialog
     */
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
})();
