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

describe('Boundary', function () {
  describe('Add New App', function () {

    var adminUser = config.get('portal.users.admin');
    var length51Characters = new Array(52).join('x');
    var iosApps = DataProvider.generateMobileAppData('iOS', 1);
    var androidApps = DataProvider.generateMobileAppData('Android', 1);
    var apps = iosApps.concat(androidApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app) {
      it('should check Register button is disabled when app name have more ' +
        'than 51 characters - ' + app.platform, function () {
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);

        Portal.mobileApps.listPage.clickAddNewApp();
        app.name = length51Characters;
        Portal.mobileApps.addPage.fill(app);
        var enabled = Portal.mobileApps.addPage.isEnabledRegister();
        expect(enabled).toBe(false);
      });

      it('should check Register button is disabled when app name have zero ' +
        'characters - ' + app.platform, function () {
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);

        Portal.mobileApps.listPage.clickAddNewApp();
        app.name = '';
        Portal.mobileApps.addPage.fill(app);
        var enabled = Portal.mobileApps.addPage.isEnabledRegister();
        expect(enabled).toBe(false);
      });

      it('should check Register button is disabled when app name have ' +
        'empty characters - ' + app.platform, function () {
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);

        Portal.mobileApps.listPage.clickAddNewApp();
        app.name = '       ';
        Portal.mobileApps.addPage.fill(app);
        var enabled = Portal.mobileApps.addPage.isEnabledRegister();
        expect(enabled).toBe(false);
      });

      xit('should check Register button is disabled when app name have ' + // jshint ignore:line
        'special characters - ' + app.platform, function () {
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);

        Portal.mobileApps.listPage.clickAddNewApp();
        app.name = '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :';
        Portal.mobileApps.addPage.fill(app);
        var enabled = Portal.mobileApps.addPage.isEnabledRegister();
        expect(enabled).toBe(false);
      });
    });
  });
});
