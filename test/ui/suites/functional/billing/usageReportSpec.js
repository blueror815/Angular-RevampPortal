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
  describe('Usage Report', function () {

    // TODO: please add the same tests for reseller and revadmin roles.
    // For "user" role please check that the menu item is not available
    var adminUser = config.get('portal.users.admin');
    var reportData = DataProvider.generateUsageReportData();
    var USAGE_REPORT = Constants.sideBar.billing.USAGE_REPORT;

    // Defining set of users for which all below tests will be run
    var users = [
      config.get('portal.users.admin'),
      config.get('portal.users.reseller'),
      config.get('portal.users.revAdmin')
    ];

    users.forEach(function (user) {
      describe('With user: ' + user.role, function () {
        beforeAll(function () {
          Portal.signIn(adminUser);
          Portal.goToBilling();
          Portal.header.goTo(USAGE_REPORT);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('should get title from Usage Report page', function() {
            var title = Portal.billing.usageReportPage.getTitle();
            expect(title).toEqual('Usage Report');
        });

        it('should check Domains form with correct report data', function() {
          var domains = {
            title: 'Domains',
            active: 'Active',
            deleted: 'Deleted',
            sslEnabled: 'SSL Enabled',
            total: 'Total'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getDomainsForm();
          expect(result).toContain(domains.title);
          expect(result).toContain(domains.active);
          expect(result).toContain(domains.deleted);
          expect(result).toContain(domains.sslEnabled);
          expect(result).toContain(domains.total);
        });

        it('should check Mobile Apps form with correct report data', function() {
          var mobileApps = {
            active: 'Active',
            deleted: 'Deleted',
            total: 'Total'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getMobileAppsForm();
          expect(result).toContain(mobileApps.active);
          expect(result).toContain(mobileApps.deleted);
          expect(result).toContain(mobileApps.total);
        });

        it('should check API Keys form with correct report data', function() {
          var apiKeys = {
            active: 'Active',
            inactive: 'Inactive',
            total: 'Total'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getApiKeysForm();
          expect(result).toContain(apiKeys.active);
          expect(result).toContain(apiKeys.inactive);
          expect(result).toContain(apiKeys.total);
        });

        it('should check Total Traffic form with correct report data', function() {
          var totalTraffic = {
            hits: 'Hits',
            sent: 'Sent',
            received: 'Received',
            bwSent: 'BW Sent',
            bwReceived: 'BW Received'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getTotalTrafficForm();
          expect(result).toContain(totalTraffic.hits);
          expect(result).toContain(totalTraffic.sent);
          expect(result).toContain(totalTraffic.received);
          expect(result).toContain(totalTraffic.bwSent);
          expect(result).toContain(totalTraffic.bwReceived);
        });

        it('should check Edge Cache Usage form with correct report', function() {
          var edgeCacheUsage = {
            hit: 'HIT',
            miss: 'MISS'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getEdgeCacheUsageForm();
          expect(result).toContain(edgeCacheUsage.hit);
          expect(result).toContain(edgeCacheUsage.miss);
        });

        it('should check HTTP HTTPS Requests form with correct report', function() {
          var httpHttpsRequests = {
            http: 'HTTP',
            https: 'HTTPS'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getHTTPHTTPSRequestsForm();
          expect(result).toContain(httpHttpsRequests.http);
          expect(result).toContain(httpHttpsRequests.https);
        });
      });
    });
  });
});
