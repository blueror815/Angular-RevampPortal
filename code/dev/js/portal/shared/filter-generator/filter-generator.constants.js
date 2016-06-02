/* filter-generator.constants.js */

/** 
 * 
 * @module 'revapm.Portal.Shared'
 * @desc filter generator constants
 */
(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .constant('filterGeneratorConst', {
      /*
       * Contries filter key
       */
      COUNTRIES: 'countries',
      /*
       * OS filter key
       */
      OS: 'os',
      /*
       * DEVICES filter key
       */
      DEVICES: 'devices'
    });

})(angular);
