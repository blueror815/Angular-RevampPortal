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
  describe('Top Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.TOP_REPORTS);
      Portal.topReportsPage.selectDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should create a Top Proxy Traffic Report with default values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topReportsPage.createReport(dataReport);

        var getData = Portal.topReportsPage.getReportInfo();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a Top Proxy Traffic Report with custom values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        dataReport.country = 'Russian Federation';
        Portal.topReportsPage.createReport(dataReport);

        var getData = Portal.topReportsPage.getReportInfo();
        expect(getData.delay).toContain(dataReport.delay);
    });
  });
});
