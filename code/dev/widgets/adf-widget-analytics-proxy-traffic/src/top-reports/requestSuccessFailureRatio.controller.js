'use strict';
angular.module('adf.widget.analytics-proxy-traffic')
  .controller('widgetRequestSuccessFailureRatioCtrl', widgetRequestSuccessFailureRatioCtrl);

function widgetRequestSuccessFailureRatioCtrl($scope, config, Countries, Stats) {
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

  $scope.domain = $scope.config.domain;

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
  };

  $scope.reload = function() {
    if (!$scope.config.domain) {
      return;
    }
    var filters = {
      domainId: $scope.config.domain.id,
      country: $scope.config.filters.country,
      count_last_hours: $scope.config.filters.count_last_hours || '1'
    };

    $scope.reloadRequestStatus(filters);
  };


  $scope.reloadRequestStatus = function(filters) {

    $scope.requestStatus = [];
    Stats.requestStatus(generateFilterParams(filters))
      .$promise
      .then(function(data) {
        if (data.data && data.data.length > 0) {

          var st = [{
            name: 'Successfull',
            y: 0
          }, {
            name: 'Failed',
            y: 0
          }];

          angular.forEach(data.data, function(item) {
            if (item.key === 'OK') {
              st[0].y = item.count;
            } else {
              st[1].y += item.count;
            }
          });
          $scope.requestStatus = st;
        }
      });
  };
}
