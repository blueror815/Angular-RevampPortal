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

describe('Smoke', function () {
  describe('Domain Stats', function () {

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

    it('should display "Stats" page title as "Proxy Traffic Reports"',
      function () {
        var expectedTitle = 'Proxy Traffic Reports';
        Portal.domains.listPage.table
          .getFirstRow()
          .clickStats();
        expect(Portal.domains.statsPage.getTitle()).toEqual(expectedTitle);
      });

    it('should display domain drop-down with specific domain config selected ' +
      'as default',
      function () {
        var firstDomain = Portal.domains.listPage.table.getFirstRow();
        var domainName = firstDomain.getName();
        firstDomain.clickStats();
        var selectedDomainName = Portal.domains.statsPage.getSelectedDomain();
        expect(selectedDomainName).toEqual(domainName);
      });
  });
});
