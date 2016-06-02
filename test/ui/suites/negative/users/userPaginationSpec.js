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

describe('Negative', function () {
  describe('User pagination', function () {

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

    it('should not display pagination when there is not any user to show',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.userListPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.userListPage.pager.isDisplayed()).toBe(false);
        Portal.userListPage.searcher.clearSearchCriteria();
      });

    it('should not show only the first page button when the search criteria ' +
      'does not match with any word in the "User List"',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        var availablePages = Portal.userListPage.pager
          .getAllPageIndexButtons()
          .count();
        Portal.userListPage.searcher.setSearchCriteria(uniqueString);
        var filteredPages = Portal.userListPage.pager
          .getAllPageIndexButtons()
          .count();
        expect(availablePages).toBeGreaterThan(0);
        expect(filteredPages).toEqual(0);
        expect(availablePages).toBeGreaterThan(filteredPages);
        Portal.userListPage.searcher.clearSearchCriteria();
      });

    it('should display the "Previous Page" disabled after filtering does not ' +
      'return any users in the "User List"',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.userListPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.userListPage.pager.isDisplayed()).toBe(false);
        Portal.userListPage.searcher.clearSearchCriteria();
      });

    it('should not display the "Next Page" after filtering does not ' +
      'return any users in the "User List"',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.userListPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.userListPage.pager.isDisplayed()).toBe(false);
        Portal.userListPage.searcher.clearSearchCriteria();
      });
  });
});
