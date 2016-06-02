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
  describe('FBT Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.FBT_REPORTS);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "First Byte Time Reports" in the portal',
      function () {
        var titleReport = Constants.fbtReports.TITLE;
        expect(Portal.fbtReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.fbtReportsPage.getTitle()).toEqual(titleReport);
    });

    it('should display default "Average FBT" report with empty data',
      function () {
        var titleChart = Constants.fbtReports.AVERAGE_FBT;
        expect(Portal.fbtReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.fbtReportsPage.getAverageFBTTitle()).toEqual(titleChart);
    });

    it('should show default "FBT values distribution" report with empty data',
      function () {
        var titleChart = Constants.fbtReports.FBT_VALUES_DISTRIBUTION;
        expect(Portal.fbtReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.fbtReportsPage.getDistributionHistogramTitle())
          .toEqual(titleChart);
    });

    it('should display default "FBT heatmap" report with empty data',
      function () {
        var titleChart = Constants.fbtReports.FBT_HEATMAP;
        expect(Portal.fbtReportsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.fbtReportsPage.getFBTHeatmapTitle()).toEqual(titleChart);
    });
  });
});
