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
  describe('Top Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.TOP_REPORTS);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "Top Reports" in the portal',
      function () {
        var titleReport = Constants.topReports.TITLE;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getTitle()).toEqual(titleReport);
    });

    it('should display default "Edge Cache Ratio" report with empty data',
      function () {
        var titleChart = Constants.topReports.EDGE_CACHE_RATIO;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "Status Codes Ratio" report with empty data',
      function () {
        var titleChart = Constants.topReports.HTTP_STATUS_CODES_RATIO;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "HTTP Requests Ratio" report with empty data',
      function () {
        var titleChart = Constants.topReports.HTTP_REQUESTS_RATIO;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "Top 10 Countries" report with empty data',
      function () {
        var titleChart = Constants.topReports.TOP_10_COUNTRIES;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "HTTP Methods" report with empty data',
      function () {
        var titleChart = Constants.topReports.HTTP_METHODS;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "Top 10 Content Types" report with ' +
      'empty data',
      function () {
        var titleChart = Constants.topReports.TOP_10_CONTENT_TYPES;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });
    
    it('should display the default "Top 10 OS" report with empty data',
      function () {
        var titleChart = Constants.topReports.TOP_10_OS;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "Top 10 Devices" report with empty data',
      function () {
        var titleChart = Constants.topReports.TOP_10_DEVICES;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "QUIC/Non-QUIQ Ratio" report with ' +
      'empty data',
      function () {
        var titleChart = Constants.topReports.QUIC_RATIO;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "H2/H2C/Non-HTTP2 Ratio" report with ' +
      'empty data',
      function () {
        var titleChart = Constants.topReports.HTTP2_RATIO;
        expect(Portal.topReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topReportsPage.getChartTitle()).toContain(titleChart);
    });
  });
});
