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
// that a common user could do in that page from the Portal app/site.
var SecuritySettings = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      setUpTwoFactorAuth: {
        css: 'button.btn-default .glyphicon-lock'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SecuritySettings.getSetUpTwoFactorAuthBtn()
   *
   * Returns the reference to the `Set Up Two Factor Authentication` button
   *
   * @returns {Selenium WebDriver Element}
   */
  getSetUpTwoFactorAuthBtn: function () {
    return element(by.css(this.locators.buttons.setUpTwoFactorAuth.css));
  },

  // ## Helper Methods

  /**
   * ### SecuritySettings.isDisplayed()
   *
   * Checks whether the Security Settings page is being displayed in the UI
   * or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getSetUpTwoFactorAuthBtn()
      .isDisplayed();
  }
};

module.exports = SecuritySettings;