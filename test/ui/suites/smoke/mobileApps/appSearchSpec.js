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

      describe('Search App', function () {

        platforms.forEach(function (platform) {

          describe('Platform: ' + platform, function () {

            var app;

            beforeAll(function () {
              Portal.signIn(user);
              app = DataProvider.generateMobileApp(platform);
              Portal.createMobileApps(platform, [app]);
              Portal.goToMobileApps();
            });

            afterAll(function () {
              Portal.deleteMobileApps([app]);
              Portal.signOut();
            });

            beforeEach(function () {
              Portal.header.goTo(platform);
            });

            afterEach(function () {
            });

            it('should be displayed when displaying `App List` page',
              function () {
                var searchField = Portal.mobileApps.listPage.searcher
                  .getSearchCriteriaTxtIn();
                expect(searchField.isPresent()).toBeTruthy();
              });

            it('should search and filter an existing app',
              function () {
                var appsFound = Portal.mobileApps.listPage.findApp(app);
                expect(appsFound).toBe(1);
              });

            it('should search and filter a non-existing app',
              function () {
                var neApp = {
                  name: 'Non existing app ' + Date.now()
                };
                var appsFound = Portal.mobileApps.listPage.findApp(neApp);
                expect(appsFound).toBe(0);
              });
          });
        });
      });
    });
  });
});
