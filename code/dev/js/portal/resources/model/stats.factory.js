(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Stats', StatsResource);

  /*@ngInject*/
  function StatsResource(Resource, $config) {
    return Resource($config.API_URL + '/stats/:domainId', {
      // domainId: ''
    }, {
      // Actions
      os: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'os',
          count: 10
        }
      },
      device: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'device',
          count: 10
        }
      },
      country: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'country',
          count: 10
        }
      },
      protocol: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'protocol'
        }
      },
      httpProtocol: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'http_protocol'
        }
      },
      httpMethod: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'http_method'
        }
      },
      statusCode: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'status_code'
        }
      },
      contentType: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'content_type'
        }
      },
      cacheStatus: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'cache_status'
        }
      },
      requestStatus: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'request_status'
        }
      },
      quic: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'QUIC'
        }
      },
      http2: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'http2'
        }
      },
      top5xx: {
        method: 'GET',
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'top5xx'
        }
      },
      traffic: {
        method: 'GET'
      },
      referer: {
        url: $config.API_URL + '/stats/top/:domainId',
        params: {
          report_type: 'referer'
        }
      },

      topObjects: {
        method: 'GET',
        url: $config.API_URL + '/stats/top_objects/:domainId',
        params: {

        }
      },

      lm_rtt_country: {
        method: 'GET',
        url: $config.API_URL + '/stats/lastmile_rtt/:domainId',
        params: {
          report_type: 'country',
          count: 10
        }
      },
      gbt_country: {
        method: 'GET',
        url: $config.API_URL + '/stats/gbt/:domainId',
        params: {
          report_type: 'country',
          count: 10
        }
      },

      fbt_average: {
        method: 'GET',
        url: $config.API_URL + '/stats/fbt/average/:domainId',
        params: {}
      },
      fbt_distribution: {
        method: 'GET',
        url: $config.API_URL + '/stats/fbt/distribution/:domainId',
        params: {}
      },
      fbt_heatmap: {
        method: 'GET',
        url: $config.API_URL + '/stats/fbt/heatmap/:domainId',
        params: {}
      },

      sdk_dirs: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/dirs',
        params: {}
      },
      sdk_flow: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/flow',
        params: {}
      },
      sdk_agg_flow: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/agg_flow',
        params: {}
      },
      sdk_top_hits: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/top_requests',
        params: {}
      },
      sdk_top_users: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/top_users',
        params: {}
      },
      sdk_top_gbt: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/top_gbt',
        params: {}
      },
      sdk_distributions: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/distributions',
        params: {}
      },
      sdk_top_objects: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/top_objects',
        params: {}
      },
      sdk_top_objects_time: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/top_objects/slowest',
        params: {}
      },
      sdk_top_objects_5xx: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/top_objects/5xx',
        params: {}
      },
      sdk_ab_fbt: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/ab/fbt',
        params: {}
      },
      sdk_ab_fbt_distribution: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/ab/fbt_distribution',
        params: {}
      },
      sdk_ab_errors: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/ab/errors',
        params: {}
      },
      sdk_ab_speed: {
        method: 'GET',
        url: $config.API_URL + '/stats/sdk/ab/speed',
        params: {}
      },

      usage_web: {
        method: 'GET',
        url: $config.API_URL + '/usage_reports/web',
        params: {
          only_overall: true,
          keep_samples: false,
        }
      }
    });
  }
})();
