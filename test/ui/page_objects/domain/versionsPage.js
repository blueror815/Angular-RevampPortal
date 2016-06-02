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

// # Domain Versions Page Object

// This `Domain Versions` Page Object abstracts all operations or actions that a
// common user could do in the Domain Historical Versions page from the Portal
// app/site.
var DomainVersions = {

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: 'h2'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      }
    },
    dropDowns: {
      domainConfigVersion: {
        model: 'currentVersion'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DomainStats.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Domain Versions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  /**
   * ### DomainVersions.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Domain Versions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### DomainVersions.getDomainConfigVersionDDown()
   *
   * Returns the reference to the 'Domain Config Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainConfigVersionDDown: function () {
    return element(by.model(this.locators.dropDowns.domainConfigVersion.model));
  },

  // ## Methods to interact with the Edit Domain Page components

  /**
   * ### DomainVersions.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Domain Versions page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### DomainVersions.isDisplayed()
   *
   * Checks whether the Versions Domain page is being displayed in the UI or
   * not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getDomainConfigVersionDDown()
      .isPresent();
  },

  /**
   * ### DomainVersions.getTitle()
   *
   * Gets the `Title` label from the Domain Versions page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  }
};

module.exports = DomainVersions;
