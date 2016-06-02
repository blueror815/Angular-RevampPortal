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
  describe('User list', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getUsersPage();
    });

    it('should display N items maximum in the page (25 items by default)',
      function () {
        var expectedUsersPerPage = 25;
        var tableRows = Portal.userListPage.table.getRows();
        expect(tableRows.count()).not.toBeGreaterThan(expectedUsersPerPage);
      });

    it('should display a new user created', function () {
      var andrew = DataProvider.generateUser('Andrew');
      // Create user
      Portal.createUser(andrew);
      // Check user is in list
      var user = Portal.userListPage.searchAndGetFirstRow(andrew.email);
      expect(user.getFirstName()).toEqual(andrew.firstName);
      expect(user.getLastName()).toEqual(andrew.lastName);
      expect(user.getEmail()).toEqual(andrew.email);
      expect(user.getRole()).toEqual(andrew.role);
      // Delete user
      Portal.deleteUser(andrew);
    });

    it('should list all child users created by an specific "Admin" user',
      function () {
        var scott = DataProvider.generateUser('Scott');
        var frank = DataProvider.generateUser('Frank');
        frank.role = Constants.user.roles.ADMIN;
        // Create users
        // TODO: Remove next two lines once form-reset issue is fixed
        Portal.getUpdatePasswordPage();
        Portal.getUsersPage();
        Portal.createUser(scott);
        // TODO: Remove next two lines once form-reset issue is fixed
        Portal.getUpdatePasswordPage();
        Portal.getUsersPage();
        Portal.createUser(frank);
        // Check users are in list
        var user = Portal.userListPage.searchAndGetFirstRow(scott.email);
        expect(user.getFirstName()).toEqual(scott.firstName);
        expect(user.getLastName()).toEqual(scott.lastName);
        expect(user.getEmail()).toEqual(scott.email);
        expect(user.getRole()).toEqual(scott.role);
        user = Portal.userListPage.searchAndGetFirstRow(frank.email);
        expect(user.getFirstName()).toEqual(frank.firstName);
        expect(user.getLastName()).toEqual(frank.lastName);
        expect(user.getEmail()).toEqual(frank.email);
        expect(user.getRole()).toEqual(frank.role);
        // Delete users
        Portal.deleteUser(scott);
        Portal.deleteUser(frank);
      });
  });
});
