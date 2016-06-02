(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainCachingRule', domainCachingRule)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-caching-rule/domain-caching-rule.tpl.html', true);
    });
  /**
   * @name  domainCachingRule
   * @description
   * @param  {Object} DomainsCachingRuleDefault
   * @return {Object}
   */
  function domainCachingRule(DomainsCachingRuleDefault) {
    var _defaultCachingRule = DomainsCachingRuleDefault;
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        rule: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-caching-rule/domain-caching-rule.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainCachingRuleController($scope) {
        'ngInject';
        var $ctrl = this;
        if (!$ctrl.rule.cookies) {
          $ctrl.rule.cookies = {
            override: false,
            ignore_all: false,
            keep_or_ignore_list: [],
            list_is_keep: false,
            remove_ignored_from_request: false,
            remove_ignored_from_response: false
          };
          // _.defaultsDeep(this.rule, _.clone(_defaultCachingRule));
        } else {
          // console.log('$ctrl.rule.cookies',$ctrl.rule.cookies)
        }
      }
    };
  }
})();
