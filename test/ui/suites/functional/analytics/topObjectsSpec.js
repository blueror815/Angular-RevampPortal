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
  describe('Top Objects Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.TOP_OBJECTS);
      Portal.topObjectsPage.selectDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should create a default report for Top Most Requested Objects report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopMostRequestedObjects(dataReport);

        var getData = Portal.topObjectsPage.getTopMostRequestedObjects();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default report for Top Referers report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopReferers(dataReport);

        var getData = Portal.topObjectsPage.getTopReferers();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default report for Top Edge Cache Misses report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopEdgeCacheMisses(dataReport);

        var getData = Portal.topObjectsPage.getTopEdgeCacheMisses();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default report for Top 404 Not Found Objects report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTop404NotFoundObjects(dataReport);

        var getData = Portal.topObjectsPage.getTop404NotFoundObjects();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default report for Top Objects with 5XX Error Codes',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopObjects5XXErrorCodes(dataReport);

        var getData = Portal.topObjectsPage.getTopObjects5XXErrorCodes();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom report for Top Most Requested Objects',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.country = 'Mexico';
        dataReport.count = 'Top 5 Records';
        Portal.topObjectsPage.createTopMostRequestedObjects(dataReport);

        var getData = Portal.topObjectsPage.getTopMostRequestedObjects();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom report for Top Referers',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        dataReport.country = 'France';
        dataReport.count = 'Top 10 Records';
        Portal.topObjectsPage.createTopReferers(dataReport);

        var getData = Portal.topObjectsPage.getTopReferers();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom report for Top Edge Cache Misses',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.country = 'India';
        dataReport.count = 'Top 50 Records';
        Portal.topObjectsPage.createTopEdgeCacheMisses(dataReport);

        var getData = Portal.topObjectsPage.getTopEdgeCacheMisses();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom report for Top 404 Not Found Objects',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        dataReport.country = 'Bolivia';
        dataReport.count = 'Top 100 Records';
        Portal.topObjectsPage.createTop404NotFoundObjects(dataReport);

        var getData = Portal.topObjectsPage.getTop404NotFoundObjects();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom report for Top Objects with 5XX Error Codes',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.country = 'Angola';
        dataReport.count = 'Top 250 Records';
        Portal.topObjectsPage.createTopObjects5XXErrorCodes(dataReport);

        var getData = Portal.topObjectsPage.getTopObjects5XXErrorCodes();
        expect(getData.delay).toContain(dataReport.delay);
    });
  });
});
