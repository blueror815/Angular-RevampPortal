(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('httpHttpsChart', httpHttpsChartDirective);

  /*@ngInject*/
  function httpHttpsChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/http-https.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os'];
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

        function generateFilterParams(filters) {
          var params = {
            from_timestamp: moment().subtract(1, 'days').valueOf(),
            to_timestamp: Date.now()
          };
          _.forEach(filters, function(val, key) {
            if (_.indexOf(_filters_field_list, key) !== -1) {
              if (val !== '-' && val !== '') {
                params[key] = val;
              }
            } else {
              if (key === 'count_last_day') {
                params.from_timestamp = moment().subtract(val, 'days').valueOf();
                params.to_timestamp = Date.now();
                delete params.count_last_day;
              }
            }
          });
          return params;
        }

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        $scope.traffic = {
          labels: [],
          series: [{
            name: 'HTTP',
            data: []
          }, {
            name: 'HTTPS',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          https_ = 0,
          http_ = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                var rel_http = 0,
                  rel_https = 0;
                if ( ( https_ + http_ ) !== 0 ) {
                  rel_http = Math.round( http_ * 1000 / ( https_ + http_ ) ) / 10;
                  rel_https = Math.round( https_ * 1000 / ( https_ + http_ ) ) / 10;
                }
                info_ = this/*chart*/.renderer
                  .label( 'HTTPS <span style="font-weight: bold; color: #3c65ac;">' +  Util.formatNumber( https_ ) +
                      '</span> Requests, <span style="font-weight: bold; color: #3c65ac;">' + rel_https +
                      '</span>%<br> HTTP <span style="font-weight: bold; color: black;">' + Util.formatNumber( http_ ) +
                      '</span> Requests, <span style="font-weight: bold; color: black;">' + rel_http +
                      '</span>%',
                      this.xAxis[0].toPixels( 0 ), 3, '', 0, 0, true/*html*/ )
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
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          $scope.traffic = {
            labels: [],
            series: [{
              name: 'HTTP',
              data: []
            }, {
              name: 'HTTPS',
              data: []
            }]
          };
          $q.all([

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                protocol: 'HTTP'
              })).$promise,

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                protocol: 'HTTPS'
              })).$promise

            ])
            .then(function(data) {
              var interval = data[0].metadata.interval_sec || 1800;
              var offset = interval * 1000;
              var labels = [];
              var series = [{
                name: 'HTTP',
                data: []
              }, {
                name: 'HTTPS',
                data: []
              }];
              https_ = http_ = 0;
              if (data[0].data && data[0].data.length > 0) {
                data[0].data.forEach( function(item, idx, items) {

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

                  http_ += item.requests;
                  series[0].data.push( item.requests / interval );
                });
              }
              if (data[1].data && data[1].data.length > 0) {
                data[1].data.forEach( function(item) {
                  https_ += item.requests;
                  series[1].data.push( item.requests / interval );
                });
              }
              // model better to update once
              $scope.traffic = {
                labels: labels,
                series: series
              };
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reload();
        });
      }
    };
  }
})();
