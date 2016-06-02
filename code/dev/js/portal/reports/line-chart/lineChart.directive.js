(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('lineChart', lineChartDirective);

  /*@ngInject*/
  function lineChartDirective() {

    function link($scope, element, attrs) {
      var el = element[0];

      var chartOptions = {
        chart: {
          renderTo: el,
          type: 'areaspline',

        },

        title: {
          text: ''
        },

        xAxis: {
          categories: [],
          tickInterval: 4,
          crosshair: {
            width: 1,
            color: '#000000'
          },
        },

        yAxis: {
          title: {
            text: 'RPS'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },

        legend: {
          //layout: 'vertical',
          //align: 'bottom',
          //verticalAlign: 'middle',
          borderWidth: 0
        },

        plotOptions: {
          areaspline: {
            marker: {
              enabled: false
            }
          }
        },

        credits: {
          enabled: false
        },

        series: []
      };

      var chart = new Highcharts.Chart(angular.merge(chartOptions, ($scope.ngChartOptions || {})));

      /**
       * Redraw current chart
       */
      $scope.reload = function() {
        chart.redraw();
      };

      /**
       * Clear current chart
       */
      $scope.clearChart = function() {
        chart.series.forEach(function(series) {
          series.remove();
        });
        $scope.reload();
      };

      /**
       *
       */
      $scope.$watch('ngData', function(value) {
        if (!value || !_.isObject(value)) {
          return;
        }
        $scope.clearChart();
        // update labels
        if (_.isArray(value.labels)) {
          if (value.labels.length === 0) {
            return;
          }
          // Set new data
          chart.xAxis[0].setCategories(value.labels);
        }
        // Update series
        if (_.isArray(value.series)) {
          if (value.series.length === 0) {
            return;
          }
          // Set new data
          value.series.forEach(function(val) {
            chart.addSeries(val);
          });
        }
        $scope.reload();
      });

      $scope.$watch('xAxis', function(value) {
        if (!value || !_.isArray(value)) {
          return;
        }
        if (value.length === 0) {
          $scope.clearChart();
          return;
        }
        chart.xAxis[0].update(value);
      });
    }

    return {
      scope: {
        ngChartOptions: '=',
        ngData: '='
      },
      link: link
    };
  }

})();
