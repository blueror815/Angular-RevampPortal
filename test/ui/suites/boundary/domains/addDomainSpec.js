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
    var lengthString100 = new Array(100).join('x');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should not create domain with long value in domain name field (100)',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.name = lengthString100;
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.createDomain(myDomain);

        var alert = Portal.alerts.getFirst();
        var expectedMsg1 = 'child "domain_name" fails because ["domain_name"';
        var expectedMsg2 = 'fails to match the required pattern:';
        expect(alert.getText()).toContain(expectedMsg1);
        expect(alert.getText()).toContain(expectedMsg2);
        expect(alert.getText()).toContain(myDomain.name);
    });

    it('should not create domain with long value in origin server field (100)',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain2');
        myDomain.originServer = lengthString100;
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.createDomain(myDomain);
    
        var alert = Portal.alerts.getFirst();
        var expectedMsg1 = 'child "origin_server" fails because ["origin_serv';
        var expectedMsg2 = 'fails to match the required pattern:';
        expect(alert.getText()).toContain(expectedMsg1);
        expect(alert.getText()).toContain(expectedMsg2);
        expect(alert.getText()).toContain(myDomain.originServer);
    });

    it('should not create a domain with long value in origin host header field',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originHostHeader = lengthString100;
        Portal.getDomainsPage();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.createDomain(myDomain);

        var alert = Portal.alerts.getFirst();
        var expectedMsg1 = 'child "origin_host_header" fails because ["origin_';
        var expectedMsg2 = 'fails to match the required pattern:';
        expect(alert.getText()).toContain(expectedMsg1);
        expect(alert.getText()).toContain(expectedMsg2);
        expect(alert.getText()).toContain(myDomain.originHostHeader);
    });
  });
});
