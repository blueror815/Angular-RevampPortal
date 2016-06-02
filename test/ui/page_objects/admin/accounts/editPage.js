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

// # Edit Company Page Object

// Requiring `form profile` component page object
// Requiring `form billing` component page object
var FormProfile = require('./formProfile');
var FormBilling = require('./formBilling');

// This `Edit Company` Page Object abstracts all operations or actions that a
// common company could do in the Edit Company page from the Portal app/site.
var EditCompany = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body'
    },
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      back: {
        linkText: 'Back'
      },
      updateCompanyProfile: {
        css: '.btn.btn-success'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // `Edit Company` Page is compound mainly by a form. This property makes
  // reference to the FormProfile and FormBilling in the Page Object.
  formProfile: FormProfile,
  formBilling: FormBilling,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditCompany.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Company List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.views.container));
  },

  /**
   * ### EditCompany.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Company List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return this
      .getContainerFluidElem()
      .get(1)
      .element(by.css(this.locators.views.panelBody));
  },

  /**
   * ### EditCompany.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return this.getContainerFluidElem().get(0);
  },

  /**
   * ### EditCompany.getBackBtn()
   *
   * Returns the reference to the `Back` button (Selenium WebDriver
   * Element) from the Edit Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.back.linkText));
  },

  /**
   * ### EditCompany.getUpdateCompanyProfileBtn()
   *
   * Returns the reference to the `Update Company Profile` button (Selenium
   * WebDriver Element) from the Edit Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdateCompanyProfileBtn: function () {
    return element(by.css(this.locators.buttons.updateCompanyProfile.css));
  },

  /**
   * ### EditCompany.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Edit Company Page components

  /**
   * ### EditCompany.clickBack()
   *
   * Triggers a click on the `Back` button from the Edit Company page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBack: function () {
    return this
      .getBackBtn()
      .click();
  },

  /**
   * ### EditCompany.clickUpdateCompanyProfile()
   *
   * Triggers a click on the `Back` button from the Edit Company page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickUpdateCompanyProfile: function () {
    return this
      .getUpdateCompanyProfileBtn()
      .click();
  },

  /**
   * ### EditCompany.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit Company page from
   * the Portal app.
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
   * ### EditCompany.isDisplayed()
   *
   * Checks whether the Edit Company page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditCompany.getTitle()
   *
   * Gets the `Title` label from the Edit Company page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditCompany.updateCompany(company)
   *
   * Updates the company using the given data by filling it in the form and
   * clicking on the `Update Company Profile` button from the Edit Company page.
   *
   * @param {Object} company, company data with the schema specified in
   * DataProvider.generateAccountProfileData()
   *
   * @returns {Promise}
   */
  updateCompany: function (company) {
    this.formProfile.fill(company);
    this.formBilling.fill(company);
    return this.clickUpdateDomain();
  }
};

module.exports = EditCompany;
