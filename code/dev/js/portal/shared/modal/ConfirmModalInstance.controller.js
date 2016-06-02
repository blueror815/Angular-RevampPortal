(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .controller('ConfirmModalInstanceCtrl', ConfirmModalInstanceCtrl);

  /*@ngInject*/
  function ConfirmModalInstanceCtrl($scope, $uibModalInstance, model) {

    $scope.model = model;

    $scope.ok = function () {
      $uibModalInstance.close(true);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
