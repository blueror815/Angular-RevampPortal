'use strict';
angular.module('adf.widget.analytics-proxy-traffic', ['adf.provider'])
  .config(function(dashboardProvider) {
    var _widget = {
      title: 'Proxy Traffic',
      description: 'Web Alalytics Proxy Traffic',
      titleTemplateUrl: 'parts/dashboard/widgets/proxy-traffic/widget-title-with-params-proxy-traffic.html',
      templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/view.html',
      // editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      editTemplateUrl: 'parts/dashboard/widgets/widget-edit.html',
      styleClass: 'rev-widget',
      controller: ['$scope', '$window', function($scope, $window, $timeout) {
        $window.dispatchEvent(new Event('resize'));
        // NOTE: set default filter configuration
        var _defaultConfig = {
          filters: {
            country: '-',
            os: '-',
            device: '-',
            count_last_day: '1'
          }
        };
        _.defaultsDeep($scope.config, _defaultConfig);
      }],
      edit: {
        templateUrl: 'parts/dashboard/widgets/proxy-traffic/edit-proxy-traffic.html',
        controller: ['$scope', '$q', 'Stats', 'Countries', 'User', 'AlertService',
          function($scope, $q, Stats, Countries, User, AlertService) {
            var _defaultConfig = {
              filters: {
                country: '-',
                os: '-',
                device: '-',
                count_last_day: '1'
              },
              info: {
                country: 'All countries'
              }
            };
            _.defaultsDeep($scope.config, _defaultConfig);

            $scope.domain = $scope.config.domain;

            $scope.$watch('config.filters', function(newVal, oldVal) {
              if (!!newVal && !!newVal.country) {
                if (newVal.country === '-') {
                  angular.extend($scope.config.info, {
                    'country': newVal.country
                  });
                } else {
                  angular.extend($scope.config.info, {
                    'country': $scope.flCountry[newVal.country.toUpperCase()] || newVal.country.toUpperCase()
                  });
                }
              }
            }, true);

            $scope.onDomainSelected = function() {
              if (!$scope.domain || !$scope.domain.id) {
                return;
              }
              $scope.reload();

            };
            /**
             * @name  reload
             * @description Reload data
             * @return
             */
            $scope.reload = function() {
              angular.extend($scope.config, {
                domain: angular.copy($scope.domain)
              });
              $scope.reloadCountry($scope.domain.id);
              $scope.reloadOS($scope.domain.id);
              $scope.reloadDevice($scope.domain.id);
              $scope.reloadStatusCode($scope.domain.id);
            }

            $scope.flCountry = {};
            /**
             * @name  reloadCountry
             * @description Reload data flCountry
             * @param  {String|Number} domainId
             * @return {[type]}          [description]
             */
            $scope.reloadCountry = function(domainId) {
              $scope.flCountry = Countries.query();
            };

            /**
             * @name  flOs
             * @description list OS for select in configuration
             * @type {Object}
             */
            $scope.flOs = {
              labels: [],
              data: []
            };

            /**
             * @name  reloadOS
             * @description Reload list of OS
             * @param {string|number} domainId
             * @return
             */
            $scope.reloadOS = function(domainId) {
              Stats.os({
                domainId: domainId
              }).$promise.then(function(data) {
                // $scope.flOs = data.data;
                // TODO: fix
                $scope.flOs.labels.length = 0;
                $scope.flOs.data.length = 0;
                if (data.data && data.data.length > 0) {
                  angular.forEach(data.data, function(item) {
                    $scope.flOs.labels.push(item.key);
                    $scope.flOs.data.push(item.count);
                  });
                }
              });
            };

            /**
             * @name flDdevice
             * @description List devices for selected domain
             * @type {Object}
             */
            $scope.flDevice = {
              labels: [],
              data: []
            };

            /**
             * @name reloadDevice
             * @description Reload list of devices for domain
             * @param   {string|number}  domainId
             */
            $scope.reloadDevice = function(domainId) {

              Stats.device({
                domainId: domainId
              }).$promise.then(function(data) {
                // $scope.flDevice = data.data;
                //$scope.flDevice.push("")
                $scope.flDevice.labels.length = 0;
                $scope.flDevice.data.length = 0;
                if (data.data && data.data.length > 0) {
                  angular.forEach(data.data, function(item) {
                    $scope.flDevice.labels.push(item.key);
                    $scope.flDevice.data.push(item.count);
                  });
                }
              });
            };

            $scope.statusCode = {
              labels: [],
              data: []
            };
            /**
             * List of devices
             *
             * @param {string|number} domainId
             */
            $scope.reloadStatusCode = function(domainId) {
              return Stats.statusCode({
                domainId: domainId
              }).$promise.then(function(data) {
                $scope.statusCode.labels.length = 0;
                $scope.statusCode.data.length = 0;
                if (data.data && data.data.length > 0) {
                  angular.forEach(data.data, function(item) {
                    $scope.statusCode.labels.push(item.key);
                    $scope.statusCode.data.push(item.count);
                  });
                  $scope.config.statusCode = $scope.statusCode.labels;
                }
              });
            };
            //==================
            // Load user domains
            User.getUserDomains(true);
          }
        ],
      }
    };
    // Registration widgets
    dashboardProvider
      .widget('analytics-proxy-traffic-bandwidth-usage', angular.extend(_widget, {
        title: 'Bandwidth Usage',
        description: 'Display Bandwidth Usage Graph', // NOTE: use directive 'requests-chart
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html',
      }))
      .widget('analytics-proxy-traffic-chart', angular.extend(_widget, {
        title: 'Total Requests',
        description: 'Display Total Requests Graph', // NOTE: use directive 'proxy-traffic-chart'
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html',
      }))
      .widget('analytics-proxy-traffic-http-https-chart', angular.extend(_widget, {
        title: 'HTTP/HTTPS Hits',
        description: 'Display HTTP/HTTPS Hits Graph', // NOTE: use directive 'http-https-chart'
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html',
      }))
      .widget('analytics-proxy-hits-cache-chart', angular.extend(_widget, {
        title: 'Edge Cache Efficiency Hits',
        description: 'Display Edge Cache Hit/Miss Graph', // NOTE: use directive 'hits-cache-chart'
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html',
      }))

    // .widget('analytics-proxy-http-status-code-chart', angular.extend(_widget, {
    //   title: 'HTTP Status Code Hits',
    //   description: 'Display the HTTP Status Code Hits', // NOTE: use directive 'http-status-code-chart'
    //   templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html',
    //   editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
    // }))
    // .widget('analytics-proxy-request-status-chart', angular.extend(_widget, {
    //   title: 'Success/Failure Request Status',
    //   description: 'Display the Success/Failure Request Status', // NOTE: use directive 'request-status-chart'
    //   templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html',
    //   editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
    // }))
    // ;

    .widget('adf-widget-gbt-heatmaps', {
        title: 'World Traffic Heatmap',
        titleTemplateUrl: 'parts/dashboard/widgets/heatmaps/widget-title-with-params-heatmap.html',
        description: 'Display Global Traffic Heatmap',
        templateUrl: 'parts/dashboard/widgets/heatmaps/view-gbt-heatmaps.tpl.html',
        controller: reportGBTHeatmapController,
        edit: {
          // templateUrl: '{widgetsPath}/adf-widget-top-reports/src/edit-heatmap.html',
          templateUrl: 'parts/dashboard/widgets/heatmaps/edit-heatmap.html',
          controller: editHeatMapReportsConfigController
        }
      })
      //==========Top Objects============================

    .widget('adf-widget-top-10-countries', {
        title: 'Top 10 Countries',
        titleTemplateUrl: 'parts/dashboard/widgets/top-reports/widget-title-with-params-top-reports.html',
        description: 'Display Top 10 Countries Pie Chart',
        templateUrl: 'parts/dashboard/widgets/top-reports/view-top-10-countries.tpl.html',
        controller: reportTop10CountriesController,
        edit: {
          templateUrl: 'parts/dashboard/widgets/top-reports/edit-top-reports.html',
          controller: editTopReportConfig
        }
      })
      // -- Request Success/Failure Ratio - Display Pie Chart For Request Completion Success/Failure Ratio
      .widget('adf-widget-http-https-requests-ratio', {
        title: 'Request Success/Failure Ratio',
        description: 'Display Success/Failure Ratio Pie Chart',
        titleTemplateUrl: 'parts/dashboard/widgets/top-reports/widget-title-with-params-top-reports.html',
        templateUrl: 'parts/dashboard/widgets/top-reports/view-request-success-fialure-ratio.tpl.html',
        controller: 'widgetRequestSuccessFailureRatioCtrl',
        edit: {
          templateUrl: 'parts/dashboard/widgets/top-reports/edit-top-reports.html',
          controller: editTopReportConfig
        }
      });


    //==================
    /**
     * @name  editHeatMapReportsConfigController
     * @description
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $window  [description]
     * @param  {[type]} $timeout [description]
     * @param  {[type]} Stats    [description]
     * @return
     */
    function editHeatMapReportsConfigController($scope, $window, $timeout, Stats) {
      'ngInject';
      var _defaultConfig = {
        filters: {
          count_last_hours: '6',
          map_type: 'world'
        }
      };
      _.defaultsDeep($scope.config, _defaultConfig);

      $scope.domain = $scope.config.domain;

      $scope.onDomainSelected = function() {
        if (!$scope.domain || !$scope.domain.id) {
          return;
        }
        $scope.reload();
      };


      /**
       * @name  reload
       * @description Reload data
       * @return
       */
      $scope.reload = function() {
        angular.extend($scope.config, {
          domain: angular.copy($scope.domain)
        });
      }
    };

    /**
     * @name  reportGBTHeatmapController
     * @description
     * @param  {[type]} $scope         [description]
     * @param  {[type]} $window        [description]
     * @param  {[type]} $timeout       [description]
     * @param  {[type]} Stats          [description]
     * @param  {[type]} HeatmapsDrawer [description]
     * @return {[type]}                [description]
     */
    function reportGBTHeatmapController($scope, $q, $window, $timeout, Stats, Countries, HeatmapsDrawer, Util) {
      'ngInject';
      var _defaultConfig = {
        filters: {
          count_last_hours: '6',
          map_type: 'world'
        }
      };
      _.defaultsDeep($scope.config, _defaultConfig);

      $scope.elId = (new Date()).getTime();
      $scope._loading = false;
      $scope._data = false;

      Countries.query().$promise
        .then(function(data) {
          $scope.reload();
          $scope.countries = data;
        });


      $scope.reload = function() {
        if (!$scope.config.domain) {
          return;
        }
        $scope._data = false;
        var drawer = false;
        var filters = {
          domainId: $scope.config.domain.id,
          count_last_hours: $scope.config.filters.count_last_hours || '6',
          from_timestamp: moment().subtract($scope.config.filters.count_last_hours, 'hours').valueOf(),
          to_timestamp: Date.now()
        };

        $scope.reloadGBTCountry(filters)
          .then(function(gbt_data) {
            $scope._data = true;
            //  (re)draw map using received data
            drawer = HeatmapsDrawer.create('#canvas-svg-gbt' + $scope.elId);
            if ($scope.config.filters.map_type === 'world') {
              drawer.drawWorldMap(gbt_data, {
                legend: {
                  symbolWidth: 360
                }
              });
            } else {
              drawer.drawUSAMap(gbt_data, {
                legend: {
                  symbolWidth: 360
                }
              });
            }
          }).finally(function() {
            $scope._loading = false;
          });
      }

      /**
       * Loads list of country trensferred data.
       *
       * @param {String|Number} domainId
       */
      $scope.reloadGBTCountry = function(filters) {
        // Set loading
        $scope._loading = true;
        // Loading new data
        return Stats.gbt_country({
            domainId: filters.domainId,
            count: 250,
            from_timestamp: moment().subtract(filters.count_last_hours || '6', 'hours').valueOf(),
            to_timestamp: Date.now()
          }).$promise
          .then(function(data) {

            var world = [],
              usa = [];

            if (data.data && data.data.length > 0) {
              data.data.forEach(function(item) {
                var key = item.key.toUpperCase();
                world.push({
                  name: ($scope.countries[key] || item.key),
                  id: key,
                  value: item.sent_bytes,
                  tooltip: ('Sent: <strong>' + Util.humanFileSizeInGB(item.sent_bytes) +
                    '</strong> Received: <strong>' + Util.humanFileSizeInGB(item.received_bytes) + '</strong>')
                });

                if (key === 'US' && item.regions) {
                  usa = item.regions;
                }
              });

              usa = usa.map(function(item) {
                return {
                  id: item.key,
                  name: item.key,
                  value: item.sent_bytes,
                  tooltip: ('Sent: <strong>' + Util.humanFileSizeInGB(item.sent_bytes) +
                    '</strong> Received: <strong>' + Util.humanFileSizeInGB(item.received_bytes) + '</strong>')
                };
              });
            }

            return {
              world: world,
              usa: usa
            };
          });
      };
    };

    /**
     * @name  editTopReportConfig
     * @description
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $window  [description]
     * @param  {[type]} $timeout [description]
     * @param  {[type]} Stats    [description]
     * @return {[type]}          [description]
     */
    function editTopReportConfig($scope, $window, $timeout, Countries, Stats) {
      'ngInject';
      var _defaultConfig = {
        filters: {
          count_last_hours: '1',
          country: '-'
        },
        info: {
          country: 'All countries'
        }
      };
      _.defaultsDeep($scope.config, _defaultConfig);

      $scope.domain = $scope.config.domain;

      Countries.query().$promise
        .then(function(data) {
          $scope.refCountries = data;
        });

      $scope.onDomainSelected = function() {
        if (!$scope.domain || !$scope.domain.id) {
          return;
        }
        $scope.reload();
      };

      /**
       * @name  reload
       * @description Reload data
       * @return
       */
      $scope.reload = function() {
        angular.extend($scope.config, {
          domain: angular.copy($scope.domain)
        });
      };

      // NOTE :save info with country full name
      $scope.$watch('config.filters', function(newVal, oldVal) {
        if (newVal.country === '-') {
          angular.extend($scope.config.info, {
            'country': newVal.country
          });
        } else {
          angular.extend($scope.config.info, {
            'country': $scope.refCountries[newVal.country.toUpperCase()] || newVal.country.toUpperCase()
          });
        }
      }, true);

    };

    // TODO: directive
    /**
     * [reportTop10CountriesController description]
     * @param  {[type]} $scope    [description]
     * @param  {[type]} Countries [description]
     * @param  {[type]} Stats     [description]
     * @return {[type]}           [description]
     */
    function reportTop10CountriesController($scope, Countries, Stats) {
      'ngInject';
      var _filters_field_list = ['domainId', 'from_timestamp', 'to_timestamp', 'country'];
      var _defaultConfig = {
        filters: {
          count_last_hours: '1',
          country: '-'
        },
        info: {
          country: 'All countries'
        }
      };
      _.defaultsDeep($scope.config, _defaultConfig);

      Countries.query().$promise
        .then(function(data) {
          $scope.countries = data;
          $scope.reload();
        });

      function generateFilterParams(filters) {
        var params = {
          from_timestamp: moment().subtract(1, 'hours').valueOf(),
          to_timestamp: Date.now()
        };
        _.forEach(filters, function(val, key) {
          if (_.indexOf(_filters_field_list, key) !== -1) {
            if (val !== '-' && val !== '') {
              params[key] = val;
            }
          } else {
            if (key === 'count_last_hours') {
              params.from_timestamp = moment().subtract(val, 'hours').valueOf();
              params.to_timestamp = Date.now();
              delete params.count_last_hours;
            }
          }
        });
        return params;
      }

      $scope.reload = function() {
        if (!$scope.config.domain) {
          return;
        }

        var filters = {
          domainId: $scope.config.domain.id,
          country: $scope.config.filters.country,
          count_last_hours: $scope.config.filters.count_last_hours || '6'
        };

        $scope.reloadTopReportCountry(filters);

      }
      $scope.country = [];
      /**
       * List of country
       *
       * @param {object} common parameters(domainId, from, to)
       */
      $scope.reloadTopReportCountry = function(filters) {
        Stats.country(generateFilterParams(filters))
          .$promise
          .then(function(data) {
            $scope.country.lenght = 0;
            if (data.data && data.data.length > 0) {
              data.data.forEach(function(val) {
                var name = $scope.countries[val.key.toUpperCase()] || 'Unknown';
                $scope.country.push({
                  name: name,
                  y: val.count
                });
              });
            }
          });
      };

    }
  });
