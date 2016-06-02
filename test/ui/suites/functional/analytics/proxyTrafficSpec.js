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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Proxy traffic reports', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.PROXY_TRAFFIC);
      Portal.proxyTrafficPage.selectDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should create a default proxy traffic report for Bandwidth Usage',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.proxyTrafficPage.createBandwidthUsageReport(dataReport);

        var getData = Portal.proxyTrafficPage.getBandwidthUsageValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for Total Requests',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.proxyTrafficPage.createTotalRequestsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getTotalRequestsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for HTTP HTTPS Hits',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.proxyTrafficPage.createHttpHttpsHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpHttpsHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for HTTP Status Code',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.proxyTrafficPage.createHttpStatusCodeHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpStatusCodeHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for Request Status',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.proxyTrafficPage.createRequestStatusReport(dataReport);

        var getData = Portal.proxyTrafficPage.getRequestStatusValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for Edge Cache Hits',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.proxyTrafficPage.createEdgeCacheEfficiencyHitsReport(dataReport);

        var data = Portal.proxyTrafficPage.getEdgeCacheEfficiencyHitsValues();
        expect(data.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Bandwidth Usage',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Day';
        dataReport.country = 'Mexico';
        Portal.proxyTrafficPage.createBandwidthUsageReport(dataReport);

        var getData = Portal.proxyTrafficPage.getBandwidthUsageValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Total Requests',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Day';
        dataReport.country = 'France';
        Portal.proxyTrafficPage.createTotalRequestsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getTotalRequestsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for HTTP HTTPS Hits',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Day';
        dataReport.country = 'India';
        Portal.proxyTrafficPage.createHttpHttpsHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpHttpsHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for HTTP Status Code',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Day';
        dataReport.country = 'Bolivia';
        Portal.proxyTrafficPage.createHttpStatusCodeHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpStatusCodeHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Request Status',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Day';
        dataReport.country = 'Angola';
        Portal.proxyTrafficPage.createRequestStatusReport(dataReport);

        var getData = Portal.proxyTrafficPage.getRequestStatusValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Edge Cache Hits',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Day';
        dataReport.country = 'Germany';
        Portal.proxyTrafficPage.createEdgeCacheEfficiencyHitsReport(dataReport);

        var data = Portal.proxyTrafficPage.getEdgeCacheEfficiencyHitsValues();
        expect(data.delay).toContain(dataReport.delay);
    });
  });
});
