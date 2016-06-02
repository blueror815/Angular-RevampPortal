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

// # Purge Cache Page Object

// This `Purge Cache` Page Object abstracts all operations or actions that
// a common Purge Cached Objects could do in the Portal app/site.
var PurgeCacheAdvanced = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: '.col-md-12 .panel .panel-heading',
    panelBody: '.col-md-12 .panel .panel-body',
    pullLeft: '.pull-left',
    pullRight: '.pull-right',
    dropDown: {
      domain: '[ng-click="$select.toggle($event)"]',
      models: {
        searchDomain: '$select.search'
      }
    },
    jsonEditor: {
      aceEditor: {
        css: '.ace_editor'
      },
      aceContent: {
        css: '.ace_content'
      },
      jsonExamples: {
        css: '.col-md-4 .form-group'
      }
    },
    buttons: {
      advancedMode: {
        linkText: 'Advanced Mode'
      },
      basicMode: {
        linkText: 'Basic Mode'
      },
      purge: {
        css: '[ng-click="purge()"]'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  /**
   * ### PurgeCacheAdvanced.getTitleLbl()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Purge Cached Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element
      .all(by.css(this.locators.container))
      .get(0);
  },

  /**
   * ### PurgeCacheAdvanced.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Purge Cached Objects page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelHeading));
  },

  /**
   * ### PurgeCacheAdvanced.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Purge Cached Objects page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelBody));
  },

  /**
   * ### PurgeCacheAdvanced.getAdvancedModeBtn()
   *
   * Gets the reference to `Advanced Mode` button element.
   *
   * @returns {Promise}
   */
  getAdvancedModeBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.pullRight))
      .element(by.partialLinkText(this.locators.buttons.advancedMode.linkText));
  },

  /**
   * ### PurgeCacheAdvanced.getBasicModeBtn()
   *
   * Gets the reference to `Basic Mode` button element.
   *
   * @returns {Promise}
   */
  getBasicModeBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.pullRight))
      .element(by.partialLinkText(this.locators.buttons.basicMode.linkText));
  },

  /**
   * ### PurgeCacheAdvanced.getPurgeBtn()
   *
   * Gets the reference to `Purge` button element.
   *
   * @returns {Promise}
   */
  getPurgeBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.buttons.purge.css));
  },

  /**
   * ### PurgeCacheAdvanced.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### PurgeCacheAdvanced.getDomainDDown()
   *
   * Gets the reference to `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomainDDown: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.pullLeft))
      .element(by.css(this.locators.dropDown.domain));
  },

  /**
   * ### PurgeCacheAdvanced.getSearchDomainTxtIn()
   *
   * Gets the reference to `Search Domain` textbox element.
   *
   * @returns {Promise}
   */
  getSearchDomainTxtIn: function () {
    return element(by.model(this.locators.dropDown.models.searchDomain));
  },

  /**
   * ### PurgeCacheAdvanced.getAceEditorElem()
   *
   * Gets the reference to `Ace Editor` element.
   *
   * @returns {Promise}
   */
  getAceEditorElem: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.jsonEditor.aceEditor.css));
  },

  /**
   * ### PurgeCacheAdvanced.getAceContentElem()
   *
   * Gets the reference to `Ace Content` textarea element.
   *
   * @returns {Promise}
   */
  getAceContentElem: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.jsonEditor.aceContent));
  },

  clickEditorViewList: function (indexList) {
    return this
      .getPanelBodyElem()
      .element(by.css('.jsoneditor .menu .modes'))
      .click();
  },

  selectViewList: function (indexList) {
    var view = element.all(by.css('.jsoneditor-contextmenu .menu .type-modes'));
    return view
      .get(indexList)
      .click();
  },

  changeToView: function () {
    this.clickEditorViewList();
    this.selectViewList(1);
  },

  changeToCode: function () {
    this.clickEditorViewList();
    this.selectViewList(1);
  },

  /**
   * ### PurgeCacheAdvanced.getJsonExampleElem()
   *
   * Gets the reference to `Json Example` text elements.
   *
   * @param {String} indexForm to find an example in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  getJsonExampleElem: function (indexForm) {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.jsonEditor.jsonExamples.css))
      .get(indexForm);
  },

  /**
   * ### PurgeCacheAdvanced.setSearchDomain()
   *
   * Sets value from `Search Domain` textbox element.
   *
   * @param {String} Value to Search Domain in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  setSearchDomain: function (value) {
    this.getSearchDomainTxtIn().sendKeys(value);
    this.getSearchDomainTxtIn().sendKeys(protractor.Key.ENTER);
  },

  /**
   * ### PurgeCacheAdvanced.setAceContent()
   *
   * Sets value in `Ace Content` from Ace Editor element.
   *
   * @param {String} Value to Text Area in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  setAceContent: function (value) {
    return this
      .getAceContentElem()
      .sendKeys(value);
  },

  /**
   * ### PurgeCacheAdvanced.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Purge Cached Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### PurgeCacheAdvanced.getDomain()
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
   * ### PurgeCacheAdvanced.getAceContent()
   *
   * Gets the value from `Ace Content` from Ace Editor element.
   *
   * @returns {Promise}
   */
  getAceContent: function () {
    return this
      .getAceContentElem()
      .getText();
  },

  /**
   * ### PurgeCacheAdvanced.getJsonExample()
   *
   * Gets the value from `Json Examples` areas.
   *
   * @param {String} indexForm to find an example in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  getJsonExample: function (indexForm) {
    return this
      .getJsonExampleElem(indexForm)
      .getText();
  },

  /**
   * ### PurgeCacheAdvanced.clickAdvancedMode()
   *
   * Clicks on the "Advanced Mode" button element.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },

  /**
   * ### PurgeCacheAdvanced.clickBasicMode()
   *
   * Clicks on the "Basic Mode" button element.
   *
   * @returns {Promise}
   */
  clickBasicMode: function () {
    return this
      .getBasicModeBtn()
      .click();
  },

  /**
   * ### PurgeCacheAdvanced.clickDomain()
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
   * ### PurgeCacheAdvanced.clickPurge()
   *
   * Clicks on the `Purge` button element.
   *
   * @returns {Promise}
   */
  clickPurge: function () {
    return this
      .getPurgeBtn()
      .click();
  },

  /**
   * ### PurgeCacheAdvanced.clickCancel()
   *
   * Clicks on the `Cancel` button element.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### PurgeCacheAdvanced.isDisplayed()
   *
   * Checks whether the Purge Cached Objects page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    var title = this.getTitle().isPresent();
    var aceEditor = this.getAceEditorElem().isPresent();
    var purgeButton = this.getPurgeBtn().isPresent();
    var cancelButton = this.getCancelBtn().isPresent();
    return (title && aceEditor && purgeButton && cancelButton);
  },

  /**
   * ### PurgeCacheAdvanced.selectDomain()
   *
   * Selects `Domain` name in Drop Down element in Purge Cached Objects page.
   *
   * @param {String} domain object to select in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  selectDomain: function (domain) {
    this.clickDomain();
    return this.setSearchDomain(domain.name);
  }
};

module.exports = PurgeCacheAdvanced;
