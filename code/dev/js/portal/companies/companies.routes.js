(function () {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.companies', {
        url: '/companies',
        views: {
          main: {
            controller: 'CompaniesCrudController',
            templateUrl: 'parts/companies/list.html'
          }
        }
      })
      .state('index.accountSettings.companies.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/companies/new.html'
            //controller: 'DomainsNewController'
          }
        }
      })
      .state('index.accountSettings.companies.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/profile/edit-company.html',
            controller: 'CompanyProfileEditController'
          }
        }
      });
  }
})();
