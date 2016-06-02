(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTopsController', MobileTopsController);

  /*@ngInject*/
  function MobileTopsController($scope, $q, User, AlertService, Stats, Countries, Util) {

    $scope._loading = false;
    $scope.application = null;
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;
    $scope.countries = Countries.query();

    $scope.country_hits = [];
    $scope.country_users = [];
    $scope.country_gbt = [];
    $scope.os_hits = [];
    $scope.os_users = [];
    $scope.os_gbt = [];
    $scope.device_hits = [];
    $scope.device_users = [];
    $scope.device_gbt = [];
    $scope.operator_hits = [];
    $scope.operator_users = [];
    $scope.operator_gbt = [];
    $scope.network_hits = [];
    $scope.network_users = [];
    $scope.network_gbt = [];

    $scope.domain_hits = [];
    $scope.domain_gbt = [];
    $scope.status_code_hits = [];

    $scope.span = '24';

    $scope.gbtChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Util.humanFileSize(this.y, 2) + ')';
        }
      },
    };
    $scope.hitsChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, '.', '\'') + ' hits)';
        }
      },
    };
    $scope.usersChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, '.', '\'') + ' users)';
        }
      },
    };

    //  ---------------------------------
    $scope.reloadOne = function ( type, name, count, filters ) {

      $scope[name + '_' + type] = [];
      filters.report_type = name;
      filters.count = count;
      return Stats['sdk_top_' + type]( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {

              if ( name === 'country' ) {
                item.key = $scope.countries[item.key.toUpperCase()] || item.key;
              }
              newData.push({
                name: item.key,
                y: ( type === 'gbt' ? item.received_bytes : item.count )
              });
            });
            $scope[name + '_' + type] = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.reloadOther = function ( type, name, count, filters ) {

      $scope[name + '_' + type] = [];
      filters.report_type = name;
      filters.count = count;
      return Stats.sdk_distributions( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: ( type === 'gbt' ? (item.received_bytes + item.sent_bytes) : item.count )
              });
            });
            $scope[name + '_' + type] = newData;

            // debug
            // if ( type === 'gbt' && name === 'domain' ) {
            //   debugger;
            // }
            // debug
          }
        });
    };

    //  ---------------------------------
    $scope.reload = function() {

      if ( !$scope.account &&
          ( !$scope.application || !$scope.application.app_id ) ) {
        return;
      }

      var filters = {
        account_id: $scope.account,
        app_id: ( ( $scope.application && $scope.application.app_id ) || null ),
        from_timestamp: moment().subtract( $scope.span, 'hours' ).valueOf(),
        to_timestamp: Date.now()
      };

      $scope._loading = true;
      return $q.all([
          $scope.reloadOne( 'hits', 'country', 20, filters ),
          $scope.reloadOne( 'users', 'country', 20, filters ),
          $scope.reloadOne( 'gbt', 'country', 20, filters ),
          $scope.reloadOne( 'hits', 'os', 10, filters ),
          $scope.reloadOne( 'users', 'os', 10, filters ),
          $scope.reloadOne( 'gbt', 'os', 10, filters ),
          $scope.reloadOne( 'hits', 'device', 20, filters ),
          $scope.reloadOne( 'users', 'device', 20, filters ),
          $scope.reloadOne( 'gbt', 'device', 20, filters ),
          $scope.reloadOne( 'hits', 'operator', 20, filters ),
          $scope.reloadOne( 'users', 'operator', 20, filters ),
          $scope.reloadOne( 'gbt', 'operator', 20, filters ),
          $scope.reloadOne( 'hits', 'network', 2, filters ),
          $scope.reloadOne( 'users', 'network', 2, filters ),
          $scope.reloadOne( 'gbt', 'network', 2, filters ),
          $scope.reloadOther( 'gbt', 'domain', 10, filters ),
          $scope.reloadOther( 'hits', 'domain', 10, filters ),
          $scope.reloadOther( 'hits', 'status_code', 10, filters )
        ])
        .catch( function( err ) {
          AlertService.danger('Oops! Something went wrong');
          console.log( err );
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

  }
})();
