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

describe('Functional', function () {
  describe('Update user password', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.goToUpdatePassword();
    });

    it('should go to "User List" page when clicking "Back" button',
      function () {
        Portal.updatePasswordPage.clickBackToList();
        expect(Portal.userListPage.isDisplayed()).toBeTruthy();
      });

    it('should update password successfully using only letter values',
      function () {
        var andrew = DataProvider.generateUser('Andrew');
        var newPassword = 'newpassword';
        // Create user
        Portal.createUser(andrew);
        Portal.signOut();
        // Update password using new user
        Portal.signIn(andrew);
        Portal.goToUpdatePassword();
        Portal.updatePasswordPage.setCurrentPassword(andrew.password);
        Portal.updatePasswordPage.setNewPassword(newPassword);
        Portal.updatePasswordPage.setPasswordConfirm(newPassword);
        Portal.updatePasswordPage.clickUpdatePassword();
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual('Your password updated');
        // Delete user
        Portal.signOut();
        Portal.signIn(adminUser);
        Portal.deleteUser(andrew);
      });

    it('should update password successfully  using only numbers',
      function () {
        var mathew = DataProvider.generateUser('Andrew');
        var newPassword = '12345678';
        // Create user
        Portal.createUser(mathew);
        Portal.signOut();
        // Update password using new user
        Portal.signIn(mathew);
        Portal.goToUpdatePassword();
        Portal.updatePasswordPage.setCurrentPassword(mathew.password);
        Portal.updatePasswordPage.setNewPassword(newPassword);
        Portal.updatePasswordPage.setPasswordConfirm(newPassword);
        Portal.updatePasswordPage.clickUpdatePassword();
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual('Your password updated');
        // Delete user
        Portal.signOut();
        Portal.signIn(adminUser);
        Portal.deleteUser(mathew);
      });
  });
});
