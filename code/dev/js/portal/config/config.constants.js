(function() {
  'use strict';

  angular
    .module('revapm.Portal.Config')
    .constant('$config', {

      /**
       * Server url
       */
      SERVER_URL: '',

      /**
       * URL to API
       */
      API_URL: window.API_URL || 'https://testsjc20-api01.revsw.net/v1',
      // API_URL: 'https://iad02-api01.revsw.net/v1',
      // API_URL: 'https://localhost:8000/v1',

      /**
       * HTTP Statuses
       */
      STATUS: {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        TWO_FACTOR_AUTH_REQUIRED: 403,
        SUBSCRIPTION_REQUIRED: 418,
      },

      /**
       * User roles
       */
      ROLE: {
        USER: 'user',
        RESELLER: 'reseller',
        ADMIN: 'admin',
        REVADMIN: 'revadmin',
      },

      /**
       * List of application events
       */
      EVENTS: {
        DOMAIN_CHANGED: 'domain_changed',
        FILTER_CHANGED: 'filter_changed'
      },

      /**
       * List of icon classes for domain statuses
       */
      DOMAIN_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      DOMAIN_PRODUCTION_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },
      /**
       * Interval delay for refreshing apps staging/global status
       */
      APP_STATUS_REFRESH_INTERVAL: 15000,

      /**
       * Interval delay for refreshing domain staging/global status
       */
      DOMAIN_STATUS_REFRESH_INTERVAL: 15000,
      /**
       * List of icon classes for SSL Certificates statuses
       */
      SSL_CERT_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      SSL_CERT_PRODUCTION_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },

      /**
       * Interval delay for refreshing SSL Certificate staging/global status
       */
      SSL_CERT_STATUS_REFRESH_INTERVAL: 15000,
      /**
       * [LOGSHIPPERS_SOURCE_TYPES description]
       * @type {Object}
       */
      LOGSHIPPERS_SOURCE_TYPES: {
        domain: 'Domain',
        app: 'Application'
      },

      /**
       * [LOGSHIPPERS_DESTINATIONA_TYPES  description]
       * @type {Object}
       */
      LOGSHIPPERS_DESTINATIONA_TYPES: {
        Syslog: 'Syslog',
        s3: 'S3',
        ftp: 'FTP',
        sftp: 'SFTP',
        logstash: 'Logstash',
        elasticsearch: 'Elasticsearch'
      },
      /**
       * List of icon classes for Log Shippers statuses
       */
      LOGSHIPPERS_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        stop: 'glyphicon-stop text-warning',
        active: 'glyphicon-play text-success',
        pause: 'glyphicon-pause text-primary'
      },

      LOGSHIPPERS_OPERATIONAL_MODES: {
        active: 'Active',
        pause: 'Pause',
        stop: 'Stop'
      },
      /**
       * [LOGSHIPPERS_GENERAL_JOB_STATUSIES description]
       * @type {Object}
       */
      LOGSHIPPERS_GENERAL_JOB_STATUSIES: {
        actived: 'Actived',
        stopped: 'Stopped',
        pause: 'Pause',
        paused_with_log_piling: 'Paused With Log_piling',
        Paused_by_revadmin: 'Paused by Rev Admin'
      },
      /**
       * Interval delay for refreshing Log Shippers status
       */
      LOGSHIPPERS_STATUS_REFRESH_INTERVAL: 25000,
      INTRO_IS_ACTIVE: true,
      ENABLE_SIMPLIFIED_SIGNUP_PROCESS: true,

      // Used by Angular Toaster
      SUCCESS_MESSAGE_DISPLAY_TIMEOUT: 5000
    });

})();
