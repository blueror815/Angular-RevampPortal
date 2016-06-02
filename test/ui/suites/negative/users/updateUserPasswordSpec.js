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

describe('Negative', function () {
  describe('Update user password', function () {

    var adminUser = config.get('portal.users.admin');
    var tom = DataProvider.generateUser('Tom');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createUser(tom);
      Portal.signOut();
    });

    afterAll(function () {
      Portal.signIn(adminUser);
      Portal.deleteUser(tom);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.signIn(tom);
      Portal.getUpdatePasswordPage();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should not enable the Update Password button when no fields are filled',
      function () {
        // Portal.addUserPage.form.fill(emptyUserData);
        var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should display error message when the "current password" is invalid',
      function () {
        var invalidCurrentPassword = 'invalidpwd';
        var newPassword = 'password2';
        Portal.updatePasswordPage.update(invalidCurrentPassword, newPassword);
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'The current user password is not correct';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should not update password when the "current password" is invalid',
      function () {
        var invalidCurrentPassword = 'invalidpwd';
        var newPassword = 'password2';
        Portal.updatePasswordPage.update(invalidCurrentPassword, newPassword);
        Portal.signOut();
        Portal.signIn({
          email: tom.email,
          password: newPassword
        });
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'Wrong username or password';
        expect(alert.getText()).toEqual(expectedMessage);
        Portal.signIn(tom);
      });

    it('should display error message when the "password" and "confirm ' +
      'password" do not match',
      function () {
        var newPassword = 'password2';
        var newPasswordConfirm = 'something2';
        Portal.updatePasswordPage.setCurrentPassword(tom.password);
        Portal.updatePasswordPage.setNewPassword(newPassword);
        Portal.updatePasswordPage.setPasswordConfirm(newPasswordConfirm);
        Portal.updatePasswordPage.clickUpdatePassword();
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'Passwords did not match';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should not allow to update password with a value less than 8 chars',
      function () {
        var newPassword = '123';
        Portal.updatePasswordPage.update(tom.password, newPassword);
        var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should display an error message when trying to update password with ' +
      'a value greater than 15 chars',
      function () {
        var newPassword = '12345678901234567890';
        Portal.updatePasswordPage.update(tom.password, newPassword);
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'child "new_password" fails because ["new_' +
          'password" length must be less than or equal to 15 characters long]';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should not update password when filling a value greater than 15 chars',
      function () {
        var newPassword = '12345678901234567890';
        Portal.updatePasswordPage.update(tom.password, newPassword);
        Portal.signOut();
        Portal.signIn({
          email: tom.email,
          password: newPassword
        });
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'Wrong username or password';
        expect(alert.getText()).toEqual(expectedMessage);
        Portal.signIn(tom);
      });
  });
});
