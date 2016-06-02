( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileAbErrorsChart', mobileAbErrorsChartDirective );

  /*@ngInject*/
  function mobileAbErrorsChartDirective() {

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

        $scope.heading = 'SDK Failed Requests Graph';
        $scope.span = '1';
        $scope._loading = false;
        var tickInterval_ = 4;

        //  ---------------------------------
        $scope.chartOptions = {
          yAxis: {
            title: {
              text: 'Errors Count'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value, 0 );
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
                this.series.name + ': <strong>' + Util.formatNumber( this.y, 0 ) + '</strong>';
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
          return Stats.sdk_ab_errors( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var hits = {
                  rev_edge: [],
                  origin: []
                };
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled = false;

                data.data.forEach( function( dest ) {
                  dest.items.forEach( function( item, idx, items ) {
                    if ( !labels_filled ) {
                      // labels.push( moment( item.key + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
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
                    hits[dest.key].push( item.count );
                  });
                  labels_filled = true;
                });

                $scope.hits.labels = labels;
                $scope.hits.series[0].data = hits.origin;
                $scope.hits.series[1].data = hits.rev_edge;
                if ( hits.origin.length === 0 ) {
                  $scope.hits.series[0].visible = false;
                }
                if ( hits.rev_edge.length === 0 ) {
                  $scope.hits.series[1].visible = false;
                }
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

