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

describe('Boundary', function () {
  describe('Add user', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      // TODO: move this to beforeAll call once issue about form-reset is fixed
      Portal.signIn(adminUser);
      Portal.getUsersPage();
    });

    afterEach(function () {
      // TODO: move this to afterAll call once issue about form-reset is fixed
      Portal.signOut();
    });

    it('should not allow to create user with long email address (> 64 chars).',
      function () {
        var tommy = DataProvider.generateUser('Tommy');
        tommy.email = 'email678901234567890123456789012345678901234567890' +
          '123456789012345@ui-test-email.com';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.createUser(tommy);
        var alerts = Portal.alerts.getAll();
        expect(alerts.count()).toEqual(1);
        var expectedMessage = 'child "email" fails because ["email" must be ' +
          'a valid email]';
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should not allow to create user with long First Name.', function () {
      var rocky = DataProvider.generateUser('Rocky');
      rocky.firstName += ' is an invalid name longer than thirty characters.';
      Portal.userListPage.clickAddNewUser();
      Portal.addUserPage.createUser(rocky);
      var alerts = Portal.alerts.getAll();
      expect(alerts.count()).toEqual(1);
      var expectedMessage = 'child "firstname" fails because ["firstname" ' +
        'length must be less than or equal to 30 characters long]';
      var alert = Portal.alerts.getFirst();
      expect(alert.getText()).toEqual(expectedMessage);
    });

    it('should not allow to create user with long Last Name.', function () {
      var paul = DataProvider.generateUser('Paul');
      paul.lastName += ' is an invalid name longer than thirty characters.';
      Portal.userListPage.clickAddNewUser();
      Portal.addUserPage.createUser(paul);
      var alerts = Portal.alerts.getAll();
      expect(alerts.count()).toEqual(1);
      var expectedMessage = 'child "lastname" fails because ["lastname" ' +
        'length must be less than or equal to 30 characters long]';
      var alert = Portal.alerts.getFirst();
      expect(alert.getText()).toEqual(expectedMessage);
    });

    it('should not create user when the "Password" value is not 8 characters ' +
      'long',
      function () {
        var michael = DataProvider.generateUser('Michael');
        michael.password = '123';
        michael.passwordConfirm = '123';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.createUser(michael);
        var alerts = Portal.alerts.getAll();
        expect(alerts.count()).toEqual(1);
        var expectedMessage = 'child "password" fails because ["password" ' +
          'length must be at least 8 characters long]';
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should not create user when the "Password" value is greater than ' +
      '15 characters long',
      function () {
        var vincent = DataProvider.generateUser('Vincent');
        vincent.password = '1234567890123456789012345678901234567890';
        vincent.passwordConfirm = '1234567890123456789012345678901234567890';
        Portal.userListPage.clickAddNewUser();
        Portal.addUserPage.createUser(vincent);
        var alerts = Portal.alerts.getAll();
        expect(alerts.count()).toEqual(1);
        var expectedMessage = 'child "password" fails because ["password" ' +
          'length must be less than or equal to 15 characters long]';
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual(expectedMessage);
      });
  });
});
