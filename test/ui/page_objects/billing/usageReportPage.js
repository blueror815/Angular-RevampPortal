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

// # Usage Report Page Object

// This `Usage Report` Page Object abstracts all operations or actions
// that a common Usage Report could do in the Portal app/site.
var UsageReport = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: {
        css: '.col-md-12 .panel .panel-heading',
        pullLeft: '.pull-left'
      },
      panelBody: '.col-md-12 .panel .panel-body'
    },
    buttons: {
      updateReport: {
        css: '[ng-click=\"onUpdate()\"]'
      }
    },
    inputs: {
      companySearch: {
        model: '$select.search'
      }
    },
    dropDowns: {
      companyName: {
        css: '[ng-click=\"$select.toggle($event)\"]'
      }
    }
  },

  /**
   * ### UsageReport.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Usage Report page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### UsageReport.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Usage Report page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(1)
      .element(by.css(this.locators.views.panelHeading.css));
  },

  /**
   * ### UsageReport.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Usage Report page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(1)
      .all(by.css(this.locators.views.panelBody))
      .get(0);
  },

  /**
   * ### UsageReport.getPanelHeadingPullLeftElem()
   *
   * Gets the reference to `Pull Left` element in the portal app.
   *
   * @returns {Promise}
   */
  getPanelHeadingPullLeftElem: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.views.panelHeading.pullLeft));
  },

  /**
   * ### UsageReport.getCompanyNameDDown()
   *
   * Gets the reference to `Company Name` Drop Down element.
   *
   * @returns {Promise}
   */
  getCompanyNameDDown: function () {
    return element(by.css(this.locators.dropDowns.companyName.css));
  },

  /**
   * ### UsageReport.getCompanySearchTxt()
   *
   * Gets the reference to `Company Search` input element.
   *
   * @returns {Promise}
   */
  getCompanySearchTxt: function () {
    return element(by.model(this.locators.inputs.companySearch.model));
  },

  /**
   * ### UsageReport.getMonthDDTxt()
   *
   * Gets the reference to `Month dd` input element.
   *
   * @returns {Promise}
   */
  getMonthDDTxt: function () {
    return this
      .getPanelHeadingPullLeftElem()
      .element(by.id('month-dd'))
      .element(by.tagName('input'));
  },

  /**
   * ### UsageReport.getUpdateReportBtn()
   *
   * Gets the reference to `Update Report` button element.
   *
   * @returns {Promise}
   */
  getUpdateReportBtn: function () {
    return element(by.css(this.locators.buttons.updateReport.css));
  },

  /**
   * ### UsageReport.getForm()
   *
   * Gets the reference to `Domains` form element.
   *
   * @param {Number} rowIndex, index row's forms.
   *
   * @param {Number} columnIndex, index column's forms.
   *
   * @returns {Promise}
   */
  getForm: function (rowIndex, columnIndex) {
    return this
      .getPanelBodyElem()
      .all(by.css('.row'))
      .get(rowIndex)
      .all(by.css('.col-md-4'))
      .get(columnIndex);
  },

  /**
   * ### UsageReport.getDomainsForm()
   *
   * Gets the reference to `Domains` form element.
   *
   * @returns {Promise}
   */
  getDomainsForm: function () {
    return this.getForm(0, 0).getText();
  },

  /**
   * ### UsageReport.getMobileAppsForm()
   *
   * Gets the reference to `Mobile Apps` form element.
   *
   * @returns {Promise}
   */
  getMobileAppsForm: function () {
    return this.getForm(0, 1).getText();
  },

  /**
   * ### UsageReport.getApiKeysForm()
   *
   * Gets the reference to `Api Keys` form element.
   *
   * @returns {Promise}
   */
  getApiKeysForm: function () {
    return this.getForm(0, 2).getText();
  },

  /**
   * ### UsageReport.getTotalTrafficForm()
   *
   * Gets the reference to `Total Traffic` form element.
   *
   * @returns {Promise}
   */
  getTotalTrafficForm: function () {
    return this.getForm(1, 0).getText();
  },

  /**
   * ### UsageReport.getEdgeCacheUsageForm()
   *
   * Gets the reference to `Edge Cache Usage` form element.
   *
   * @returns {Promise}
   */
  getEdgeCacheUsageForm: function () {
    return this.getForm(1, 1).getText();
  },

  /**
   * ### UsageReport.getHTTPHTTPSRequestsForm()
   *
   * Gets the reference to `HTTP/HTTPS Requests` form element.
   *
   * @returns {Promise}
   */
  getHTTPHTTPSRequestsForm: function () {
    return this.getForm(1, 2).getText();
  },

  // ## Helper Methods

  /**
   * ### UsageReport.getTitle()
   *
   * Gets the title from `Usage Report` Page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### UsageReport.setCompanyName(value)
   *
   * Sets a value into `Company Name` drop down element from the page.
   *
   * @param {String} value
   *
   * @returns {Promise}
   */
  setCompanyName: function (value) {
    this.getCompanyNameDDown().click();
    this.getCompanySearchTxt().sendKeys(value);
    return this
      .getCompanySearchTxt()
      .sendKeys(protractor.Key.ENTER);
  },

  /**
   * ### UsageReport.getCompanyName()
   *
   * Gets a value from `Company Name` drop down element from the page.
   *
   * @returns {Promise}
   */
  getCompanyName: function (value) {
    return this.getCompanyNameDDown().getText();
  },

  /**
   * ### UsageReport.setMonthDD(value)
   *
   * Sets a value into `Month DD` input text element from the page.
   *
   * @param {String} value
   *
   * @returns {Promise}
   */
  setMonthDD: function (value) {
    this.getMonthDDTxt().clear();
    return this
      .getMonthDDTxt()
      .sendKeys(value);
  },

  /**
   * ### UsageReport.clickUpdateReport()
   *
   * Clicks on Update Report button of `Usage Report` Page.
   *
   * @returns {Promise}
   */
  clickUpdateReport: function () {
    return this
      .getUpdateReportBtn()
      .click();
  },

  /**
   * ### UsageReport.isEnabledUpdateReport()
   *
   * Checks if Update Report button is enabled in `Usage Report` Page.
   *
   * @returns {Promise}
   */
  isEnabledUpdateReport: function () {
    return this
      .getUpdateReportBtn()
      .isEnabled();
  },

  /**
   * ### UsageReport.fill(data)
   *
   * Fills Company Name and Date in `Usage Report` Page.
   *
   * @param {object} data, data with following schema.
   *
   *    {
   *        companyName: String,
   *        monthDD: String
   *    }
   * @returns {Promise}
   */
  fill: function (data) {
    return this.setCompanyName(data.companyName);
    // TODO need to find a way how to properly set a data in usage reporting screen
    //return this.setMonthDD(data.monthDD);
  },

  /**
   * ### UsageReport.updateReport()
   *
   * Fills data in Company and Date and click on Update Report button in
   * the `Usage Report` Page.
   *
   * @param {object} data, data with schema defined in fill method.
   *
   * @returns {Promise}
   */
  updateReport: function (data) {
    this.fill(data);
    return this.clickUpdateReport();
  }
};

module.exports = UsageReport;
