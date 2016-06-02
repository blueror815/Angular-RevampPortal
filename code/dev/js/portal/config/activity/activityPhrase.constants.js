(function () {
  'use strict';

  angular
    .module('revapm.Portal.Config')
    .constant('ActivityPhrase', {

      /**
       * List of phrases for activity type.
       *
       * @see {@link https://github.com/revrepo/revsw-api/blob/master/node_modules/revsw-audit/lib/schema.js}
       */
      ACTIVITY_TYPE: {
        'add': 'Added',
        'modify': 'Modified',
        'delete': 'Deleted',
        'publish': 'Published',
        'login': 'Logged In',
        'purge': 'Purged',
        'init2fa': 'Initialized 2FA',
        'enable2fa': 'Enabled 2FA',
        'disable2fa': 'Disabled 2FA'
      },

      /**
       * List of phrases for activity target.
       *
       * @see {@link https://github.com/revrepo/revsw-api/blob/master/node_modules/revsw-audit/lib/schema.js}
       */
      ACTIVITY_TARGET: {
        'user': 'User',
        'account': 'Company',
        'domain': 'Domain',
        'purge': 'Cache',
        'apikey': 'API Key',
        'team': 'Team',
        'app': 'App',
        'sslcert': 'SSL Certificate',
        'logshippingjob': 'Log Shipping Job',
        'object': 'Object'
      }
    });


})();
