(function() {
  'use strict';
  /**
   * @name  revapm.Portal.Dashboard
   * @document service
   */
  angular.module('revapm.Portal.Dashboard', [
      'ngStorage',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ngSanitize',
      // 'adf', // TODO: add after fix conflict with directive 'alert'
      'adf.provider',
      'revapm.Portal.BlueTriangleTech',
       'angular-nicescroll'
    ])
    .config( /*ngInject*/ function(dashboardProvider) {
      // NOTE: define dashboard structures
      dashboardProvider.structure('8-4', {
          title: '(One Wide Column And One Narrow Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-8',
              widgets: []
            }, {
              styleClass: 'col-md-4',
              widgets: []
            }]
          }]
        })
        .structure('12', {
          title: '(One Wide Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-12',
              widgets: []
            }]
          }]
        })
        .structure('6-6', {
          title: '(Two Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-6',
              widgets: []
            }, {
              styleClass: 'col-md-6',
              widgets: []
            }]
          }]
        })
        .structure('4-4-4', {
          title: '(Three Columns of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-4',
              widgets: []
            }, {
              styleClass: 'col-md-4',
              widgets: []
            }, {
              styleClass: 'col-md-4',
              widgets: []
            }]
          }]
        })
        .structure('3-3-3-3', {
          title: '(Four Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-3',
              widgets: []
            }, {
              styleClass: 'col-md-3',
              widgets: []
            }, {
              styleClass: 'col-md-3',
              widgets: []
            }, {
              styleClass: 'col-md-3',
              widgets: []
            }]
          }]
        });
    })
    // TODO: rebase
    .config( /*ngInject*/ function(dashboardProvider) {
      dashboardProvider
      // #1  “Conversion Rate”
        .widget('bluetriangletech-conversions-subcategories', {
          title: 'Conversion Rate',
          description: 'Conversion Rate, Average Order Value and Page Views by PRT for Subcategories',
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
          controller: 'widgetBTTConversionReportController',
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
            controller: 'widgetEditBTTiframeController',
            controllerAs: 'vm',
          },
          config: {
            height: '100%',
            country: 'All Countries',
            count_last_day: '1'
          }
        })
        // #2 ”Bounce Rate”
        .widget('bluetriangletech-bounce-rate', {
          title: 'Bounce Rate',
          description: 'Bounce Rate and Page Views Per Session by PRT for subcategory',
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
          controller: 'widgetBTTBounceRateReportController',
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
            controller: 'widgetEditBTTiframeController',
            controllerAs: 'vm',
          },
          config: {
            height: '100%',
            className: 'bluetriangletech--bounce-rate',
            country: 'All Countries',
            count_last_day: '1'
          }
        })
        // #3 'Brand Conversion Rate'
        .widget('bluetriangletech-brand-conversion-rate', {
          title: 'Brand Conversion Rate',
          description: 'Brand Conversion Rate, Average Brand and Page Views by PRT for subcategory',
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
          controller: 'widgetBTTBrandConversionRateReportController',
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
            controller: 'widgetEditBTTiframeController',
            controllerAs: 'vm',
          },
          config: {
            height: '100%',
            className: 'bluetriangletech--brand-conversion-rate',
            country: 'All Countries',
            count_last_day: '1'
          }
        })
        // #4 'Lost Revenue Calculator'
        .widget('bluetriangletech-lost-revenue-calculator', {
          title: 'Lost Revenue Calculator',
          description: 'Lost Revenue Calculator for subcategory',
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
          controller: 'widgetBTTLostRevenueCalculatorReportController',
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
            controller: 'widgetEditBTTiframeController',
            controllerAs: 'vm',
          },
          config: {
            height: '100%',
            className: 'bluetriangletech--lost-revenue-calculator',
            country: 'All Countries',
            count_last_day: '1'
          }
        })
        // #5 'BTT Traffic Parameters'
        .widget('bluetriangletech-traffic-info', {
          title: 'BTT Traffic Parameters',
          description: 'BTT Traffic Parameters',
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
          controller: 'widgetBTTTrafficInfoReportController',
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
            controller: 'widgetEditBTTiframeController',
            controllerAs: 'vm',
          },
          config: {
            height: '100%',
            className: 'bluetriangletech--traffic-info',
            country: 'All Countries',
            count_last_day: '1'
          }
        })
        // Widget “Norse Live Attack Map”
        .widget('widget-norse-live-attack-map', {
          title: 'Norse Live Attack Map',
          description: 'Display Norse Live Attack Map',
          templateUrl: 'parts/dashboard/widgets/norse/view-iframe-norse.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/norse/widget-title-without-params-norse.html',
          controller: function widgetNorseLiveAttackMapIframeController($sce, config) {
            'ngInject';
            var vm = this;
            if (config.url) {
              vm.url = $sce.trustAsResourceUrl(config.url);
            }
          },
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/norse/edit-norse.html',
            controller: function widgetEditBTTiframeController($sce, config) {
              'ngInject';
              var vm = this;
            },
            controllerAs: 'vm',
          },
          config: {
            url: 'https://map.norsecorp.com/#/'
          }
        });

    })
    .controller('widgetBTTConversionReportController', widgetBTTConversionReportController)
    .controller('widgetBTTBounceRateReportController', widgetBTTBounceRateReportController)
    .controller('widgetBTTBrandConversionRateReportController', widgetBTTBrandConversionRateReportController)
    .controller('widgetBTTLostRevenueCalculatorReportController', widgetBTTLostRevenueCalculatorReportController)
    .controller('widgetBTTTrafficInfoReportController', widgetBTTTrafficInfoReportController)

  .controller('widgetEditBTTiframeController', widgetEditBTTiframeController);
  /**
   * [widgetBTTConversionReportController description]
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTConversionReportController($sce, BTTPortalService, config) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep(config, _defaultConfig);
    vm.config = config;
    vm._loading = false;
    // TODO: init function for control existing domain Id
    BTTPortalService.generateUrlConversionReport(config)
      .then(function(url) {
        config.url = url;
        if (config.url) {
          vm.url = $sce.trustAsResourceUrl(config.url);
        }
      })
      .finally(function() {
        vm._loading = false;
      });
  }
  /**
   * [widgetBTTBounceRateReportController description]
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTBounceRateReportController($sce, BTTPortalService, config) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep(config, _defaultConfig);
    vm.config = config;
    vm._loading = false;
    // TODO: init function for control existing domain Id
    BTTPortalService.generateUrlBounceRateReport(config)
      .then(function(url) {
        config.url = url;
        if (config.url) {
          vm.url = $sce.trustAsResourceUrl(config.url);
        }
      })
      .finally(function() {
        vm._loading = false;
      });
  }
  /**
   * [widgetBTTBrandConversionRateReportController description]
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTBrandConversionRateReportController($sce, BTTPortalService, config) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep(config, _defaultConfig);
    vm.config = config;
    vm._loading = false;
    // TODO: init function for control existing domain Id
    BTTPortalService.generateUrlBrandConversionRateReport(config)
      .then(function(url) {
        config.url = url;
        if (config.url) {
          vm.url = $sce.trustAsResourceUrl(config.url);
        }
      })
      .finally(function() {
        vm._loading = false;
      });
  }
  /**
   * @name  widgetBTTLostRevenueCalculatorReportController
   * @description
   *
   *
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTLostRevenueCalculatorReportController($sce, BTTPortalService, config) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep(config, _defaultConfig);
    vm.config = config;
    vm._loading = false;
    // TODO: init function for control existing domain Id
    BTTPortalService.generateUrlLostRevenueCalculatorReport(config)
      .then(function(url) {
        config.url = url;
        if (config.url) {
          vm.url = $sce.trustAsResourceUrl(config.url);
        }
      })
      .finally(function() {
        vm._loading = false;
      });
  }
  /**
   * @name  widgetBTTTrafficInfoReportController
   * @description
   *
   *
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTTrafficInfoReportController($sce, BTTPortalService, config) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep(config, _defaultConfig);
    vm.config = config;
    vm._loading = false;
    // TODO: init function for control existing domain Id
    BTTPortalService.generateUrlTrafficInfoReport(config)
      .then(function(url) {
        config.url = url;
        if (config.url) {
          vm.url = $sce.trustAsResourceUrl(config.url);
        }
      })
      .finally(function() {
        vm._loading = false;
      });
  }
  /**
   * @name  widgetEditBTTiframeController
   * @description
   *
   *
   * @param  {[type]} $scope    [description]
   * @param  {[type]} Countries [description]
   * @return {[type]}           [description]
   */
  function widgetEditBTTiframeController($scope, $localStorage, Countries, User, AlertService) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep($scope.config, _defaultConfig);
    vm._loading = true;
    vm.domains = [];
    vm.domain = $scope.config.domain;
    vm.refCountry = Countries.query();

    // Load user domains
    User.getUserDomains(true)
      .then(function(domains) {
        vm.domains = _.filter(domains, function(item) {
          return (!!item.btt_key && item.btt_key !== '');
        });
        // Set default value if ngModel is empty
        if (!vm.domain || !vm.domain.id) {
          // Select domain if it's only one
          if (domains.length === 1 && $scope.selectOne) {
            vm.onDomainSelected($scope.domains[0]);
            vm.domain = $scope.domains[0];
          }
          if ($localStorage.selectedDomain && $localStorage.selectedDomain.id) {
            var ind = _.findIndex(domains, function(d) {
              return d.id === $localStorage.selectedDomain.id;
            });

            vm.domain = vm.domains[ind];
            vm.onDomainSelected(vm.domains[ind]);
          }
        }
        return vm.domains;
      })
      .catch(function() {
        AlertService.danger('Oops something wrong');
      })
      .finally(function() {
        vm._loading = false;
      });

    vm.onDomainSelected = function(domain) {
      if (!!domain) {
        $localStorage.selectedDomain = domain;
      }
      if (!vm.domain || !vm.domain.id) {
        return;
      }
      vm.reload();
    };
    /**
     * @name  reload
     * @description Reload data
     * @return
     */
    vm.reload = function() {
      angular.extend($scope.config, {
        domain: angular.copy(vm.domain)
      });
    };
  }


})();
