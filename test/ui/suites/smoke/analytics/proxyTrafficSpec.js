/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {
  describe('Proxy traffic reports', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "Proxy Traffic Reports" in the portal',
      function () {
        var titleReport = Constants.proxyTraffic.TITLE;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getTitle()).toEqual(titleReport);
    });

    it('should display the default "Bandwidth Usage" report with empty data',
      function () {
        var titleChart = Constants.proxyTraffic.BANDWIDTH_USAGE;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "Total Requests" report with empty data',
      function () {
        var titleChart = Constants.proxyTraffic.TOTAL_REQUESTS;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "HTTP/HTTPS Hits" report with empty data',
      function () {
        var titleChart = Constants.proxyTraffic.HTTP_HTTPS_HITS;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "HTTP Status Code Hits" report with empty data',
      function () {
        var titleChart = Constants.proxyTraffic.HTTP_STATUS_CODE_HITS;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "Success/Failure Request Status" report ' +
      'with empty data',
      function () {
        var titleChart = Constants.proxyTraffic.REQUEST_STATUS;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "Edge Cache Efficiency Hits" report with ' +
      'empty data',
      function () {
        var titleChart = Constants.proxyTraffic.EDGE_CACHE_EFFICIENCY_HITS;
        expect(Portal.proxyTrafficPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.proxyTrafficPage.getChartTitle()).toContain(titleChart);
    });
  });
});
