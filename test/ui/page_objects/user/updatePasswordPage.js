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

// # Update Password Page Object

// This `Update Password` Page Object abstracts all operations or actions
// that a common user could do in that page from the Portal app/site.
var UpdatePassword = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      currentPassword: {
        model: 'pass.current_password'
      },
      newPassword: {
        model: 'pass.new_password'
      },
      newPasswordConfirm: {
        model: 'pass.confirm_password'
      }
    },
    buttons: {
      updatePassword: {
        css: '.btn-success'
      },
      backToList: {
        linkText: 'Back'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### UpdatePassword.getBackToListBtn()
   *
   * Returns the reference to the `Back` button
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### UpdatePassword.getCurrentPasswordTxtIn()
   *
   * Returns the reference to the `Current Password` text input field
   *
   * @returns {Selenium WebDriver Element}
   */
  getCurrentPasswordTxtIn: function () {
    return element(by.model(this.locators.textInputs.currentPassword.model));
  },

  /**
   * ### UpdatePassword.getNewPasswordTxtIn()
   *
   * Returns the reference to the `New Password` text input field
   *
   * @returns {Selenium WebDriver Element}
   */
  getNewPasswordTxtIn: function () {
    return element(by.model(this.locators.textInputs.newPassword.model));
  },

  /**
   * ### UpdatePassword.getNewPasswordConfirmTxtIn()
   *
   * Returns the reference to the `New Password Confirm` text input field
   *
   * @returns {Selenium WebDriver Element}
   */
  getNewPasswordConfirmTxtIn: function () {
    return element(by.model(this.locators.textInputs.newPasswordConfirm.model));
  },

  /**
   * ### UpdatePassword.getUpdatePasswordBtn()
   *
   * Returns the reference to the `Update Password` button
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdatePasswordBtn: function () {
    return element(by.css(this.locators.buttons.updatePassword.css));
  },

  // ## Methods to interact with the Update Password page components

  /**
   * ### UpdatePassword.setCurrentPassword()
   *
   * Sets a new value for the `Current Password` text input field
   *
   * @param {String} password
   *
   * @returns {Promise}
   */
  setCurrentPassword: function (password) {
    return this
      .getCurrentPasswordTxtIn()
      .sendKeys(password);
  },

  /**
   * ### UpdatePassword.setNewPassword()
   *
   * Sets a new value for the `New Password` text input field
   *
   * @param {String} password
   *
   * @returns {Promise}
   */
  setNewPassword: function (password) {
    return this
      .getNewPasswordTxtIn()
      .sendKeys(password);
  },

  /**
   * ### UpdatePassword.setPasswordConfirm()
   *
   * Sets a new value for the `New Password Confirm` text input field
   *
   * @param {String} password
   *
   * @returns {Promise}
   */
  setPasswordConfirm: function (password) {
    return this
      .getNewPasswordConfirmTxtIn()
      .sendKeys(password);
  },

  /**
   * ### UpdatePassword.clickBackToList()
   *
   * Triggers a click on the `Back To List` button
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### UpdatePassword.clickUpdatePassword()
   *
   * Triggers a click on the `Update Password` button
   *
   * @returns {Promise}
   */
  clickUpdatePassword: function () {
    return this
      .getUpdatePasswordBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### UpdatePassword.isDisplayed()
   *
   * Checks whether the Update Password page is being displayed in the UI or
   * not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getCurrentPasswordTxtIn()
      .isDisplayed();
  },

  /**
   * ### UpdatePassword.update()
   *
   * Executes all steps required to set a new password.
   *
   * @param {String} currentPassword
   * @param {String} newPassword
   *
   * @returns {Promise}
   */
  update: function (currentPassword, newPassword) {
    this.setCurrentPassword(currentPassword);
    this.setNewPassword(newPassword);
    this.setPasswordConfirm(newPassword);
    return this.clickUpdatePassword();
  }
};

module.exports = UpdatePassword;
