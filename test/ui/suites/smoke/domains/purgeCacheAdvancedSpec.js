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

describe('Smoke', function () {
  describe('Purge Cached Objects - Advanced', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.header.goTo(Constants.header.appMenu.WEB);
      Portal.header.goTo(Constants.sideBar.web.PURGE_CACHE);
    });

    it('should display Purge Cached Objects page',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);
        var isDisplayed = Portal.purgeCacheAdvancedPage.isDisplayed();
        expect(isDisplayed).toBe(true);
    });

    it('should navigate from Advanded mode to Basic mode pages',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);
        Portal.purgeCacheAdvancedPage.clickBasicMode();
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();

        var isDisplayed = Portal.purgeCacheAdvancedPage.isDisplayed();
        expect(isDisplayed).toBe(true);
    });

    it('should display the first example textarea with json example',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);

        var jsonExample = Portal.purgeCacheAdvancedPage.getJsonExample(0);
        var expectedMsg1 = 'Purge all PNG files under /images, non-recursive';
        var expectedMsg2 = 'is_wildcard';
        var expectedMsg3 = 'expression';

        expect(jsonExample).toContain(expectedMsg1);
        expect(jsonExample).toContain(expectedMsg2);
        expect(jsonExample).toContain(expectedMsg3);
    });

    it('should display the 2nd example textarea with json example',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);

        var jsonExample = Portal.purgeCacheAdvancedPage.getJsonExample(1);
        var expectedMsg1 = 'Purge all PNG files under /images, recursive';
        var expectedMsg2 = 'is_wildcard';
        var expectedMsg3 = 'expression';

        expect(jsonExample).toContain(expectedMsg1);
        expect(jsonExample).toContain(expectedMsg2);
        expect(jsonExample).toContain(expectedMsg3);
    });

    it('should display the 3rd example textarea with json example',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);

        var jsonExample = Portal.purgeCacheAdvancedPage.getJsonExample(2);
        var expectedMsg1 = 'Purge everything, recursively, for current domain';
        var expectedMsg2 = 'is_wildcard';
        var expectedMsg3 = 'expression';

        expect(jsonExample).toContain(expectedMsg1);
        expect(jsonExample).toContain(expectedMsg2);
        expect(jsonExample).toContain(expectedMsg3);
    });

  });
});
