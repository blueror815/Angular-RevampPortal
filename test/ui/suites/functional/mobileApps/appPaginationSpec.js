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
  describe('Apps Pagination', function () {

    var user = config.get('portal.users.admin');

    var searchValue = 'qa-' + user.role.toLowerCase().replace(/\W/g, '-');

    var iosApps = DataProvider.generateMobileAppData('iOS', 1);
    var androidApps = DataProvider.generateMobileAppData('Android', 1);
    var apps = iosApps.concat(androidApps);

    apps.forEach(function (app) {

      describe('Platform: ' + app.platform, function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          Portal.mobileApps.listPage.setSearch(searchValue);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.mobileApps.listPage.pager.clickPageIndex(1);
        });

        afterEach(function () {
        });

        it('should be displayed when the amount of items exceeds the maximum ' +
          'amount configured to displayed in one page',
          function () {
            var uniqueString = 'unique_string_' + (new Date()).getTime();
            Portal.mobileApps.listPage.setSearch(uniqueString);
            expect(Portal.mobileApps.listPage.pager.isDisplayed()).toBe(false);
            Portal.domains.listPage.searcher.clearSearchCriteria();
            expect(Portal.mobileApps.listPage.pager.isDisplayed()).toBe(true);
          });

        it('should display the next page with next apps when clicking ' +
          '"Next page"',
          function () {
            var firstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            Portal.mobileApps.listPage.pager.clickNext();
            var nextFirstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            expect(firstAppName).not.toEqual(nextFirstAppName);
          });

        it('should display the previous page with previous apps when ' +
          'clicking "Previous page"',
          function () {
            var firstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            Portal.mobileApps.listPage.pager.clickNext();
            var nextFirstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            Portal.mobileApps.listPage.pager.clickPrevious();
            var newFirstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            expect(newFirstAppName).not.toEqual(nextFirstAppName);
            expect(newFirstAppName).toEqual(firstAppName);
          });

        it('should display a set of apps when clicking an specific page',
          function () {
            var firstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            Portal.mobileApps.listPage.pager.clickPageIndex(2);
            var nextFirstAppName = Portal.mobileApps.listPage.table
              .getFirstRow()
              .name;
            expect(firstAppName).not.toEqual(nextFirstAppName);
          });

        it('should display the "Previous Page" button disabled when the ' +
          'first page is displayed',
          function () {
            expect(Portal.mobileApps.listPage.pager.isPreviousBtnDisabled())
              .toBeTruthy();
          });

        it('should display the "Next Page" button disabled when the last ' +
          'page is displayed',
          function () {
            Portal.mobileApps.listPage.pager
              .getAllPageIndexButtons()
              .count()
              .then(function (totalPages) {
                Portal.mobileApps.listPage.pager.clickPageIndex(totalPages);
                expect(Portal.mobileApps.listPage.pager.isNextBtnDisabled())
                  .toBeTruthy();
              });
          });
      });
    });
  });
});
