// end-user-response-headers
(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('endUserResponseHeaders', endUserResponseHeaders);

  // TODO: create docs use API information
  // end_user_response_headers {
  // header_value (string),
  // header_name (string),
  // operation (string) = ['add' or 'remove' or 'replace']
  // }
  var EndUserResponseHeader = {
    header_value: '',
    header_name: '',
    operation: 'add'
  };

  var refEndUserResponseHeaderOperation = [
    'add', 'remove', 'replace'
  ];


  function endUserResponseHeaders() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        end_user_response_headers: '=ngModel'
      },
      templateUrl: 'parts/domains/end-user-response-headers/end-user-response-headers.tpl.html',
      controllerAs: '$ctrl',
      controller: function endUserResponseHeadersController($scope,$uibModal) {
        'ngInject';
        var $ctrl = this;
        this.newEndUserResponseHeader = {
            operation: 'add'
          };

          /**
           * @name  onAddNew
           * @description
           * @param  {Object} newEndUserResponseHeader
           * @return
           */
        this.onAddNew = function(newEndUserResponseHeader) {
          if (!_.isArray($ctrl.end_user_response_headers)) {
            $ctrl.end_user_response_headers = [];
          }
          $ctrl.end_user_response_headers.push(_.clone(newEndUserResponseHeader));
          $ctrl.newEndUserResponseHeader = {
            operation: 'add'
          };
        };

        this.onDelete = function(index) {
          // TODO: add confirm modal windows
          $ctrl.end_user_response_headers.splice(index, 1);
        };


        /**
         * @name  onDelete
         * @description
         * @param  {Integer} index
         * @return
         */
        this.onDelete = function(index) {
          // TODO: add confirm modal windows
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/modals/confirmDeleteHeaderInfo.tpl.html',
            controller: /*ngInject*/ function ($scope,$uibModalInstance,model) {
              $scope.model = model;
              $scope.ok = function() {
                $uibModalInstance.close('ok');
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            // size: size,
            resolve: {
              model: function() {
                return $ctrl.end_user_response_headers[index];
              }
            }
          });

          modalInstance.result
            .then(function() {
              $ctrl.end_user_response_headers.splice(index, 1);
            }, function() {
               // TODO: Alert ?
            });

        };

      }
    };
  }
})();
