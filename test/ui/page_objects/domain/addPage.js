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

// # Add Domain Page Object

// Requiring `domain form` component page object
var DomainForm = require('./form');

// This `Add Domain` Page Object abstracts all operations or actions that a
// common domain could do in the Add Domain page from the Portal app/site.
var AddDomain = {

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
      createDomain: {
        css: '.btn.btn-success'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // `Add Domain` Page is compound mainly by a form. This property makes
  // reference to the DomainForm Page Object to interact with it.
  form: DomainForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddDomain.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddDomain.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddDomain.getCreateDomainBtn()
   *
   * Returns the reference to the `Create Domain` button (Selenium WebDriver
   * Element) from the Add Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCreateDomainBtn: function () {
    return element(by.css(this.locators.buttons.createDomain.css));
  },

  /**
   * ### AddDomain.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add Domain Page components

  /**
   * ### AddDomain.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add Domain page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddDomain.clickCreateDomain()
   *
   * Triggers a click on the `Create Domain` button from the Add Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickCreateDomain: function () {
    return this
      .getCreateDomainBtn()
      .click();
  },

  /**
   * ### AddDomain.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add Domain page from the
   * Portal app
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
   * ### AddDomain.isDisplayed()
   *
   * Checks whether the Add Domain page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddDomain.getTitle()
   *
   * Gets the `Title` label fromthe Add Domain page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddDomain.createDomain()
   *
   * Creates a new domain using the given data by filling it in the form and
   * clicking on the `Create Domain` button from the Add Domain page.
   *
   * @param {Object} domain, domain data with the schema specified in
   * DataProvider.generateDomain()
   *
   * @returns {Promise}
   */
   fillForm: function(domain) {
     return this.form.fill(domain);
   },

   /**
    * ### AddDomain.createDomain()
    *
    * Helper method that executes all steps required to create a new Domain from
    * AddDomain app.
    *
    * @param {domain} domain, data applying the schema defined in
    * `DataProvider.generateDomainUser()`
    *
    * @returns {Promise}
    */
    createDomain: function(domain) {
      var me = this;
      me.fillForm(domain);
      me.clickCreateDomain();
    }
};

module.exports = AddDomain;
