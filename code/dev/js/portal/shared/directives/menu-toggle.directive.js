(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('menuToggle', menuToggle);


  menuToggle.$inject = [];

  function menuToggle() {
    var directive = {
      restrict: 'A',
      scope: {
        menuToggle: '=',
      },
      controller: MenuToggleCtrl
    };

    return directive;
  }

  MenuToggleCtrl.$inject = [
    '$scope'
  ];

  function MenuToggleCtrl(
    $scope
  ) {

    function update(hide) {
      if(hide === undefined) {
        return;
      }

      var drawer = $('#drawer');
      var main = $('#main');

      if(drawer.is(':visible') && !hide){
        hide = true;
      } else if(!drawer.is(':visible') && hide){
        hide = false;
      }

      if (hide) {
        drawer.css('display', 'none');
        main.css('left', '0px');
      } else {
        main.css('left', '210px');
        drawer.css('display', 'block');
      }
    }

    $scope.$watch('menuToggle', update);

    window.onresize = function() {
      if($(window).width() < 980){
        $('#drawer').css('display', 'block');
        $('#menuToggleBtn').css('display', 'none');
      } else {
        $('#menuToggleBtn').css('display', 'block');
      }
    };
  }
})(angular);
