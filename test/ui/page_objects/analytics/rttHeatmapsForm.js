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

// This `RTT Heatmaps` Page Object abstracts all operations or actions that
// a common Global Last Mile RTT Heatmap could do in the Portal app/site.
var RTTHeatmapsForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body',
      pullLeft: '.row .col-md-12 .pull-left',
      pullRight: '.row .col-md-12 .pull-right'
    },
    dropDown: {
      domain: '[ng-click="$select.toggle($event)"]',
      models: {
        delay: 'delay',
        searchDomain: '$select.search'
      }
    },
    buttons: {
      updateReport: '[ng-click="onDomainSelect()"]'
    },
    images: {
      id: 'canvas-svg'
    }
  },

  /**
   * ### RTTHeatmapsForm.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Global Last Mile RTT Heatmap page in the Portal app.
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
   * ### RTTHeatmapsForm.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Global Last Mile RTT Heatmap page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.reports.container))
      .get(1)
      .element(by.css(this.locators.reports.panelBody));
  },

  /**
   * ### RTTHeatmapsForm.getDomainDDown()
   *
   * Gets the reference to `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomainDDown: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.reports.pullLeft))
      .element(by.css(this.locators.dropDown.domain));
  },

  /**
   * ### RTTHeatmapsForm.getDelayDDown()
   *
   * Gets the reference to `Delay` drop down element.
   *
   * @returns {Promise}
   */
  getDelayDDown: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.reports.pullRight))
      .element(by.model(this.locators.dropDown.models.delay));
  },

  /**
   * ### RTTHeatmapsForm.getUpdateReportBtn()
   *
   * Gets the reference to `Update report` button element.
   *
   * @returns {Promise}
   */
  getUpdateReportBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.reports.pullRight))
      .element(by.css(this.locators.buttons.updateReport));
  },

  /**
   * ### RTTHeatmapsForm.getRTTHeatmapImg()
   *
   * Gets the reference to `Global Last Mile RTT Heatmap` image element.
   *
   * @returns {Promise}
   */
  getRTTHeatmapImg: function () {
    return this
      .getPanelBodyElem()
      .element(by.id(this.locators.images.id));
  },

  /**
   * ### RTTHeatmapsForm.getSearchDomainTxtIn()
   *
   * Gets the reference to `Search Domain` textbox element.
   *
   * @returns {Promise}
   */
  getSearchDomainTxtIn: function () {
    return element(by.model(this.locators.dropDown.models.searchDomain));
  },
  
  /**
   * ### RTTHeatmapsForm.setDelay()
   *
   * Sets the value to `Delay` drop down erlement.
   *
   * @param {String} Value of Delay in Global Last Mile RTT Heatmap page.
   *
   * @returns {Promise}
   */
  setDelay: function (value) {
    return this
      .getDelayDDown()
      .sendKeys(value);
  },

  /**
   * ### RTTHeatmapsForm.setSearchDomain()
   *
   * Sets value from `Search Domain` textbox element.
   *
   * @param {String} Value to Search Domain in Global Last Mile RTT Heatmap page
   *
   * @returns {Promise}
   */
  setSearchDomain: function (value) {
    return this
      .getSearchDomainTxtIn()
      .sendKeys(value);
  },

  /**
   * ### RTTHeatmapsForm.clickUpdateReport()
   *
   * Clicks on the "Update Report" button.
   *
   * @returns {Promise}
   */
  clickUpdateReport: function () {
    return this
      .getUpdateReportBtn()
      .click();
  },

  /**
   * ### RTTHeatmapsForm.getDelay()
   *
   * Gets the value from `Delay` drop down element.
   *
   * @returns {Promise}
   */
  getDelay: function () {
    return this
      .getDelayDDown()
      .getText();
  },

  /**
   * ### RTTHeatmapsForm.getDomain()
   *
   * Gets the value from `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomain: function () {
    return this
      .getDomainDDown()
      .getText();
  },

  /**
   * ### RTTHeatmapsForm.clickDomain()
   *
   * Clicks on the `Domain` drop down element.
   *
   * @returns {Promise}
   */
  clickDomain: function () {
    return this
      .getDomainDDown()
      .click();
  },

  /**
   * ### RTTHeatmapsForm.isPresentRTTHeatmapImage()
   *
   * Checks if `RTT Heatmap` exist in Global Last Mile RTT Heatmap page.
   *
   * @returns {Promise}
   */
  isPresentRTTHeatmapImage: function () {
    return this
      .getRTTHeatmapImg()
      .isPresent();
  }
};

module.exports = RTTHeatmapsForm;