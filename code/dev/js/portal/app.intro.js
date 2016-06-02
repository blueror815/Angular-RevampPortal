(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runIntro);

  function runIntro($config, $rootScope, $localStorage, $timeout, $window, $state, $stateParams) {
    'ngInject';
    $rootScope.menuExpandedNodes = {};
    var introduction_application = {
      steps: [{
          intro: 'Welcome to the RevAPM Customer Portal! It looks like you are a new user of the service, and we would like to run for you a quick introduction tour.',
        }, {
          element: '#side-menu-sub-item__webApp-domains',
          intro: 'The "Domains" section allows you to manage the way how your websites (domains) are accelerated by RevAPM.',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-ssl_certs',
          intro: 'We highly recommend to use SSL protocol for your websites - it will increase the website security and also allow your visitors to use modern and ' +
            'fast HTTP/2 protocol',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-cache ',
          intro: 'If you use our global edge caching feature then the "Purge Cache" section will allow you to instantly ' +
            'purge cached objects when you make changes on your origin server.',
          position: 'right'
        },
        {
          element: '#side-menu-web-analytics-item',
          intro: 'The "Web Analytics" section will provide you with a lot of insights about your website\'s performance, avaiability, user geography, popular content ' +
            'and many other important metrics!',
          position: 'right'
        },
        {
          element: '#side-menu-apps-item',
          intro: 'The "Mobile Apps" section is the right place to supercharge your mobile application with RevSDK. In the section your can create new SDK ' +
            'keys and manage ' +
            'RevAPM acceleration options.',
          position: 'right'
        },
        {
          element: '#side-menu-mobile-analytics-item',
          intro: 'This section is full of information about mobile application availability, performance, userbase, top objects, etc.',
          position: 'right'
        },
        {
          element: '#left-menu-dashboard-section',
          intro: 'Here you can easily build your own dashboards using different graphs from mobile and web analytics sections.',
          position: 'right'
        },
      ]
    };
    // NOTE: Main Menu Introduction
    $rootScope.IntroOptions = introduction_application;
    if ($config.INTRO_IS_ACTIVE === true) {
      if ($localStorage.intro === undefined) {
        $localStorage.intro = {
          isShowMainIntro: false,
          pages: {}
        };
        $rootScope.menuExpandedNodes = {};
        $rootScope.isShowMainIntro = false;
      } else {
        $rootScope.isShowMainIntro = false;
        $rootScope.isShowMainIntro = $localStorage.intro.isShowMainIntro;
      }
      if ($rootScope.isShowMainIntro === false) {
        ['index.apps', 'index.reports', 'index.webApp', 'index.accountSettings'].forEach(function(menuState) {
          $rootScope.menuExpandedNodes[menuState] = true;
        });
      }
    } else {
      $rootScope.isShowMainIntro = true;
    }
    /**
     * @name  BeforeChangeEvent
     * @description
     *
     * @param {[type]} e     [description]
     * @param {[type]} scope [description]
     */
    $rootScope.BeforeChangeEvent = function(e, scope) {
      var el = angular.element(e);
      el.addClass('.intro-active');
      return el.focus();
    };
    $rootScope.AfterChangeEvent = function(e, scope) {
      var el = angular.element(e);
      el.removeClass('intro-active');
      return;
    };
    /**
     * @name CompletedEvent
     * @description
     *
     * @param {Object} e
     */
    $rootScope.onIntroCompletedEvent = function(e) {
      if (!!$localStorage.intro && $localStorage.intro.isShowMainIntro === false) {
        $localStorage.intro.isShowMainIntro = true;
        $rootScope.isShowMainIntro = true;
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: true,
          notify: true
        });
      } else {
        if (!!$localStorage.intro.pages && $localStorage.intro.pages[$state.current.name] !== true) {
          $localStorage.intro.pages[$state.current.name] = true;
        }
      }
    };
  }
})();
