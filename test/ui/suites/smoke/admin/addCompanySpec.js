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
    //config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    //config.get('portal.users.reseller')
  ];
  var company = DataProvider.generateAccountProfileData();
  var criteria = company.companyName;

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Add Company', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.getAdminPage();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.header.goTo(Constants.sideBar.admin.ACCOUNTS);
        });

        it('should "Add Company" in accounts page', function () {
          Portal.admin.accounts.listPage.addNewCompany(company);
          expect(Portal.alerts.getFirst().getText()).toEqual('Company created');

          Portal.header.goTo(Constants.sideBar.admin.ACCOUNTS);
          var result = Portal.admin.accounts
            .listPage
            .searchAndGetFirstRow(criteria);
          expect(result.getCompanyName()).toBe(criteria);
        });
      });
    });
  });
});