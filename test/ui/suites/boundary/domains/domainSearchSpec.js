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
  describe('Domain Search', function () {

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

    it('should apply filters only when typing 1 char in "Search" field',
      function () {
        var coolDomain = DataProvider.generateDomain('cool-domain');
        coolDomain.name = 'zz' + coolDomain.name;

        Portal.createDomain(coolDomain);
        Portal.domains.listPage.searcher.setSearchCriteria('z');
        var tableRows = Portal.domains.listPage.table.getRows();
        expect(tableRows.count()).toEqual(1);
        Portal.domains.listPage.searcher.clearSearchCriteria();
        Portal.deleteDomain(coolDomain);
      });
  });
});
