(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runGoogleAnalitic)
    .service('Analytics', Analytics);


  function Analytics() {
    'ngInject';
    this.recordPageview = function(url) {
      ga('set', 'page', url);
      ga('send', 'pageview');
    };
  }

  function runGoogleAnalitic($rootScope, $location, Analytics) {
    'ngInject';
    $rootScope.$on('$stateChangeSuccess', function() {
      Analytics.recordPageview($location.url());
    });
  }
})();
