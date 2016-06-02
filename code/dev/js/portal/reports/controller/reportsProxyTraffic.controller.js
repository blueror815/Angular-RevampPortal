(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('ReportsProxyTrafficController', ReportsProxyTrafficController);

  /*@ngInject*/
  function ReportsProxyTrafficController($scope,
    $rootScope,
    $localStorage,
    User,
    AlertService,
    Stats,
    Countries,
    $timeout,
    $state,
    $config
  ) {

/*
    if ($config.INTRO_IS_ACTIVE) {
      if (!!$localStorage.intro && $localStorage.intro.isShowMainIntro === true) {
        $scope.IntroOptionsScope = {
          steps: [{
            element: '.form-inline',
            intro: 'Select doamin'
          }, {
            element: '.panel-body',
            intro: 'Watch data',
            position: 'top'
          }]
        };
        $timeout(function() {
          if ($localStorage.intro.pages[$state.current.name] !== true) {
            $scope.stateIntro();
          }
        }, 300);
      }
    }
*/

    $scope.userService = User;
    $scope._loading = true;
    // Domain that selected
    $scope.domain = $rootScope.domain;
    // $scope.domains = [];

    $scope.filters = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };

    $scope.pieOpts = {
      scaleOverride: true
    };

    $scope.os = {
      labels: [],
      data: []
    };
    $scope.device = {
      labels: [],
      data: []
    };
    $scope.country = {
      labels: [],
      data: []
    };
    $scope.statusCode = {
      labels: [],
      data: []
    };

    $scope.countries = Countries.query();


    /**
     * Reload list of OS
     *
     * @param {string|number} domainId
     */
    $scope.reloadOS = function(domainId) {
      $scope.os = {
        labels: [],
        data: []
      };
      Stats.os({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.os.labels.push(os.key);
            $scope.os.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadDevice = function(domainId) {
      $scope.device = {
        labels: [],
        data: []
      };
      Stats.device({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.device.labels.push(os.key);
            $scope.device.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadProtocol = function(domainId) {
      $scope.protocol = {
        labels: [],
        data: []
      };
      Stats.protocol({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            var protocol = 'Unknows';
            if (os.key === 80) {
              protocol = 'HTTP';
            }
            if (os.key === 443) {
              protocol = 'HTTPS';
            }
            $scope.protocol.labels.push(protocol);
            $scope.protocol.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadHttpMethod = function(domainId) {
      $scope.httpMethod = {
        labels: [],
        data: []
      };
      Stats.httpMethod({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.httpMethod.labels.push(os.key);
            $scope.httpMethod.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadHttpProtocol = function(domainId) {
      $scope.httpProtocol = {
        labels: [],
        data: []
      };
      Stats.httpProtocol({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.httpProtocol.labels.push(os.key);
            $scope.httpProtocol.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadStatusCode = function(domainId) {
      $scope.statusCode = {
        labels: [],
        data: []
      };
      Stats.statusCode({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          $scope.statusCode = {
            labels: [],
            data: []
          };
          angular.forEach(data.data, function(os) {
            $scope.statusCode.labels.push(os.key);
            $scope.statusCode.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadContentType = function(domainId) {
      $scope.contentType = {
        labels: [],
        data: []
      };
      Stats.contentType({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.contentType.labels.push(os.key);
            $scope.contentType.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadCacheStatus = function(domainId) {
      $scope.cacheStatus = {
        labels: [],
        data: []
      };
      Stats.cacheStatus({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.cacheStatus.labels.push(os.key);
            $scope.cacheStatus.data.push(os.count);
          });
        }
      });
    };

    /**
     * List of country
     *
     * @param {string|number} domainId
     */
    $scope.reloadCountry = function(domainId) {
      //TODO: unused $scope.country variable
      $scope.country = {
        labels: [],
        data: []
      };
      Stats.country({
        domainId: domainId
      }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.country.labels.push(os.key);
            $scope.country.data.push(os.count);
          });
        }
      });
    };

    $scope.reload = function() {
      $scope.reloadOS($scope.domain.id);
      $scope.reloadDevice($scope.domain.id);
      $scope.reloadCountry($scope.domain.id);
      //$scope.reloadProtocol($scope.domain.id);
      //$scope.reloadHttpMethod($scope.domain.id);
      //$scope.reloadHttpProtocol($scope.domain.id);
      $scope.reloadStatusCode($scope.domain.id);
      //$scope.reloadContentType($scope.domain.id);
      //$scope.reloadCacheStatus($scope.domain.id);

    };

    // Load user domains
    // User.getUserDomains(true)
    //   .then(function (domains) {
    //     $scope.domains = domains;
    //   })
    //   .catch(function () {
    //     AlertService.danger('Oops something wrong');
    //   })
    //   .finally(function () {
    //     $scope._loading = false;
    //   });

    $scope.onDomainSelected = function() {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();
    };
  }
})();
