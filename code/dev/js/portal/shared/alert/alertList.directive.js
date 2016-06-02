(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('alertList', alertListDirective);

  /*@ngInject*/
  function alertListDirective(AlertService) {
    return {
      transclude: true,
      template: '<alert type="{{i.type}}" ng-repeat="i in as.alerts">{{i.message}}</alert>',
      controller: function($scope) {
        $scope.as = AlertService;
      }
    };
  }

})();
