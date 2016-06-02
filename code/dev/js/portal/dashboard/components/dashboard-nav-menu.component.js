(function() {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardNavMenu', dashboardNavMenu);

  /*@ngInject*/
  function dashboardNavMenu(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      template:
      // TODO: make template as file
        '<li id="left-menu-dashboard-section" class="dashboard_menu list"  ui-sref-active-if="{class: \'active-side-menu-item\', state: \'index.dashboard\'}", ' +
        'ng-class="{\'active-side-menu-item\': menuExpanded(\'index.dashboard\')}">' +
        '<a class="side-menu-item" ng-if="vm.dashboardsList.length>0" ng-click="goToState(\'dashboard\', vm.dashboardsList[0].id)"  >' +
        '<div class="left-menu-start" style="margin-right: 3px;"><i class="fa fa-tachometer"></i> </div>' +
        'Dashboards' +
        '<i ng-click="expandMenu(\'index.dashboard\', $event)" ng-if="vm.dashboardsList.length > 0"' +
        ' class="pull-right {{ menuExpanded(\'index.dashboard\') ? \'fa fa-caret-down\' : \'fa fa-caret-up\' }}"></i>' +
        '</a>' +
        '<span ng-if="vm.dashboardsList.length==0"  class="side-menu-item item-title">' +
        '<div class="left-menu-start"><i class="fa fa-tachometer"></i> </div>' +
        ' Dashboards <dashboard-btn-new></dashboard-btn-new>' +
        '</span>' +
        '  <a  ng-if="vm.dashboardsList.length>0"  ng-repeat="dash in vm.dashboardsList" ' +
        '      ui-sref-active="active" class="side-menu-sub-item" ui-sref="index.dashboard.details({dashboardId:dash.id})">{{dash.title}}</a>' +
        '</li>',
      scope: false,
      controller: function($scope, $state, $uibModal, User, DashboardSrv, dashboard) {
        'igInject';
        var vm = this;

        this.dashboardsList = DashboardSrv.dashboardsList;
        this.structures = dashboard.structures;
        if(User.isAuthed()) {
          DashboardSrv.getAll().then(function() {

          });
        }


        // TODO: change structure
        this.changeStructure = function(name, structure) {
          //console.log(name, structure);
        };

        /**
         * @name  onCreateDashboard
         * @description Creating new dashboard
         * @param  {[type]} e Event object
         * @return
         */
        this.onCreateDashboard = function(e) {
          var newDashboardScope = $scope.$new();
          newDashboardScope._isLoading = false;
          newDashboardScope.structures = dashboard.structures;
          newDashboardScope.model = {
            title: 'Dashboard',
            structure: '6-6'
          };

          var instance = $uibModal.open({
            scope: newDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-new.modal.tpl.html', // adfEditTemplatePath,
            backdrop: 'static'
          });
          /**
           * @name  closeDialog
           * @description
           * @return
           */
          newDashboardScope.closeDialog = function() {
            // copy the new title back to the model
            //model.title = newDashboardScope.copy.title;
            // close modal and destroy the scope
            instance.close();
            newDashboardScope.$destroy();
          };

          /**
           * @name  applyDialog
           * @description
           * @param  {Object} model - new dashboard info
           * @return {[type]}       [description]
           */
          newDashboardScope.applyDialog = function(model) {
            newDashboardScope._isLoading = true;
            DashboardSrv
              .create(model)
              .then(function(data) {
                newDashboardScope.closeDialog();
                $state.go('index.dashboard.details', {
                  dashboardId: data.id
                });
              }, function(err) {
                //TODO: add AlertService
              })
              .finally(function() {
                newDashboardScope._isLoading = false;
              });
          };
        };
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }
})();

//ui-sref="index.dashboard.details({dashboardId:vm.dashboardsList[0].id})"
