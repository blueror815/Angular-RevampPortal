/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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
  describe('Domain sorting', function () {

    var adminUser = config.get('portal.users.admin');
    var prefix = 'domain-sort-';

    beforeAll(function () {
      Portal.signIn(adminUser);
      var firstDomain = DataProvider.generateDomain(prefix + '1', true);
      var secondDomain = DataProvider.generateDomain(prefix + '2', true);
      Portal.createDomainIfNotExist(firstDomain);
      Portal.createDomainIfNotExist(secondDomain);
      Portal.signOut();
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.getDomainsPage();
      Portal.domains.listPage.searcher.setSearchCriteria(prefix);
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should apply `ascendant` sorting by `name` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getNameCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `name` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getNameCell()
          .click()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `cName` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getCNameCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getCNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `cName` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getCNameCell()
          .click()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getCNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `last updated` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getLastUpdatedCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `last updated` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getLastUpdatedCell()
          .click()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '2');
      });
  });
});
