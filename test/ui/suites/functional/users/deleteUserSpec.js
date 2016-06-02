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

describe('Functional', function () {
  describe('Delete user', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      // TODO: Move sign-in to afterAll callback once issue about dashboard
      // checkbox is fixed.
      Portal.signIn(adminUser);
      Portal.getUsersPage();
    });

    afterEach(function () {
      // TODO: Move sign-in to afterAll callback once issue about dashboard
      // checkbox is fixed.
      Portal.signOut();
    });

    it('should delete successfully a user with "admin" role', function () {
      var tom = DataProvider.generateUser('Tom');
      tom.role = Constants.user.roles.USER;
      Portal.createUser(tom);
      Portal.userListPage.searchAndClickDelete(tom.email);
      Portal.dialog.clickOk();
      Portal.userListPage.searcher.setSearchCriteria(tom.email);
      var tableRows = Portal.userListPage.table.getRows();
      expect(tableRows.count()).toEqual(0);
    });

    it('should delete successfully a user with "user" role', function () {
      var carl = DataProvider.generateUser('Carl');
      carl.role = Constants.user.roles.ADMIN;
      Portal.createUser(carl);
      Portal.userListPage.searchAndClickDelete(carl.email);
      Portal.dialog.clickOk();
      Portal.userListPage.searcher.setSearchCriteria(carl.email);
      var tableRows = Portal.userListPage.table.getRows();
      expect(tableRows.count()).toEqual(0);
    });

    it('should confirm user deletion when clicking "Ok" button', function () {
      var sam = DataProvider.generateUser('Sam');
      Portal.createUser(sam);
      Portal.userListPage.searchAndClickDelete(sam.email);
      var okBtn = Portal.dialog.getOkBtn();
      expect(okBtn.isDisplayed()).toBeTruthy();
      Portal.dialog.clickOk();
      Portal.userListPage.searcher.setSearchCriteria(sam.email);
      var tableRows = Portal.userListPage.table.getRows();
      expect(tableRows.count()).toEqual(0);
    });

    it('should cancel the deletion when clicking "Cancel" button', function () {
      var bruce = DataProvider.generateUser('Bruce');
      Portal.createUser(bruce);
      Portal.userListPage.searchAndClickDelete(bruce.email);
      var okBtn = Portal.dialog.getCancelBtn();
      expect(okBtn.isDisplayed()).toBeTruthy();
      Portal.dialog.clickCancel();
      var tableRows = Portal.userListPage.table.getRows();
      expect(tableRows.count()).toEqual(1);
      Portal.userListPage.searchAndClickDelete(bruce.email);
      Portal.dialog.clickOk();
    });

    it('should cancel the deletion after pressing "ESCAPE" key', function () {
      var bruce = DataProvider.generateUser('Bruce');
      Portal.createUser(bruce);
      Portal.userListPage.searchAndClickDelete(bruce.email);
      Portal.dialog.getModalEl().sendKeys(protractor.Key.ESCAPE);
      var tableRows = Portal.userListPage.table.getRows();
      expect(tableRows.count()).toEqual(1);
      Portal.userListPage.searchAndClickDelete(bruce.email);
      Portal.dialog.clickOk();
    });
  });
});
