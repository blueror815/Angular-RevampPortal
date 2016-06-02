(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('d3PieChart', d3PieChart);

  /*@ngInject*/
  function d3PieChart(PieChartHelper) {

    return {
      restrict: 'AE',
      template: '<div></div>',
      scope: {
        ngData: '='
      },
      link: function(scope, element, attrs) {
        if (!scope.ngData) {
          scope.ngData = [];
        }
        var redraw = PieChartHelper.drawPieChart(element[0], []);

        scope.$watch('ngData', function() {
          if (!scope.ngData || scope.ngData.length === 0) {
            redraw([]);
            return;
          }
          redraw(scope.ngData);
        });
      }
    };
  }
})();
