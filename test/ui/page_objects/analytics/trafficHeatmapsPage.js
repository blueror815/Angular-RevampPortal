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

// # Traffic Heatmaps Page Object

// Requiring `Traffic Heatmaps Form` component page object.
var TrafficHeatmapsForm = require('./trafficHeatmapsForm');

// This `Traffic Heatmaps` Page Object abstracts all operations or actions that
// a common Traffic Heatmaps could do in the Portal app/site.
var TrafficHeatmaps = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    }
  },

  form: TrafficHeatmapsForm,

  /**
   * ### TrafficHeatmaps.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Traffic Heatmaps page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  /**
   * ### TrafficHeatmaps.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Traffic Heatmaps page from the Portal app.
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
   * ### TrafficHeatmaps.isDisplayed()
   *
   * Checks whether the Traffic Heatmaps page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitle()
      .isPresent();
  },

  /**
   * ### TrafficHeatmaps.getChartTitle()
   *
   * Gets the `Title` label from the Chart report from Traffic Heatmaps page.
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
   * ### TrafficHeatmaps.selectDomain()
   *
   * Selects the `Domain` name in Drop Down element from Traffic Heatmaps page.
   *
   * @param {String} domain object to select in Traffic Heatmaps page.
   *
   * @returns {Promise}
   */
  selectDomain: function (domain) {
    this.form.clickDomain();
    this.form.setSearchDomain(domain.name);
  },

  /**
   * ### TrafficHeatmaps.getSelectedDomain()
   *
   * Gets the `Selected Domain` name from Drop Down in Traffic Heatmaps page.
   *
   * @returns {Promise}
   */
  getSelectedDomain: function () {
    return this.form.getDomain();
  },

  /**
   * ### TrafficHeatmaps.createTrafficHeatmaps()
   *
   * Creates the `Traffic Heatmaps` form in the Global Traffic Heatmaps page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTrafficHeatmaps: function (dataReport) {
    this.form.setDelay(dataReport.delay);
    this.form.clickUpdateReport();
  },

  /**
   * ### TrafficHeatmaps.getInfoTrafficHeatmaps()
   *
   * Gets the `Traffic Heatmaps` values from the Global Traffic Heatmaps page.
   *
   * @returns {dataReport}
   */
  getInfoTrafficHeatmaps: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay();
    return dataReport;
  },

  /**
   * ### TrafficHeatmaps.existHitsHeatmapImage()
   *
   * Checks if `Traffic Heatmaps` Image exists in Global Traffic Heatmaps page.
   *
   * @returns {dataReport}
   */
  existHitsHeatmapImage: function () {
    return this.form.isPresenttHitsHeatmap();
  },

  /**
   * ### TrafficHeatmaps.existGBTHeatmapImage()
   *
   * Checks if `Traffic Heatmaps` Image exists in Global Traffic Heatmaps page.
   *
   * @returns {dataReport}
   */
  existGBTHeatmapImage: function () {
    return this.form.isPresentGBTHeatmap();
  }
};

module.exports = TrafficHeatmaps;