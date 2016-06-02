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

// # Help Page Object

// This `Help` Button Object abstracts all operations or actions that
// a common Help could do in the Portal app/site.
var Help = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    launcher: {
      iframe: 'launcher',
      button: '.Button--launcher'
    },
    help: {
      iframe: 'helpCenterForm',
      search: '//input[@type="search"]',
      submit: '//input[@type="submit"]'
    },
    ticket: {
      iframe: 'ticketSubmissionForm',
      close: '.Icon.Icon--close',
      name: 'name',
      email: 'email',
      description: 'description',
      submit: '//input[@type="submit"]',
      title: '.ScrollContainer-header'
    }
  },

  /**
   * ### Help.clickHelpButton()
   *
   * Clicks on `Help` button (Selenium WebDriver Element) in RevAPM Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  clickHelpButton: function (callback) {
    browser.sleep(6000)
    .then(function() {
      browser.driver.switchTo().defaultContent();
      browser.driver.switchTo().frame(Help.locators.launcher.iframe);
      browser.sleep(6000)
      .then(function() {
        browser.driver.findElement(by.css(Help.locators.launcher.button))
        .click()
        .then(function() {
          callback(true);
        }, function() {
          callback(false);
        });
      });
    });
  },

  /**
   * ### Help.fillHelpForm()
   *
   * Fills info in `Help` form (Selenium WebDriver Element)
   * and click on `Leave us a message` button.
   *
   * @returns {Selenium WebDriver Element}
   */
  fillHelpForm: function (text, callback) {
    browser.sleep(6000)
    .then(function() {
      browser.driver.switchTo().defaultContent();
      browser.driver.switchTo().frame(Help.locators.help.iframe);
      browser.driver.findElement(by.xpath(Help.locators.help.search))
      .sendKeys(text);
      browser.driver.findElement(by.xpath(Help.locators.help.search))
      .sendKeys(protractor.Key.ENTER)
      .then(function() {
        browser.sleep(6000)
        .then(function() {
          browser.driver.findElement(by.xpath(Help.locators.help.submit))
          .click()
          .then(function() {
            callback(true);
          }, function(error) {
            callback(false);
          });
        });
      });
    });
  },

  /**
   * ### Help.fillTicketForm()
   *
   * Fills info in `Ticket Submission` form (Selenium WebDriver Element)
   * and click on `Send` button.
   *
   * @returns {Selenium WebDriver Element}
   */
  fillTicketForm: function (data, callback) {
    browser.sleep(6000)
    .then(function() {
      var db = browser.driver;
      db.switchTo().defaultContent();
      db.switchTo().frame(Help.locators.ticket.iframe);
      db.findElement(by.name(Help.locators.ticket.name)).sendKeys(data.name);
      db.findElement(by.name(Help.locators.ticket.email)).sendKeys(data.email);
      db.findElement(by.name(Help.locators.ticket.description))
      .sendKeys(data.description)
      .then(function() {
        browser.sleep(6000)
        .then(function() {
          browser.driver.findElement(by.xpath(Help.locators.ticket.submit))
          .click()
          .then(function() {
            browser.sleep(6000)
            .then(function() {
              browser.driver.findElement(by.css(Help.locators.ticket.title))
              .getText()
              .then(function(text){
                browser.driver.findElement(by.css(Help.locators.ticket.close))
                .click()
                .then(function() {
                  callback(true, text);
                }, function(error) {
                  callback(false, 'Failed');
                });
              });
            });
          });
        });
      });
    });
  }
};

module.exports = Help;
