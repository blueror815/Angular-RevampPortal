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
  describe('Edit user', function () {
    describe('Admin-role user', function () {

      var adminUser = config.get('portal.users.admin');

      beforeAll(function () {
      });

      afterAll(function () {
      });

      beforeEach(function () {
        // TODO: Move sign-in to afterAll callback once issue about dashboard
        Portal.signIn(adminUser);
        Portal.getUsersPage();
      });

      afterEach(function () {
        // TODO: Move sign-in to afterAll callback once issue about dashboard
        Portal.signOut();
      });

      it('should update successfully an "admin-role" user to "user-role" user',
        function () {
          var tom = DataProvider.generateUser('Tom');
          tom.role = Constants.user.roles.ADMIN;
          // Add user
          Portal.createUser(tom);
          // Edit user
          Portal.userListPage.searchAndClickEdit(tom.email);
          Portal.editUserPage.form.setRole(Constants.user.roles.USER);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(tom.email);
          expect(user.getEmail()).toEqual(tom.email);
          expect(user.getRole()).toEqual(Constants.user.roles.USER);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully an "user-role" user to "admin-role" user',
        function () {
          var joe = DataProvider.generateUser('Joe');
          joe.role = Constants.user.roles.USER;
          // Add user
          Portal.createUser(joe);
          // Edit user
          Portal.userListPage.searchAndClickEdit(joe.email);
          Portal.editUserPage.form.setRole(Constants.user.roles.ADMIN);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(joe.email);
          expect(user.getEmail()).toEqual(joe.email);
          expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "first name" of an "admin-role" user',
        function () {
          var mark = DataProvider.generateUser('Mark');
          var valueToAdd = 'updated';
          mark.role = Constants.user.roles.ADMIN;
          // Add user
          Portal.createUser(mark);
          // Edit user
          Portal.userListPage.searchAndClickEdit(mark.email);
          Portal.editUserPage.form.setFirstName(valueToAdd);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(mark.email);
          expect(user.getEmail()).toEqual(mark.email);
          expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
          expect(user.getFirstName()).toContain(valueToAdd);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "last name" of an "admin-role" user',
        function () {
          var adele = DataProvider.generateUser('Adele');
          var valueToAdd = 'updated';
          adele.role = Constants.user.roles.ADMIN;
          // Add user
          Portal.createUser(adele);
          // Edit user
          Portal.userListPage.searchAndClickEdit(adele.email);
          Portal.editUserPage.form.setLastName(valueToAdd);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(adele.email);
          expect(user.getEmail()).toEqual(adele.email);
          expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
          expect(user.getLastName()).toContain(valueToAdd);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "role" of an "admin-role" user',
        function () {
          var andrew = DataProvider.generateUser('Andrew');
          andrew.role = Constants.user.roles.ADMIN;
          // Add user
          Portal.createUser(andrew);
          // Edit user
          Portal.userListPage.searchAndClickEdit(andrew.email);
          Portal.editUserPage.form.setRole(Constants.user.roles.USER);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(andrew.email);
          expect(user.getEmail()).toEqual(andrew.email);
          expect(user.getRole()).toEqual(Constants.user.roles.USER);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "access controls" of an "admin-' +
        'role" user',
        function () {
          var frank = DataProvider.generateUser('Frank');
          frank.role = Constants.user.roles.ADMIN;
          // Add user
          Portal.createUser(frank);
          // Edit user
          Portal.userListPage.searchAndClickEdit(frank.email);
          Portal.editUserPage.form.setAccessControls([
            Constants.user.accessControls.REPORTS
          ]);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          Portal.userListPage.searchAndClickEdit(frank.email);
          var role = Portal.editUserPage.form.getRole();
          expect(role).toEqual(Constants.user.roles.ADMIN);
          var reportsCheckBox = Portal.editUserPage.form.getReportsChBox();
          expect(reportsCheckBox.isSelected()).toBeTruthy();
          // Delete user
          Portal.editUserPage.clickBackToList();
          Portal.userListPage.searchAndClickDelete(frank.email);
          Portal.dialog.clickOk();
        });

      it('should update successfully the "first name" of an "user-role" user',
        function () {
          var mark = DataProvider.generateUser('Mark');
          var valueToAdd = 'updated';
          // Add user
          Portal.createUser(mark);
          // Edit user
          Portal.userListPage.searchAndClickEdit(mark.email);
          Portal.editUserPage.form.setFirstName(valueToAdd);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(mark.email);
          expect(user.getEmail()).toEqual(mark.email);
          expect(user.getRole()).toEqual(Constants.user.roles.USER);
          expect(user.getFirstName()).toContain(valueToAdd);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "last name" of an "user-role" user',
        function () {
          var adele = DataProvider.generateUser('Adele');
          var valueToAdd = 'updated';
          // Add user
          Portal.createUser(adele);
          // Edit user
          Portal.userListPage.searchAndClickEdit(adele.email);
          Portal.editUserPage.form.setLastName(valueToAdd);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(adele.email);
          expect(user.getEmail()).toEqual(adele.email);
          expect(user.getRole()).toEqual(Constants.user.roles.USER);
          expect(user.getLastName()).toContain(valueToAdd);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "role" of an "user-role" user',
        function () {
          var mathew = DataProvider.generateUser('Mathew');
          mathew.role = Constants.user.roles.USER;
          // Add user
          Portal.createUser(mathew);
          // Edit user
          Portal.userListPage.searchAndClickEdit(mathew.email);
          Portal.editUserPage.form.setRole(Constants.user.roles.ADMIN);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          var user = Portal.userListPage.searchAndGetFirstRow(mathew.email);
          expect(user.getEmail()).toEqual(mathew.email);
          expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
          // Delete user
          user.clickDelete();
          Portal.dialog.clickOk();
        });

      it('should update successfully the "access controls" of an "user-role" ' +
        'user',
        function () {
          var scott = DataProvider.generateUser('Scott');
          scott.role = Constants.user.roles.USER;
          // Add user
          Portal.createUser(scott);
          // Edit user
          Portal.userListPage.searchAndClickEdit(scott.email);
          Portal.editUserPage.form.setAccessControls([
            Constants.user.accessControls.TEST
          ]);
          Portal.editUserPage.clickUpdateUser();
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('Successfully updated the user');
          // Check user is in list
          Portal.editUserPage.clickBackToList();
          Portal.userListPage.searchAndClickEdit(scott.email);
          var role = Portal.editUserPage.form.getRole();
          expect(role).toEqual(Constants.user.roles.USER);
          var reportsCheckBox = Portal.editUserPage.form.getTestChBox();
          expect(reportsCheckBox.isSelected()).toBeTruthy();
          // Delete user
          Portal.editUserPage.clickBackToList();
          Portal.userListPage.searchAndClickDelete(scott.email);
          Portal.dialog.clickOk();
        });
    });
  });
});
