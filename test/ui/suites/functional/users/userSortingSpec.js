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

var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');

var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('User sorting', function () {

    var adminUser = config.get('portal.users.admin');
    var prefix = 'qa-user-sort-';

    beforeAll(function () {
      var firstUser = DataProvider.generateUser(prefix + '1', true);
      firstUser.role = Constants.user.roles.ADMIN;
      var secondUser = DataProvider.generateUser(prefix + '2', true);
      Portal.signIn(adminUser);
      Portal.createUserIfNotExist(firstUser);
      Portal.signOut();
      Portal.signIn(adminUser);
      Portal.createUserIfNotExist(secondUser);
      Portal.signOut();
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.getUsersPage();
      Portal.userListPage.searcher.setSearchCriteria(prefix);
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should apply `ascendant` sorting by `first name` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getFirstNameCell()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        expect(firstRow.getFirstNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `first name` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getFirstNameCell()
          .click()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        expect(firstRow.getFirstNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `last name` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getLastNameCell()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        expect(firstRow.getLastNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `last name` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getLastNameCell()
          .click()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        expect(firstRow.getLastNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `email` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getEmailCell()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        expect(firstRow.getEmailCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `email` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getEmailCell()
          .click()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        expect(firstRow.getEmailCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `role` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getRoleCell()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        var userRole = firstRow.getRoleCell().getText();
        expect(userRole).toContain(Constants.user.roles.ADMIN);
      });

    it('should apply `descendant` sorting by `role` column',
      function () {
        expect(Portal.userListPage.table.getRows().count()).toEqual(2);
        Portal.userListPage.table
          .getHeader()
          .getRoleCell()
          .click()
          .click();
        var firstRow = Portal.userListPage.table.getFirstRow();
        var userRole = firstRow.getRoleCell().getText();
        expect(userRole).toContain(Constants.user.roles.USER);
      });
  });
});
