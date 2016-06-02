/* filter-generator.directive.js */

/** 
 * 
 * @module 'revapm.Portal.Shared'
 * @desc filter generator directive
 * @example <filter-generator domain="domain" ng-model="data"></filter-generator>
 * 
 *  DOMAIN AND NG-MODEL ARE REQUIRED!
 *
 */
(function(angular, moment, _) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('filterGenerator', filterGenerator);

  filterGenerator.$inject = [
    'filterGeneratorService',
    'filterGeneratorConst'
  ];

  function filterGenerator(
    filterGeneratorService,
    filterGeneratorConst
  ) {
    var directive = {
      require: 'ngModel',
      restrict: 'E',
      scope: {
        ngModel: '=',
        domain: '='
      },
      templateUrl: 'parts/shared/filter-generator/filter-generator.html',
      link: {
        post: link
      }
    };

    return directive;

    /**
     * @name link
     * @desc link function for directive
     * @kind function
     */
    function link(scope, elem, attr, ngModel) {
      var FILTER_EVENT_TIMEOUT = 2000,
        DATE_PICKER_SELECTOR = '.date-picker',
        LAST_DAY = 'Last 1 Day',
        LAST_WEEK = 'Last 7 Days ',
        LAST_MONTH = 'Last 30 Days';

      //datepicker ranges
      var ranges = {},
        filtersAddMenu = [],
        countryFilterObject = filterGeneratorService.getFilterByFilterKey(filterGeneratorConst.COUNTRIES),
        filterChangeTimeout;

      //Default valuew is Last 1 Day!
      ranges[LAST_DAY] = [moment().subtract(1, 'days'), moment()];
      ranges[LAST_WEEK] = [moment().subtract(7, 'days'), moment()];
      ranges[LAST_MONTH] = [moment().subtract(30, 'days'), moment()];

      //date picker params
      scope.datePicker = {
        overlay: {
          show: true,
          val: LAST_DAY
        },
        options: {
          timePicker: true,
          timePickerIncrement: 30,
          ranges: ranges
        },
        date: {
          startDate: ranges[LAST_DAY][0],
          endDate: ranges[LAST_DAY][1]
        }
      };

      //sets country name constant
      scope.constants = {
        country: countryFilterObject.name
      };

      //selected filters by user
      scope.filters = [];

      //ui actions
      scope.actions = {
        showMenu: showMenu,
        addFilter: addFilter,
        removeShownFilter: removeShownFilter,
        hideMenu: hideMenu,
        refreshFilter: refreshFilter
      };

      //ui handlers
      scope.handlers = {
        filterChange: filterChange,
        overlayClickHandler: overlayClickHandler,
        daterangepickerBlur: daterangepickerBlur
      };

      //add menu filter data
      scope.addFilterMenu = {
        show: false,
        filters: getFiltersToAdd
      };

      init();

      ////////////////////

      /*
       * @name init
       * @desc logic init
       * @kind function
       */
      function init() {
        scope.$watch('ngModel', function() {
          generateFilterListMenu();
        });

        scope.$watch('domain', function() {
          generateFilterListMenu();
        });

        scope.$on('$destroy', function() {
          if (filterChangeTimeout) {
            clearTimeout(filterChangeTimeout);
          }
        });
      }

      /*
       * @name addFilter
       * @desc add filter to the filters list
       * @kind function
       * @param {Object} filter object
       */
      function addFilter(filter) {
        toggleFilterShownState(filter);
        scope.filters.push(filter);
        hideMenu();
      }

      /*
       * @name generateFilterListMenu
       * @desc generates filter list for the menu
       * @kind function
       */
      function generateFilterListMenu() {
        var domainId = scope.domain.id;

        filtersAddMenu = [];
        scope.filters = [];

        if (filterChangeTimeout) {
          clearTimeout(filterChangeTimeout);
        }

        _.forEach(ngModel.$modelValue, function(filterKey) {
          var filter = filterGeneratorService.getFilterByFilterKey(filterKey);
          if (filter.get) {
            filter
              .get(domainId)
              .then(function(data) {
                filter.vals = data.labels;
              });
          }
          filtersAddMenu.push(filter);
        });
      }

      /*
       * @name showMenu
       * @desc shows add new filter menu
       * @kind function
       */
      function showMenu() {
        scope.addFilterMenu.show = true;
      }

      /*
       * @name hideMenu
       * @desc hides menu
       * @kind function
       */
      function hideMenu() {
        scope.addFilterMenu.show = false;
      }

      /*
       * @name getFiltersToAdd
       * @desc returns filters to add for the submenu
       * @kind function
       * @returs {Array} array of filters to add
       */
      function getFiltersToAdd() {
        return _.filter(filtersAddMenu, function(filter) {
          return !filter.isShown;
        });
      }

      /*
       * @name toggleFilterShownState
       * @desc toggle filter show state
       * @kind function
       * @param {Object} filter object
       */
      function toggleFilterShownState(filter) {
        filter.isShown = !filter.isShown;
      }

      /*
       * @name removeShownFilter
       * @desc removes shown filter by index
       * @kind function
       * @param {Object} filter object
       * @param {Number} index of filter in array
       */
      function removeShownFilter(filter, $index) {
        filter.selected = '';
        toggleFilterShownState(filter);
        scope.filters.splice($index, 1);
        filterChange();
      }

      /*
       * @name filterChange
       * @desc filter change handler
       * @kind function
       * @param {Object} filter object
       */
      function filterChange() {
        startFilterChangeEventTimeout();
      }

      /*
       * @name startFilterChangeEventTimeout
       * @desc starts timeout to send fitler change event
       * @kind function
       */
      function startFilterChangeEventTimeout() {
        if (filterChangeTimeout) {
          clearTimeout(filterChangeTimeout);
        }

        filterChangeTimeout = setTimeout(function() {
          sendFilterChangeEvent();
          scope.$apply();
        }, FILTER_EVENT_TIMEOUT);
      }

      /*
       * @name sendFilterChangeEvent
       * @desc sends filter change event in the rootScope
       * @kind function
       */
      function sendFilterChangeEvent() {
        var filterSelected = {
          from_timestamp: scope.datePicker.date.startDate.toDate().getTime(),
          to_timestamp: scope.datePicker.date.endDate.toDate().getTime()
        };

        _.forEach(scope.filters, function(filter) {
          if (filter.selected) {
            filterSelected[filter.key] = filter.selected;
          }
        });

        filterGeneratorService.broadcastFilterChangeEvent(filterSelected);
      }

      /*
       * @name overlayClickHandler
       * @desc handler when user clicks on the date range picker overlay input.
       *       Hides overlay and focus on the daterangepicker
       *
       * @kind function
       */
      function overlayClickHandler() {
        var datePicker = elem.querySelectorAll(DATE_PICKER_SELECTOR)[0];
        scope.datePicker.overlay.show = false;
        datePicker.focus();
        subscribeOnDatePickerHide();
      }

      /*
       * @name daterangepickerBlur
       * @desc blur handler for the date picker. Shows overlay
       * @kind function
       * @param {Object} - datePicker object
       */
      function daterangepickerBlur(datePicker) {
        updateOverlayValue(datePicker);
      }

      /*
       * @name subscribeOnDatePickerHide
       * @desc subscribes on the datePicker hide. 
       *       Shows overlay when date picker is hidden
       *
       * @kind function
       */
      function subscribeOnDatePickerHide() {
        var datePicker = elem.querySelectorAll(DATE_PICKER_SELECTOR);

        datePicker.bind('hide.daterangepicker', function() {
          datePicker.unbind('hide.daterangepicker');
          daterangepickerBlur(datePicker);
          scope.$digest();
        });
      }

      /*
       * @name updateOverlayValue
       * @desc updates overlay value to match the date rangepicker value
       * @kind function
       * @param {Object} - datePicker object
       */
      function updateOverlayValue(datePicker) {
        var key = _.findKey(ranges, function(obj) {
          //range date
          var objStartDate = obj[0].toDate().getTime(),
            objEndDate = obj[1].toDate().getTime(),
            // selected date
            selStartDate = scope.datePicker.date.startDate.toDate().getTime(),
            selEndDate = scope.datePicker.date.endDate.toDate().getTime();
          return (objStartDate === selStartDate) && (objEndDate === selEndDate);
        });

        if (!key) {
          key = datePicker.val();
        }

        if (scope.datePicker.overlay.val !== '') {
          filterChange();
        }
        scope.datePicker.overlay.val = key;
        scope.datePicker.overlay.show = true;
      }

      /*
       * @name refreshFilter
       * @desc sends filter data
       * @kind function
       * @param {Object} - datePicker object
       */
      function refreshFilter() {
        if (filterChangeTimeout) {
          clearTimeout(filterChangeTimeout);
        }
        sendFilterChangeEvent();
      }
    }
  }
})(angular, moment, _);
