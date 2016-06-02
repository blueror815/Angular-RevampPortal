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

// # Top Reports Page Object

// Requiring `Top Reports Form` component page object.
var TopReportsForm = require('./topReportsForm');

// This `Top Reports` Page Object abstracts all operations or actions that a
// common top reports could do in the Portal app/site.
var TopReports = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    }
  },

  form: TopReportsForm,

  /**
   * ### TopReports.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Top Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  /**
   * ### TopReports.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Top Reports page from the Portal app.
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
   * ### TopReports.isDisplayed()
   *
   * Checks whether the Top Reports page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitle()
      .isPresent();
  },

 /**
  * ### TopReports.getChartTitle()
  *
  * Gets the `Title` label from the Chart report from Top Reports page.
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
  * ### TopReports.selectDomain()
  *
  * Selects the `Domain` name in Drop Down element from Top Reports page.
  *
  * @param {String} domain object to select the domain in Top Reports page.
  *
  * @returns {Promise}
  */
  selectDomain: function (domain) {
    this.form.clickDomain();
    this.form.setSearchDomain(domain.name);
  },

 /**
  * ### TopReports.getSelectedDomain()
  *
  * Gets the `Selected Domain` name from Drop Down in Top Reports page.
  *
  * @returns {Promise}
  */
  getSelectedDomain: function () {
    return this.form.getDomain();
  },

 /**
  * ### TopReports.createReport()
  *
  * Fills the `Top Proxy Traffic Reports` form in the Top Reports page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createReport: function (dataReport) {
    this.form.setDelay(dataReport.delay);
    this.form.setCountry(dataReport.country);
    this.form.clickUpdateReports();
  },

  /**
  * ### TopReports.getReportInfo()
  *
  * Gets the `Top Proxy Traffic Reports` form values from the Top Reports page.
  *
  * @returns {dataReport}
  */
  getReportInfo: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay();
    dataReport.country = this.form.getCountry();
    return dataReport;
  }
};

module.exports = TopReports;