/**
 *
 * This directive allows to use parent (or any you want) state to add active class to elements
 *
 * Example:
 *
 * as object
 * <div ui-sref='some.state' ui-sref-active-if='{class: 'activeItem', state: 'some'}'></div>
 *
 * or as string (then default 'active' class will used)
 * <div ui-sref='some.state' ui-sref-active-if='some' ui-sref-active-if-params='{id:"1"}'></div>
 * 
 */

(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('uiSrefActiveIf', uiSrefActiveIf);


  uiSrefActiveIf.$inject = [];

  function uiSrefActiveIf() {
    var directive = {
      restrict: 'A',
      scope: {
        uiSrefActiveIf: '=',
        uiSrefActiveIfParams: '=',
      },
      controller: UiSrefActiveIfCtrl
    };

    return directive;
  }

  UiSrefActiveIfCtrl.$inject = [
    '$state',
    '$rootScope',
    '$scope',
    '$element',
    '$attrs'
  ];

  function UiSrefActiveIfCtrl(
    $state,
    $rootScope,
    $scope,
    $element,
    $attr
  ) {
    if(!$rootScope.menuExpandedNodes) {
      $rootScope.menuExpandedNodes = {};
    }

    var state = null,
      classname = 'active',
      attr = $scope.uiSrefActiveIf,
      ifParams = $scope.uiSrefActiveIfParams;

    if (attr) {
      state = attr.state;
      classname = attr.class;
    } else {
      state = $attr.uiSrefActiveIf;
    }

    function update() {
      if ($state.includes(state) || $state.is(state)) {
        if (ifParams) {
          if (_.find([$state.params], ifParams)) {
            $element.addClass(classname);
            $rootScope.menuExpandedNodes[state] = true;
            $rootScope.menuExpandedNodes.current = state;
            return;
          }
        } else {
          $element.addClass(classname);
          $rootScope.menuExpandedNodes[state] = true;
          $rootScope.menuExpandedNodes.current = state;
          return;
        }
      }
    }

    $scope.$on('$stateChangeSuccess', update);
    update();
  }

})(angular);
