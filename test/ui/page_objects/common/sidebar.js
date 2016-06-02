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

// # SideBar Page Object

// Requiring constant values
var Constants = require('./../constants');

// This `Searcher` Page Object abstracts all operations or actions that a common
// user could do with the SideBar menu component from Portal app/site.
var SideBar = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    menu: {
      className: 'side-menu',
      options: {
        users: {
          linkText: Constants.sideBar.menu.USERS
        },
        updatePassword: {
          linkText: Constants.sideBar.menu.UPDATE_PASSWORD
        },
        securitySettings: {
          linkText: Constants.sideBar.menu.SECURITY_SETTINGS
        },
        activityLog: {
          linkText: Constants.sideBar.menu.ACTIVITY_LOG
        }
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SideBar.getMenu()
   *
   * Return the reference to the `Sidebar Menu` container (Selenium WebDriver
   * Element) from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getMenu: function () {
    return element(by.className(this.locators.menu.className));
  },

  // ## Methods to interact with the Sidebar component

  /**
   * ### SideBar.goTo()
   *
   * Triggers a click on the specified sidebar `menu option`
   *
   * @param {String} menuOption, the label from the menu option to click
   *
   * @returns {Promise}
   */
  goTo: function (menuOption) {
    return this
      .getMenu()
      .element(by.linkText(menuOption))
      .click();
  }
};

module.exports = SideBar;