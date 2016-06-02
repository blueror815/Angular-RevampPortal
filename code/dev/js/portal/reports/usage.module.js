(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage', [
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ui.select',
      'ui.bootstrap.datetimepicker',
      'ng.jsoneditor',
      'ngSanitize',
      'toaster'
    ]);
})();
