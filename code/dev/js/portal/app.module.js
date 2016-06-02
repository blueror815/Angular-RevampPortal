(function () {
  'use strict';

  angular.module('revapm.Portal', [
    'revapm.Portal.Auth',
    'revapm.Portal.Profile',
    'revapm.Portal.Users',
    'revapm.Portal.Domains',
    'revapm.Portal.SSL_certs',
    'revapm.Portal.Companies',
    'revapm.Portal.Cache',
    'revapm.Portal.ImportConfig',
    'revapm.Portal.Reports',
    'revapm.Portal.Mobile',
    'revapm.Portal.Usage',
    'revapm.Portal.Keys',
    'revapm.Portal.Apps',
    'revapm.Portal.Signup',
    'ui.router',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.tpls',
    'ui.bootstrap.tooltip',
    'ui.bootstrap.popover',
    'hljs',
    'oc.lazyLoad',
    'revapm.Portal.Dashboard',
    'datatables',
    'datatables.bootstrap',
    'ngFileSaver',
    'revapm.Portal.LogShippers',
    'angular-intro',
    'ngMessages',
    'ngAnimate',
    'toaster'
  ]);

})();
