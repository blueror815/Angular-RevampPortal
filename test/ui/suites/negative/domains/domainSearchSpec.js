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
    });

    it('should not apply filters when typing spaces in "Search" field',
      function () {
        var totalRows = Portal.domains.listPage.table
          .getRows()
          .count();
        Portal.domains.listPage.searcher
          .setSearchCriteria('    '); // 4 char spaces
        var newTotalRows = Portal.domains.listPage.table
          .getRows()
          .count();
        expect(totalRows).toEqual(newTotalRows);
        Portal.domains.listPage.searcher.clearSearchCriteria();
      });

    it('should empty list when search criteria does not match with any item',
      function () {
        var uniqueString = 'unique_string_' + Date.now();
        Portal.domains.listPage.searcher.setSearchCriteria(uniqueString);
        var totalRows = Portal.domains.listPage.table
          .getRows()
          .count();
        expect(totalRows).toEqual(0);
        Portal.domains.listPage.searcher.clearSearchCriteria();
      });
  });
});
