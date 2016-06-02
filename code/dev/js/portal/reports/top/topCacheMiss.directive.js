(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('topCacheMiss', topCacheMissDirective);

  /*@ngInject*/
  function topCacheMissDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/top/top-cache-miss.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats) {
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'hours').valueOf(),
          to_timestamp: Date.now(),
          cache_code: 'MISS'
        };

        $scope.items = [];

        $scope.data = {
          labels: [],
          data: [[]]
        };

        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;

          $scope.data = {
            labels: [],
            data: [[]]
          };

          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters);

          Stats
            .topObjects(params)
            .$promise
            .then(function (res) {
              $scope.items = res.data;
              res.data.map(function (val) {
                $scope.data.labels.push(val.path);
                $scope.data.data[0].push(val.count);
              });
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          $scope.loadDetails();
        });
      }
    };
  }
})();
