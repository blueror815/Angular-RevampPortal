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
  describe('Edit App Advanced Mode', function () {

    var adminUser = config.get('portal.users.admin');
    var iosApps = DataProvider.generateMobileAppData('iOS', 1);
    var androidApps = DataProvider.generateMobileAppData('Android', 1);
    var apps = iosApps.concat(androidApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createMobileApps('iOS', iosApps);
      Portal.createMobileApps('Android', androidApps);
    });

    afterAll(function () {
      Portal.deleteMobileApps(apps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app) {
      it('should edit advanced mode & "verify" json editor - ' + app.platform,
        function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          Portal.mobileApps.listPage.searchAndAdvancedEdit(app);
          Portal.mobileApps.advancedEditPage.verify();

          Portal.header.goTo(app.platform);
          var findApp = Portal.mobileApps.listPage.findApp(app);
          expect(findApp).toBe(1);
      });

      it('should edit advanced mode & "update" json editor - ' + app.platform,
        function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          Portal.mobileApps.listPage.searchAndAdvancedEdit(app);
          Portal.mobileApps.advancedEditPage.update();
          Portal.dialog.clickOk();

          Portal.header.goTo(app.platform);
          var findApp = Portal.mobileApps.listPage.findApp(app);
          expect(findApp).toBe(1);
      });

      it('should edit advanced mode & "publish" json editor - ' + app.platform,
        function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          Portal.mobileApps.listPage.searchAndAdvancedEdit(app);
          Portal.mobileApps.advancedEditPage.publish();
          Portal.dialog.clickOk();

          Portal.header.goTo(app.platform);
          var findApp = Portal.mobileApps.listPage.findApp(app);
          expect(findApp).toBe(1);
      });
    });
  });
});
