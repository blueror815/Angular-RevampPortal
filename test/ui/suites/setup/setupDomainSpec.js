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
var Portal = require('./../../page_objects/portal');
var DataProvider = require('./../../common/providers/data');

xdescribe('Setup', function () { // jshint ignore:line

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.admin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Domains', function () {

        beforeEach(function () {
          Portal.signIn(user);
          Portal.getDomainsPage();
        });

        afterEach(function () {
          Portal.signOut();
        });

        var domains = [];
        var prefix;

        for (var i = 10; i < 40; i++) {
          prefix = 'qa-' + user.role.toLowerCase().replace(/\W/g, '-') + '-';
          domains.push(DataProvider.generateDomain(prefix + i, true));
        }

        domains.forEach(function (domain) {
          it('should check/create domain `' + domain.name + '` for pagination.',
            function () {
              Portal.createDomainIfNotExist(domain);
            });
        });
      });
    });
  });
});
