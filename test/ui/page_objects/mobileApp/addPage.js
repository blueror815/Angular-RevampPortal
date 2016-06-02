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

// # Add New App Page Object

var DropDownWidget = require('./../common/dropDownWidget');

// This `Add New App` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var AddNewApp = {

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
      cancel: {
        linkText: 'Cancel'
      },
      register: {
        css: '[ng-click=\"createApp(model)\"]'
      }
    },
    inputs: {
      appName: {
        id: 'app_name'
      },
      comment: {
        id: 'comment'
      }
    },
    dropDowns: {
//      platform: {
//        id: 'app_platform'
//      },
      companyName: {
        id: 'account_id'
      }
    }
  },

  /**
   * ### AddNewApp.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add New App page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### AddNewApp.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Add New App page in the Portal app.
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
   * ### AddNewApp.getAppNameTxt()
   *
   * Gets the reference to `App Name` text field element.
   *
   * @returns {Promise}
   */
  getAppNameTxt: function () {
    return element(by.id(this.locators.inputs.appName.id));
  },

  /**
   * ### AddNewApp.getPlatformDDown()
   *
   * Gets the reference to `Platform` Drop Down element.
   *
   * @returns {Promise}
   */
//  getPlatformDDown: function () {
//    return element(by.id(this.locators.dropDowns.platform.id));
//  },

  /**
   * ### AddNewApp.getCompanyNameDDown()
   *
   * Gets the reference to `Company Name` input text element.
   *
   * @returns {Object}
   */
  getCompanyNameDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.companyName.id));
  },

  /**
   * ### AddNewApp.getCommentTxt()
   *
   * Gets the reference to `Comment` textarea field element.
   *
   * @returns {Promise}
   */
  getCommentTxt: function () {
    return element(by.id(this.locators.inputs.comment.id));
  },

  /**
   * ### AddNewApp.getBackToListBtn()
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
   * ### AddNewApp.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### AddNewApp.getRegisterBtn()
   *
   * Gets the reference to `Register` button element.
   *
   * @returns {Promise}
   */
  getRegisterBtn: function () {
    return element(
      by.css(this.locators.buttons.register.css));
  },

  // ## Helper Methods

  /**
   * ### AddNewApp.setAppName(value)
   *
   * Sets a value into App Name field in `Add New App` Page.
   *
   * @param {String} value
   *
   * @returns {Promise}
   */
  setAppName: function (value) {
    return this
      .getAppNameTxt()
      .sendKeys(value);
  },

  /**
   * ### AddNewApp.setPlatform(value)
   *
   * Selects a platform value from Platform drop down in `Add New App` Page.
   *
   * @param {String} value
   *
   * @returns {Promise}
   */
//  setPlatform: function (value) {
//   return this
//      .getPlatformDDown()
//      .sendKeys(value);
//  },

  /**
   * ### AddNewApp.setCompanyName(value)
   *
   * Selects a Company Name value from Platform drop down in `Add New App` Page.
   *
   * @param {String} companyName.
   *
   * @returns {Promise}
   */
  setCompanyName: function (companyName) {
    return this
      .getCompanyNameDDown()
      .setValue(companyName);
  },

  /**
   * ### AddNewApp.setComment(comment)
   *
   * Selects a Company Name value from Platform drop down in `Add New App` Page.
   *
   * @param {String} comment.
   *
   * @returns {Promise}
   */
  setComment: function (comment) {
    return this
      .getCommentTxt()
      .sendKeys(comment);
  },

  /**
   * ### AddNewApp.clickBackToList()
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
   * ### AddNewApp.clickCancel()
   *
   * Clicks on Cancel button of `Add New App` Page.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### AddNewApp.clickRegister()
   *
   * Clicks on Register button of `Add New App` Page.
   *
   * @returns {Promise}
   */
  clickRegister: function () {
    if (this.getRegisterBtn()) {
      return this.getRegisterBtn().click();
    } else {
      return null;
    }
  },

  /**
   * ### AddNewApp.isEnabledRegister()
   *
   * Checks if Register button is enabled in `Add New App` Page.
   *
   * @returns {Promise}
   */
  isEnabledRegister: function () {
    return this
      .getRegisterBtn()
      .isEnabled();
  },

  /**
   * ### AddNewApp.isDisplayed()
   *
   * Checks whether the Add App page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddNewApp.fill(app)
   *
   * Fills on Add New App form of `Add New App` Page.
   *
   * @param {object} app, app data with following schema.
   *
   *    {
   *        name: String,
   *        platform: String
   *    }
   * @returns {Promise}
   */
  fill: function (app) {
    var me = this;
    return element.all(by.id(this.locators.dropDowns.companyName.id))
      .then(function (items) {
        me.setAppName(app.name);
        //me.setPlatform(app.platform);
        me.setComment(app.comment);
        if (app.companyName && items.length > 0) {
          me.setCompanyName(app.companyName);
        }
      });
  }
};

module.exports = AddNewApp;
