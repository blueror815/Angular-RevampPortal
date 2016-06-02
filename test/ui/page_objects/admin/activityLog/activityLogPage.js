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

// # Activity Log Page Object

// Requiring `Activity Log Table` component page object
var ActivityLogTable = require('./activityLogTable');

// This `Activity Log` Page Object abstracts all operations or actions that a
// common user could do in the Activity Log page the Portal app/site.
var ActivityLog = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: '.col-md-12 .panel .panel-heading',
    panelBody: '.col-md-12 .panel .panel-body',
    pullLeft: '.pull-left',
    pullRight: '.pull-right',
    inputs: {
      search: {
        id: 'search'
      }
    }
  },

  // `Activity Log Table` Page is compound mainly by a table. This property
  // makes a reference to the apiKeysListTable Page Object to interact with it.
  table: ActivityLogTable,

  /**
   * ### ActivityLog.getTitleLbl()
   *
   * Returns the reference to the `Title` element (Selenium WebDriver
   * Element) from the Activity Log Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element
      .all(by.css(this.locators.container))
      .get(0);
  },

  /**
   * ### ActivityLog.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Activity Log page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelHeading));
  },

  /**
   * ### ActivityLog.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Activity Log page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelBody));
  },

  /**
   * ### ActivityLog.getSearchBtn()
   *
   * Gets the reference to `Search` text input element.
   *
   * @returns {Promise}
   */
  getSearchBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.id(this.locators.inputs.search.id));
  },

  /**
   * ### ActivityLog.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Purge Cached Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### ActivityLog.setSearch()
   *
   * Sets the value in `Search` input text element.
   *
   * @param {String} value to search or filter Activity Logs table.
   *
   * @returns {Promise}
   */
  setSearch: function (value) {
    return this
      .getSearchBtn()
      .sendKeys(value);
  },

  /**
   * ### ActivityLog.getSearch()
   *
   * Gets the value from `Search` input text element.
   *
   * @returns {Promise}
   */
  getSearch: function () {
    return this
      .getSearchBtn()
      .getText();
  },

  // ## Helper Methods

};

module.exports = ActivityLog;
