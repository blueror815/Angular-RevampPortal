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

// # Edit Domain Page Object

// Requiring `domain form` component page object
var DomainForm = require('./form');

// This `Edit Domain` Page Object abstracts all operations or actions that a
// common domain could do in the Edit Domain page from the Portal app/site.
var EditDomain = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      advancedMode: {
        linkText: 'Advanced Mode'
      },
      basicMode: {
        linkText: 'Basic Mode'
      },
      validateDomain: {
        css: '[ng-click="validateDomain(model)"]'
      },
      updateDomain: {
        css: '[ng-click="updateDomain(model)"]'
      },
      publishDomain: {
        css: '[ng-click="publishDomain(model)"]'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // `Edit Domain` Page is compound mainly by a form. This property makes
  // reference to the DomainForm Page Object to interact with it.
  form: DomainForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditDomain.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditDomain.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditDomain.getAdvancedModeBtn()
   *
   * Returns the reference to the `Advanced mode` button (Selenium WebDriver
   * Element) from the Edit Advanced Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAdvancedModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.advancedMode.linkText));
  },

  /**
   * ### EditDomain.getBasicModeBtn()
   *
   * Returns the reference to the `Basic mode` button (Selenium WebDriver
   * Element) from the Edit Basic Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBasicModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.basicMode.linkText));
  },

  /**
   * ### EditDomain.getValidateDomainBtn()
   *
   * Returns the reference to the `Validate Domain` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getValidateDomainBtn: function () {
    return element(by.css(this.locators.buttons.validateDomain.css));
  },

  /**
   * ### EditDomain.getUpdateDomainBtn()
   *
   * Returns the reference to the `Update Domain` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdateDomainBtn: function () {
    return element(by.css(this.locators.buttons.updateDomain.css));
  },

  /**
   * ### EditDomain.getPublishDomainBtn()
   *
   * Returns the reference to the `Publish Domain` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPublishDomainBtn: function () {
    return element(by.css(this.locators.buttons.publishDomain.css));
  },

  /**
   * ### EditDomain.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Edit Domain Page components

  /**
   * ### EditDomain.clickAdvancedMode()
   *
   * Triggers a click on the `Advanced mode` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },

  /**
   * ### EditDomain.clickBasicMode()
   *
   * Triggers a click on the `Basic mode` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBasicMode: function () {
    return this
      .getBasicModeBtn()
      .click();
  },

  /**
   * ### EditDomain.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### EditDomain.clickValidateDomain()
   *
   * Triggers a click on the `Validate Domain` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickValidateDomain: function () {
    return this
      .getValidateDomainBtn()
      .click();
  },

  /**
   * ### EditDomain.clickUpdateDomain()
   *
   * Triggers a click on the `Update Domain` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickUpdateDomain: function () {
    return this
      .getUpdateDomainBtn()
      .click();
  },

  /**
   * ### EditDomain.clickPublishDomain()
   *
   * Triggers a click on the `Publish Domain` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickPublishDomain: function () {
    return this
      .getPublishDomainBtn()
      .click();
  },

  /**
   * ### EditDomain.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit Domain page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### EditDomain.isDisplayed()
   *
   * Checks whether the Edit Domain page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditDomain.getTitle()
   *
   * Gets the `Title` label from the Edit Domain page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditDomain.updateDomain()
   *
   * Updates the domain using the given data by filling it in the form and
   * clicking on the `Update Domain` button from the Edit Domain page.
   *
   * @param {Object} domain, domain data with the schema specified in
   * DataProvider.generateDomain()
   *
   * @returns {Promise}
   */
  updateDomain: function (domain) {
    this.form.fill(domain);
    return this.clickUpdateDomain();
  }
};

module.exports = EditDomain;
