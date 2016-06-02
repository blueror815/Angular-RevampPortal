(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileDistributionsController', MobileDistributionsController);

  /*@ngInject*/
  function MobileDistributionsController($scope, $q, User, AlertService, Stats, Util) {

    $scope._loading = true;
    $scope.application = null;
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;

    $scope.destination_hits = [];
    $scope.destination_gbt = [];
    $scope.transport_hits = [];
    $scope.transport_gbt = [];
    $scope.status_hits = [];
    $scope.status_gbt = [];
    $scope.cache_hits = [];
    $scope.cache_gbt = [];
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

    //  ---------------------------------
    $scope.reloadTwo = function ( name, filters ) {

      $scope[name + '_hits'] = [];
      $scope[name + '_gbt'] = [];
      filters.report_type = name;
      return Stats.sdk_distributions( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var hits = [];
            var gbt = [];
            angular.forEach(data.data, function (item) {
              hits.push({
                name: item.key,
                y: item.count
              });
              gbt.push({
                name: item.key,
                y: item.received_bytes
              });
            });
            $scope[name + '_hits'] = hits;
            $scope[name + '_gbt'] = gbt;
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
        to_timestamp: Date.now(),
        count: 10
      };

      $scope._loading = true;
      $q.all([
          $scope.reloadTwo( 'destination', filters ),
          $scope.reloadTwo( 'transport', filters ),
          $scope.reloadTwo( 'status', filters ),
          $scope.reloadTwo( 'cache', filters ),
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
