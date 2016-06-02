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

// # Pager Page Object

// This `Pager` Page Object abstracts all operations or actions that a common
// user could do with the Pagination component from any list table from the
// Portal app.
var Pager = {

  // ## Properties

  // Class names used di differentiate some UI states (like disabled, visible)
  // or other for some elements
  classNames: {
    disabled: 'disabled'
  },

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      allPages: {
        css: 'hr + crud-pagination li.pointer span'
      },
      previousPage: {
        css: 'hr + crud-pagination li.previous a'
      },
      currentPage: {
        css: 'hr + crud-pagination li.active span'
      },
      nextPage: {
        css: 'hr + crud-pagination li.next a'
      }
    },
    listItems: {
      previousPage: {
        css: 'hr + crud-pagination li.previous'
      },
      nextPage: {
        css: 'hr + crud-pagination li.next'
      }
    }
  },

  // ## Methods

  /**
   * ### Pager.getPreviousListItem()
   *
   * Returns the reference to the `Previous Item` ListItem (Selenium WebDriver
   * Element) from a specific pagination component from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getPreviousListItem: function () {
    return element(by.css(this.locators.listItems.previousPage.css));
  },

  /**
   * ### Pager.getNextListItem()
   *
   * Return the reference to the `Next Item` ListItem (Selenium WebDriver
   * Element) from a specific pagination component from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getNextListItem: function () {
    return element(by.css(this.locators.listItems.nextPage.css));
  },

  /**
   * ### Pager.getAllPageIndexButtons()
   *
   * Return a set of references to all the `Page Item` buttons (Selenium
   * WebDriver Elements) from a specific pagination component from the Portal
   * app.
   *
   * @returns [{Selenium WebDriver Element}]
   */
  getAllPageIndexButtons: function () {
    return element.all(by.css(this.locators.buttons.allPages.css));
  },

  /**
   * ### Pager.getNextBtn()
   *
   * Returns the reference to the `Next Item` button (Selenium WebDriver
   * Element) from a specific pagination component from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getNextBtn: function () {
    return element(by.css(this.locators.buttons.nextPage.css));
  },

  /**
   * ### Pager.getPreviousBtn()
   *
   * Returns the reference to the `Previous Item` button (Selenium WebDriver
   * Element) from a specific pagination component from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getPreviousBtn: function () {
    return element(by.css(this.locators.buttons.previousPage.css));
  },

  /**
   * ### Pager.getCurrentPageIndexBtn()
   *
   * Returns the reference to the `Current Page` button (Selenium WebDriver
   * Element) from a specific pagination component from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getCurrentPageIndexBtn: function () {
    return element(by.css(this.locators.buttons.currentPage.css));
  },

  // ## Methods to interact with the component

  /**
   * ### Pager.clickPageIndex()
   *
   * Triggers a click on the a page button of the specified page number.
   *
   * @param {Number|String} pageIndex, the `page number` button to click
   *
   * @returns {Promise}
   */
  clickPageIndex: function (pageIndex) {
    return this
      .getAllPageIndexButtons()
      .get(pageIndex - 1)
      .click();
  },

  /**
   * ### Pager.clickNext()
   *
   * Triggers a click on the `Next Page` button from the pagination component
   *
   * @returns {Promise}
   */
  clickNext: function () {
    return this
      .getNextBtn()
      .click();
  },

  /**
   * ### Pager.clickPrevious()
   *
   * Triggers a click on the `Previous Page` button from the pagination
   * component.
   *
   * @returns {Promise}
   */
  clickPrevious: function () {
    return this
      .getPreviousBtn()
      .click();
  },

  // ## Methods to interact with the component

  /**
   * ### Pager.getCurrentPageIndex()
   *
   * Returns the current `page number` selected in the pagination component
   *
   * @returns {Promise}
   */
  getCurrentPageIndex: function () {
    return this
      .getCurrentPageIndexBtn()
      .getText();
  },

  /**
   * ### Pager.isPreviousBtnDisabled()
   *
   * Checks whether the `Previous Page` button is disabled or not (if it has
   * the `disabled` class or not)
   *
   * @returns {Promise}
   */
  isPreviousBtnDisabled: function () {
    var me = this;
    return this
      .getPreviousListItem()
      .getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(me.classNames.disabled) !== -1;
      });
  },

  /**
   * ### Pager.isNextBtnDisabled()
   *
   * Checks whether the `Next Page` button is disabled or not (if it has
   * the `disabled` class or not)
   *
   * @returns {Promise}
   */
  isNextBtnDisabled: function () {
    var me = this;
    return this
      .getNextListItem()
      .getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(me.classNames.disabled) !== -1;
      });
  },

  /**
   * Is next page element displayed on the page
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getNextBtn()
      .isDisplayed();
  }
};

module.exports = Pager;
