(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('ActivityLogController', ActivityLogController);

  /*@ngInject*/
  function ActivityLogController($scope, CRUDController, Activity, $injector, $stateParams, ActivityPhrase, $uibModal) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {$scope: $scope, $stateParams: $stateParams});

    // Set resource to work with data
    $scope.setResource(Activity);
    //Set state (ui.router)
    $scope.setState('index.accountSettings.companies');

    $scope.list = function () {
      if (!$scope.resource) {
        throw new Error('No resource provided.');
      }
      $scope.loading(true);
      //fetching data
      return $scope.resource
        .query(function (data) {
          $scope.records = data.data;
          $scope.filterList();
          $scope._checkPagination();
          return data; // Send data to future promise
        }).$promise
        .finally(function () {
          $scope.loading(false);
        });
    };

    // Fetch a list of activity records
    $scope.list();

    /**
     * Get readable activity type
     *
     * @param {String} val
     * @returns {String}
     */
    $scope.getActivityType = function(val) {
      if (!ActivityPhrase.ACTIVITY_TYPE || !ActivityPhrase.ACTIVITY_TYPE[val]) {
        return 'Unknown activity type: ' + val;
      }
      return ActivityPhrase.ACTIVITY_TYPE[val];
    };

    /**
     * Get readable activity target
     *
     * @see {@link ActivityPhrase}
     * @param {Object} log
     * @returns {String}
     */
    $scope.getActivityTarget = function(log) {
      if (!ActivityPhrase.ACTIVITY_TARGET || !ActivityPhrase.ACTIVITY_TARGET[log.activity_target]) {
        return 'Unknown activity target: ' + log.activity_target;
      }
      var target = '';
      if (log.target_name) {
        target = ' (' + log.target_name + ')';
      }
      return ActivityPhrase.ACTIVITY_TARGET[log.activity_target] + target;
    };

    /**
     * Show modal dialog with log details
     *
     * @see {@link ConfirmModalInstanceCtrl}
     * @param {Object} log
     * @returns {*}
     */
    $scope.showDetails = function(log) {
      // Need to clone object here not to overwrite defaults
      var log2 = angular.copy(log);
      log2.target_object = JSON.stringify(log2.target_object, null, '    ');
      log2.activity = $scope.getActivityType(log2.activity_type);
      log2.activity += ' ' + $scope.getActivityTarget(log2);

      // Uses ConfirmModalInstanceCtrl. This controller has all needed methods
      // So no need to create a new one.
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'activityDetails.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: {
          model: log2
        }
      });

      return modalInstance.result;
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

  }
})();
