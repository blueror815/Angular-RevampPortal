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
  describe('FBT Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.FBT_REPORTS);
      Portal.fbtReportsPage.selectDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should create an Average FBT report with default values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        Portal.fbtReportsPage.createAverageFBT(dataReport);

        var getData = Portal.fbtReportsPage.getInfoAverageFBTReport();
        expect(getData.delay).toContain(dataReport.delay);
        expect(getData.country).toContain(dataReport.country);
        expect(getData.os).toContain(dataReport.os);
        expect(getData.device).toContain(dataReport.device);
    });

    it('should create an Average FBT report with custom values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 7 Days';
        dataReport.country = 'Turkey';
        Portal.fbtReportsPage.createAverageFBT(dataReport);

        var getData = Portal.fbtReportsPage.getInfoAverageFBTReport();
        expect(getData.delay).toContain(dataReport.delay);
        expect(getData.country).toContain(dataReport.country);
        expect(getData.os).toContain(dataReport.os);
        expect(getData.device).toContain(dataReport.device);
    });

    it('should create a FBT values distribution report with default values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 6 Hours';
        Portal.fbtReportsPage.createFBTValuesDistribution(dataReport);

        var getData = Portal.fbtReportsPage.getInfoFBTValuesDistribution();
        expect(getData.delay).toContain(dataReport.delay);
        expect(getData.country).toContain(dataReport.country);
        expect(getData.os).toContain(dataReport.os);
        expect(getData.device).toContain(dataReport.device);
    });

    it('should create a FBT values distribution report with custom values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        dataReport.country = 'Antigua and Barbuda';
        Portal.fbtReportsPage.createFBTValuesDistribution(dataReport);

        var getData = Portal.fbtReportsPage.getInfoFBTValuesDistribution();
        expect(getData.delay).toContain(dataReport.delay);
        expect(getData.country).toContain(dataReport.country);
        expect(getData.os).toContain(dataReport.os);
        expect(getData.device).toContain(dataReport.device);
    });

    it('should create a FBT Heatmap report with default values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 6 Hours';
        Portal.fbtReportsPage.createFBTHeatmap(dataReport);

        var getData = Portal.fbtReportsPage.getInfoFBTHeatmap();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a FBT Heatmap report with custom values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        Portal.fbtReportsPage.createFBTHeatmap(dataReport);

        var getData = Portal.fbtReportsPage.getInfoFBTHeatmap();
        expect(getData.delay).toContain(dataReport.delay);
    });
  });
});
