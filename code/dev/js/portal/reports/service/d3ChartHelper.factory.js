(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .factory('D3ChartHelper', D3ChartHelper);

  /*@ngInject*/
  function D3ChartHelper() {

    /**
     * Create an SVG element into given element or body (if nothing defined)
     *
     * @param {string?} [element]
     * @returns {*}
     */
    function createSvgElement(element) {
      element = element || 'body';
      return d3
        .select(element)
        .append('svg');
    }

    return {
      createSvgElement: createSvgElement
    };
  }
})();
