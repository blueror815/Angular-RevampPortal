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
  describe('User pagination', function () {

    var adminUser = config.get('portal.users.revAdmin');

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

    it('should be displayed when the amount of items exceed the maximum ' +
      'amount configured to displayed in one page',
      function () {
        // Functional?
      });

    it('should display the next page with next users when clicking "Next page"',
      function () {
        var firstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        Portal.userListPage.pager.clickNext();
        var nextFirstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        expect(firstUserEmail).not.toEqual(nextFirstUserEmail);
      });

    it('should display the previous page with previous users when clicking ' +
      '"Previous page"',
      function () {
        var firstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        Portal.userListPage.pager.clickNext();
        var nextFirstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        Portal.userListPage.pager.clickPrevious();
        var newFirstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        expect(newFirstUserEmail).not.toEqual(nextFirstUserEmail);
        expect(newFirstUserEmail).toEqual(firstUserEmail);
      });

    it('should display a set of user when clicking an specific page',
      function () {
        var firstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        Portal.userListPage.pager.clickPageIndex(2);
        var nextFirstUserEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        expect(firstUserEmail).not.toEqual(nextFirstUserEmail);
      });

    it('should display the "Previous Page" button disabled when the first ' +
      'page is displayed',
      function () {
        expect(Portal.userListPage.pager.isPreviousBtnDisabled()).toBeTruthy();
      });

    it('should display the "Next Page" button disabled when the last page ' +
      'is displayed',
      function () {
        Portal.userListPage.pager
          .getAllPageIndexButtons()
          .count()
          .then(function (totalPages) {
            Portal.userListPage.pager.clickPageIndex(totalPages);
            expect(Portal.userListPage.pager.isNextBtnDisabled()).toBeTruthy();
          });
      });
  });
});
