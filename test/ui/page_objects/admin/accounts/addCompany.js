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

// # Add Company Page Object

// This `Add Company` Page Object abstracts all operations or actions that a
// common company could do in the Add Company page from the Portal app/site.
var AddCompany = {

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
    textInputs: {
      companyName: {
        id: 'name'
      },
      comment: {
        id: 'comment'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      createCompany: {
        css: '.btn.btn-success'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### CompanyList.getContainerFluidElem()
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
   * ### CompanyList.getPanelBodyElem()
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
   * ### AddCompany.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return this
      .getContainerFluidElem()
      .get(0);
  },

  /**
   * ### AddCompany.getCompanyNameTxt()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCompanyNameTxt: function () {
    return this
      .getPanelBodyElem()
      .element(by.id(this.locators.textInputs.companyName.id));
  },

  /**
   * ### AddCompany.getCommentTxt()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCommentTxt: function () {
    return this
      .getPanelBodyElem()
      .element(by.id(this.locators.textInputs.comment.id));
  },

  /**
   * ### AddCompany.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddCompany.getCreateCompanyBtn()
   *
   * Returns the reference to the `Create Company` button (Selenium WebDriver
   * Element) from the Add Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCreateCompanyBtn: function () {
    return element(by.css(this.locators.buttons.createCompany.css));
  },

  /**
   * ### AddCompany.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add Company Page components

  /**
   * ### AddCompany.setCompanyName(companyName)
   *
   * Sets a new value for `Company Name` text field.
   *
   * @param {String} companyName.
   *
   * @returns {Promise}
   */
  setCompanyName: function (companyName) {
    return this
      .getCompanyNameTxt()
      .sendKeys(companyName);
  },

  /**
   * ### AddCompany.setComment(comment)
   *
   * Sets a new value for `Comment` text field.
   *
   * @param {String} comment.
   *
   * @returns {Promise}
   */
  setComment: function (comment) {
    return this
      .getCommentTxt()
      .sendKeys(comment);
  },

  /**
   * ### AddCompany.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add Company page
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
   * ### AddCompany.clickCreateCompany()
   *
   * Triggers a click on the `Create Company` button from the Add Company page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickCreateCompany: function () {
    return this
      .getCreateCompanyBtn()
      .click();
  },

  /**
   * ### AddCompany.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add Company page from the
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
   * ### AddCompany.isDisplayed()
   *
   * Checks whether the Add Company page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddCompany.getTitle()
   *
   * Gets the `Title` label from the Add Company page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddCompany.createCompany(company)
   *
   * Creates a new company using the given data by filling it in the form and
   * clicking on the `Create Company` button from the Add Company page.
   *
   * @param {Object} company, company data with the schema specified in
   * DataProvider.generateAccountProfileData()
   *
   * @returns {Promise}
   */
  fillForm: function(company) {
    var me = this;
    me.setCompanyName(company.companyName);
    me.setComment(company.comment);
   },

  /**
   * ### AddCompany.createCompany(company)
   *
   * Helper method that executes all steps required to create a new Company
   * from AddCompany app.
   *
   * @param {company} company, data applying the schema defined in
   * `DataProvider.generateAccountProfileData()`
   *
   * @returns {Promise}
   */
  createCompany: function(company) {
    var me = this;
    me.fillForm(company);
    me.clickCreateCompany();
  }
};

module.exports = AddCompany;
