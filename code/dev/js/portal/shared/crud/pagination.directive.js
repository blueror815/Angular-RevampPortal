(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('crudPagination', crudPaginationDirective);

  /*@ngInject*/
  function crudPaginationDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/shared/crud/pagination.html' 
    };
  }
})();
