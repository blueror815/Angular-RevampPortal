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

xdescribe('Functional', function () {  // jshint ignore:line
  describe('Edit domain', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('mydomain');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createDomain(myDomain);
    });

    afterAll(function () {
      Portal.deleteDomain(myDomain);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.header.clickWeb();
    });

    afterEach(function () {
    });

    it('should edit a domain and validate the domain successfully',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickValidateDomain();
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual('The domain configuration is correct');
      });

    it('should edit a domain and update the domain successfully',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.setOriginHostHeader(' ');
        Portal.domains.editPage.clickUpdateDomain();
        Portal.dialog.clickOk();
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual('Domain updated');
      });

    it('should edit a domain and publish the domain successfully',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickPublishDomain();
        Portal.dialog.clickOk();
        browser.sleep(3000);
        var alert = Portal.alerts.getFirst();
        expect(alert.getText()).toEqual('Domain configuration published');
      });
  });
});
