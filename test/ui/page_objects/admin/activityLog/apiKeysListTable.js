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

// # API Keys Table Page Object

// This `API Keys` Page Object abstracts all operations or actions that a
// common user could do in the API Keys page the Portal app/site.
var ApiKeysListTable = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: '.col-md-12 .panel .panel-heading',
    pullLeft: '.pull-left',
    pullRight: '.pull-right',
    panelBody: '.col-md-12 .panel .panel-body',
    tables: {
      apiKeys: {
        repeater: 'item in filteredRecords'
      }
    },
    buttons: {
      edit: {
        css: '.glyphicon.glyphicon-pencil'
      },
      delete: {
        css: '.glyphicon.glyphicon-trash'
      }
    }
  },

  /**
   * ### ApiKeysListTable.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the API Keys page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelBody));
  },

  /**
   * ### ApiKeysListTable.getApiKeysTbl()
   *
   * Gets the reference to `Table` Api Key list table elements.
   *
   * @returns {Promise}
   */
  getApiKeysTbl: function () {
    return this
      .getPanelBodyElem()
      .all(by.repeater(this.locators.tables.apiKeys.repeater));
  },

  /**
   * ### ApiKeysListTable.getRowElem()
   *
   * Gets the row element by row index from the API Keys List table.
   *
   * @param {String} rowIndex of row in API Keys List table.
   *
   * @returns {Promise}
   */
  getRowElem: function (rowIndex) {
    return this
      .getApiKeysTbl()
      .get(rowIndex);
  },

  /**
   * ### ApiKeysListTable.getValueByColumnIndex()
   *
   * Gets value from `Row` element from API Keys row element.
   *
   * @param {String} rowIndex to get value from row element.
   * @param {String} columnIndex to get value from row element.
   *
   * @returns {Promise}
   */
  getValueByColumnIndex: function (rowIndex, columnIndex) {
    return this
      .getRowElem(rowIndex)
      .all(by.tagName('td'))
      .get(columnIndex);
  },

  /**
   * ### ApiKeysListTable.getName()
   *
   * Gets the name value of `API Keys List` table element.
   *
   * @returns {Promise}
   */
  getName: function (callback) {
    return this
      .getValueByColumnIndex(0, 0)
      .getText()
      .then(function(text) {
        callback(text);
      });
  },

  /**
   * ### ApiKeysListTable.getApiKey()
   *
   * Gets the API Key value of `API Keys List` table element.
   *
   * @returns {Promise}
   */
  getApiKey: function (callback) {
    return this
      .getValueByColumnIndex(0, 1)
      .getText()
      .then(function(text) {
        callback(text);
      });
  },

  /**
   * ### ApiKeysListTable.getReadOnly()
   *
   * Gets the Read Only value of `API Keys List` table element.
   *
   * @returns {Promise}
   */
  getReadOnly: function () {
    return this
      .getValueByColumnIndex(0, 2)
      .element(by.tagName('i'))
      .getAttribute('class');
  },

  /**
   * ### ApiKeysListTable.getActive()
   *
   * Gets the Active value of `API Keys List` table element.
   *
   * @returns {Promise}
   */
  getActive: function () {
    return this
      .getValueByColumnIndex(0, 3)
      .element(by.tagName('i'))
      .getAttribute('class');
  },

  /**
   * ### ApiKeysListTable.clickEditApiKey()
   *
   * Clicks on Edit button of `API Keys List` table element.
   *
   * @returns {Promise}
   */
  clickEditApiKey: function () {
    return this
      .getValueByColumnIndex(0, 4)
      .element(by.css(this.locators.buttons.edit.css))
      .click();
  },

  /**
   * ### ApiKeysListTable.clickDeleteApiKey()
   *
   * Clicks on Delete button of `API Keys List` table element.
   *
   * @returns {Promise}
   */
  clickDeleteApiKey: function () {
    return this
      .getValueByColumnIndex(0, 4)
      .element(by.css(this.locators.buttons.delete.css))
      .click();
  },

  // ## Helper Methods

  /**
   * ### ApiKeysListTable.countTotalRows()
   *
   * Gets the total of `API Keys` in the table element per page.
   *
   * @returns {Promise}
   */
  countTotalRows: function() {
    return this
      .getApiKeysTbl()
      .count();
  },

  isReadOnlyChecked: function(callback) {
    this.getReadOnly().then(function(text) {
      if (text.indexOf('glyphicon-unchecked') > -1) {
        callback(false);
      } else {
        callback(true);
      }
    });
  },

  isActiveChecked: function(callback) {
    this.getActive().then(function(text) {
      if (text.indexOf('glyphicon-unchecked') > -1) {
        callback(false);
      } else {
        callback(true);
      }
    });
  },

  /**
   * ### ApiKeysListTable.getRow()
   *
   * Gets a row of `API Keys` from the table element per page.
   *
   * @returns {Promise}
   */
  getRow: function() {
    return {
      name: this.getName(),
      apiKey: this.getApiKey(),
      readOnly: this.getReadOnly(),
      active: this.getActive()
    };
  }
};

module.exports = ApiKeysListTable;
