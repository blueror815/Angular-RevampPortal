(function() {
  'use strict';
  /**
   * @name revapm.Portal.BlueTriangleTech
   *
   */
  angular.module('revapm.Portal.BlueTriangleTech')
    .value('BTTPortalConfig', {
      authKey: 'a340ef373d412edcb431cf11a0b627c9',
      url_api: 'https://portal.bluetriangletech.com/BTTPortal/api',

      url_demo: 'https://portal.bluetriangletech.com/BTTPortal/api/conversions_html.php' +
        '?&ReportPage%5B%5D=subcategory&BrowserType=All%20Browsers&Country=All%20Countries&GranularitySelect=1.0&StatSig=0&siteID=567' +
        '&authKey=a340ef373d412edcb431cf11a0b627c9&timePeriod=hours_3&slowestFastest=slowest_500&refresh_rate=60&StatMethod=85&TimeZone=America/New_York' +
        '&startEpoch=1458872580&endEpoch=1458883380&offset=10800&startTime=22:23&endTime=01:23&startDate=2016-3-24&endDate=2016-3-24',
      // demo url  ”Bounce Rate”
      url_demo_bounceRate_html: 'https://portal.bluetriangletech.com/BTTPortal/api/bounceRate_html.php?&ReportPage%5B%5D=subcategory&BrowserType=All%20Browsers&' +
        'Country=All%20Countries&GranularitySelect=1.0&StatSig=0&siteID=567&authKey=a340ef373d412edcb431cf11a0b627c9&timePeriod=hours_3&' +
        'slowestFastest=slowest_500&refresh_rate=60&StatMethod=85&TimeZone=America/New_York&startEpoch=1458752400&endEpoch=1458763200&' +
        'offset=10800&startTime=13:00&endTime=16:00&startDate=2016-3-23&endDate=2016-3-23',
      // demo url  “Brand Conversion Rate”
      url_demo_brandConversions_html: 'https://portal.bluetriangletech.com/BTTPortal/api/brandConversions_html.php?&' +
        'ReportPage%5B%5D=subcategory&BrowserType=All%20Browsers&' +
        'Country=All%20Countries&GranularitySelect=1.0&StatSig=0&siteID=567&authKey=a340ef373d412edcb431cf11a0b627c9&timePeriod=hours_3&slowestFastest=slowest_500&' +
        'refresh_rate=60&StatMethod=85&TimeZone=America/New_York&startEpoch=1458752400&endEpoch=1458763200&offset=10800&startTime=13:00&endTime=16:00&'+
        'startDate=2016-3-23&endDate=2016-3-23',
      //  demo url   “Lost Revenue Calculator”
      url_demo_lostRevenue_html: 'https://portal.bluetriangletech.com/BTTPortal/api/lostRevenue_html.php?' +
        'BrowserType=All+Browsers&Country=All+Countries&authKey=a340ef373d412edcb431cf11a0b627c9&' +
        'timePeriod=hours_3&startEpoch=1458752400&endEpoch=1458763200&offset=10800&startTime=13%3A00&endTime=16%3A00&startDate=2016-3-23&endDate=2016-3-23&' +
        'excluded_9=1&siteID=567&reportType=lostRevenue&ReportPage%5B%5D=subcategory&' +
        'GranularitySelect=1.0&StatMethod=85&refreshRate=60&TimeZone=America%2FNew_York&panelID=1458763239486&TimeZone=America/New_York&slowestFastest=slowest_500'
    });
})();
