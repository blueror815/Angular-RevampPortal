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

// # Login Page Object

// This `Login` Page Object abstracts all operations or actions that a
// common user could do in the User List page from the Portal app/site.
var Login = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      email: {
        model: 'email'
      },
      password: {
        model: 'pass'
      }
    },
    buttons: {
      signIn: {
        className: 'signin'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### Login.getEmailTxtIn()
   *
   * Returns the reference to the `Email` text input field (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getEmailTxtIn: function () {
    return element(by.model(this.locators.textInputs.email.model));
  },

  /**
   * ### Login.getPasswordTxtIn()
   *
   * Returns the reference to the `Password` text input field (Selenium
   * WebDriver Element) from the Login page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPasswordTxtIn: function () {
    return element(by.model(this.locators.textInputs.password.model));
  },

  /**
   * ### Login.getSignInBtn()
   *
   * Returns the reference to the `Sign In` button (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSignInBtn: function () {
    return element(by.className(this.locators.buttons.signIn.className));
  },

  // ## Methods to interact with the components from the Page Object

  /**
   * ### Login.setEmail()
   *
   * Sets a new value for the `Email` text input field
   *
   * @param {String} email
   *
   * @returns {Promise}
   */
  setEmail: function (email) {
    return this
      .getEmailTxtIn()
      .sendKeys(email);
  },

  /**
   * ### Login.setPassword()
   *
   * Sets a new value for the `Password` text input field
   *
   * @param {String} password
   *
   * @returns {Promise}
   */
  setPassword: function (password) {
    return this
      .getPasswordTxtIn()
      .sendKeys(password);
  },

  /**
   * ### Login.clickSignIn()
   *
   * Triggers a click on the `Sign In` button
   *
   * @returns {Promise}
   */
  clickSignIn: function () {
    return this
      .getSignInBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### Login.signIn()
   *
   * Helper method that executes all steps to Sign In a user in the Portal app.
   *
   * @param {Object} user with the following schema
   *
   *     {
   *        email: String,
   *        password: String
   *     }
   *
   * @returns {Promise}
   */
  signIn: function (user) {
    this.setEmail(user.email);
    this.setPassword(user.password);
    return this.clickSignIn();
  }
};

module.exports = Login;