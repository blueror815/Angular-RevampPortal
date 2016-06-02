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
  describe('Delete domain', function () {

    var admin = config.get('portal.users.admin');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      // TODO: Move signIn and signOut calls to beforeAll and afterAll once bug
      // about creating consecutive domains is fixed
      Portal.signIn(admin);
      Portal.getDomainsPage();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should delete successfully a domain',
      function () {
        var domain = DataProvider.generateDomain('domain-01');
        Portal.createDomain(domain);
        Portal.domains.listPage.searchAndClickDelete(domain.name);
        Portal.dialog.clickOk();
        Portal.domains.listPage.searcher.setSearchCriteria(domain.name);
        var domainTableRows = Portal.domains.listPage.table.getRows();
        expect(domainTableRows.count()).toEqual(0);
      });

    it('should confirm domain deletion when clicking "Ok" button',
      function () {
        var domain = DataProvider.generateDomain('domain-02');
        Portal.createDomain(domain);
        Portal.domains.listPage.searchAndClickDelete(domain.name);
        var okBtn = Portal.dialog.getOkBtn();
        expect(okBtn.isDisplayed()).toBeTruthy();
        Portal.dialog.clickOk();
        Portal.domains.listPage.searcher.setSearchCriteria(domain.name);
        var domainTableRows = Portal.domains.listPage.table.getRows();
        expect(domainTableRows.count()).toEqual(0);
      });

    it('should cancel domain deletion when clicking "Cancel" button',
      function () {
        var domain = DataProvider.generateDomain('domain-03');
        Portal.createDomain(domain);
        Portal.domains.listPage.searchAndClickDelete(domain.name);
        var cancelBtn = Portal.dialog.getCancelBtn();
        expect(cancelBtn.isDisplayed()).toBeTruthy();
        Portal.dialog.clickCancel();
        var domainTableRows = Portal.domains.listPage.table.getRows();
        expect(domainTableRows.count()).toEqual(1);
        Portal.deleteDomain(domain);
      });

    it('should cancel domain deletion after pressing "ESCAPE" key',
      function () {
        var domain = DataProvider.generateDomain('domain-04');
        Portal.createDomain(domain);
        Portal.domains.listPage.searchAndClickDelete(domain.name);
        expect(Portal.dialog.getModalEl().isPresent()).toBeTruthy();
        Portal.dialog.getModalEl().sendKeys(protractor.Key.ESCAPE);
        var tableRows = Portal.domains.listPage.table.getRows();
        expect(tableRows.count()).toEqual(1);
        Portal.deleteDomain(domain);
      });
  });
});
