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

describe('Functional', function () {
  describe('App search', function () {

    var user = config.get('portal.users.admin');
    var platforms = [
      config.get('portal.mobileApps.platforms.ios'),
      config.get('portal.mobileApps.platforms.android')
    ];

    var buildPrefix = function (user, platform) {
      var tmp = 'qa-' + user.role + '-' + platform + '-';
      return tmp.toLowerCase().replace(/\W/g, '-');
    };

    platforms.forEach(function (platform) {

      describe('Platform: ' + platform, function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.goToMobileApps();
          Portal.header.goTo(platform);
        });

        afterEach(function () {
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
        });

        it('should filter apps according to name search criteria',
          function () {
            var appNameToSearch = buildPrefix(user, platform) + '10';
            Portal.mobileApps.listPage.searcher
              .setSearchCriteria(appNameToSearch);
            var allRows = Portal.mobileApps.listPage.table.countTotalRows();
            expect(allRows).toEqual(1);
            var appNameDisplayed = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            expect(appNameDisplayed).toEqual(appNameToSearch);
          });

        it('should clear the search field when clicking `X` button',
          function () {
            var appNameToSearch = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            Portal.mobileApps.listPage.searcher
              .setSearchCriteria(appNameToSearch);
            Portal.mobileApps.listPage.searcher.clickReset();
            var searchText = Portal.mobileApps.listPage.searcher
              .getSearchCriteria();
            expect(searchText).toEqual('');
          });

        it('should reset the filtering when clicking `X` button',
          function () {
            var appNameToSearch = buildPrefix(user, platform) + '10';
            Portal.mobileApps.listPage.searcher
              .setSearchCriteria(appNameToSearch);
            var totalRows = Portal.mobileApps.listPage.table
              .countTotalRows();
            expect(totalRows).toEqual(1);
            Portal.mobileApps.listPage.searcher.clickReset();
            var newTotalRows = Portal.mobileApps.listPage.table
              .countTotalRows();
            expect(newTotalRows).not.toEqual(totalRows);
            expect(newTotalRows).toBeGreaterThan(totalRows);
          });

        it('should not display `X` button when there is not any search applied',
          function () {
            Portal.mobileApps.listPage.searcher
              .getResetBtn()
              .isDisplayed()
              .then(function (isDisplayed) {
                expect(isDisplayed).toBeFalsy();
              });
          });

        it('should reset button appear once a char is typed in search field',
          function () {
            Portal.mobileApps.listPage.searcher.setSearchCriteria('z');
            Portal.mobileApps.listPage.searcher
              .getResetBtn()
              .isDisplayed()
              .then(function (isDisplayed) {
                expect(isDisplayed).toBeTruthy();
              });
          });
      });
    });
  });
});

