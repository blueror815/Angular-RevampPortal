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

// # User List Page Object

// Requiring other Page Objects that compound the User List Page one
var UserTable = require('./table/table');
var Pager = require('./../common/pager');
var Searcher = require('./../common/searcher');

// This `User List` Page Object abstracts all operations or actions that a
// common user could do in the User List page from the Portal app/site.
var UserList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewUser: {
        linkText: 'Add New User'
      }
    }
  },

  // `User List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: UserTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### UserList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the User List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### UserList.getAddNewUserBtn()
   *
   * Returns the reference to the `Add New User` button (Selenium WebDriver
   * Element) from the User List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddNewUserBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewUser.linkText));
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### UserList.clickAddNewUser()
   *
   * Triggers a click to the `Add New User` button from the User List page
   * from the Portal app
   *
   * @returns {Promise}
   */
  clickAddNewUser: function () {
    return this
      .getAddNewUserBtn()
      .click();
  },

  /**
   * ### UserList.getTitle()
   *
   * Gets the `Title` label from the User List page
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
   * ### UserList.isDisplayed()
   *
   * Checks whether the User List page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this.searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### UserList.searchAndGetFirstRow()
   *
   * Filters the User List table by the given criteria and returns the first
   * result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {TableRow}
   */
  searchAndGetFirstRow: function (criteria) {
    this.searcher.clearSearchCriteria();
    this.searcher.setSearchCriteria(criteria);
    return this.table
      .getFirstRow();
  },

  /**
   * ### UserList.searchAndClickDelete()
   *
   * Filters the User List table by the given criteria and triggers a click on
   * the `Delete` button of the first result of the table.
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
   * ### UserList.searchAndClickEdit()
   *
   * Filters the User List table by the given criteria and triggers a click on
   * the `Edit` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Promise}
   */
  searchAndClickEdit: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickEdit();
  }
};

module.exports = UserList;
