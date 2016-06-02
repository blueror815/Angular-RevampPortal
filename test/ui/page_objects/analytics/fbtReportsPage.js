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

// # FBT Reports Page Object

// Requiring `FBT Reports Form` component page object.
var FBTReportsForm = require('./fbtReportsForm');

// This `FBT Reports` Page Object abstracts all operations or actions that a
// common FBT Reports could do in the Portal app/site.
var FBTReports = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    },
    titles: {
      css: 'h3'
    }
  },

  form: FBTReportsForm,

  /**
   * ### FBTReports.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the FBT Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  /**
   * ### FBTReports.getDistributionHistogramChartTitleElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the FBT Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDistributionHistogramChartTitleElements: function () {
    return element.all(by.css(this.locators.titles.css));
  },

  /**
   * ### FBTReports.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the FBT Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function () {
    var me = this;
    return me.getContainerFluidElem()
      .get(0)
      .getText();
  },

  // ## Helper Methods

  /**
   * ### FBTReports.isDisplayed()
   *
   * Checks whether the FBT Reports page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitle()
      .isPresent();
  },

  /**
   * ### FBTReports.getChartTitle()
   *
   * Gets the `Title` label from the Chart report from FBT Reports page.
   *
   * @returns {Promise}
   */
  getChartTitle: function () {
    return this
      .getContainerFluidElem()
      .get(1)
      .getText();
  },

  /**
   * ### FBTReports.getAverageFBTTitle()
   *
   * Gets the `Title` from Average FBT report from FBT Reports page.
   *
   * @returns {Promise}
   */
  getAverageFBTTitle: function () {
    return this
      .getDistributionHistogramChartTitleElements()
      .get(0)
      .getText();
  },

  /**
   * ### FBTReports.getDistributionHistogramTitle()
   *
   * Gets the `Title` from Distribution Histogram report from FBT Reports page.
   *
   * @returns {Promise}
   */
  getDistributionHistogramTitle: function () {
    return this
      .getDistributionHistogramChartTitleElements()
      .get(1)
      .getText();
  },

  /**
   * ### FBTReports.getFBTHeatmapTitle()
   *
   * Gets the `Title` from FBT Heatmap report from FBT Reports page.
   *
   * @returns {Promise}
   */
  getFBTHeatmapTitle: function () {
    return this
      .getDistributionHistogramChartTitleElements()
      .get(2)
      .getText();
  },

  /**
   * ### FBTReports.selectDomain()
   *
   * Selects the `Domain` name in Drop Down element from FBT Reports page.
   *
   * @param {String} domain object to select the domain in FBT Reports page.
   *
   * @returns {Promise}
   */
  selectDomain: function (domain) {
    this.form.clickDomain();
    this.form.setSearchDomain(domain.name);
  },

  /**
   * ### FBTReports.getSelectedDomain()
   *
   * Gets the `Selected Domain` name from Drop Down in FBT Reports page.
   *
   * @returns {Promise}
   */
  getSelectedDomain: function () {
    return this.form.getDomain();
  },

  /**
   * ### FBTReports.createAverageFBT()
   *
   * Creates the `Average FBT` form in the First Byte Time Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createAverageFBT: function (dataReport) {
    this.form.setDelay(0, dataReport.delay);
    this.form.setCountry(0, dataReport.country);
    this.form.setOS(0, dataReport.os);
    this.form.setDevice(0, dataReport.device);
    this.form.clickUpdateReport(0);
  },

  /**
   * ### FBTReports.createFBTValuesDistribution()
   *
   * Creates the `FBT values distribution` form First Byte Time Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createFBTValuesDistribution: function (dataReport) {
    this.form.setDelay(1, dataReport.delay);
    this.form.setCountry(1, dataReport.country);
    this.form.setOS(1, dataReport.os);
    this.form.setDevice(1, dataReport.device);
    this.form.clickUpdateReport(1);
  },

  /**
   * ### FBTReports.createFBTHeatmap()
   *
   * Creates the `FBT heatmap` form in First Byte Time Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createFBTHeatmap: function (dataReport) {
    this.form.setDelay(2, dataReport.delay);
    this.form.clickReloadFBTStats();
  },

  /**
   * ### FBTReports.getInfoAverageFBTReport()
   *
   * Gets the `Average FBT` values from First Byte Time Reports page.
   *
   * @returns {dataReport}
   */
  getInfoAverageFBTReport: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(0);
    dataReport.country = this.form.getCountry(0);
    dataReport.os = this.form.getOS(0);
    dataReport.device = this.form.getDevice(0);
    return dataReport;
  },

  /**
   * ### FBTReports.getInfoFBTValuesDistribution()
   *
   * Gets `FBT values distribution` values from First Byte Time Reports page.
   *
   * @returns {dataReport}
   */
  getInfoFBTValuesDistribution: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(1);
    dataReport.country = this.form.getCountry(1);
    dataReport.os = this.form.getOS(1);
    dataReport.device = this.form.getDevice(1);
    return dataReport;
  },

  /**
   * ### FBTReports.getFBTHeatmap()
   *
   * Gets the `FBT heatmap` values from the First Byte Time Reports page.
   *
   * @returns {dataReport}
   */
  getInfoFBTHeatmap: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(2);
    return dataReport;
  }
};

module.exports = FBTReports;