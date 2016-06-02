//origin-request-headers
(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('originRequestHeaders', originRequestHeaders);

  // TODO: create docs use API information
  // origin_request_headers {
  // header_value (string),
  // header_name (string),
  // operation (string) = ['add' or 'remove' or 'replace']
  // }
  var _originRequestHeaderObject = {
    header_value: '',
    header_name: '',
    operation: 'add'
  };

  var _refOriginRequestHeaderOperation = [
    'add', 'remove', 'replace'
  ];


  function originRequestHeaders() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        origin_request_headers: '=ngModel'
      },
      templateUrl: 'parts/domains/origin-request-headers/origin-request-headers.tpl.html',
      controllerAs: '$ctrl',
      controller: function originRequestHeadersController($scope, $uibModal) {
        'ngInject';
        var $ctrl = this;
        this.newOriginRequestHeader = {
          operation: 'add',
          header_name: '',
          header_value: ''
        };

        /**
         * @name  onAddNew
         * @description
         * @param  {Object} newOriginRequestHeader
         * @return
         */
        this.onAddNew = function(newOriginRequestHeader) {
          if (!_.isArray($ctrl.origin_request_headers)) {
            $ctrl.origin_request_headers = [];
          }
          $ctrl.origin_request_headers.push(_.clone(newOriginRequestHeader));
          $ctrl.newOriginRequestHeader = {
            operation: 'add',
            header_name: '',
            header_value: ''
          };
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
            controller: /*ngInject*/ function($scope, $uibModalInstance, model) {
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
                return $ctrl.origin_request_headers[index];
              }
            }
          });

          modalInstance.result
            .then(function() {
              $ctrl.origin_request_headers.splice(index, 1);
            }, function() {
              // TODO: Alert ?
            });

        };
      }
    };
  }
})();
