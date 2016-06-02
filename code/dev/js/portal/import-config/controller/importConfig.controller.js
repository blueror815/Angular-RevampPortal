(function () {
  'use strict';

  angular
    .module('revapm.Portal.ImportConfig')
    .controller('ImportConfigController', ImportConfigController);

  /*@ngInject*/
  function ImportConfigController($scope, CRUDController, $injector) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope
    });

    $scope._loading = false;
    $scope.config = { type: 'acc'};

    $scope.import = function(){
      $scope.confirm('confirmImportConfig.html', $scope.domain || {}).then(function() {
        $scope.alertService.success('The provided configuration has been scheduled for processing.', 5000);
        $scope.config = {type: 'acc'};
      });
    };
  }
})();
