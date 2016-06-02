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
var Portal = require('./../../page_objects/portal');
var DataProvider = require('./../../common/providers/data');

xdescribe('Setup', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.admin')
  ];
  var platforms = [
    config.get('portal.mobileApps.platforms.ios'),
    config.get('portal.mobileApps.platforms.android')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      platforms.forEach(function (platform) {

        describe('Apps', function () {

          describe('Platform: ' + platform, function () {

            beforeEach(function () {
              Portal.signIn(user);
            });

            afterEach(function () {
              Portal.signOut();
            });

            var apps = [];
            var app;
            var prefix;

            for (var i = 10; i < 40; i++) {
              prefix = 'qa-' + user.role.toLowerCase().replace(/\W/g, '-') +
                '-';
              app = DataProvider.generateMobileApp(platform, true);
              app.name = app.name + '-' + i;
              apps.push(app);
            }

            apps.forEach(function (app) {
              it('should check/create app `' + app.name + '` for pagination.',
                function () {
                  Portal.createMobileAppIfNotExist(app);
                });
            });
          });
        });
      });
    });
  });
});
