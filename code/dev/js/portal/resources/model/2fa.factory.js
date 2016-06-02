(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('TwoFactorAuth', TwoFactorAuthResource);

  /*@ngInject*/
  function TwoFactorAuthResource(Resource, $config) {

    return Resource($config.API_URL + '/2fa/:action/:userId', {
      action: '',
      userId: ''
    }, {
      init: {

        method: 'GET',
        isArray: false,
        params: {
          action: 'init'
        }
      },

      enable: {
        method: 'POST',
        isArray: false,
        params: {
          action: 'enable'
        }
      },

      disable: {
        method: 'POST',
        isArray: false,
        params: {
          action: 'disable'
        }
      },
    });

  }
})();
