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

// # Header Page Object

// Requiring constant values object
var Constants = require('./../constants');

// This `Header` Page Object abstracts all operations or actions that a common
// user could do with the header bar form the Portal app.
var Header = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      userInfo: {
        css: '.user-info > a'
      }
    },
    menu: {
      navbar: {
        css: '.collapse.navbar-collapse .nav.navbar-nav',
        // css: 'section[drawer] .side-menu .side-menu-item',
        web: {
          linkText: Constants.header.appMenu.WEB
        },
        analytics: {
          linkText: Constants.header.appMenu.WEB_ANALYTICS
        },
        accountSettings: {
          linkText: Constants.header.appMenu.ACCOUNT_SETTINGS
        },
        helpSupport: {
          linkText: Constants.header.appMenu.HELP_SUPPORT
        }
      },
      user: {
        css: 'ul.user ul.dropdown-menu',
        updatePassword: {
          linkText: Constants.header.userMenu.UPDATE_PASSWORD
        },
        securitySettings: {
          linkText: Constants.header.userMenu.SECURITY_SETTINGS
        },
        logout: {
          linkText: Constants.header.userMenu.LOGOUT
        }
      }
    }
  },

  // ## Methods

  /**
   * ### Header.getNavBar()
   *
   * Return the reference to the `Nav Menu` container (Selenium WebDriver
   * Element) from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getNavBar: function () {
    return element.all(by.css(this.locators.menu.navbar.css)).first();
  },

  /**
   * ### Header.getUserInfoEl()
   *
   * Return the reference to the User Info area (Selenium WebDriver Element)
   * from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getUserInfoEl: function () {
    return element(by.css(this.locators.labels.userInfo.css));
  },

  /**
   * ### Header.getUserInfoMenu()
   *
   * Return the reference to the User Info menu (Selenium WebDriver Element)
   * from the Portal app. This menu appears once `UserInfoEl` is clicked.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUserInfoMenu: function () {
    return element(by.css(this.locators.menu.user.css));
  },

  /**
   * ### Header.getLogoutEl()
   *
   * Return the reference to the Logout menu option (Selenium WebDriver Element)
   * from the Portal app. This menu appears once `UserMenuEl` element is
   * displayed by triggering a click on the `UserInfoEl` element.
   *
   * @returns {Selenium WebDriver Element}
   */
  getLogoutEl: function () {
    return this
      .getUserInfoMenu()
      .element(by.partialLinkText(this.locators.menu.user.logout.linkText));
  },

  // ## Helper Methods

  /**
   * ### Header.goTo()
   *
   * Helper method that executes all required steps to go and click the
   * specified Portal App menu option from the header component.
   *
   * @param {String} menuOption, the option to click
   *
   * @returns {Promise}
   */
  goTo: function (menuOption) {
    return element(by.linkText(menuOption))
      .click();
  },

  /**
   * ### Header.clickLogout()
   *
   * Helper method that executes all required steps to go and click Logout
   * option from the User menu list from Header component.
   *
   * @returns {Promise}
   */
  clickLogout: function () {
    this
      .getUserInfoEl()
      .click();
    return this
      .getLogoutEl()
      .click();
  },

  /**
   * ### Header.clickWeb()
   *
   * Triggers a click on the specified navbar `Web option`.
   *
   * @returns {Promise}
   */
  clickWeb: function() {
    return this
      .getNavBar()
      .element(by.linkText(this.locators.menu.navbar.web.linkText))
      .click();
  },

  /**
   * ### Header.clickAnalytics()
   *
   * Triggers a click on the specified navbar `Analytics option`.
   *
   * @returns {Promise}
   */
  clickAnalytics: function() {
    return this
      .getNavBar()
      .element(by.linkText(this.locators.menu.navbar.Analytics.linkText))
      .click();
  },

  /**
   * ### Header.clickAccountSettings()
   *
   * Triggers a click on the specified navbar `Account Settings option`.
   *
   * @returns {Promise}
   */
  clickAccountSettings: function() {
    return this
      .getNavBar()
      .element(by.linkText(this.locators.menu.navbar.accountSettings.linkText))
      .click();
  },

  /**
   * ### Header.clickHelpSupport()
   *
   * Triggers a click on the specified navbar `Help Support option`.
   *
   * @returns {Promise}
   */
  clickHelpSupport: function() {
    return this
      .getNavBar()
      .element(by.linkText(this.locators.menu.navbar.helpSupport.linkText))
      .click();
  }
};

module.exports = Header;
