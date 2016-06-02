(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('fbtDistributionChart', fbtDistributionChartDirective);

  /*@ngInject*/
  function fbtDistributionChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/fbt-distribution.html',
      scope: {
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        ngDomain: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats, Util) {

        $scope.delay = '24';
        $scope.os = '';
        $scope.country = '';
        $scope.device = '';
        $scope._ims = 300;
        $scope._loading = false;
        $scope.chartOptions = {
          chart: {
            type: 'column'
          },
          yAxis: {
            title: {
              text: 'Requests'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value );
              }
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>'+ this.x + '÷' + ( this.x + $scope._ims ) +
                '</strong> ms<br/>' + 'Count: <strong>' + Util.formatNumber( this.y ) + '</strong>';
            }
          },
          plotOptions: {
            column: {
              minPointLength: 2,
              dataLabels: {
                enabled: false,
                // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                // style: {
                //   textShadow: '0 0 3px black'
                // }
              }
            }
          },
        };

        $scope.reloadTrafficStats = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }

          var opts = {
              domainId: $scope.ngDomain.id,
              from_timestamp: moment().subtract( $scope.delay, 'hours').valueOf(),
              to_timestamp: Date.now(),
              interval_ms: 50,
              limit_ms: 10000
            };
          if ( $scope.country !== '' ) {
            opts.country = $scope.country;
          }
          if ( $scope.device !== '' ) {
            opts.device = $scope.device;
          }
          if ( $scope.os !== '' ) {
            opts.os = $scope.os;
          }

          $scope._loading = true;
          Stats.fbt_distribution( opts )
            .$promise
            .then(function (data) {
              var series = [{
                name: 'FBT Distribution',
                data: []
              }];
              if (data.data && data.data.length > 0) {
                var labels = [];
                $scope._ims = data.metadata.interval_ms || 300;
                angular.forEach(data.data, function (data) {
                  labels.push( data.key / 1000 );
                  series[0].data.push( data.requests );
                });
                $scope.traffic = {
                  labels: labels,
                  series: series
                };
              } else {
                $scope.traffic = {
                  labels: [],
                  series: series
                };
              }
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reloadTrafficStats();
        });
      }
    };
  }
})();
