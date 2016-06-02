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

describe('Negative: ', function () {
  describe('Usage Report', function () {

    var adminUser = config.get('portal.users.admin');
    var data = DataProvider.generateUsageReportData();
    var tempCompanyName = data.companyName;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.goToBilling();
      Portal.header.goTo(Constants.sideBar.billing.USAGE_REPORT);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should check that Update Report fails with invalid date', function() {
      data.companyName = 'Wrong Company 01';
      Portal.billing.usageReportPage.updateReport(data);
      var result = Portal.billing.usageReportPage.getCompanyName();
      expect(result).toEqual(tempCompanyName);
    });

    it('should check that Update Report fails with empty date', function() {
      data.companyName = '   ';
      Portal.billing.usageReportPage.updateReport(data);
      var result = Portal.billing.usageReportPage.getCompanyName();
      expect(result).toBe(tempCompanyName);
    });

    it('should check that Update Report fails with special characters date',
      function() {
        data.companyName = 'abcdefg!@#$%';
        Portal.billing.usageReportPage.updateReport(data);
        var result = Portal.billing.usageReportPage.getCompanyName();
        expect(result).toBe(tempCompanyName);
    });
  });
});
