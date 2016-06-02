(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .factory('PieChartHelper', PieChartHelper);

  /*@ngInject*/
  function PieChartHelper(ChartColorService, D3ChartHelper) {


    /**
     * Draw a pie chart using given data
     *
     * Data should have this format:
     * ```javascript
     *
     * [
     *  {label: 'Some', value: 123},
     *  {label: 'Some another', value: 321},
     *  // ...
     * ]
     * ```
     *
     * @param {string} element Element to draw chart in
     * @param {Array} data
     * @param {Object?} config
     */
    function drawPieChart(element, data, config) {
      if (angular.isArray(element)) {
        data = element;
        element = 'body';
      }
      data = data || [];

      var width = $(element).width() || 400,
        height = $(element).height() || 200,
        radius = Math.min(width, height) / 2;

      var svg = D3ChartHelper
        .createSvgElement(element)
        .attr('width', width)
        .attr('height', height)
        .append('g');


      var pie = d3.layout.pie()
        .sort(null)
        //.padAngle(1)
        .value(function (d) {
          return d.value;
        });

      var key = function (d) {
        return d.data.label;
      };

      // Create groups for next fill
      svg.append('g')
        .attr('class', 'slices');
      svg.append('g')
        .attr('class', 'labels');
      svg.append('g')
        .attr('class', 'lines');

      var arc = d3.svg.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.05);

      var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      // Move to center
      svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      //var color = d3.scale.ordinal()
      //  .range(ChartColorService.randomColors(25));

      var color = d3.scale.category20();

      // Computes the angle of an arc, converting from radians to degrees.
      function angle(d) {
        var a = (d.startAngle + d.enådAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
      }

      function change(data) {

        //var g = svg.selectAll('.arc')
        //  .data(pie(data))
        //  .enter().append('g')
        //  .attr('class', 'arc');
        //
        //g.append('path')
        //  .attr('d', arc)
        //  .style('fill', function (d) {
        //    return color(d.data.label);
        //  });
        //
        //g.append('text')
        //  .attr('transform', function (d) {
        //    return 'translate(' + arc.centroid(d) + ')rotate(' + angle(d) + ')';
        //  })
        //  .attr('dy', '.45em')
        //  .attr('dx', function (d) {
        //    return (d.angle > 180 ? 10 : 0);
        //  })
        //  .style('text-anchor', 'end')
        //  .text(function (d) {
        //    return d.data.value;
        //  });

        /* ------- PIE SLICES -------*/
        var slice = svg.select('.slices').selectAll('path.slice')
          .data(pie(data), key);

        slice.enter()
          .insert('path')
          .style('fill', function (d) {
            return color(d.data.label);
          })
          .attr('class', 'slice');

        slice
          .transition()
          .duration(1000)
          .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              return arc(interpolate(t));
            };
          });

        slice.exit()
          .remove();

        /* ------- TEXT LABELS -------*/

        var text = svg.select('.labels').selectAll('text')
          .data(pie(data), key);

        text.enter()
          .append('text')
          .attr('dy', '.35em')
          .text(function (d) {
            return d.data.label;
          });

        function midAngle(d) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.transition().duration(1000)
          .attrTween('transform', function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              var d2 = interpolate(t);
              var pos = outerArc.centroid(d2);
              pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
              return 'translate(' + pos + ')';
            };
          })
          .styleTween('text-anchor', function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              var d2 = interpolate(t);
              return midAngle(d2) < Math.PI ? 'start' : 'end';
            };
          });

        text.exit()
          .remove();

        /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = svg.select('.lines').selectAll('polyline')
          .data(pie(data), key);

        polyline.enter()
          .append('polyline');

        polyline.transition().duration(1000)
          .attrTween('points', function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              var d2 = interpolate(t);
              var pos = outerArc.centroid(d2);
              pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
              return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
          });

        polyline.exit()
          .remove();
      }

      change(data);

      return change;
    }

    return {
      drawPieChart: drawPieChart
    };
  }
})();
