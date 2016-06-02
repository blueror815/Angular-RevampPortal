(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TopObjectsController', TopObjectsController);

  /*@ngInject*/
  function TopObjectsController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.countries = Countries.query();
    $scope.os = [];
    $scope.devices = [];

    $scope.reload = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      //Clear data
      $scope.os = [];
      $scope.devices = [];

      var promises = [
        Stats.os({domainId: $scope.domain.id}).$promise,
        Stats.device({domainId: $scope.domain.id}).$promise
      ];
      $q
        .all(promises)
        .then(function (data) {
          if (!data || !data[0] || !data[1] || !data[0].data || !data[1].data) {
            return;
          }
          data[0].data.map(function (os) {
            $scope.os.push(os.key);
          });
          data[1].data.map(function (device) {
            $scope.devices.push(device.key);
          });
        });
    };

    // Load user domains
    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domains = domains;
      })
      .catch(function () {
        AlertService.danger('Oops something wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.onDomainSelected = function () {
      $scope.reload();
    };
  }
})();
