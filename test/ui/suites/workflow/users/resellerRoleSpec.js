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

describe('Workflow', function () {
  describe('Reseller role user', function () {

    var resellerUser = config.get('portal.users.reseller');
    var secondResellerUser = config.get('portal.users.secondReseller');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(resellerUser);
      Portal.getUsersPage();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should display a user only for one reseller user',
      function () {
        var userEmail = Portal.userListPage.table
          .getFirstRow()
          .getEmail();
        Portal.signOut();
        Portal.signIn(secondResellerUser);
        Portal.getUsersPage();
        Portal.userListPage.searcher.setSearchCriteria(userEmail);
        var filteredRows = Portal.userListPage.table.getRows();
        expect(filteredRows.count()).toEqual(0);
      });

    it('should display new created user only for the reseller who created it',
      function () {
        var tom = DataProvider.generateUser('Tom', null, resellerUser);
        Portal.createUser(tom);
        var userEmail = Portal.userListPage
          .searchAndGetFirstRow(tom.email)
          .getEmail();
        var filteredRows = Portal.userListPage.table.getRows();
        expect(filteredRows.count()).toEqual(1);
        Portal.signOut();
        Portal.signIn(secondResellerUser);
        Portal.getUsersPage();
        Portal.userListPage.searcher.setSearchCriteria(userEmail);
        var newFilteredRows = Portal.userListPage.table.getRows();
        expect(newFilteredRows.count()).toEqual(0);
      });

  });
});
