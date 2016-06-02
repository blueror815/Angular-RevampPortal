(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDomainsList', validateDomainsList);
  /**
   * @name  validateDomainsList
   * @description
   *
   * @return {Boolean}
   */
  function validateDomainsList() {
    'ngInject';

    function link(scope, element, attrs, ngModel) {
      var DOMAIN = /(?=^.{4,253}$)(^((?!-)(?!\_)[a-zA-Z0-9-\_]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/;
      ngModel.$validators.domainsList = function(value) {
        ngModel.$setValidity('domains-list', true);

        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if (DOMAIN.test(item) === false) {
              ngModel.$setValidity('domains-list', false);
            }
          });
        }
        // NOTE: only set valune for attribute "$valid"
        return true;
      };
    }

    return {
      require: 'ngModel',
      link: link
    };
  }
})(angular);
