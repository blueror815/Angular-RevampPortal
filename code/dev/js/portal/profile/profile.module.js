(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile', [
      'ui.router',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'revapm.Portal.Companies',
      'datatables',
      'datatables.bootstrap',
      'ngFileSaver'
    ]);
})();
