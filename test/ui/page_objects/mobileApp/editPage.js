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

// # Edit App Page Object

// Requiring `Edit App` component page object.
var EditAppForm = require('./editForm');

// This `Edit App` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var EditApp = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row'
    },
    buttons: {
      addNewApp:{
        linkText: 'Add New App'
      },
      clearSearch: {
        css: '[ng-click=\"filter.filter = ""\"]'
      }
    },
    inputs: {
      search: {
        id: 'search'
      }
    }
  },

  // `Edit App Form` Page is compound mainly by a form. This property makes
  // reference to the EditAppForm Page Object to interact with it.
  form: EditAppForm,

  /**
   * ### EditApp.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit App from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### EditApp.getAppNameLbl()
   *
   * Returns the reference to the `App Name` label element (Selenium WebDriver
   * Element) from the Edit App from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAppNameLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(1);
  },

  // ## Helper Methods

  /**
   * ### EditApp.getTitle()
   *
   * Gets the title from `Title` label element.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditApp.getAppName()
   *
   * Gets the title from `App Name` label element.
   *
   * @returns {Promise}
   */
  getAppName: function () {
    return this
      .getAppNameLbl()
      .getText();
  },

  /**
   * ### EditApp.verify()
   *
   * Verifies the edited app from `Edit App` form element.
   *
   * @param {object} app, app data.
   *
   * @returns {Promise}
   */
  verify: function (app) {
    this.form.fill(app);
    this.form.clickVerify();
  },

  /**
   * ### EditApp.update()
   *
   * Updates the edited app from `Edit App` form element.
   *
   * @param {object} app, app data.
   *
   * @returns {Promise}
   */
  update: function (app) {
    this.form.fill(app);
    this.form.clickUpdate();
  },

  /**
   * ### EditApp.publish()
   *
   * Publishes the edited app from `Edit App` form element.
   *
   * @param {object} app, app data.
   *
   * @returns {Promise}
   */
  publish: function (app) {
    this.form.fill(app);
    this.form.clickPublish();
  },

  /**
   * ### EditApp.isDisplayed()
   *
   * Checks whether the Edit App page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  }
};

module.exports = EditApp;
