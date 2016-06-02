(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('listFilter', listFilterDirective);

  /*@ngInject*/
  function listFilterDirective() {
    return {
      restrict: 'AE',
      template: '<form class="form-inline">' +
      '<div class="form-group">' +
      '<label for="search">Search:&nbsp;</label>' +
      '<input type="text" class="form-control" id="search" placeholder="" ng-model="filter.filter" ng-change="checkFilterPage()">' +
      '&nbsp;&nbsp;<i class="glyphicon glyphicon-remove" ng-show="filter.filter != \'\'" ng-click="filter.filter = \'\'"></i>' +
      '</div>' +
      '</form>'
    };
  }
})();
