(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Resource', ResourceFactory);

  /*@ngInject*/
  function ResourceFactory($resource) {
    return function (url, params, methods) {
      var defaults = {
        update: {method: 'PUT', isArray: false},
        create: {method: 'POST'}
      };

      methods = angular.extend(defaults, methods);

      var resource = $resource(url, params, methods);

      resource.prototype.$save = function () {
        if (!this.id) {
          return this.$create();
        }
        else {
          return this.$update();
        }
      };

      return resource;
    };
  }

})();
