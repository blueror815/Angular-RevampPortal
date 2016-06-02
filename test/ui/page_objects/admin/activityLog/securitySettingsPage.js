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

// # Security Settings Page Object

// This `Security Settings` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var SecuritySettings = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body',
      factorAuth: '.row .col-md-6',
      QRCode: '.col-md-6.text-center'
    },
    buttons: {
      auth: '[ng-click="init()"]',
      enable2FA: '[ng-click="enable(oneTimePassword)"]',
      cancel: '[ng-click="clearCodes()"]'
    },
    inputs: {
      text: 'one-time-password'
    }
  },

  /**
   * ### SecuritySettings.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Security Settings page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### SecuritySettings.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Global Last Mile RTT Heatmap page in the Portal app.
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
   * ### SecuritySettings.getTwoFactorAuthElem()
   *
   * Gets the reference to `Two Factor Authentication` strong element.
   *
   * @returns {Promise}
   */
  getTwoFactorAuthElem: function () {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.views.factorAuth))
      .get(0);
  },

  /**
   * ### SecuritySettings.getDisabledBtn()
   *
   * Gets the reference to `Disabled` button element.
   *
   * @returns {Promise}
   */
  getDisabledBtn: function () {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.views.factorAuth))
      .get(1);
  },

  /**
   * ### SecuritySettings.getFactorAuthBtn()
   *
   * Gets the reference to `Set Up Two-Factor Authentication` button element.
   *
   * @returns {Promise}
   */
  getFactorAuthBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.buttons.auth));
  },

  /**
   * ### SecuritySettings.getOneTimePasswordTxt()
   *
   * Gets the reference to `One-Time Password` input text element.
   *
   * @returns {Promise}
   */
  getOneTimePasswordTxt: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.inputs.text));
  },

  /**
   * ### SecuritySettings.getEnable2FABtn()
   *
   * Gets the reference to `Enable 2FA` button element.
   *
   * @returns {Promise}
   */
  getEnable2FABtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.buttons.enable2FA));
  },

  /**
   * ### SecuritySettings.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.buttons.cancel));
  },

  /**
   * ### SecuritySettings.getGoogleAuthLnk()
   *
   * Gets the reference to `Google Authenticator` link element.
   *
   * @returns {Promise}
   */
  getGoogleAuthLnk: function (linkText) {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.views.factorAuth))
      .get(0)
      .element(by.linkText(linkText));
  },

  /**
   * ### SecuritySettings.getGoogleAuthLnk()
   *
   * Gets the reference to `Google Authenticator` link element.
   *
   * @returns {Promise}
   */
  getQRCodeElem: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.views.QRCode));
  },

  // ## Helper Methods

  /**
   * ### SecuritySettings.getTitle()
   *
   * Gets the title from `Two-Factor Authentication` strong element.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### SecuritySettings.getAuthText()
   *
   * Gets the text from `Two-Factor Authentication` strong element.
   *
   * @returns {Promise}
   */
  getAuthText: function () {
    return this
      .getTwoFactorAuthElem()
      .getText();
  },

  /**
   * ### SecuritySettings.getDisabledText()
   *
   * Gets the text from `Disabled` button element.
   *
   * @returns {Promise}
   */
  getDisabledText: function () {
    return this
      .getDisabledBtn()
      .getText();
  },

  /**
   * ### SecuritySettings.clickGoogleAuthenticator()
   *
   * Gets the url from `Google Authenticator` link element.
   *
   * @returns {Promise}
   */
  getGoogleAuthUrl: function (linkText) {
    return this
      .getGoogleAuthLnk(linkText)
      .getAttribute('href');
  },

  /**
   * ### SecuritySettings.clickFactorAuth()
   *
   * Clicks on the `Set Up Two-Factor Authentication` button element.
   *
   * @returns {Promise}
   */
  clickFactorAuth: function () {
    return this
      .getFactorAuthBtn()
      .click();
  },

  /**
   * ### SecuritySettings.getFactorAuthText()
   *
   * Gets text from `Set Up Two-Factor Authentication` button element.
   *
   * @returns {Promise}
   */
  getFactorAuthText: function () {
    return this
      .getFactorAuthBtn()
      .getText();
  }
};

module.exports = SecuritySettings;
