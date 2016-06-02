( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileAbFbtDistributionChart', mobileAbFbtDistributionChartDirective );

  /*@ngInject*/
  function mobileAbFbtDistributionChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-base-traffic.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flDisabled: '=',
        flNetworks: '=',
        flInterval: '@',
        flLimit: '@'
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        var _interval = parseInt( ( $scope.flInterval || 100 ) );
        var _limit = parseInt( ( $scope.flLimit || 5000 ) );

        $scope.heading = 'First Byte Time Values Distribution Graph';
        $scope.span = '1';
        $scope._loading = false;

        //  ---------------------------------
        $scope.chartOptions = {
          chart: {
            type: 'column'
          },
          yAxis: {
            title: {
              text: 'Hits'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value, 0 );
              }
            }
          },
          xAxis: {
            title: {
              text: 'FBT ms',
              align: 'low'
            }
          },
          legend: {
            margin: 0
          },
          tooltip: {
            formatter: function() {
              return '<strong>'+ this.x + '÷' + ( this.x + _interval ) + '</strong> ms<br/>' +
                this.series.name + ': <strong>' + Util.formatNumber( this.y, 0 ) + '</strong> hits';
            }
          }
        };

        $scope.hits = {
          labels: [],
          series: [{
            name: 'Origin',
            data: [],
            color: Highcharts.getOptions().colors[0],
            marker: { radius: 4, symbol: 'circle' }
          }, {
            name: 'RevAPM',
            data: [],
            color: Highcharts.getOptions().colors[1],
            marker: { radius: 4, symbol: 'diamond' }
          }]
        };

        //  ---------------------------------
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null,
          interval_ms: _interval,
          limit_ms: _limit
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.hits.labels = [];
          $scope.hits.series[0].data = [];
          $scope.hits.series[1].data = [];

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_ab_fbt_distribution( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var hits = {
                  rev_edge: [],
                  origin: [],
                };
                var labels_filled = false;
                // console.log( data );
                angular.forEach( data.data, function( dest ) {
                  angular.forEach( dest.items, function( item ) {
                    if ( !labels_filled ) {
                      labels.push( item.key );
                    }
                    hits[dest.key].push( item.count );
                  });
                  labels_filled = true;
                });
                $scope.hits.labels = labels;
                $scope.hits.series[0].data = hits.origin;
                $scope.hits.series[1].data = hits.rev_edge;
              }
            })
            .finally( function() {
              $scope._loading = false;
            });
        };

        //  ---------------------------------
        $scope.$watch( 'ngApp', function() {
          if ( $scope.ngAccount || $scope.ngApp ) {
            $scope.reload();
          }
        });
      }
    };
  }
} )();

