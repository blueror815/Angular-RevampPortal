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

// # RTT Heatmaps Page Object

// Requiring `RTT Heatmaps Form` component page object.
var RTTHeatmapsForm = require('./rttHeatmapsForm');

// This `RTT Heatmaps` Page Object abstracts all operations or actions that
// a common RTT Heatmaps could do in the Portal app/site.
var RTTHeatmaps = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    }
  },

  form: RTTHeatmapsForm,

  /**
   * ### RTTHeatmaps.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Global Last Mile RTT Heatmap page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  /**
   * ### RTTHeatmaps.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Global Last Mile RTT Heatmap page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function () {
    return this
      .getContainerFluidElem()
      .get(0)
      .getText();
  },

  // ## Helper Methods

  /**
   * ### RTTHeatmaps.isDisplayed()
   *
   * Checks whether the RTT Heatmaps page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitle()
      .isPresent();
  },

  /**
   * ### RTTHeatmaps.selectDomain()
   *
   * Selects the `Domain` name in Drop Down element from Global Last Mile RTT 
   * Heatmap page.
   *
   * @param {String} domain object to select in RTT Heatmaps page.
   *
   * @returns {Promise}
   */
  selectDomain: function (domain) {
    this.form.clickDomain();
    this.form.setSearchDomain(domain.name);
  },

  /**
   * ### RTTHeatmaps.getSelectedDomain()
   *
   * Gets the `Selected Domain` name from Drop Down element in Global Last 
   * Mile RTT Heatmap page.
   *
   * @returns {Promise}
   */
  getSelectedDomain: function () {
    return this.form.getDomain();
  },

  /**
   * ### RTTHeatmaps.createRTTHeatmaps()
   *
   * Creates the `RTT Heatmaps` form in the Global Last Mile RTT Heatmap page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createRTTHeatmaps: function (dataReport) {
    this.form.setDelay(dataReport.delay);
    this.form.clickUpdateReport();
  },

  /**
   * ### RTTHeatmaps.getInfoRTTHeatmap()
   *
   * Gets the `RTT Heatmaps` values from the Global Last Mile RTT Heatmap page.
   *
   * @returns {dataReport}
   */
  getInfoRTTHeatmap: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay();
    return dataReport;
  },

  /**
   * ### RTTHeatmaps.existRTTHeatmapImage()
   *
   * Checks if `RTT Heatmaps` Image exists in Global Last Mile RTT Heatmap page.
   *
   * @returns {dataReport}
   */
  existRTTHeatmapImage: function () {
    return this.form.isPresentRTTHeatmapImage();
  }
};

module.exports = RTTHeatmaps;