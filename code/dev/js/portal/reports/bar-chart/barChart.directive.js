(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('barChart', barChartDirective);

  /*@ngInject*/
  function barChartDirective() {

    function link($scope, element, attrs) {
      var el = element[0];
      var chartOpts = {
        chart: {
          renderTo: el,
//          plotBackgroundColor: null,
//          plotBorderWidth: null,
//          plotShadow: false,
          type: 'bar',

        },

        title: false,
        tooltip: {
          formatter: function() {
            return '<b>'+ this.point.name +': </b>'+
              Highcharts.numberFormat(this.point.percentage, 0) + '% (' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' requests)';
          }
        },

        plotOptions: {
          bar: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            },
                innerSize: 100,
                depth: 45
          }
        },

        credits: {
          enabled: false
        },

        series: [{
          data: []
        }]
      };

      var chart = new Highcharts.Chart( angular.merge(chartOpts, ($scope.ngChartOptions || {})));

      $scope.$watch('ngData', function (value) {
        if (!value || !_.isArray(value)) {
          return;
        }
        // Set new data
        chart.series[0].setData(value);
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
