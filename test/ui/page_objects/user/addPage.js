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

// # Add User Page Object

// Requiring `user form` component page object
var UserForm = require('./form');

// This `Add User` Page Object abstracts all operations or actions that a common
// user could do in the Add User page from the Portal app/site.
var AddUser = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      createUser: {
        css: '.btn-success'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // `Add User` Page is compound mainly by a form. This property makes reference
  // to the UserForm Page Object to interact with it.
  form: UserForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddUser.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddUser.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddUser.getCreateUserBtn()
   *
   * Returns the reference to the `Create User` button (Selenium WebDriver
   * Element) from the Add User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCreateUserBtn: function () {
    return element(by.css(this.locators.buttons.createUser.css));
  },

  /**
   * ### AddUser.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add User Page components

  /**
   * ### AddUser.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add User page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddUser.clickCreateUser()
   *
   * Triggers a click on the `Create User` button from the Add User page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickCreateUser: function () {
    return this
      .getCreateUserBtn()
      .click();
  },

  /**
   * ### AddUser.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add User page from the
   * Portal app
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
   * ### AddUser.isDisplayed()
   *
   * Checks whether the Add User page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddUser.getTitle()
   *
   * Gets the `Title` label fromthe Add User page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddUser.createUser()
   *
   * Creates a new user using the given data by filling it in the form and
   * clicking on the `Create User` button from the Add User page
   *
   * @param {Object} user, user data with the schema specified in
   * DataProvider.generateUser()
   *
   * @returns {Promise}
   */
  createUser: function (user) {
    this.form.fill(user);
    return this.clickCreateUser();
  }
};

module.exports = AddUser;
