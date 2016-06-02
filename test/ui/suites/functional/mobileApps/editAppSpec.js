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
  describe('Basic Edit App And Update', function () {

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
      Portal.deleteMobileApps(iosApps);
      Portal.deleteMobileApps(androidApps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app) {
        it('should get the title from basic edited app - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);

            var title = Portal.mobileApps.editPage.getTitle();
            expect(title).toContain('Edit App');
        });

        it('should basic edit and "verify" an existing app - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editPage.verify(app);

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is correct';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "update" an existing app - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editPage.update(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App updated';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "publish" an existing app - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editPage.publish(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is published';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "verify" the app name - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            var tempAppName = app.name;
            app.name = app.name + 'UPDATED';
            Portal.mobileApps.editPage.verify(app);

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is correct';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            app.name = tempAppName;
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "update" the app name - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            var tempAppName = app.name;
            app.name = app.name + 'UPDATED';
            Portal.mobileApps.editPage.update(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App updated';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            app.name = tempAppName; //TODO: Remove this line, once edit is fixed
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "publish" the app name - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            var tempAppName = app.name;
            app.name = app.name + 'UPDATED';
            Portal.mobileApps.editPage.publish(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is published';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            app.name = tempAppName; //TODO: Remove this line, once edit is fixed
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should verify staging status after "publish" - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editPage.publish(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is published';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
            var row = Portal.mobileApps.listPage.table.getFirstRow();
            expect(row.stagingStatus).toEqual('Staging Status: Published');
            expect(row.globalStatus).toEqual('Global Status: Published');
        });

        it('should verify global status after "update" - ' + app.platform,
          function () {
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editPage.update(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App updated';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
            var row = Portal.mobileApps.listPage.table.getFirstRow();
            expect(row.stagingStatus).toEqual('Staging Status: Published');
            expect(row.globalStatus).toEqual('Global Status: Modified');
        });
    });
  });
});
