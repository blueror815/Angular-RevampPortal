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

describe('Negative', function () {
  describe('Add domain', function () {

    // TODO: Add domain add tests for reseller and revadmin roles

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should not create domain when all required fields are empty',
      function () {
        var myDomain = DataProvider.generateDomain();
        myDomain.name = ' ';
        myDomain.originServer = ' ';
        myDomain.originHostHeader = ' ';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
//        console.log('addBtn = ', addBtn);
//        console.log('addBtn.isEnabled() = ', addBtn.isEnabled());
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if domain name field has empty values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.name = ' ';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if origin server field has empty values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originServer = ' ';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create domain if origin host header field has empty values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originHostHeader = ' ';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain, if location list option is not selected ',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originLocation = '--- Select Location ---';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create domain when all fields have white spaces',
      function () {
        var myDomain = DataProvider.generateDomain();
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if domain name field has white spaces',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.name = '';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if origin server field has white space',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originServer = '';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create domain if origin host header field has white spaces',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originHostHeader = '';
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });
  });
});
