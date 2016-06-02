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

// # API Keys Page Object

// Requiring `API Keys List Table` component page object
var ApiKeyListTable = require('./apiKeysListTable');

// This `API Keys` Page Object abstracts all operations or actions that a
// common user could do in the API Keys page the Portal app/site.
var ApiListKeys = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: '.col-md-12 .panel .panel-heading',
    pullLeft: '.pull-left',
    pullRight: '.pull-right',
    panelBody: '.col-md-12 .panel .panel-body',
    buttons: {
      addNewApiKey: {
        css: '[ng-click="openCreateDialog()"]',
      },
      cleanSearch: {
        //css: '[ng-click="filter.filter = \'\'"]'
        css: '.glyphicon.glyphicon-remove'
      }
    },
    inputs: {
      search: {
        id: 'search'
      }
    },
    texts: {
      alertInfo: {
        css: '.alert.alert-info'
      }
    }
  },

  // `API Keys List Table` Page is compound mainly by a table. This property
  // makes a reference to the apiKeysListTable Page Object to interact with it.
  table: ApiKeyListTable,

  /**
   * ### ApiListKeys.getTitleLbl()
   *
   * Returns the reference to the `Title` element (Selenium WebDriver
   * Element) from the API Keys Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element
      .all(by.css(this.locators.container))
      .get(0);
  },

  /**
   * ### ApiListKeys.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the API Keys page in the Portal app.
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
   * ### ApiListKeys.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the API Keys page in the Portal app.
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
   * ### ApiListKeys.getAddNewApiKeyBtn()
   *
   * Gets the reference to `Add New API Key` button element.
   *
   * @returns {Promise}
   */
  getAddNewApiKeyBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.pullLeft))
      .element(by.css(this.locators.buttons.addNewApiKey.css));
  },

  /**
   * ### ApiListKeys.getSearchInputTxt()
   *
   * Gets the reference to `Search` input textbox element.
   *
   * @returns {Promise}
   */
  getSearchInputTxt: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.pullRight))
      .element(by.id(this.locators.inputs.search.id));
  },

  /**
   * ### ApiListKeys.getAlertInfoTxt()
   *
   * Gets the reference to `Alert Info` text element.
   *
   * @returns {Promise}
   */
  getAlertInfoTxt: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.texts.alertInfo.css));
  },

  /**
   * ### ApiListKeys.getTitle()
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
   * ### ApiListKeys.clickAddNewApiKey()
   *
   * Clicks on `Add New API Key` button element.
   *
   * @returns {Promise}
   */
  clickAddNewApiKey: function () {
    return this
      .getAddNewApiKeyBtn()
      .click();
  },

  /**
   * ### ApiListKeys.setSearch()
   *
   * Sets the value in `Search` input text element.
   *
   * @param {String} value to search or filter Keys in API Key table.
   *
   * @returns {Promise}
   */
  setSearch: function (value) {
    return this
      .getSearchInputTxt()
      .sendKeys(value);
  },

  /**
   * ### ApiListKeys.getNoApiKeyRegisteredInfo()
   *
   * Gets the value from `Alert Info` alert text element.
   *
   * @returns {Promise}
   */
  getNoApiKeyRegisteredInfo: function () {
    return this
      .getAlertInfoTxt()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### ApiListKeys.isDisplayed()
   *
   * Checks whether the Purge Cached Objects page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    var title = this.getTitle().isPresent();
    var addNewApiKey = this.getAddNewApiKeyBtn().isPresent();
    var searchInput = this.getSearchInputTxt().isPresent();
    return (title && addNewApiKey && searchInput);
  },

  searchAndGetApiKey: function(value) {
    this.setSearch(value);
    this.table.getRow();
  }
};

module.exports = ApiListKeys;
