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

// # Company List Page Object

// Requiring other Page Objects that compound the Company List Page one
var CompanyTable = require('./table/table');
var Pager = require('./../../common/pager');
var Searcher = require('./../../common/searcher');
var AddCompany = require('./addCompany');

// This `Company List` Page Object abstracts all operations or actions that a
// common user could do in the Company List page from the Portal app/site.
var CompanyList = {

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
      addNewCompany: {
        linkText: 'Add New Company'
      }
    }
  },

  // `Company List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: CompanyTable,
  pager: Pager,
  searcher: Searcher,
  addCompany: AddCompany,

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
   * ### CompanyList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Company List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return this
      .getContainerFluidElem()
      .get(0);
  },

  /**
   * ### CompanyList.getAddNewCompanyBtn()
   *
   * Returns the reference to the `Add New Company` button (Selenium WebDriver
   * Element) from the Company List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddNewCompanyBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewCompany.linkText));
  },

  // ## Methods to interact with the Company List Page components

  /**
   * ### CompanyList.clickAddNewCompany()
   *
   * Triggers a click to the `Add New Company` button from the Company List page
   * from the Portal app
   *
   * @returns {Promise}
   */
  clickAddNewCompany: function () {
    return this
      .getAddNewCompanyBtn()
      .click();
  },

  /**
   * ### CompanyList.getTitle()
   *
   * Gets the `Title` label from the Company List page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### CompanyList.isDisplayed()
   *
   * Checks whether the Company List page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### CompanyList.searchAndGetFirstRow()
   *
   * Filters the Company List table by the given criteria and returns the first
   * result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {TableRow}
   */
  searchAndGetFirstRow: function (criteria) {
    this.searcher.clearSearchCriteria();
    this.searcher.setSearchCriteria(criteria);
    return this
      .table
      .getFirstRow();
  },

  /**
   * ### CompanyList.searchAndClickDelete()
   *
   * Filters the Company List table by the given criteria and triggers a click
   * on the `Delete` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Promise}
   */
  searchAndClickDelete: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickDelete();
  },

  /**
   * ### CompanyList.searchAndClickEdit()
   *
   * Filters the Company List table by the given criteria and triggers a click
   * on the `Edit` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Promise}
   */
  searchAndClickEdit: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickEdit();
  },

  /**
   * ### CompanyList.addNewCompany(company)
   *
   * Fills Company form and clicks on Create Company button.
   *
   * @param {String} company, to add.
   *
   * @returns {Promise}
   */
  addNewCompany: function (company) {
    this.clickAddNewCompany();
    this.addCompany.createCompany(company);
  }
};

module.exports = CompanyList;
