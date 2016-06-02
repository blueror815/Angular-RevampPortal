( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileAbSpeedChart', mobileAbSpeedChartDirective );

  /*@ngInject*/
  function mobileAbSpeedChartDirective() {

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
        flNetworks: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        $scope.heading = 'Average Request Speed Graph';
        $scope.span = '1';
        $scope._loading = false;

        //  ---------------------------------
        var lbl_ = null,
          rev_avg_ = 0,
          origin_avg_ = 0,
          imp_avg_ = 0,
          tickInterval_ = 4;

        $scope.chartOptions = {
          chart: {
            type: 'column',
            events: {
              redraw: function() {
                if ( lbl_ ) {
                  lbl_.destroy();
                  lbl_ = null;
                }
                lbl_ = this/*chart*/.renderer
                .label( 'Origin Avg <span style="font-weight: bold; color: #3c65ac;">' + origin_avg_ +
                    '</span><br>RevAPM Avg <span style="font-weight: bold; color: black;">' + rev_avg_ +
                    '</span><br>Improvement <span style="font-weight: bold; color: darkred;">' + imp_avg_ +
                    '</span> %',
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
              text: 'Speed'
            },
            labels: {
              formatter: function() {
                return Util.convertTraffic( this.value );
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
                this.series.name + ': <strong>' + Util.convertTraffic( this.y ) + '</strong>';
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
          network: null
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.hits.labels = [];
          $scope.hits.series[0].data = [];
          $scope.hits.series[1].data = [];

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_ab_speed( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var hits = {
                  rev_edge: [],
                  origin: [],
                };
                var interval = data.metadata.interval_sec || 1800;

                var offset = interval * 1000;
                var labels_filled = false;
                // console.log( data );
                data.data.forEach( function( dest ) {
                  dest.items.forEach( function( item, idx, items ) {
                    if ( !labels_filled ) {
                      var val = moment( item.key + offset );
                      var label;
                      if ( idx % tickInterval_ ) {
                        label = '';
                      } else if ( idx === 0 ||
                        ( new Date( item.key + offset ) ).getDate() !== ( new Date( items[idx - tickInterval_].key + offset ) ).getDate() ) {
                        label = val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span><br>]MMM D' );
                      } else {
                        label = val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span>]' );
                      }

                      labels.push({
                        tooltip: val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMMM Do YYYY' ),
                        label: label
                      });

                    }
                    hits[dest.key].push( ( item.count ? ( item.sent_bytes * 1000 / item.time_spent_ms ) : null ) );
                  });
                  labels_filled = true;
                } );
                $scope.hits.labels = labels;
                $scope.hits.series[0].data = hits.origin;
                $scope.hits.series[1].data = hits.rev_edge;

                //  origin avg
                var avg_t = hits.origin.filter( function( item ) {
                  return item != null;
                });
                origin_avg_ = avg_t.reduce( function( prev, curr ) {
                  return prev + curr;
                });
                origin_avg_ /= avg_t.length;

                //  rev_edge avg
                avg_t = hits.rev_edge.filter( function( item ) {
                  return item != null;
                });
                rev_avg_ = avg_t.reduce( function( prev, curr ) {
                  return prev + curr;
                });
                rev_avg_ /= avg_t.length;

                //  rounds
                imp_avg_ = Math.round( ( rev_avg_ - origin_avg_ ) / origin_avg_ * 1000 ) / 10;

                rev_avg_ = Util.convertTraffic( Math.round( rev_avg_ * 100 ) / 100 );
                origin_avg_ = Util.convertTraffic( Math.round( origin_avg_ * 100 ) / 100 );
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

