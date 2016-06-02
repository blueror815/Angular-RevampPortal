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

// # Edit App Advanced Mode Page Object

// This `Edit App Advanced Mode` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var EditAppAdvancedMode = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body',
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      basicMode: {
        linkText: 'Basic Mode'
      },
      cancel: {
        linkText: 'Cancel'
      },
      verify: {
        css: '[ng-click=\"verify(copyForEditor)\"]'
      },
      update: {
        css: '[ng-click=\"updateApp(copyForEditor)\"]'
      },
      publish: {
        css: '[ng-click=\"publish(copyForEditor)\"]'
      }
    },
    jsoneditor: {
      id: 'json',
      menu: '.menu',
      aceEditor: '.ace_editor'
    }
  },

  /**
   * ### EditAppAdvancedMode.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit App Advanced Mode from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### EditAppAdvancedMode.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Edit App Advanced Mode page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(1)
      .element(by.css(this.locators.views.panelHeading));
  },

  /**
   * ### EditAppAdvancedMode.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Edit App Advanced Mode page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(1)
      .element(by.css(this.locators.views.panelBody));
  },

  /**
   * ### EditAppAdvancedMode.getJsonEditor()
   *
   * Gets the reference to `Json Editor` editor element.
   *
   * @returns {Promise}
   */
  getJsonEditor: function () {
    return element(by.id(this.locators.jsoneditor.id));
  },

  /**
   * ### EditAppAdvancedMode.getJsonEditorMenu()
   *
   * Gets the reference to `Json Editor Menu` editor menu element.
   *
   * @returns {Promise}
   */
  getJsonEditorMenu: function () {
    return element(by.id(this.locators.jsoneditor.menu));
  },

  /**
   * ### EditAppAdvancedMode.getJsonAceEditor()
   *
   * Gets the reference to `Json Ace Editor` ace editor element.
   *
   * @returns {Promise}
   */
  getJsonAceEditor: function () {
    return element(by.id(this.locators.jsoneditor.aceEditor));
  },

  /**
   * ### EditAppAdvancedMode.getBackToListBtn()
   *
   * Gets the reference to `Back To List` button element.
   *
   * @returns {Promise}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditAppAdvancedMode.getBasicModeBtn()
   *
   * Gets the reference to `Basic Mode` button element.
   *
   * @returns {Promise}
   */
  getBasicModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.basicMode.linkText));
  },

  /**
   * ### EditAppAdvancedMode.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditAppAdvancedMode.getVerifyBtn()
   *
   * Gets the reference to `Verify` button element.
   *
   * @returns {Promise}
   */
  getVerifyBtn: function () {
    return element(by.css(this.locators.buttons.verify.css));
  },

  /**
   * ### EditAppAdvancedMode.getUpdateBtn()
   *
   * Gets the reference to `Update` button element.
   *
   * @returns {Promise}
   */
  getUpdateBtn: function () {
    return element(by.css(this.locators.buttons.update.css));
  },

  /**
   * ### EditAppAdvancedMode.getPublishBtn()
   *
   * Gets the reference to `Publish` button element.
   *
   * @returns {Promise}
   */
  getPublishBtn: function () {
    return element(by.css(this.locators.buttons.publish.css));
  },

  // ## Helper Methods

  /**
   * ### EditAppAdvancedMode.getTitle()
   *
   * Gets the title from `Configure App` Page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditAppAdvancedMode.clickBackToList()
   *
   * Clicks on Back To List button of `Add New App` Page.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.clickAdvancedMode()
   *
   * Clicks on Advanced Mode button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.clickAddNewVersion()
   *
   * Clicks on Add New Version button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickAddNewVersion: function () {
    return this
      .getAddNewVersionBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.clickCancel()
   *
   * Clicks on Cancel button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.clickVerify()
   *
   * Clicks on Verify button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickVerify: function () {
    return this
      .getVerifyBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.clickUpdate()
   *
   * Clicks on Update button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.clickPublish()
   *
   * Clicks on Publish button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickPublish: function () {
    return this
      .getPublishBtn()
      .click();
  },

  /**
   * ### EditAppAdvancedMode.existJsonEditor()
   *
   * Checks if Json Editor exists in `Configure App` Page.
   *
   * @returns {Promise}
   */
  existJsonEditor: function () {
    var res1 = this.getJsonEditor().isPresent();
    var res2 = this.getJsonEditorMenu().isPresent();
    var res3 = this.getJsonAceEditor().isPresent();
    return (res1 === true && res2 === true && res3 === true) ? true : false;
  },

  /**
   * ### EditAppAdvancedMode.cancel()
   *
   * Cancels in the advanced edited app from `Edit Advanced App` page.
   *
   * @returns {Promise}
   */
  cancel: function () {
    return this.clickCancel();
  },

  /**
   * ### EditAppAdvancedMode.verify()
   *
   * Verifies in the advanced edited app from `Edit Advanced App` page.
   *
   * @returns {Promise}
   */
  verify: function () {
    return this.clickVerify();
  },

  /**
   * ### EditAppAdvancedMode.update()
   *
   * Updates in the advanced edited app from `Edit Advanced App` page.
   *
   * @returns {Promise}
   */
  update: function () {
    return this.clickUpdate();
  },

  /**
   * ### EditAppAdvancedMode.publish()
   *
   * Publishes in the advanced edited app from `Edit Advanced App` page.
   *
   * @returns {Promise}
   */
  publish: function () {
    return this.clickPublish();
  }
};

module.exports = EditAppAdvancedMode;
