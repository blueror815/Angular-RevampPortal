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

// # Domain Stats Page Object

// This `Domain Stats` Page Object abstracts all operations or actions that a
// common user could do in the Domain Stats page from the Portal
// app/site.
var DomainStats = {

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: 'h2'
      }
    },
    dropDowns: {
      domainName: {
        model: 'domain'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DomainStats.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Domain Stats page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  getDomainDDown: function () {
    return element(by.model(this.locators.dropDowns.domainName.model));
  },

  // ## Helper Methods

  /**
   * ### DomainStats.isDisplayed()
   *
   * Checks whether the Stats Domain page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getDomainDDown()
      .isPresent();
  },

  /**
   * ### DomainStats.getTitle()
   *
   * Gets the `Title` label from the Domain Stats page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  getSelectedDomain: function () {
    return this
      .getDomainDDown()
      .getText();
  }
};

module.exports = DomainStats;