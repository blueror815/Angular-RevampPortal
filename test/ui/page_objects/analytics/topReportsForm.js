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

// This `Top Reports` Page Object abstracts all operations or actions that a
// common top reports could do in the Portal app/site.
var TopReportsForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      pullLeft: '.row .col-md-12 .pull-left',
      pullRight: '.row .col-md-12 .pull-right'
    },
    dropDown: {
      css: '[ng-click="$select.toggle($event)"]',
      models: {
        delay: 'delay',
        country: 'country_filter',
        searchDomain: '$select.search'
      }
    },
    button: {
      updateReports: '[ng-click="onDomainSelected()"]'
    }
  },

  /**
   * ### TopReportsForm.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium
   * WebDriver Element) from the Top Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.reports.container))
      .get(1)
      .element(by.css(this.locators.reports.panelHeading));
  },

  /**
   * ### TopReportsForm.getPullLeftElem()
   *
   * Returns the reference to the `Pull Left` element (Selenium
   * WebDriver Element) from the Top Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPullLeftElem: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.reports.pullLeft));
  },

  /**
   * ### TopReportsForm.getPullRightElem()
   *
   * Returns the reference to the `Form` element to fill settings values
   * (Selenium WebDriver Element) from the Top Reports from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPullRightElem: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.reports.pullRight));
  },

  /**
   * ### TopReportsForm.getDomainDDown()
   *
   * Gets the reference from `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomainDDown: function () {
    return this
      .getPullLeftElem()
      .element(by.css(this.locators.dropDown.css));
  },

  /**
   * ### TopReportsForm.getDelayDDown()
   *
   * Gets the reference from `Delay` drop down element.
   *
   * @returns {Promise}
   */
  getDelayDDown: function () {
    return this
      .getPullRightElem()
      .element(by.model(this.locators.dropDown.models.delay));
  },

  /**
   * ### TopReportsForm.getCountryDDown()
   *
   * Gets the reference from `Country` drop down element.
   *
   * @returns {Promise}
   */
  getCountryDDown: function () {
    return this
      .getPullRightElem()
      .element(by.model(this.locators.dropDown.models.country));
  },

  /**
   * ### TopReportsForm.getUpdateReportsBtn()
   *
   * Gets the reference from `Update Reports` button element.
   *
   * @returns {Promise}
   */
  getUpdateReportsBtn: function () {
    return this
      .getPullRightElem()
      .element(by.css(this.locators.button.updateReports));
  },

  /**
   * ### TopReportsForm.getSearchDomainTxtIn()
   *
   * Gets the reference from `Search Domain` textbox element.
   *
   * @returns {Promise}
   */
  getSearchDomainTxtIn: function () {
    return element(by.model(this.locators.dropDown.models.searchDomain));
  },

  /**
   * ### TopReportsForm.setDelay()
   *
   * Sets the value from `Delay` combo box.
   *
   * @param {String} Value to select in the Delay drop down in Top Reports page.
   *
   * @returns {Promise}
   */
  setDelay: function (value) {
    return this
      .getDelayDDown()
      .sendKeys(value);
  },

  /**
   * ### TopReportsForm.setCountry()
   *
   * Sets the value from `Country` combo box.
   *
   * @param {String} Value to select in Country drop down in Top Reports page.
   *
   * @returns {Promise}
   */
  setCountry: function (value) {
    return this
      .getCountryDDown()
      .sendKeys(value);
  },

  /**
   * ### TopReportsForm.setSearchDomain()
   *
   * Sets the value from `Search Domain` combo box.
   *
   * @param {String} Value for Search Domain text box in Top Reports page.
   *
   * @returns {Promise}
   */
  setSearchDomain: function (value) {
    return this
      .getSearchDomainTxtIn()
      .sendKeys(value);
  },

  /**
   * ### TopReportsForm.getDomain()
   *
   * Gets the value from `Domain` drop down.
   *
   * @returns {Promise}
   */
  getDomain: function () {
    return this
      .getDomainDDown()
      .getText();
  },

  /**
   * ### TopReportsForm.getDelay()
   *
   * Gets the value from `Delay` drop down.
   *
   * @returns {Promise}
   */
  getDelay: function () {
    return this
      .getDelayDDown()
      .getText();
  },

  /**
   * ### TopReportsForm.getCountry()
   *
   * Gets the value from `Country` drop down.
   *
   * @returns {Promise}
   */
  getCountry: function () {
    return this
      .getCountryDDown()
      .getText();
  },

  /**
   * ### TopReportsForm.clickDomain()
   *
   * Clicks the `Domain` drop down element.
   *
   * @returns {Promise}
   */
  clickDomain: function () {
    return this
      .getDomainDDown()
      .click();
  },

  /**
   * ### TopReportsForm.clickUpdateReports()
   *
   * Clicks on the "Update Reports" button.
   *
   * @returns {Promise}
   */
  clickUpdateReports: function () {
    return this
      .getUpdateReportsBtn()
      .click();
  }
};

module.exports = TopReportsForm;