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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Usage Report/Domains', function () {

    var user = config.get('portal.users.admin');
    var USAGE_REPORT = Constants.sideBar.billing.USAGE_REPORT;
    var testDomain = config.get('portal.usageReport.testDomain');

    //  cached
    var rows, tds, row1, totalHits;

    beforeAll(function () {
      Portal.signIn(user);
      Portal.goToBilling();
      Portal.header.goTo(USAGE_REPORT);
    });

    afterAll(function () {
      Portal.signOut();
    });

    //  ---------------------------------
    it('should contain testing domain data', function() {
      rows = Portal.billing.usageReportDomainsPage.getDomainRows( testDomain );
      expect(rows.count()).toEqual(2);
    });

    //  ---------------------------------
    it('should contain correct total hits num', function() {

      tds = rows.get(0).all(by.css('td'));
      tds.get(2)
        .getText()
        .then( function( hits ) {
          totalHits = parseInt( hits.replace( /'/g, '' ) );
          var denom = parseInt( config.get('portal.usageReport.hits_denominator') );
          expect(totalHits % denom ).toEqual(0);
        });
    });

    //  ---------------------------------
    it('should contain correct sent traffic volume', function() {

      tds.get(3)
        .getText()
        .then( function( sent ) {
          sent = sent.slice(0,-3).replace( /'/g, '' );
          // console.log( 'sent ' + sent );
          var unit = parseInt( config.get( 'portal.usageReport.sent_unit' ) );
          var sentEst = totalHits * unit / 1024 / 1024 / 1024;
          expect(sentEst.toFixed(3)).toEqual(sent);
        });

    });

    //  ---------------------------------
    it('should contain correct received traffic volume', function() {

      tds.get(4)
        .getText()
        .then( function( received ) {
          received = received.slice(0,-3).replace( /'/g, '' );
          // console.log( 'received ' + received );
          var unit = parseInt( config.get( 'portal.usageReport.received_unit' ) );
          var receivedEst = totalHits * unit / 1024 / 1024 / 1024;
          expect(receivedEst.toFixed(3)).toEqual(received);
        });
    });

    //  ---------------------------------
    it('should contain correct cache-miss hits number', function() {

      tds.get(0)
        .element(by.css('a'))
        .click()
        .then( function() {
          row1 = rows.get(1);
          row1.element(by.id('cache_miss'))
            .getText()
            .then( function( hits ) {
              hits = parseInt( hits.replace( /'/g, '' ) );
              expect( hits ).toEqual( totalHits / 2 );
            });
        });
    });

    //  ---------------------------------
    it('should contain correct cache-hit hits number', function() {

      row1.element(by.id('cache_hit'))
        .getText()
        .then( function( hits ) {
          hits = parseInt( hits.replace( /'/g, '' ) );
          expect( hits ).toEqual( totalHits / 2 );
        });
    });

    //  ---------------------------------
    it('should contain correct HTTP hits number', function() {

      row1.element(by.id('port_80'))
        .getText()
        .then( function( hits ) {
          hits = parseInt( hits.replace( /'/g, '' ) );
          // console.log( hits );
          expect( hits ).toEqual( totalHits / 2 );
        });
    });

    //  ---------------------------------
    it('should contain correct HTTPS hits number', function() {

      row1.element(by.id('port_443'))
        .getText()
        .then( function( hits ) {
          hits = parseInt( hits.replace( /'/g, '' ) );
          // console.log( hits );
          expect( hits ).toEqual( totalHits / 2 );
        });
    });


  });
});

