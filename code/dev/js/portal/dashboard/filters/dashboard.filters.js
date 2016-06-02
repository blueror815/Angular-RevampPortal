(function() {

  angular.module('revapm.Portal.Dashboard')
    .filter('orderWidgets', orderWidgets);
  // NOTE:  default order list
  var _default_order_widgets = [
    'analytics-proxy-traffic-bandwidth-usage', // "Bandwidth Usage"
    'analytics-proxy-traffic-chart', // "Total Requests"
    'analytics-proxy-traffic-http-https-chart', // "HTTP/HTTPS Hits"
    'analytics-proxy-hits-cache-chart', // "Edge Cache Efficiency Hits"
    'adf-widget-gbt-heatmaps', //"GBT Heatmap"
    'adf-widget-top-10-countries', // "Top 10 Countries"
    'adf-widget-http-https-requests-ratio', // "Request Success/Failure Ratio"
    'bluetriangletech-conversions-subcategories', //"Conversion Rate"
    'bluetriangletech-bounce-rate', //"Bounce Rate"
    'bluetriangletech-brand-conversion-rate', // "Brand Conversion Rate"
    'bluetriangletech-lost-revenue-calculator', //"Lost Revenue Calculator"
    'bluetriangletech-traffic-info', //"BTT Traffic Parameters"
    'widget-norse-live-attack-map', //"Norse Live Attack Map"
  ];
  /**
   * @name  orderWidgets
   * @description
   *
   * RU: Функция сортировки списка виджетов
   *
   * @return {Object} - reorder widgets list
   */
  function orderWidgets() {

    return function(widgets, keys) {
      var _orderWidgets = {};
      if (orderWidgets.widgetList) {
        return orderWidgets.widgetList;
      }
      var _widgets = angular.copy(widgets);

      orderWidgets.widgetList = {};

      angular.forEach(_default_order_widgets, function(key) {
        widgets[key].edit.immediate = true;// NOTE: open edit window immediate
        orderWidgets.widgetList[key] = _widgets[key];

        delete _widgets[key];
      });
      // add anothe widget not set in "_default_order_widgets"
      angular.forEach(_widgets, function(item, key) {
        orderWidgets.widgetList[key] = item;
      });
      return orderWidgets.widgetList;
    };
  }

})();
