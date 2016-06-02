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

// # Top Objects Page Object

// Requiring `Top Objects Form` component page object.
var TopObjectsForm = require('./topObjectsForm');

// This `Top Objects` Page Object abstracts all operations or actions that a
// common top reports could do in the Portal app/site.
var TopObjects = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    },
    dropDown: {
      css: '[ng-click="$select.toggle($event)"]'
    },
    selectSearch: {
      textBox: '$select.search'
    },
    buttons: {
      createReport: {
        css: '[ng-click="updateFilters()"]'
      }
    }
  },

  form: TopObjectsForm,

 /**
  * ### TopObjects.getReportsObj()
  *
  * Returns the reference to the `Reports` label element (Selenium WebDriver
  * Element) from the Top Reports page from the Portal app.
  *
  * @returns {Selenium WebDriver Element}
  */
  getReportsObj: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### TopObjects.getChartsTableObj()
   *
   * Returns the reference to the `Objects` charts table object (Selenium
   * WebDriver Element) from the Top Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getChartsTableObj: function () {
    return element.all(by.css(this.locators.chartsTable.css));
  },

  /**
   * ### TopObjects.getSelectDomainDDown()
   *
   * Returns the reference to the `Select domain` button (Selenium WebDriver
   * Element) from the Top Objects page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectDomainDDown: function () {
    return element(
      by.css(this.locators.dropDown.css));
  },

  /**
   * ### TopObjects.getSelectSearchInput()
   *
   * Returns the reference to the `Select Search` Input (Selenium WebDriver
   * Element) from the Top Objects page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectSearchInput: function () {
    return element(
      by.model(this.locators.selectSearch.textBox));
  },

  // ## Methods to interact with the Top Objects Page components

  /**
   * ### TopObjects.clickSelectDomain()
   *
   * Triggers a click on the `Select domain` drop down from the Portal app.
   *
   * @returns {Promise}
   */
  clickSelectDomain: function () {
    return this
      .getSelectDomainDDown()
      .click();
  },

  /**
   * ### TopObjects.clickSelectSearchDomain()
   *
   * Triggers a click on the `Select Search Domain` from the Portal app.
   *
   * @returns {Promise}
   */
  clickSelectSearchDomain: function () {
    return this
      .getSelectSearchInput()
      .click();
  },

  /**
   * ### TopObjects.setSelectSearchDomain()
   *
   * Triggers a set on the `Select Search Domain` from the Portal app.
   *
   * @returns {Promise}
   */
  setSelectSearchDomain: function (domainName) {
    return this
      .getSelectSearchInput()
      .sendKeys(domainName)
      .sendKeys(protractor.Key.ENTER);
  },

  // ## Helper Methods

  /**
   * ### TopObjects.isDisplayed()
   *
   * Checks whether the Top Objects page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### TopObjects.getTitle()
   *
   * Gets the `Title` label from the Top Objects page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getReportsObj()
      .get(0)
      .getText();
  },

 /**
  * ### TopObjects.getChartTitle()
  *
  * Gets the `Title` label from the Chart report from Top Objects page.
  *
  * @returns {Promise}
  */
  getChartTitle: function () {
    return this
      .getReportsObj()
      .get(1)
      .getText();
  },

 /**
  * ### TopObjects.getSelectedDomain()
  *
  * Gets the current `Selected Domain` text from the Select Domain Drop Down
  * element in the Top Reports page.
  *
  * @returns {Promise}
  */
  getSelectedDomain: function () {
    return this
      .getSelectDomainDDown()
      .getText();
  },

 /**
  * ### TopObjects.selectDomain()
  *
  * Selects an existing `Domain` in the Top Objects page.
  *
  * @param {Object} domain
  *
  * @returns {Promise}
  */
  selectDomain: function (domain) {
    var me = this;
    me.clickSelectDomain();
    me.clickSelectSearchDomain();
    me.setSelectSearchDomain(domain.name);
  },

 /**
  * ### TopObjects.createTopMostRequestedObjects()
  *
  * Selects the report `Top Most Requested Objects` in the Top Objects page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createTopMostRequestedObjects: function (dataReport) {
    this.form.setDelay(0, 0, dataReport.delay);
    this.form.setCountry(0, 1, dataReport.country);
    this.form.setOS(0, 2, dataReport.os);
    this.form.setDevice(0, 3, dataReport.device);
    this.form.setCount(0, 4, dataReport.count);
    this.form.clickCreateReport(0, 5);
  },

 /**
  * ### TopObjects.createTopReferers()
  *
  * Selects the report `Top Referers` in the Top Objects page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createTopReferers: function (dataReport) {
    this.form.setDelay(2, 0, dataReport.delay);
    this.form.setCountry(2, 1, dataReport.country);
    this.form.setOS(2, 2, dataReport.os);
    this.form.setDevice(2, 3, dataReport.device);
    this.form.setCount(2, 4, dataReport.count);
    this.form.clickCreateReport(2, 5);
  },

  /**
   * ### TopObjects.createTopEdgeCacheMisses()
   *
   * Selects the report `Top Edge Cache Misses` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTopEdgeCacheMisses: function (dataReport) {
    this.form.setDelay(4, 0, dataReport.delay);
    this.form.setCountry(4, 1, dataReport.country);
    this.form.setOS(4, 2, dataReport.os);
    this.form.setDevice(4, 3, dataReport.device);
    this.form.setCount(4, 4, dataReport.count);
    this.form.clickCreateReport(4, 5);
  },

  /**
   * ### TopObjects.createTop404NotFoundObjects()
   *
   * Selects the report `Top "404 Not Found: Objects` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTop404NotFoundObjects: function (dataReport) {
    this.form.setDelay(6, 0, dataReport.delay);
    this.form.setCountry(6, 1, dataReport.country);
    this.form.setOS(6, 2, dataReport.os);
    this.form.setDevice(6, 3, dataReport.device);
    this.form.setCount(6, 4, dataReport.count);
    this.form.clickCreateReport(6, 5);
  },

  /**
   * ### TopObjects.createTopObjects5XXErrorCodes()
   *
   * Selects report `Top Objects with 5XX Error Codes` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTopObjects5XXErrorCodes: function (dataReport) {
    this.form.setDelay(8, 0, dataReport.delay);
    this.form.setCountry(8, 1, dataReport.country);
    this.form.setOS(8, 2, dataReport.os);
    this.form.setDevice(8, 3, dataReport.device);
    this.form.setCount(8, 4, dataReport.count);
    this.form.clickCreateReport(8, 5);
  },

  /**
   * ### TopObjects.getTopMostRequestedObjects()
   *
   * Gets the report `The Most Requested Objects` in the Top Objects page.
   *
   * @returns {Promise}
   */
  getTopMostRequestedObjects: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(0, 0);
    dataReport.country = this.form.getCountry(0, 1);
    dataReport.os = this.form.getOS(0, 2);
    dataReport.device = this.form.getDevice(0, 3);
    dataReport.count = this.form.getCount(0, 4);
    return dataReport;
  },

  /**
   * ### TopObjects.createTopReferers()
   *
   * Gets the report `Top Referers` in the Top Objects page.
   *
   * @returns {Promise}
   */
  getTopReferers: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(1, 0);
    dataReport.country = this.form.getCountry(1, 1);
    dataReport.os = this.form.getOS(1, 2);
    dataReport.device = this.form.getDevice(1, 3);
    dataReport.count = this.form.getCount(1, 4);
    return dataReport;
  },

  /**
   * ### TopObjects.getTopEdgeCacheMisses()
   *
   * Gets the report `Top Edge Cache Misses` in the Top Objects page.
   *
   * @returns {Promise}
   */
  getTopEdgeCacheMisses: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(2, 0);
    dataReport.country = this.form.getCountry(2, 1);
    dataReport.os = this.form.getOS(2, 2);
    dataReport.device = this.form.getDevice(2, 3);
    dataReport.count = this.form.getCount(2, 4);
    return dataReport;
  },

  /**
   * ### TopObjects.getTop404NotFoundObjects()
   *
   * Gets the report `Top 404 Not Found Objects` in the Top Objects page.
   *
   * @returns {Promise}
   */
  getTop404NotFoundObjects: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(3, 0);
    dataReport.country = this.form.getCountry(3, 1);
    dataReport.os = this.form.getOS(3, 2);
    dataReport.device = this.form.getDevice(3, 3);
    dataReport.count = this.form.getCount(3, 4);
    return dataReport;
  },

  /**
   * ### TopObjects.getTopObjects5XXErrorCodes()
   *
   * Gets the report `Top Objects 5XX Error Codes` in the Top Objects page.
   *
   * @returns {Promise}
   */
  getTopObjects5XXErrorCodes: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(4, 0);
    dataReport.country = this.form.getCountry(4, 1);
    dataReport.os = this.form.getOS(4, 2);
    dataReport.device = this.form.getDevice(4, 3);
    dataReport.count = this.form.getCount(4, 4);
    return dataReport;
  }
};

module.exports = TopObjects;
