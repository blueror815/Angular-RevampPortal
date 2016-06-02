( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileHttpCodesChart', mobileHttpCodesChartDirective );

  /*@ngInject*/
  function mobileHttpCodesChartDirective() {

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

        $scope.heading = 'HTTP Status Codes Graph';
        $scope.span = '1';
        $scope._loading = false;
        $scope.hits = {
          labels: [],
          series: []
        };

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          report_type: 'status_code',
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        };

        //  ---------------------------------
        var tickInterval_ = 4;
        $scope.chartOptions = {
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
            series: []
          };
          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );

          return Stats.sdk_agg_flow( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var hits_series = [];
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled_up = false;

                angular.forEach( data.data, function( code ) {
                  var s = { name: (''+code.key), data: [], visible: false };
                  for ( var i = 0, len = code.flow.length; i < len; ++i ) {
                    var item = code.flow[i];
                    if ( !labels_filled_up ) {
                      var val = moment( item.time + offset );
                      var label;
                      if ( i % tickInterval_ ) {
                        label = '';
                      } else if ( i === 0 ||
                        ( new Date( item.time + offset ) ).getDate() !== ( new Date( code.flow[i - tickInterval_].time + offset ) ).getDate() ) {
                        label = val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span><br>]MMM D' );
                      } else {
                        label = val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span>]' );
                      }

                      labels.push({
                        tooltip: val.format( '[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMMM Do YYYY' ),
                        label: label
                      });
                    }
                    var rps = Math.round( item.hits * 1000 / interval ) / 1000;
                    s.data.push( rps );
                    if ( rps > 0.01 ) {
                      s.visible = true;
                    }
                  }
                  hits_series.push( s );
                  labels_filled_up = true;
                });

                hits_series[0].visible = true;
                $scope.hits = {
                  labels: labels,
                  series: hits_series
                };
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

