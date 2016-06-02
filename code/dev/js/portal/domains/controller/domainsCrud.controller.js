(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainsCrudController', DomainsCrudController);

  /*@ngInject*/
  function DomainsCrudController($scope,
    $timeout,
    $localStorage,
    CRUDController,
    DomainsConfig,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    DomainsCachingRuleDefault,
    SSL_certs,
    SSL_conf_profiles) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.isAdvancedMode = $stateParams.isAdvanced || false;
    $scope.jsoneditor = {
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function(err) {
          alert(err.toString());
        }
      }
    };
    //Set state (ui.router)
    $scope.setState('index.webApp.domains');

    $scope.setResource(DomainsConfig);

    /**
     * @name setAccountName
     * @description
     *
     */
    function setAccountName() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        return Companies.query(function(list) {
          _.forEach($scope.records, function(item) {
            var index = _.findIndex(list, {
              id: item.account_id
            });
            if (index >= 0) {
              item.companyName = list[index].companyName;
            }
          });
        });
      } else {
        return $q.when();
      }
    }
    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
          .then(setAccountName)
          .then(function() {
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function() {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      }
    });

    $scope.filterKeys = ['domain_name', 'cname', 'companyName', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};

    // fetch list of locations
    $scope.fetchLocations = function() {
      $http
        .get($config.API_URL + '/locations/firstmile')
        .then(function(data) {
          if (data.status === $config.STATUS.OK) {
            $scope.locations = data.data;
          }
        });
    };

    $scope.fetchCompanies = function(companyIds) {
      var promises = [];
      companyIds.forEach(function(id) {
        promises.push(Companies.get({
          id: id
        }).$promise);
      });
      $q.all(promises).then(function(data) {
        $scope.companies = data;
      });
    };

    $scope.prepareSimpleDomainUpdate = function(model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      if (model.rev_component_bp) {
        delete model.rev_component_bp.cache_opt_choice;
        delete model.rev_component_bp.certificate_urls;
        delete model.rev_component_bp.ssl_certificates;
        if (model.rev_component_bp.caching_rules) {
          angular.forEach(model.rev_component_bp.caching_rules, function(item) {
            delete item.$$cachingRuleState;
          });
        }
      }
      if (model.domain_name) {
        delete model.domain_name;
      }
      // NOTE: clean params ssl config
      if ($scope.isCustomSSL_conf_profile) {
        model.ssl_conf_profile = '';
      } else {
        var item = _.find($scope.SSL_conf_profiles, {
          id: model.ssl_conf_profile
        });
        if (!!item) {
          model.ssl_ciphers = item.ssl_ciphers;
          model.ssl_protocols = item.ssl_protocols;
          model.ssl_prefer_server_ciphers = item.ssl_prefer_server_ciphers;
        }
      }
      // NOTE: set corret value for ssl_cert_id
      if (model.ssl_cert_id === null || model.ssl_cert_id === undefined) {
        model.ssl_cert_id = '';
      }
      delete model.cname;
      delete model.origin_protocol;
      delete model.id;
      // console.log('model', model);
      return model;
    };

    $scope.setAccountId = function() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        Companies.query(function(list) {
          $scope.companies = list;
          if ($scope.companies.length === 1) {
            $scope.model.account_id = $scope.companies[0].id;
          }
        });
      } else if (!angular.isArray($scope.auth.getUser().companyId)) {
        $scope.model.account_id = $scope.auth.getUser().companyId;
      } else if ($scope.auth.getUser().companyId.length === 1) {
        $scope.model.account_id = $scope.auth.getUser().companyId[0];
      } else {
        $scope.fetchCompanies($scope.auth.getUser().companyId);
      }
    };

    $scope.setAccountId();
    $scope.fetchLocations();

    $scope.SSL_certs = [];
    $scope.SSL_conf_profiles = [];

    function fetchSSL_certificates() {
      $scope.SSL_certs.length = 0;
      return SSL_certs.query().$promise
        .then(function(list) {
          //TODO: add control USER ROLE for filtred data
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {}
          $scope.SSL_certs = list;
        }).$promise;
    }

    function fetchSSL_conf_profiles() {
      $scope.SSL_conf_profiles.length = 0;
      return SSL_conf_profiles.query().$promise
        .then(function(list) {
          $scope.SSL_conf_profiles = list;
          if ($scope.model.ssl_conf_profile === '') {
            // set default value for ssl_conf_profile
            $scope.model.ssl_conf_profile = $scope.SSL_conf_profiles[0].id;
          } else {
            // fill values for SSL Conf Profile
            var _conf_profile = _.find($scope.SSL_conf_profiles, {
              id: $scope.model.ssl_conf_profile
            });
            if (!!_conf_profile) {
              $scope.model.ssl_protocols = _conf_profile.ssl_protocols;
              $scope.model.ssl_ciphers = _conf_profile.ssl_ciphers;
              $scope.model.ssl_prefer_server_ciphers = _conf_profile.ssl_prefer_server_ciphers;
            }
          }
        }).$promise;
    }
    /**
     * @name  getDomain
     * @description
     *
     * @param  {String} id
     * @return
     */
    $scope.getDomain = function(id) {
      $scope.get(id)
        .then(saveNoChangingValue)
        .then(validateDomainProperties)
        .then(function() {
          if ($scope.model.ssl_conf_profile !== '') {
            $scope.isCustomSSL_conf_profile = false;
          } else {
            $scope.isCustomSSL_conf_profile = true;
          }
          return $q.all([fetchSSL_certificates(), fetchSSL_conf_profiles()]);
        })
        .catch(function(err) {
          $scope.alertService.danger('Could not load domain details');
        });

      /**
       * @name  validateDomainProperties
       * @description
       *
       * Rules:
       * 1. If “Origin Communication Protocol”(origin_secure_protocol) is not specified in the received JSON then set it to default value “Use End User Protocol”
       * 2. The default value for “RUM Data Collection”(rev_component_co.enable_rum) must to be “false”
       * @param  {[type]} domain [description]
       * @return {[type]}        [description]
       */
      function validateDomainProperties(domain) {
        // $scope.modelAdvance = {'loading':'Please wait few seconds...'};
        $timeout(function() {
          $scope.modelAdvance = angular.copy($scope.prepareSimpleDomainUpdate(domain));
        }, 2000);

        var _domain_default_property = {
          proxy_timeout: 20,
          domain_aliases: [],
          origin_secure_protocol: 'use_end_user_protocol',
          rev_component_co: {
            enable_rum: false
          }
        };
        // NOTE: set default properties
        _.defaultsDeep($scope.model, _domain_default_property);
        delete $scope.model.domain_name;
        delete $scope.model.cname;
        delete $scope.model.id;
        angular.forEach($scope.model.rev_component_bp.caching_rules, function(item) {
          // NOTE: add parameter for collapsed item
          angular.extend(item, {
            $$cachingRuleState: {
              isCollapsed: true
            }
          });
          // NOTE: Check existing  requered fields
          if (!item.edge_caching.query_string_keep_or_remove_list) {
            item.edge_caching.query_string_keep_or_remove_list = [];
          }
        });
      }
      /**
       * @name  saveNoChangingValue
       * @description
       *
       * Save no changing params
       *
       * @param  {Object} model
       * @return {Promise}
       */
      function saveNoChangingValue(model) {
        $scope.modelInfo = {
          domain_name: model.domain_name,
          cname: model.cname
        };
        delete model.domain_name;
        delete model.cname;
        delete model.id;
        return $q.when(model);
      }
    };

    $scope.deleteDomain = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        var domainName = model.domain_name;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.alertService.success('Domain ' + domainName + ' deleted.');
            $scope.list()
              .then(setAccountName);
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
      });
    };

    $scope.createDomain = function(model) {
      $scope
        .create(model)
        .then(function() {
          $scope.alertService.success('Domain created', 5000);
          $scope.setAccountId();
        })
        .catch($scope.alertService.danger);
    };

    $scope.publishDomain = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', model).then(function() {
        model = $scope.prepareSimpleDomainUpdate(model);
        $scope.update({
            id: modelId,
            options: 'publish'
          }, model)
          .then(function(data) {
            $scope.alertService.success('Domain configuration published', 5000);
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
      });
    };

    $scope.validateDomain = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareSimpleDomainUpdate(model);
      $scope.update({
          id: modelId,
          options: 'verify_only'
        }, model)
        .then(function(data) {
          $scope.alertService.success('The domain configuration is correct', 5000);
        })
        .catch(function(err) {
          $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
        });
    };

    $scope.updateDomain = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareSimpleDomainUpdate(model);
        $scope.update({
            id: modelId
          }, model)
          .then(function() {
            $scope.alertService.success('Domain updated', 5000);
          })
          .catch(function(err) {
            $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
          });
      });
    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };

    $scope.disableSubmit = function(model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.domain_name ||
          !model.account_id ||
          !model.origin_server ||
          !model.origin_host_header ||
          !model.origin_server_location_id;
      } else {
        return $scope._loading ||
          !model.account_id ||
          !model.origin_server ||
          !model.origin_host_header ||
          !model.origin_server_location_id ||
          !model.proxy_timeout;
      }
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };


    /**
     * Get editor instance
     */
    $scope.jsonEditorEvent = function(instance) {
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function(val) {
      // if editor text is empty just return
      if (!val) {
        $scope.jsonIsInvalid = true;
        return;
      }

      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch (err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });

    /**
     * @name  onAddNewCacheRule
     * @description
     *
     * Add new caching rule
     *
     * @return
     */
    $scope.onAddNewCachingRule = function() {
      var _newCachingRule = {
        version: 1,
        url: {
          is_wildcard: true,
          value: '' // NOTE: must be empty for a new Caching Rule
        },
        edge_caching: {
          new_ttl: 0,
          override_no_cc: false,
          override_origin: false,
          query_string_list_is_keep: false,
          query_string_keep_or_remove_list: []
        },
        browser_caching: {
          force_revalidate: false,
          new_ttl: 0,
          override_edge: false
        },
        cookies: {
          ignore_all: false,
          keep_or_ignore_list: [],
          list_is_keep: false,
          override: false,
          remove_ignored_from_request: false,
          remove_ignored_from_response: false
        },
        $$cachingRuleState: {
          isCollapsed: true
        }
      };
      $scope.model.rev_component_bp.caching_rules.push(_newCachingRule);
      $scope.alertService.success('A new default caching rule has been added to the end of the list. Please configure the rule before saving the configuration.');
    };
    /**
     * @name  onRemoveCachingRule
     * @description
     *
     * Deleting Caching
     *
     * @return
     */
    $scope.onRemoveCachingRule = function(index) {
      $scope.confirm('confirmModalDeleteCachingRule.html', {
          url: $scope.model.rev_component_bp.caching_rules[index].url
        })
        .then(function() {
          $scope.model.rev_component_bp.caching_rules.splice(index, 1);
          $scope.alertService.success('Caching Rule was deleted.');
        });
    };
    /**
     * @name  onUpCachingRule
     * @description
     *
     * @param  {Object} element - Caching Rule Object
     * @return {Boolean|Integer}
     */
    $scope.onUpCachingRule = function(element) {
      var array = $scope.model.rev_component_bp.caching_rules;
      var index = array.indexOf(element);
      // Item non-existent?
      if (index === -1) {
        return false;
      }
      // If there is a previous element in sections
      if (array[index - 1]) {
        // Swap elements
        array.splice(index - 1, 2, array[index], array[index - 1]);
      } else {
        // Do nothing
        return 0;
      }
    };
    /**
     * @name  onDownCachingRule
     * @description
     *
     * @param  {Object} element - Caching Rule Object
     * @return {Boolean|Integer}
     */
    $scope.onDownCachingRule = function(element) {
      var array = $scope.model.rev_component_bp.caching_rules;
      var index = array.indexOf(element);
      // Item non-existent?
      if (index === -1) {
        return false;
      }
      // If there is a next element in sections
      if (array[index + 1]) {
        // Swap elements
        array.splice(index, 2, array[index + 1], array[index]);
      } else {
        // Do nothing
        return 0;
      }
    };

    /**
     * @name  onCollapsAllCachingRule
     * @description
     *
     * @return
     */
    $scope.onCollapsAllCachingRule = function() {
      var _rules = $scope.model.rev_component_bp.caching_rules;
      angular.forEach(_rules, function(item) {
        item.$$cachingRuleState.isCollapsed = true;

      });
    };
    /**
     * @name  onExpandAllCachingRule
     * @description
     *
     * @return
     */
    $scope.onExpandAllCachingRule = function() {
      var _rules = $scope.model.rev_component_bp.caching_rules;
      angular.forEach(_rules, function(item) {
        item.$$cachingRuleState.isCollapsed = false;
      });
    };

    $scope.onChangeModeView = function() {
      $scope.isAdvancedMode = !$scope.isAdvancedMode;
    };
    /**
     * @description
     *
     * Watch by changing "isAdvancedMode"
     * Make synce data
     *
     * @param  {Boollean} newVal
     * @param  {Boolean} oldVal
     * @return
     */
    var _id_ssl_conf_profile = '';
    $scope.$watch('isAdvancedMode', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal === true) {
        var newModel = $scope.prepareSimpleDomainUpdate($scope.model);
        _id_ssl_conf_profile = $scope.model.ssl_conf_profile;
        $scope.modelAdvance = angular.copy(newModel);
        if ($scope.isCustomSSL_conf_profile === true) {
          $scope.modelAdvance.ssl_conf_profile = '';
        }
      }
      if (newVal !== oldVal && newVal === false) {
        if (_id_ssl_conf_profile !== '') {
          $scope.modelAdvance.ssl_conf_profile = _id_ssl_conf_profile;
        }
        _.merge($scope.model, $scope.modelAdvance);
        if ($scope.isCustomSSL_conf_profile === false) {
          syncSSL_conf_profile($scope.model.ssl_conf_profile);
        }
      }
    });

    $scope.$watch('model.ssl_conf_profile', function(newVal, oldVal) {
      if (newVal !== oldVal && !!newVal) {
        syncSSL_conf_profile(newVal);
      }
    });

    $scope.$watch('isCustomSSL_conf_profile', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== 'undefuned') {
        if (newVal === false) {
          syncSSL_conf_profile($scope.model.ssl_conf_profile);
        }
      }
    });
    /**
     * @name  syncSSL_conf_profile
     * @description
     *
     *
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function syncSSL_conf_profile(id) {
      var item = _.find($scope.SSL_conf_profiles, {
        id: id
      });
      if (!!item) {
        angular.extend($scope.model, {
          ssl_ciphers: item.ssl_ciphers,
          ssl_protocols: item.ssl_protocols,
          ssl_prefer_server_ciphers: item.ssl_prefer_server_ciphers
        });
      }
    }

  }

})();
