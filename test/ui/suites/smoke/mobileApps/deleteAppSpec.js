/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];
  var platforms = [
    config.get('portal.mobileApps.platforms.ios'),
    config.get('portal.mobileApps.platforms.android')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Delete App', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.goToMobileApps();
        });

        afterAll(function () {
          Portal.signOut();
        });

        platforms.forEach(function (platform) {

          describe('Platform: ' + platform, function () {

            var app;

            beforeEach(function () {
              Portal.header.goTo(platform);
            });

            afterEach(function () {
            });

            it('should display delete app button',
              function () {
                var editButton = Portal.mobileApps.listPage.table
                  .getDeleteApp();
                expect(editButton.isPresent()).toBeTruthy();
              });

            it('should display a confirmation message when deleting an app',
              function () {
                app = DataProvider.generateMobileApp(platform);
                Portal.mobileApps.listPage.addNew(app);
                expect(Portal.alerts.getAll().count()).toEqual(1);
                expect(Portal.alerts.getFirst().getText())
                  .toEqual('App registered');
                Portal.header.goTo(app.platform);
                Portal.mobileApps.listPage.searchAndDelete(app);
                expect(Portal.dialog.isDisplayed()).toBeTruthy();
                Portal.dialog.clickCancel();
              });

            it('should allow to delete an app',
              function () {
                Portal.mobileApps.listPage.searchAndDelete(app);
                expect(Portal.dialog.isDisplayed()).toBeTruthy();
                Portal.dialog.clickOk();
                Portal.mobileApps.listPage.setSearch(app.name);
                var count = Portal.mobileApps.listPage.table
                  .countTotalRows();
                expect(count).toBe(0);
              });
          });
        });
      });
    });
  });
});
