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

// # Proxy Traffic Page Object

// Requiring `Proxy Traffic form` component page object.
var ProxyTrafficForm = require('./proxyTrafficForm');

// This `Proxy Traffic` Page Object abstracts all operations or actions that a
// common proxy traffic could do in the Portal app/site.
var ProxyTraffic = {

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

  form: ProxyTrafficForm,

 /**
  * ### ProxyTraffic.getReportsObj()
  *
  * Returns the reference to the `Reports` label element (Selenium WebDriver
  * Element) from the Proxy Traffic page from the Portal app.
  *
  * @returns {Selenium WebDriver Element}
  */
  getReportsObj: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### ProxyTraffic.getChartsTableObj()
   *
   * Returns the reference to the `Reports` charts table object (Selenium
   * WebDriver Element) from the Proxy Traffic page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getChartsTableObj: function () {
    return element.all(by.css(this.locators.chartsTable.css));
  },

  /**
   * ### ProxyTraffic.getSelectDomainDDown()
   *
   * Returns the reference to the `Select domain` button (Selenium WebDriver
   * Element) from the Proxy Traffic page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectDomainDDown: function () {
    return element(
      by.css(this.locators.dropDown.css));
  },

  /**
   * ### ProxyTraffic.getSelectSearchInput()
   *
   * Returns the reference to the `Select Search` Input (Selenium WebDriver
   * Element) from the Proxy Traffic page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectSearchInput: function () {
    return element(
      by.model(this.locators.selectSearch.textBox));
  },

  // ## Methods to interact with the Proxy Traffic Page components

  /**
   * ### ProxyTraffic.clickSelectDomain()
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
   * ### ProxyTraffic.clickSelectSearchDomain()
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
   * ### ProxyTraffic.setSelectSearchDomain()
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
   * ### ProxyTraffic.isDisplayed()
   *
   * Checks whether the Proxy Traffic page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### ProxyTraffic.getTitle()
   *
   * Gets the `Title` label from the Proxy Traffic page.
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
  * ### ProxyTraffic.getChartTitle()
  *
  * Gets the `Title` label from the Chart report from Proxy Traffic page.
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
  * ### ProxyTraffic.getSelectedDomain()
  *
  * Gets the current `Selected Domain` text from the Select Domain Drop Down
  * element in the Proxy Traffic page.
  *
  * @returns {Promise}
  */
  getSelectedDomain: function () {
    return this
      .getSelectDomainDDown()
      .getText();
  },

 /**
  * ### ProxyTraffic.selectDomain()
  *
  * Selects an existing `Domain` in the Proxy Traffic page.
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
  * ### ProxyTraffic.createBandwidthUsageReport()
  *
  * Selects the report `Bandwidth Usage` in the Proxy Traffic page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createBandwidthUsageReport: function (dataReport) {
    this.form.setDelay(0, 0, dataReport.delay);
    this.form.setCountry(0, 1, dataReport.country);
    this.form.setOS(0, 2, dataReport.os);
    this.form.setDevice(0, 3, dataReport.device);
    this.form.clickCreateReport(0, 4);
  },

 /**
  * ### ProxyTraffic.createTotalRequestsReport()
  *
  * Selects the report `Total Requests` in the Proxy Traffic page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createTotalRequestsReport: function (dataReport) {
    this.form.setDelay(1, 0, dataReport.delay);
    this.form.setCountry(1, 1, dataReport.country);
    this.form.setOS(1, 2, dataReport.os);
    this.form.setDevice(1, 3, dataReport.device);
    this.form.clickCreateReport(1, 4);
  },

  /**
   * ### ProxyTraffic.createHttpHttpsHitsReport()
   *
   * Selects the report `HTTP and HTTPS Hits` in the Proxy Traffic page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createHttpHttpsHitsReport: function (dataReport) {
    this.form.setDelay(2, 0, dataReport.delay);
    this.form.setCountry(2, 1, dataReport.country);
    this.form.setOS(2, 2, dataReport.os);
    this.form.setDevice(2, 3, dataReport.device);
    this.form.clickCreateReport(2, 4);
  },

  /**
   * ### ProxyTraffic.createHttpStatusCodeHitsReport()
   *
   * Selects the report `HTTP Status Code Hits` in the Proxy Traffic page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createHttpStatusCodeHitsReport: function (dataReport) {
    this.form.setDelay(3, 0, dataReport.delay);
    this.form.setCountry(3, 1, dataReport.country);
    this.form.setOS(3, 2, dataReport.os);
    this.form.setDevice(3, 3, dataReport.device);
    this.form.clickCreateReport(3, 4);
  },

  /**
   * ### ProxyTraffic.createRequestStatusReport()
   *
   * Selects the report `Success/Failure Status Hits` in the Proxy Traffic page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createRequestStatusReport: function (dataReport) {
    this.form.setDelay(4, 0, dataReport.delay);
    this.form.setCountry(4, 1, dataReport.country);
    this.form.setOS(4, 2, dataReport.os);
    this.form.setDevice(4, 3, dataReport.device);
    this.form.clickCreateReport(4, 4);
  },

  /**
   * ### ProxyTraffic.createEdgeCacheEfficiencyHitsReport()
   *
   * Selects the report `Edge Cache Efficiency Hits` in the Proxy Traffic page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createEdgeCacheEfficiencyHitsReport: function (dataReport) {
    this.form.setDelay(5, 0, dataReport.delay);
    this.form.setCountry(5, 1, dataReport.country);
    this.form.setOS(5, 2, dataReport.os);
    this.form.setDevice(5, 3, dataReport.device);
    this.form.clickCreateReport(5, 4);
  },

  /**
   * ### ProxyTraffic.getBandwidthUsageValues()
   *
   * Gets the report `Bandwidth Usage` in the Proxy Traffic page.
   *
   * @returns {Promise}
   */
  getBandwidthUsageValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(0, 0);
    dataReport.country = this.form.getCountry(0, 1);
    dataReport.os = this.form.getOS(0, 2);
    dataReport.device = this.form.getDevice(0, 3);
    return dataReport;
  },

  /**
   * ### ProxyTraffic.getTotalRequestsValues()
   *
   * Gets the report `Total Requests` in the Proxy Traffic page.
   *
   * @returns {Promise}
   */
  getTotalRequestsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(1, 0);
    dataReport.country = this.form.getCountry(1, 1);
    dataReport.os = this.form.getOS(1, 2);
    dataReport.device = this.form.getDevice(1, 3);
    return dataReport;
  },

  /**
   * ### ProxyTraffic.getHttpHttpsHitsValues()
   *
   * Gets the report `HTTP HTTPS Hits` in the Proxy Traffic page.
   *
   * @returns {Promise}
   */
  getHttpHttpsHitsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(2, 0);
    dataReport.country = this.form.getCountry(2, 1);
    dataReport.os = this.form.getOS(2, 2);
    dataReport.device = this.form.getDevice(2, 3);
    return dataReport;
  },

  /**
   * ### ProxyTraffic.getHttpStatusCodeHitsValues()
   *
   * Gets the report `HTTP Status Code Hits` in the Proxy Traffic page.
   *
   * @returns {Promise}
   */
  getHttpStatusCodeHitsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(3, 0);
    dataReport.country = this.form.getCountry(3, 1);
    dataReport.os = this.form.getOS(3, 2);
    dataReport.device = this.form.getDevice(3, 3);
    return dataReport;
  },

  /**
   * ### ProxyTraffic.getRequestStatusValues()
   *
   * Gets the report `Success/Failure Request Status` in the Proxy Traffic page.
   *
   * @returns {Promise}
   */
  getRequestStatusValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(4, 0);
    dataReport.country = this.form.getCountry(4, 1);
    dataReport.os = this.form.getOS(4, 2);
    dataReport.device = this.form.getDevice(4, 3);
    return dataReport;
  },

  /**
   * ### ProxyTraffic.getEdgeCacheEfficiencyHitsValues()
   *
   * Gets the report `Edge Cache Efficiency Hits` in the Proxy Traffic page.
   *
   * @returns {Promise}
   */
  getEdgeCacheEfficiencyHitsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(5, 0);
    dataReport.country = this.form.getCountry(5, 1);
    dataReport.os = this.form.getOS(5, 2);
    dataReport.device = this.form.getDevice(5, 3);
    return dataReport;
  }
};

module.exports = ProxyTraffic;
