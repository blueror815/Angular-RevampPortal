(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Users', UsersResource);

  /*@ngInject*/
  function UsersResource(Resource, $config) {

    return Resource($config.API_URL + '/users/:id', {id: '@user_id', token: '@token', email: '@email'}, {
      myself: {
        url: $config.API_URL + '/users/myself',
        method: 'GET'
      },
      signup: {
        url: $config.API_URL + '/signup',
        method: 'POST'
      },
      signupShort: {
        url: $config.API_URL + '/signup2',
        method: 'POST'
      },
      verify: {
        url: $config.API_URL + '/signup/verify/:token',
        method: 'GET'
      },
      resend: {
        url: $config.API_URL + '/signup/resend/:email',
        method: 'GET'
      }
    });
  }
})();
