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

describe('Negative', function () {
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

    it('should apply filters only when typing 1 char in "Search" field',
      function () {
        var bret = DataProvider.generateUser('Bret');
        bret.email = 'kk' + bret.email;
        Portal.createUser(bret);
        Portal.userListPage.searcher.setSearchCriteria('k');
        var tableRows = Portal.userListPage.table.getRows();
        expect(tableRows.count()).toEqual(1);
        Portal.userListPage.searcher.clearSearchCriteria();
        Portal.deleteUser(bret);
      });
  });
});
