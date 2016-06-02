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
  describe('Add user', function () {

    // TODO: please add negaive tests for reseller and revadmin roles

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.getUsersPage();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should not create user when a required field is filled with blank ' +
      'space chars',
      function () {
        var emptyUserData = {};
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(emptyUserData);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create user when the filled email is already used by ' +
      'another user',
      function () {
        var tom = DataProvider.generateUser('Tom');
        var jerry = DataProvider.generateUser('Jerry');
        jerry.email = tom.email;
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.createUser(tom);
        Portal.addUserPage.createUser(jerry);
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'The email address is already used by another user';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should not allow to create a user without email',
      function () {
        var derek = DataProvider.generateUser('Derek');
        derek.email = '';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(derek);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to create a user without first name',
      function () {
        var mathew = DataProvider.generateUser('Mathew');
        mathew.firstName = '';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(mathew);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to create a user without last name',
      function () {
        var mathew = DataProvider.generateUser('Mathew');
        mathew.lastName = '';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(mathew);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to create a user without any role',
      function () {
        var scott = DataProvider.generateUser('Scott');
        delete scott.role;
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(scott);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });


    it('should not allow to create a user without password',
      function () {
        var brian = DataProvider.generateUser('Brian');
        delete brian.password;
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(brian);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to create a user without confirmation password',
      function () {
        var brian = DataProvider.generateUser('Brian');
        delete brian.passwordConfirm;
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.form.fill(brian);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should display an error message when creating user when "Password" ' +
      'and "Confirmation Password" do not match',
      function () {
        var vincent = DataProvider.generateUser('Vincent');
        vincent.password = 'something';
        vincent.passwordConfirm = 'different';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.createUser(vincent);
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'Passwords did not match';
        expect(alert.getText()).toEqual(expectedMessage);
      });
  });
});
