(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('FBTReportsController', FBTReportsController);

  /*@ngInject*/
  function FBTReportsController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.countries = Countries.query();
    $scope.oses = [];
    $scope.devices = [];

    $scope.reload = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.oses = [];
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
          var oses = [],
            devices = [];
          data[0].data.map(function (os) {
            oses.push(os.key);
          });
          data[1].data.map(function (device) {
            devices.push(device.key);
          });

          $scope.oses = oses;
          $scope.devices = devices;
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
