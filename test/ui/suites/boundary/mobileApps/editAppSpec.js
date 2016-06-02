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
  describe('Basic Edit App', function () {

    var adminUser = config.get('portal.users.admin');
    var length51Characters = new Array(52).join('x');
    var iosApps = DataProvider.generateMobileAppData('iOS', 1);
    var androidApps = DataProvider.generateMobileAppData('Android', 1);
    //var apps = iosApps.concat(androidApps);
    var apps = iosApps;

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
      var tempAppName = app.name;

      /* Verify tests: */

      it('should check "Verify" button is disabled when app name have more ' +
        'than 51 characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = length51Characters;
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledVerify();
        expect(enabled).toBe(false);
      });

      it('should click "Verify" button and validate app name with zero ' +
        'characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '';
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledVerify();
        expect(enabled).toBe(false);
      });

      it('should click "Verify" button and validate app name with empty ' +
        'and space characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '       ';
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledVerify();
        expect(enabled).toBe(false);
      });

      it('should click "Verify" button and validate app name with special ' +
        'characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :';
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledVerify();
        expect(enabled).toBe(false);
      });

      /* Update tests: */

      it('should check "Update" button is disabled when app name have more ' +
        'than 51 characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = length51Characters;
        Portal.mobileApps.editPage.form.fill(app);

        var enabled = Portal.mobileApps.editPage.form.isEnabledVerify();
        expect(enabled).toBe(false);
      });

      it('should click "Update" button and validate app name with zero ' +
        'or none characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '';
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledUpdate();
        expect(enabled).toBe(false);
      });

      it('should click "Update" button and validate app name with empty ' +
        'and space characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '       ';
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledUpdate();
        expect(enabled).toBe(false);
      });

      it('should click "Update" button and validate app name with special ' +
        'characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :';
        Portal.mobileApps.editPage.form.fill(app);
        var enabled = Portal.mobileApps.editPage.form.isEnabledUpdate();
        expect(enabled).toBe(false);
      });

      /* Publish tests: */

      it('should check "Publish" button is disabled when app name have more ' +
        'than 51 characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = length51Characters;
        Portal.mobileApps.editPage.form.fill(app);

        var enabled = Portal.mobileApps.editPage.form.isEnabledPublish();
        expect(enabled).toBe(false);
      });

      it('should click "Publish" button and validate app name with zero ' +
        'characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '';
        Portal.mobileApps.editPage.form.fill(app);

        var enabled = Portal.mobileApps.editPage.form.isEnabledPublish();
        expect(enabled).toBe(false);
      });

      it('should click "Publish" button and validate app name with empty ' +
        'and space characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '       ';
        Portal.mobileApps.editPage.form.fill(app);

        var enabled = Portal.mobileApps.editPage.form.isEnabledPublish();
        expect(enabled).toBe(false);
      });

      it('should click "Publish" button and validate app name with special ' +
        'characters - ' + app.platform, function () {
        app.name = tempAppName;
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :';
        Portal.mobileApps.editPage.form.fill(app);

        var enabled = Portal.mobileApps.editPage.form.isEnabledPublish();
        expect(enabled).toBe(false);
      });
    });
  });
});
