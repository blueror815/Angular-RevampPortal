(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Countries', CountriesResource);


  /*@ngInject*/
  function CountriesResource(Resource, $config) {
    return Resource($config.API_URL + '/countries/list', {}, {
      query: {
        isArray: false
      }
    });
  }
  // TODO: need make it as service.
  //
  /*@ngInject*/
  function CountriesService($q, $http, $config) {
    var deffer = $q.defer();
    var refCountries = $q.defer();
    return {
      query: function() {
        if (refCountries.isLoad !== true) {
          var scope = this;
          $http.get($config.API_URL + '/countries/list')
            .then(function(data) {
                angular.extend(refCountries, data.data);
                refCountries.isLoad = true;
                refCountries.resolve(refCountries);
              },
              function(err) {
                deffer.reject(err);
              });
        } else {
          refCountries.resolve(refCountries);
        }
        return refCountries.promise;
      }
    };
  }
})();
