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
  describe('Domain pagination', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getDomainsPage();
    });

    it('should not display pagination when there is not any domain to show',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.domains.listPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.domains.listPage.pager.isDisplayed()).toBe(false);
        Portal.domains.listPage.searcher.clearSearchCriteria();
      });

    it('should not show pagination buttons when the search criteria does' +
      'not match with any word in the "Domain List"',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        var availablePages = Portal.domains.listPage.pager
          .getAllPageIndexButtons()
          .count();
        Portal.domains.listPage.searcher.setSearchCriteria(uniqueString);
        var filteredPages = Portal.domains.listPage.pager
          .getAllPageIndexButtons()
          .count();
        expect(availablePages).toBeGreaterThan(1);
        expect(filteredPages).toEqual(0);
        expect(availablePages).toBeGreaterThan(filteredPages);
        Portal.domains.listPage.searcher.clearSearchCriteria();
      });

    it('should display the "Previous Page" disabled after filtering does not ' +
      'return any domains in the "Domain List"',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.domains.listPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.domains.listPage.pager.isDisplayed()).toBe(false);
        Portal.domains.listPage.searcher.clearSearchCriteria();
      });

    it('should not display the "Next Page" after filtering does not ' +
      'return any domains in the "Domain List"',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.domains.listPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.domains.listPage.pager.isDisplayed()).toBe(false);
        Portal.domains.listPage.searcher.clearSearchCriteria();
      });
  });
});
