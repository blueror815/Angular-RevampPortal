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

// # Treffic Heatmaps Page Object

// This `Treffic Heatmaps` Page Object abstracts all operations or actions that
// a common Global Traffic Heatmaps could do in the Portal app/site.
var TrafficHeatmapsForm = {

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
      hits: {
        id: 'canvas-svg-hits'
      },
      gbt: {
        id: 'canvas-svg-gbt'
      }
    }
  },

  /**
   * ### TrafficHeatmapsForm.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium
   * WebDriver Element) from the Global Traffic Heatmaps page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function (indexPanelHeading) {
    return element
      .all(by.css(this.locators.reports.container))
      .get(1)
      .all(by.css(this.locators.reports.panelHeading))
      .get(indexPanelHeading);
  },

  /**
   * ### TrafficHeatmapsForm.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium
   * WebDriver Element) from the Global Traffic Heatmaps page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function (indexPanelBody) {
    return element
      .all(by.css(this.locators.reports.container))
      .get(1)
      .all(by.css(this.locators.reports.panelBody))
      .get(indexPanelBody);
  },

  /**
   * ### TrafficHeatmapsForm.getDomainDDown()
   *
   * Gets the reference to `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomainDDown: function () {
    return this
      .getPanelHeadingElem(0)
      .element(by.css(this.locators.reports.pullLeft))
      .element(by.css(this.locators.dropDown.domain));
  },

  /**
   * ### TrafficHeatmapsForm.getDelayDDown()
   *
   * Gets the reference to `Delay` drop down element.
   *
   * @returns {Promise}
   */
  getDelayDDown: function () {
    return this
      .getPanelHeadingElem(0)
      .element(by.css(this.locators.reports.pullRight))
      .element(by.model(this.locators.dropDown.models.delay));
  },

  /**
   * ### TrafficHeatmapsForm.getUpdateReportBtn()
   *
   * Gets the reference to `Update report` button element.
   *
   * @returns {Promise}
   */
  getUpdateReportBtn: function () {
    return this
      .getPanelHeadingElem(0)
      .element(by.css(this.locators.reports.pullRight))
      .element(by.css(this.locators.buttons.updateReport));
  },

  /**
   * ### TrafficHeatmapsForm.getHitsHeatmapLbl()
   *
   * Gets the reference to `Hits Heatmap` label element.
   *
   * @returns {Promise}
   */
  getHitsHeatmapLbl: function () {
    return this
      .getPanelHeadingElem(1);
  },

  /**
   * ### TrafficHeatmapsForm.getHitsHeatmapImg()
   *
   * Gets the reference to `Hits Heatmap` image element.
   *
   * @returns {Promise}
   */
  getHitsHeatmapImg: function () {
    return this
      .getPanelBodyElem(0)
      .element(by.id(this.locators.images.hits.id));
  },

  /**
   * ### TrafficHeatmapsForm.getGBTHeatmapLbl()
   *
   * Gets the reference to `GBT Heatmap` label element.
   *
   * @returns {Promise}
   */
  getGBTHeatmapLbl: function () {
    return this
      .getPanelHeadingElem(2);
  },

  /**
   * ### TrafficHeatmapsForm.getGBTHeatmapImg()
   *
   * Gets the reference to `GBT Heatmap` image element.
   *
   * @returns {Promise}
   */
  getGBTHeatmapImg: function () {
    return this
      .getPanelBodyElem(1)
      .element(by.id(this.locators.images.gbt.id));
  },

  /**
   * ### TrafficHeatmapsForm.getSearchDomainTxtIn()
   *
   * Gets the reference to `Search Domain` textbox element.
   *
   * @returns {Promise}
   */
  getSearchDomainTxtIn: function () {
    return element(by.model(this.locators.dropDown.models.searchDomain));
  },
  
  /**
   * ### TrafficHeatmapsForm.setDelay()
   *
   * Sets the value to `Delay` drop down erlement.
   *
   * @param {String} Value of Delay drop down in Global Traffic Heatmaps page.
   *
   * @returns {Promise}
   */
  setDelay: function (value) {
    return this
      .getDelayDDown()
      .sendKeys(value);
  },

  /**
   * ### TrafficHeatmapsForm.setSearchDomain()
   *
   * Sets value from `Search Domain` textbox element.
   *
   * @param {String} Value to Search Domain in Global Traffic Heatmaps page.
   *
   * @returns {Promise}
   */
  setSearchDomain: function (value) {
    return this
      .getSearchDomainTxtIn()
      .sendKeys(value);
  },

  /**
   * ### TrafficHeatmapsForm.clickUpdateReport()
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
   * ### TrafficHeatmapsForm.getDelay()
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
   * ### TrafficHeatmapsForm.getDomain()
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
   * ### TrafficHeatmapsForm.clickDomain()
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
   * ### TrafficHeatmapsForm.isPresenttHitsHeatmap()
   *
   * Checks if `Hits Heatmap` exist in Global Traffic Heatmaps page.
   *
   * @returns {Promise}
   */
  isPresenttHitsHeatmap: function () {
    return this
      .getHitsHeatmapImg()
      .isPresent();
  },

  /**
   * ### TrafficHeatmapsForm.isPresentGBTHeatmap()
   *
   * Checks if `GBT Heatmap` exist in Global Traffic Heatmaps page.
   *
   * @returns {Promise}
   */
  isPresentGBTHeatmap: function () {
    return this
      .getGBTHeatmapImg()
      .isPresent();
  }
};

module.exports = TrafficHeatmapsForm;