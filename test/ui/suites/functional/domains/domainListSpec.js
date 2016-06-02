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

describe('Functional', function () {
  describe('Domain list', function () {

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

    it('should display domain with a Staging Status',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getStagingStatusIcon()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display domain with a Global Status',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getGlobalStatusIcon()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a `edit` icon for the domain',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getEditBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a `configure` icon for the domain',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getConfigureBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a `delete` icon for the domain',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getDeleteBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a `stats` icon for the domain',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getStatsBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a `versions` icon for the domain',
      function () {
        Portal.domains.listPage.table
          .getRow(0)
          .getVersionsBtn()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a new domain created',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Check domain is in list
        var newDomain = Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name);
        expect(newDomain.getName()).toEqual(myDomain.name);
        // Delete domain
        Portal.deleteDomain(myDomain);
      });

    it('should not list domain-config right after deleting it',
      function () {
        // TODO: Once below issue about creating 2 domains, we should remove the
        // sign-in and sign-out for every test/script (following 3 lines)
        Portal.signOut();
        Portal.signIn(user);
        Portal.getDomainsPage();
        var myDomain = DataProvider.generateDomain('other-domain');
        // Create domain
        Portal.createDomain(myDomain);
        Portal.domains.listPage.searcher.setSearchCriteria(myDomain.name);
        Portal.domains.listPage.table
          .getFirstRow()
          .clickDelete();
        Portal.dialog.clickOk();
        Portal.domains.listPage.searcher.clearSearchCriteria();
        Portal.domains.listPage.searcher.setSearchCriteria(myDomain.name);
        var rows = Portal.domains.listPage.table.getRows();
        expect(rows.count()).toEqual(0);
      });
  });
});
