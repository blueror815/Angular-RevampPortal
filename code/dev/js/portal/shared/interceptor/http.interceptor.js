(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .factory('revAPIHttpInterceptor', revAPIHttpInterceptor);

  /*@ngInject*/
  function revAPIHttpInterceptor($q, $config, $rootScope) {

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    return {
      'responseError': function(rejection) {
        //@todo REMOVE THIS DIRTY FIX
        if (rejection.config.method === 'POST' && endsWith(rejection.config.url, '/2fa/enable')) {
          return $q.reject(rejection);
        }
        // handle 401
        if (rejection.status === $config.STATUS.UNAUTHORIZED) {
          $rootScope.$emit('unauthorized');
        }
        // Not connected
        if (!rejection.status) {
          $rootScope.$emit('not.connected');
        }
        return $q.reject(rejection);
      }
    };
  }
})();
