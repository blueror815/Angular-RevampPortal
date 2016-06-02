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

// # Edit User Page Object

// Requiring `user form` component page object
var UserForm = require('./form');

// This `Edit User` Page Object abstracts all operations or actions that a
// common user could do in the Edit User page from the Portal app/site.
var EditUser = {

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
      updateUser: {
        css: '.btn-success'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // `Edit User` Page is compound mainly by a form. This property makes
  // reference to the UserForm Page Object to interact with it.
  form: UserForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditUser.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditUser.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditUser.getUpdateUserBtn()
   *
   * Returns the reference to the `Update User` button (Selenium WebDriver
   * Element) from the Edit User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdateUserBtn: function () {
    return element(by.css(this.locators.buttons.updateUser.css));
  },

  /**
   * ### EditUser.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit User page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Edit User Page components

  /**
   * ### EditUser.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit User page from
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
   * ### EditUser.clickUpdateUser()
   *
   * Triggers a click on the `Update User` button from the Edit User page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickUpdateUser: function () {
    return this
      .getUpdateUserBtn()
      .click();
  },

  /**
   * ### EditUser.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit User page from
   * the Portal app
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
   * ### EditUser.isDisplayed()
   *
   * Checks whether the Edit User page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditUser.getTitle()
   *
   * Gets the `Title` label from the Edit User page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditUser.createUser()
   *
   * Updates the user using the given data by filling it in the form and
   * clicking on the `Update User` button from the Edit User page
   *
   * @param {Object} user, user data with the schema specified in
   * DataProvider.generateUser()
   *
   * @returns {Promise}
   */
  updateUser: function (user) {
    this.form.fill(user);
    return this.clickUpdateUser();
  }
};

module.exports = EditUser;
