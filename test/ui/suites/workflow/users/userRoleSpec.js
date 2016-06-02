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

describe('Workflow', function () {
  describe('User-role user', function () {

    var resellerUser = config.get('portal.users.reseller');
    var adminUser = config.get('portal.users.admin');

    it('should be able to sign-in once it is created by a reseller user',
      function () {
        var joe = DataProvider.generateUser('Joe', null, resellerUser);
        // Create user
        Portal.signIn(resellerUser);
        Portal.createUser(joe);
        Portal.signOut();
        // Check new user can sign in
        Portal.signIn(joe);
        var userInfoEl = Portal.header.getUserInfoEl();
        expect(userInfoEl.isDisplayed()).toBeTruthy();
        Portal.signOut();
        // Delete user
        Portal.signIn(resellerUser);
        Portal.deleteUser(joe);
        Portal.signOut();
      });

    it('should be able to sign-in once it is created by an admin user',
      function () {
        var paul = DataProvider.generateUser('Paul');
        // Create user
        Portal.signIn(adminUser);
        Portal.createUser(paul);
        Portal.signOut();
        // Check new user can sign in
        Portal.signIn(paul);
        var userInfoEl = Portal.header.getUserInfoEl();
        expect(userInfoEl.isDisplayed()).toBeTruthy();
        Portal.signOut();
        // Delete user
        Portal.signIn(adminUser);
        Portal.deleteUser(paul);
        Portal.signOut();
      });

    it('should be able to sign-in after a successful password update',
      function () {
        var peter = DataProvider.generateUser('Peter');
        var newPassword = 'password3';
        // Create user
        Portal.signIn(adminUser);
        Portal.createUser(peter);
        Portal.signOut();
        // Sign in with new user and change password
        Portal.signIn(peter);
        Portal.getUpdatePasswordPage();
        Portal.updatePasswordPage.update(peter.password, newPassword);
        Portal.signOut();
        // Sign-in using new password and validate
        Portal.signIn({email: peter.email, password: newPassword});
        var userInfoEl = Portal.header.getUserInfoEl();
        expect(userInfoEl.isDisplayed()).toBeTruthy();
        Portal.signOut();
        // Delete user created
        Portal.signIn(adminUser);
        Portal.deleteUser(peter);
        Portal.signOut();
      });
  });
});
