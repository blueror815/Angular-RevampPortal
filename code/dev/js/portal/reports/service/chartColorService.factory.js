(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .factory('ChartColorService', ChartColorService);

  /*@ngInject*/
  function ChartColorService() {

    /**
     * Will return a random number from 0 - 255
     *
     * @returns {number}
     */
    function getRandomRgbPart() {
      return (Math.floor(Math.random() * 256));
    }

    /**
     * Will generate `amount` of random colors
     *
     * @param {number} amount
     * @returns {Array}
     */
    function randomColors(amount) {
      if (!amount) {
        return [];
      }
      var result = [];
      while(amount--) {
        var rgb = d3.rgb(getRandomRgbPart(), getRandomRgbPart(), getRandomRgbPart());
        result.push(rgb.toString());
      }
      return result;
    }

    /**
     * Create a {@link d3.scale.ordinal} with range of `amoun` random colors
     *
     * @param {number} amount
     * @returns {d3.scale.ordinal}
     */
    function randomScaleOrdinalRange(amount) {
      return d3.scale.ordinal()
        .range(randomColors(amount));
    }

    return {

      randomColors: randomColors,

      randomScaleOrdinalRange: randomScaleOrdinalRange
    };
  }
})();
