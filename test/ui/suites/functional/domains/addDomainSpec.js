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
  describe('Add domain', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('mydomain');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.deleteDomain(myDomain);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should create a domain and display a successful message',
      function () {
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.createDomain(myDomain);

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'Domain created';
        expect(alert.getText()).toEqual(expectedMsg);
    });

    it('should not create a domain with duplicate values', function () {
      Portal.getDomainsPage();
      Portal.domains.listPage.clickAddNewDomain();
      Portal.domains.addPage.createDomain(myDomain);

      var alert = Portal.alerts.getFirst();
      var expectedMsg = 'The domain name is already registered in the system';
      expect(alert.getText()).toEqual(expectedMsg);
    });
  });
});
