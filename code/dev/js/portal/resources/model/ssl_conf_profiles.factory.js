(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('SSL_conf_profiles', SSL_conf_profiles);

  /*@ngInject*/
  function SSL_conf_profiles(Resource, $config) {

    return Resource($config.API_URL + '/ssl_conf_profiles', {}, {

    });
  }
})();
