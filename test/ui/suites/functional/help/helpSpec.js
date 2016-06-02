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
  describe('Help', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
    });

    it('should click on Help button and open the Help form in Portal',
      function() {
        Portal.load()
        .then(function() {
          Portal.helpPage.clickHelpButton(function(isClicked) {
            expect(isClicked).toBe(true);
          });
        });
    });

    it('should fill Help form, click on "Leave us a message" open Help form',
      function() {
        Portal.helpPage.fillHelpForm('help', function(isFilled) {
          expect(isFilled).toBe(true);
        });
    });

    it('should fill Ticket Submission form, and click on "Send" button',
      function() {
        var data = {
          name: 'user1',
          email: 'user1@mail.com',
          description: 'My description testing'
        };
        Portal.helpPage.fillTicketForm(data, function(isFilled, text) {
          expect(isFilled).toBe(true);
          expect('Message sent').toBe(text);
        });
    });
  });
});
