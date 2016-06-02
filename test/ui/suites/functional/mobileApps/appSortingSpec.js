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
  xdescribe('Sorting List App', function () {

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
      Portal.mobileApps.listPage.table.sortByName();
      var firstApp = Portal.mobileApps.listPage.table.getFirstRow();
      var appName1 = firstApp.name;

      Portal.mobileApps.listPage.table.sortByName();
      firstApp = Portal.mobileApps.listPage.table.getFirstRow();
      var appName2 = firstApp.name;
      expect(appName1).toBeLessThan(appName2);
      expect(appName2).toBeGreaterThan(appName1);

      Portal.mobileApps.listPage.table.sortByName();
      firstApp = Portal.mobileApps.listPage.table.getFirstRow();
      var appName3 = firstApp.name;
      expect(appName1).toEqual(appName3);
    });

    it('should sorted list apps ascendent & descendant - Android', function () {
      Portal.goToMobileApps();
      Portal.header.goTo('Android');
      Portal.mobileApps.listPage.table.sortByName();
      var firstApp = Portal.mobileApps.listPage.table.getFirstRow();
      var appName1 = firstApp.name;

      Portal.mobileApps.listPage.table.sortByName();
      firstApp = Portal.mobileApps.listPage.table.getFirstRow();
      var appName2 = firstApp.name;
      expect(appName1).toBeLessThan(appName2);
      expect(appName2).toBeGreaterThan(appName1);

      Portal.mobileApps.listPage.table.sortByName();
      firstApp = Portal.mobileApps.listPage.table.getFirstRow();
      var appName3 = firstApp.name;
      expect(appName1).toEqual(appName3);
    });

    it('should list apps sorted descendant by default - iOS',
      function () {
        Portal.goToMobileApps();
        Portal.header.goTo('iOS');

        var firstApp = Portal.mobileApps.listPage.table.getFirstRow();
        var appName1 = firstApp.name;
        Portal.mobileApps.listPage.table.sortByName();
        Portal.mobileApps.listPage.table.sortByName();
        firstApp = Portal.mobileApps.listPage.table.getFirstRow();
        var appName2 = firstApp.name;
        expect(appName1).toBeLessThan(appName2);
    });

    it('should list apps sorted descendant by default - Android',
      function () {
        Portal.goToMobileApps();
        Portal.header.goTo('Android');

        var firstApp = Portal.mobileApps.listPage.table.getFirstRow();
        var appName1 = firstApp.name;
        Portal.mobileApps.listPage.table.sortByName();
        Portal.mobileApps.listPage.table.sortByName();
        firstApp = Portal.mobileApps.listPage.table.getFirstRow();
        var appName2 = firstApp.name;
        expect(appName1).toBeLessThan(appName2);
    });
  });
});
