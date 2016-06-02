(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('BillingPlans', BillingPlansResource);

  /*@ngInject*/
  function BillingPlansResource(Resource, $config) {
    return Resource($config.API_URL + '/billing_plans/:id', {id: '@id'},
      {
        hosted_page: {
          url: $config.API_URL + '/billing_plans/:id/hosted_page',
          method: 'GET'
        }
      });
  }
})();

