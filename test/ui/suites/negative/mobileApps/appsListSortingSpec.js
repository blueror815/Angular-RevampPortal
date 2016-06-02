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

describe('Negative', function () {
  describe('Sorting List App', function () {

    var adminUser = config.get('portal.users.admin');
    var iosApps = DataProvider.generateMobileAppData('iOS', 3);
    var androidApps = DataProvider.generateMobileAppData('Android', 3);

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createMobileApps('iOS', iosApps);
      Portal.createMobileApps('Android', androidApps);
    });

    afterAll(function () {
      Portal.deleteMobileApps(iosApps);
      Portal.deleteMobileApps(androidApps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should sorted list apps ascendent and descendant - iOS', function () {
      Portal.goToMobileApps();
      Portal.header.goTo('iOS');
      var totalRows = Portal.mobileApps.listPage.table.countTotalRows();
      Portal.mobileApps.listPage.setSearch('Something weird');
      Portal.mobileApps.listPage.table.sortByName();
      var appsCount1 = Portal.mobileApps.listPage.table.countTotalRows();

      Portal.header.goTo('iOS');
      Portal.mobileApps.listPage.table.sortByName();
      var appsCount2 = Portal.mobileApps.listPage.table.countTotalRows();

      Portal.header.goTo('iOS');
      Portal.mobileApps.listPage.setSearch(' ');
      Portal.mobileApps.listPage.table.sortByName();
      var appsCount3 = Portal.mobileApps.listPage.table.countTotalRows();

      expect(appsCount1).toBe(0);
      expect(appsCount2).toBe(0);
      expect(appsCount3).toBe(totalRows);
    });

    it('should sorted list apps ascendent & descendant - Android', function () {
      Portal.goToMobileApps();
      Portal.header.goTo('Android');
      var totalRows = Portal.mobileApps.listPage.table.countTotalRows();
      Portal.mobileApps.listPage.setSearch('Something weird');
      Portal.mobileApps.listPage.table.sortByName();
      var appsCount1 = Portal.mobileApps.listPage.table.countTotalRows();

      Portal.header.goTo('Android');
      Portal.mobileApps.listPage.table.sortByName();
      var appsCount2 = Portal.mobileApps.listPage.table.countTotalRows();

      Portal.header.goTo('Android');
      Portal.mobileApps.listPage.setSearch(' ');
      Portal.mobileApps.listPage.table.sortByName();
      var appsCount3 = Portal.mobileApps.listPage.table.countTotalRows();

      expect(appsCount1).toBe(0);
      expect(appsCount2).toBe(0);
      expect(appsCount3).toBe(totalRows);
    });
  });
});