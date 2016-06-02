/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Edit advanced domain', function () {

        var myDomain = DataProvider.generateDomain('mydomain');

        beforeAll(function () {
          Portal.signIn(user);
          Portal.createDomain(myDomain);
        });

        afterAll(function () {
          Portal.deleteDomain(myDomain);
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.header.goTo(Constants.header.appMenu.WEB);
        });

        it('should display "Advanced Edit" domain page',
          function () {
            Portal.domains.listPage.searchAndClickEdit(myDomain.name);
            Portal.domains.editPage.clickAdvancedMode();
            expect(Portal.domains.editPage.isDisplayed()).toBeTruthy();
          });

        it('should display "Back To List" domain button',
          function () {
            Portal.domains.listPage.searchAndClickEdit(myDomain.name);
            Portal.domains.editPage.clickAdvancedMode();
            var backToListButton = Portal.domains.editPage.getBackToListBtn();
            expect(backToListButton.isPresent()).toBeTruthy();
          });

        it('should display "Cancel" domain button',
          function () {
            Portal.domains.listPage.searchAndClickEdit(myDomain.name);
            Portal.domains.editPage.clickAdvancedMode();
            var cancelButton = Portal.domains.editPage.getCancelBtn();
            expect(cancelButton.isPresent()).toBeTruthy();
          });
      });
    });
  });
});
