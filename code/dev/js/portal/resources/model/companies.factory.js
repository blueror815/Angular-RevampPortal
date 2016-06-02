(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Companies', CompaniesResource);

  /*@ngInject*/
  function CompaniesResource(Resource, $config) {

    return Resource($config.API_URL + '/accounts/:id', {id: '@id', statement: '@statement',billing_handle:'@billing_handle'},{
      createBillingProfile: {
        url: $config.API_URL + '/accounts/:id/billing_profile',
        method: 'POST'
      },
      statements: {
        url: $config.API_URL + '/accounts/:id/statements',
        method: 'GET',
        isArray: true
      },
      statement: {
        url: $config.API_URL + '/accounts/:id/statements/:statement',
        method: 'GET',
        isArray: false
      },
      getPdfStatement: {
        url: $config.API_URL + '/accounts/:id/statements/:statement/pdf',
        method: 'GET',
        headers: {
          accept: 'application/pdf'
        },
        responseType: 'arraybuffer',
        cache: false,
        transformResponse: function (data) {
          var pdf;
          if (data) {
            pdf = new Blob([data], {
              type: 'application/pdf'
            });
          }
          return {
            response: pdf
          };
        }
      },
      transactions: {
        url: $config.API_URL + '/accounts/:id/transactions',
        method: 'GET',
        isArray: true
      },

      subscriptionPreview: {
        url: $config.API_URL + '/accounts/:id/subscription_preview/:billing_handle',
        method: 'GET',
        isArray: false
      },

      subscriptionSummary: {
        url: $config.API_URL + '/accounts/:id/subscription_summary',
        method: 'GET',
        isArray: false
      }
      }
    );
  }

})();
