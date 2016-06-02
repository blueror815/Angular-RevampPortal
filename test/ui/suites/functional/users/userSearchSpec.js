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

describe('Functional', function () {
  describe('User search', function () {

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

    afterEach(function () {
    });

    it('should filter items according to email search criteria', function () {
      var emailToSearch = Portal.userListPage.table
        .getFirstRow()
        .getEmail();
      Portal.userListPage.searcher.setSearchCriteria(emailToSearch);
      var allRows = Portal.userListPage.table.getRows();
      expect(allRows.count()).toEqual(1);
      var emailDisplayed = Portal.userListPage.table
        .getFirstRow()
        .getEmail();
      expect(emailDisplayed).toEqual(emailToSearch);
      Portal.userListPage.searcher.clearSearchCriteria();
    });

    it('should clear the search field when clicking "X" button', function () {
      var emailToSearch = Portal.userListPage.table
        .getFirstRow()
        .getEmail();
      Portal.userListPage.searcher.setSearchCriteria(emailToSearch);
      Portal.userListPage.searcher.clickReset();
      var searchCriteria = Portal.userListPage.searcher.getSearchCriteria();
      expect(searchCriteria).toEqual('');
      Portal.userListPage.searcher.clearSearchCriteria();
    });

    it('should reset the filtering when clicking "X" button', function () {
      var emailToSearch = Portal.userListPage.table
        .getFirstRow()
        .getEmail();
      Portal.userListPage.searcher.setSearchCriteria(emailToSearch);
      var totalRows = Portal.userListPage.table.getRows().count();
      expect(totalRows).toEqual(1);
      Portal.userListPage.searcher.clickReset();
      var newTotalRows = Portal.userListPage.table.getRows().count();
      expect(newTotalRows).not.toEqual(1);
      expect(newTotalRows).toBeGreaterThan(1);
      Portal.userListPage.searcher.clearSearchCriteria();
    });
  });
});

