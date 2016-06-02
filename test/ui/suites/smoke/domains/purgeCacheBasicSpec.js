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

    it('should "Purge Cached Objects" title be visible',
      function () {
        var title = Portal.purgeCacheBasicPage.getTitle();
        expect(title).toEqual('Purge Cached Objects');
    });

    it('should "Advanced mode" button be visible',
      function () {
        var advancedButton = Portal.purgeCacheBasicPage.getAdvancedModeBtn();
        expect(advancedButton.isPresent()).toBe(true);
    });

    it('should "Example" paragraph be visible',
      function () {
        var exampleText = Portal.purgeCacheBasicPage.getExampleText();
        var paragraph1 = 'Example';
        var paragraph2 = 'Purge all PNG files under';
        var paragraph3 = 'Purge everything, recursively';
        expect(exampleText).toContain(paragraph1);
        expect(exampleText).toContain(paragraph2);
        expect(exampleText).toContain(paragraph3);
    });
  });
});
