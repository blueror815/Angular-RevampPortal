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

// # Searcher Page Object

// This `Searcher` Page Object abstracts all operations or actions that a common
// user could do with the Filter component from any list table from the
// Portal app.
var Searcher = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      searchCriteria: {
        css: 'input#search'
      }
    },
    buttons: {
      reset: {
        css: 'input#search + i.glyphicon-remove'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### Searcher.getSearchCriteriaTxtIn()
   *
   * Returns the reference to the filter `Text Field` from the searcher
   * component
   *
   * @returns {Selenium WebDriver Element}
   */
  getSearchCriteriaTxtIn: function () {
    return element(by.css(this.locators.textInputs.searchCriteria.css));
  },

  /**
   * ### Searcher.getResetBtn()
   *
   * Returns the reference to the `Reset` button from the Filter/searcher
   * component
   *
   * @returns {Selenium WebDriver Element}
   */
  getResetBtn: function () {
    return element(by.css(this.locators.buttons.reset.css));
  },

  // ## Methods to interact with the Searcher/Filter component

  /**
   * ### Searcher.setSearchCriteria()
   *
   * Filters (types a search criteria) in the filter `text field` in order to
   * get filterd data inthe table associated to this searcher component.
   *
   * @param {String} criteria, the filter criteria
   *
   * @returns {Promise}
   */
  setSearchCriteria: function (criteria) {
    return this
      .getSearchCriteriaTxtIn()
      .sendKeys(criteria);
  },

  /**
   * ### Searcher.getSearchCriteria()
   *
   * Returns the current search criteria set in the filter `text field`
   * from the searcher component
   *
   * @returns {Promise}
   */
  getSearchCriteria: function () {
    return this
      .getSearchCriteriaTxtIn()
      .getAttribute('value');
  },

  /**
   * ### Searchers.clearSearchCriteria()
   *
   * Types required times the BACKSPACE key in order to delete the current
   * search criteria written in the `text field` from the Filter/Searcher
   * component
   *
   * @returns {Promise}
   */
  clearSearchCriteria: function () {
    var me = this;
    return this
      .getSearchCriteriaTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getSearchCriteriaTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### Searchers.clickReset()
   *
   * Triggers a click in the `reset` button from the Filter/Searcher component
   *
   * @returns {Promise}
   */
  clickReset: function () {
    return this
      .getResetBtn()
      .click();
  }
};

module.exports = Searcher;
