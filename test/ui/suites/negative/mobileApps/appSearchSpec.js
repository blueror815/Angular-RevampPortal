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

describe('Negative', function () {
  describe('App search', function () {

    var user = config.get('portal.users.admin');
    var platforms = [
      config.get('portal.mobileApps.platforms.ios'),
      config.get('portal.mobileApps.platforms.android')
    ];
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

        it('should not apply filters when typing spaces in `Search` field',
          function () {
            var totalRows = Portal.mobileApps.listPage.table
              .countTotalRows();
            Portal.mobileApps.listPage.searcher
              .setSearchCriteria('    '); // 4 char spaces
            var newTotalRows = Portal.mobileApps.listPage.table
              .countTotalRows();
            expect(totalRows).toEqual(newTotalRows);
          });

        it('should empty list when search criteria does not match with any ' +
          'item',
          function () {
            var uniqueString = 'unique_string_' + Date.now();
            Portal.mobileApps.listPage.searcher.setSearchCriteria(uniqueString);
            var totalRows = Portal.mobileApps.listPage.table
              .countTotalRows();
            expect(totalRows).toEqual(0);
          });
      });
    });
  });
});
