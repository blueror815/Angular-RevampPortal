(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TopReportsTrafficController', TopReportsTrafficController);

  /*@ngInject*/
  function TopReportsTrafficController($scope, User, AlertService, Stats, Countries) {
    $scope.userService = User;

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];
    $scope.pieOpts = {
      scaleOverride: true
    };

    $scope.os = [];
    $scope.device = [];
    $scope.country = [];
    $scope.statusCode = [];
    $scope.requestStatus = [];

    $scope.countries = Countries.query();
    $scope.delay = '24';
    $scope.country_filter = '';

    /**
     * Reload list of OS
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadOS = function ( filters ) {

      $scope.os = [];
      Stats.os( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: ( val.key !== '--' ? val.key : 'Unknown' ),
                y: val.count
              });
            });
            $scope.os = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadDevice = function ( filters ) {
      $scope.device = [];
      Stats.device( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: ( val.key !== '--' ? val.key : 'Unknown' ),
                y: val.count
              });
            });
            $scope.device = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadProtocol = function ( filters ) {
      $scope.protocol = [];
      Stats.protocol( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              var protocol = 'Unknows';
              if (val.key === 80 || val.key === '80'  ) {
                protocol = 'HTTP';
              }
              if (val.key === 443 || val.key === '443') {
                protocol = 'HTTPS';
              }
              newData.push({
                name: protocol,
                y: val.count
              });
            });
            $scope.protocol = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadHttpMethod = function ( filters ) {
      $scope.httpMethod = [];
      Stats.httpMethod( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            $scope.httpMethod = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadHttpProtocol = function ( filters ) {
      $scope.httpProtocol = [];
      Stats.httpProtocol( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            $scope.httpProtocol = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadStatusCode = function ( filters ) {
      $scope.statusCode = [];
      Stats.statusCode( filters )
        .$promise
        .then(function (data) {
          var newData = [];
          if (data.data && data.data.length > 0) {
            angular.forEach(data.data, function (os) {
              newData.push({
                name: os.key,
                y: os.count
              });
            });
            $scope.statusCode = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadContentType = function ( filters ) {
      $scope.contentType = [];
      Stats.contentType( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            $scope.contentType = newData;
          }
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadCacheStatus = function ( filters ) {
      $scope.cacheStatus = [];
      Stats.cacheStatus( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            if ( newData.length === 2 &&
                 ( newData[0].y > 0 || newData[1].y > 0 ) ) {
              $scope.cacheStatus = newData;
            }
          }
        });
    };

    /**
     * QUIC/non-QUIC requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadQUIC = function ( filters ) {

      $scope.quic = [];
      Stats.quic( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              newData.push({
                name: ( val.key === '-' ? 'Non-QUIC' : val.key ),
                y: val.count
              });
            });
            $scope.quic = newData;
          }
        });
    };

    /**
     * H2/H2C HTTP2 requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadHTTP2 = function ( filters ) {

      $scope.http2 = [];
      Stats.http2( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var http2 = [];
            angular.forEach(data.data, function (val) {
              http2.push({
                name: ( val.key === '' ? 'Non-HTTP2' : val.key.toUpperCase() ),
                // name: val.key.toUpperCase(),
                y: val.count
              });
            });
            $scope.http2 = http2;
          }
        });
    };

    /**
     * List of country
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadCountry = function ( filters ) {
      $scope.country = [];
      Stats.country( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (val) {
              var name = $scope.countries[val.key.toUpperCase()] || 'Unknown';
              newData.push({
                name: name,
                y: val.count
              });
            });
            $scope.country = newData;
          }
        });
    };

    /**
     * success/failed requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadRequestStatus = function ( filters ) {

      $scope.requestStatus = [];
      Stats.requestStatus( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {

            var st = [{
              name: 'Successfull',
              y: 0
            },{
              name: 'Failed',
              y: 0
            }];

            angular.forEach(data.data, function (item) {
              if ( item.key === 'OK' ) {
                st[0].y = item.count;
              } else {
                st[1].y += item.count;
              }
            });
            $scope.requestStatus = st;
          }
        });
    };

    $scope.reload = function() {

      var filters = {
        domainId: $scope.domain.id,
        from_timestamp: moment().subtract( $scope.delay, 'hours' ).valueOf(),
        to_timestamp: Date.now()
      };
      if ( $scope.country_filter ) {
        filters.country = $scope.country_filter;
      }

      $scope.reloadOS( filters );
      $scope.reloadDevice( filters );
      $scope.reloadCountry( filters );
      $scope.reloadProtocol( filters );
      $scope.reloadHttpMethod( filters );
      $scope.reloadHttpProtocol( filters );
      $scope.reloadStatusCode( filters );
      $scope.reloadContentType( filters );
      $scope.reloadCacheStatus( filters );
      $scope.reloadQUIC( filters );
      $scope.reloadHTTP2( filters );
      $scope.reloadRequestStatus( filters );
    };

    // Load user domains
    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domains = domains;
      })
      .catch(function () {
        AlertService.danger('Oops something wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.onDomainSelected = function (domain) {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();
    };
  }
})();
