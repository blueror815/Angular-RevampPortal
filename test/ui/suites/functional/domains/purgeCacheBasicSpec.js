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
  describe('Purge Cached Objects', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB);
      Portal.header.goTo(Constants.sideBar.web.PURGE_CACHE);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should verify that "Purge" button is disabled if the input text area is empty',
      function () {
        var dataPurge = DataProvider.generatePurgeCachedInfo();
        Portal.purgeCacheBasicPage.selectDomain(myDomain);
        var purgeBtn = Portal.purgeCacheBasicPage.getPurgeBtn();
        expect(purgeBtn.isEnabled()).toBeFalsy();
    });


    it('should purge a Purge Cached Objects after click "Purge" button',
      function () {
        var dataPurge = DataProvider.generatePurgeCachedInfo();
        Portal.purgeCacheBasicPage.selectDomain(myDomain);
        Portal.purgeCacheBasicPage.setTextArea(dataPurge.textArea);
        var purgeBtn = Portal.purgeCacheBasicPage.getPurgeBtn();
        expect(purgeBtn.isEnabled()).toBeTruthy();
        Portal.purgeCacheBasicPage.clickPurge();

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'The request has been successfully submitted';
        expect(alert.getText()).toEqual(expectedMsg);
    });

    it('should navigate between Advanced and Basic pages in Purge Cached pages',
      function () {
        var dataPurge = DataProvider.generatePurgeCachedInfo();
        Portal.purgeCacheBasicPage.selectDomain(myDomain);
        Portal.purgeCacheBasicPage.setTextArea(dataPurge.textArea);
        Portal.purgeCacheBasicPage.clickAdvancedMode();
        Portal.purgeCacheBasicPage.clickBasicMode();
        Portal.purgeCacheBasicPage.setTextArea(dataPurge.textArea);
        Portal.purgeCacheBasicPage.clickPurge();

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'The request has been successfully submitted';
        expect(alert.getText()).toEqual(expectedMsg);
    });

    it('should cancel the Purge Cached Objects after click "Cancel" button',
      function () {
        var dataPurge = DataProvider.generatePurgeCachedInfo();
        Portal.purgeCacheBasicPage.selectDomain(myDomain);
        Portal.purgeCacheBasicPage.setTextArea(dataPurge.textArea);
        Portal.purgeCacheBasicPage.clickCancel();

        var title = 'Domains List';
        expect(Portal.domains.listPage.getTitle()).toEqual(title);
    });
  });
});
