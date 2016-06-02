(function() {
  'use strict';
  //http://www.slideshare.net/RajthilakMCA/awesome-dash-angular-js-42552385
  angular
    .module('revapm.Portal.Dashboard')
    .factory('DashboardSrv', DashboardSrv)
    .run( /*ngInject*/ function(DashboardSrv) {
      //DashboardSrv.getAll();
    });

  function DashboardSrv($rootScope, $q, $http, $localStorage, $config, dashboard) {
    'ngInject';
    var API_URL = $config.API_URL;
    var dashboardsList = [];
    var requestAllDashboards = [];
    /**
     * @name getAll
     * @description get all user`s dashboards
     * @return {Promise}
     */
    function getAll() {
      var deferred = $q.defer();
      $http.get(API_URL + '/dashboards')
        .success(function(data) {
          dashboardsList.length = 0;
          angular.forEach(data, function(item) {
            dashboardsList.push(item);
          });
          deferred.resolve(dashboardsList);
        })
        .error(function() {
          deferred.reject();
        });

      return deferred.promise;
    }

    /**
     * @name  updateDashboardsListItem
     * @description Update title of dashboard in menu
     * @param  {Object} item [description]
     * @return
     */
    function updateDashboardsListItem(item) {
      var index = _.find(dashboardsList, {
        id: item.id
      });
      if (index !== -1) {
        index.title = item.title;
      }
    }

    return {
      dashboardsList: dashboardsList,
      getAll: getAll,
      /**
       * @name get
       * @description
       * @param  {String} id - dashdoars ID
       * @return {Promise}
       */
      get: function(id) {
        var deferred = $q.defer();
        $http.get(API_URL + '/dashboards/' + id)
          .success(function(data) {
            // NOTE: set standart dashboard titleTemplateUrl for all dashboards
            data.titleTemplateUrl = 'parts/dashboard/dashboard-title.tpl.html';
            deferred.resolve(data);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      },

      /**
       * @name create
       * @description Create new dashboard
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      create: function(data) {
        var deferred = $q.defer();
        var model = {
          'title': 'New Dashboard ',
          'structure': '6-6',
          'rows': [{
            'columns': [{
              'styleClass': 'col-md-6',
              'widgets': []
            }, {
              'styleClass': 'col-md-6',
              'widgets': []
            }]
          }]
        };

        if (!data.rows) {
          data.rows = dashboard.structures[data.structure].rows;
        }
        angular.extend(model, data);
        $http.post(API_URL + '/dashboards', model)
          .success(function(data) {
            $rootScope.$broadcast('update:searchData');
            model.id = data.object_id;
            getAll();
            deferred.resolve(model);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      },
      /**
       * @name  set
       * @description
       * @param {Indeger} id  - dashdoard id
       * @param {Object} data - dashboard data
       */
      set: function(id, data) {
        var deferred = $q.defer();
        $http.put(API_URL + '/dashboards/' + id, data)
          .success(function(res) {
            $rootScope.$broadcast('update:searchData');
            updateDashboardsListItem(data);
            deferred.resolve();
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      },
      /**
       * @name  delete
       * @description Delete dashboard
       * @param  {[type]} id - dashboard id
       * @return {Promise}
       */
      delete: function(id) {
        var deferred = $q.defer();
        $http.delete(API_URL + '/dashboards/' + id)
          .success(function(data) {
            $rootScope.$broadcast('update:searchData');
            deferred.resolve(data);
            getAll();
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }
})();
