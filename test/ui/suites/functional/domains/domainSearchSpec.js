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
  describe('Domain search', function () {

    var user = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(user);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getDomainsPage();
      Portal.domains.listPage.searcher.clearSearchCriteria();
    });

    afterEach(function () {
    });

    it('should filter domain-configs according to name search criteria',
      function () {
        var domainNameToSearch = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.searcher.setSearchCriteria(domainNameToSearch);
        var allRows = Portal.domains.listPage.table.getRows();
        expect(allRows.count()).toEqual(1);
        var domainNameDisplayed = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        expect(domainNameDisplayed).toEqual(domainNameToSearch);
      });

    it('should filter domain-configs according to cname search criteria',
      function () {
        var cNameToSearch = Portal.domains.listPage.table
          .getFirstRow()
          .getCName();
        Portal.domains.listPage.searcher.setSearchCriteria(cNameToSearch);
        var allRows = Portal.domains.listPage.table.getRows();
        expect(allRows.count()).toEqual(1);
        var cNameDisplayed = Portal.domains.listPage.table
          .getFirstRow()
          .getCName();
        expect(cNameDisplayed).toEqual(cNameToSearch);
      });

    it('should clear the search field when clicking "X" button',
      function () {
        var domainNameToSearch = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.searcher.setSearchCriteria(domainNameToSearch);
        Portal.domains.listPage.searcher.clickReset();
        var searchText = Portal.domains.listPage.searcher.getSearchCriteria();
        expect(searchText).toEqual('');
      });

    it('should reset the filtering when clicking "X" button',
      function () {
        var domainNameToSearch = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.searcher.setSearchCriteria(domainNameToSearch);
        var totalRows = Portal.domains.listPage.table.getRows().count();
        expect(totalRows).toEqual(1);
        Portal.domains.listPage.searcher.clickReset();
        var newTotalRows = Portal.domains.listPage.table.getRows().count();
        expect(newTotalRows).not.toEqual(totalRows);
        expect(newTotalRows).toBeGreaterThan(totalRows);
      });

    it('should not display "X" button when there is not any search applied',
      function () {
        Portal.domains.listPage.searcher
          .getResetBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeFalsy();
          });
      });

    it('should reset button appear once a char is typed in search field',
      function () {
        Portal.domains.listPage.searcher.setSearchCriteria('z');
        Portal.domains.listPage.searcher
          .getResetBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });

      });
  });
});

