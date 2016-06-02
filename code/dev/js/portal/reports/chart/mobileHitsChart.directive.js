( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Reports' )
    .directive( 'mobileHitsChart', mobileHitsChartDirective );

  /*@ngInject*/
  function mobileHitsChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-hits.html',
      scope: {
        ngAccount: '=',
        ngApp: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        $scope.span = '1';
        $scope._loading = false;

        $scope.chartOptions = {
          yAxis: {
            title: {
              text: 'Hits Num'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value );
              }
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.formatNumber( this.y ) + '</strong>';
            }
          }
        };

        $scope.reloadTrafficStats = function() {

          $scope._loading = true;
          Stats.sdk_hits({
              accountId: $scope.ngAccount,
              app_id: $scope.ngApp,
              from_timestamp: moment().subtract( $scope.span, 'days' ).valueOf(),
              to_timestamp: Date.now()
            })
            .$promise
            .then( function( data ) {
              var series = [ {
                name: 'Hits',
                data: []
              } ];
              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var offset = ( data.metadata.interval_sec || 1800 ) * 1000;
                // console.log( data );
                angular.forEach( data.data, function( data ) {
                  labels.push( moment( data.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                  series[ 0 ].data.push( data.hits );
                } );
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
            } )
            .finally( function() {
              $scope._loading = false;
            } );
        };

        $scope.$watch( 'ngApp', function() {
          $scope.reloadTrafficStats();
        } );
      }
    };
  }
} )();

