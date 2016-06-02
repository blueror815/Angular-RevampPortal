(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .directive('selectAccountDomain', selectAccountDomain);

  /*@ngInject*/
  function selectAccountDomain(User, $rootScope, $config) {
    return {
      restrict: 'AE',
      templateUrl: 'parts/auth/menu/select-account-domain.html',
      /*@ngInject*/
      controller: function ($scope) {

        $scope.domain = User.getSelectedDomain();

        $scope._loading = true;

        $scope.onDomainChange = function () {
          User.selectDomain($scope.domain);
          $rootScope.$broadcast($config.EVENTS.DOMAIN_CHANGED, {domain: $scope.domain});
        };

        User
          .getUserDomains()
          .then(function (domains) {
            $scope.domains = domains;
            $scope._loading = false;
          });
      }
    };
  }
})();
