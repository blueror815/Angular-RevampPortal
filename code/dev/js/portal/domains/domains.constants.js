(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .constant('DomainsCachingRuleDefault', {
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
      $cachingRuleState: {
        isCollapsed: true
      }
    });
})();
