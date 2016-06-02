(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .run(AuthRun);

  /*@ngInject*/
  function AuthRun($rootScope, $state) {

    $rootScope.$on('unauthorized', function() {
      console.log('No logged in');
      $state.go('login');
    });

    $rootScope.$on('not.connected', function() {
      if ($state.current.name !== 'login') {
        $state.go('login');
      }
    });
  }
})();
