( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileRpsChart', mobileRpsChartDirective );

  /*@ngInject*/
  function mobileRpsChartDirective() {

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
        flNetworks: '=',
        flDisabled: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        $scope.heading = 'Requests Per Second Graph';
        $scope.span = '1';
        $scope._loading = false;

        $scope.hits = {
          labels: [],
          series: []
        };

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        };

        //  ---------------------------------
        var info_ = null,
          rps_avg_ = 0,
          rps_max_ = 0,
          hits_total_ = 0,
          tickInterval_ = 4;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this/*chart*/.renderer
                  .label( 'RPS Avg <span style="font-weight: bold; color: #3c65ac;">' + ( Math.round( rps_avg_ * 1000 ) / 1000 ) +
                      '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + ( Math.round( rps_max_ * 1000 ) / 1000 ) +
                      '</span><br>Hits Total <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber( hits_total_ ) +
                      '</span>',
                      this.xAxis[0].toPixels( 0 ), 0, '', 0, 0, true/*html*/ )
                  .css({ color: '#444' })
                  .attr({
                    fill: 'rgba(240, 240, 240, 0.6)',
                    stroke: '#3c65ac',
                    'stroke-width': 1,
                    padding: 6,
                    r: 2,
                    zIndex: 5
                  })
                  .add();
              }
            }
          },
          yAxis: {
            title: {
              text: 'Requests Per Second'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value );
              }
            }
          },
          xAxis: {
            crosshair: {
              width: 1,
              color: '#000000'
            },
            tickInterval: tickInterval_,
            labels: {
              autoRotation: false,
              useHTML: true,
              formatter: function() {
                return this.value.label;
              }
            }
          },
          tooltip: {
            formatter: function() {
              return this.key.tooltip + '<br/>' +
                this.series.name + ': <strong>' + Util.formatNumber( this.y, 3 ) + '</strong>';
            }
          }
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.hits = {
            labels: [],
            series: [{
              name: 'RPS',
              data: []
            }]
          };

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_flow( $scope.filters )
            .$promise
            .then( function( data ) {

              var hits_series = [ {
                name: 'RPS',
                data: []
              } ];

              rps_avg_ = rps_max_ = hits_total_ = 0;
              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;

                data.data.forEach( function( item, idx, items ) {

                  var val = moment( item.time + offset );
                  var label;
                  if ( idx % tickInterval_ ) {
                    label = '';
                  } else if ( idx === 0 ||
                    ( new Date( item.time + offset ) ).getDate() !== ( new Date( items[idx - tickInterval_].time + offset ) ).getDate() ) {
                    label = val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span><br>]MMM D' );
                  } else {
                    label = val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span>]' );
                  }

                  labels.push({
                    tooltip: val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMMM Do YYYY' ),
                    label: label
                  });

                  var rps = item.hits / interval;
                  rps_avg_ += rps;
                  if ( rps > rps_max_ ) {
                    rps_max_ = rps;
                  }
                  hits_series[ 0 ].data.push( Math.round( 1000 * rps ) / 1000 );
                  hits_total_ += item.hits;
                });
                rps_avg_ /= data.data.length;
                if ( hits_total_ ) {
                  $scope.hits = {
                    labels: labels,
                    series: hits_series
                  };
                }
              }
            })
            .finally( function() {
              $scope._loading = false;
            } );
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

