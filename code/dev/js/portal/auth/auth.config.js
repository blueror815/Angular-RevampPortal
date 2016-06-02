(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .config(configure);

  /*@ngInject*/
  function configure($httpProvider) {
    // alternatively, register the interceptor via an anonymous factory
    //$httpProvider.interceptors.push(function($q, dependency1, dependency2) {
    //  return {
    //    'request': function(config) {
    //      //@todo Add header
    //      //$httpProvider.defaults.headers.some = ;
    //    }
    //  };
    //});
  }
})();
