(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('LMRTTHeatmapsController', LMRTTHeatmapsController);

  /*@ngInject*/
  function LMRTTHeatmapsController($scope, HeatmapsDrawer, Countries, Stats) {

    /**
     * Loading flag
     *
     * @type {boolean}
     * @private
     */
    $scope._loading = false;

    /**
     * Domain object that will be selected from dropdown
     *
     * @type {?Object}
     */
    $scope.domain = null;

    /**
     * Delay in hours.
     * Will load list of countries reports for last `delay` hours.
     *
     * @type {string|number}
     */
    $scope.delay = '24';

    /**
     * Loading list of country names
     */
    $scope.countries = Countries.query();
    var drawer = HeatmapsDrawer.create('#canvas-svg');


    /**
     * Loads list of country hits.
     *
     * @param {String|Number} domainId
     */
    $scope.reloadCountry = function (domainId) {
      $scope._loading = true;
      return Stats.lm_rtt_country({
          domainId: domainId,
          count: 250,
          from_timestamp: moment().subtract($scope.delay || 6, 'hours').valueOf(),
          to_timestamp: Date.now()
        })
        .$promise
        .then(function (data) {

          var world = [],
            usa = [];

          if (data.data && data.data.length > 0) {
            data.data.forEach( function (item) {
              var key = item.key.toUpperCase();
              world.push({
                name: ( $scope.countries[key] || item.key ),
                id: key,
                value: item.lm_rtt_avg_ms,
                tooltip: ( 'Avg: <strong>' + item.lm_rtt_avg_ms + '</strong> Min: <strong>' +
                  item.lm_rtt_min_ms + '</strong> Max: <strong>' + item.lm_rtt_max_ms + '</strong> ms' )
              });

              if ( key === 'US' && item.regions ) {
                usa = item.regions;
              }
            });

            usa = usa.map( function( item ) {
              return {
                id: item.key,
                name: item.key,
                value: item.lm_rtt_avg_ms,
                tooltip: ( 'Avg: <strong>' + item.lm_rtt_avg_ms + '</strong> Min: <strong>' +
                  item.lm_rtt_min_ms + '</strong> Max: <strong>' + item.lm_rtt_max_ms + '</strong> ms' )
              };
            });
          }

          return {
            world: world,
            usa: usa
          };
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    /**
     * Handle domain select
     *
     * @see {$scope.reloadCountry}
     */
    $scope.onDomainSelect = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope
        .reloadCountry($scope.domain.id)
        .then(function ( lm_rtt_data ) {
          // Redraw a new map using received data
          drawer.drawCurrentMap( lm_rtt_data );
        });

    };
  }
})();
