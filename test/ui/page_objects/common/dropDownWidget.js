/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

var DropDownWidget = function (dropDownLocator) {
  this.dropDownLocator = dropDownLocator;
  this.container = element(this.dropDownLocator);
  this.locators = {
    anchors: {
      arrow: {
        css: '.ui-select-match'
      }
    },
    textInputs: {
      search: {
        css: '.ui-select-search'
      }
    }
  };
};

DropDownWidget.prototype.getArrowEl = function () {
  return this.container.element(by.css(this.locators.anchors.arrow.css));
};

DropDownWidget.prototype.getSearchTxtIn = function () {
  return this.container.element(by.css(this.locators.textInputs.search.css));
};

DropDownWidget.prototype.open = function () {
  return this
    .getArrowEl()
    .click();
};

DropDownWidget.prototype.setValue = function (value) {
  this.open();
  return this
    .getSearchTxtIn()
    .sendKeys(value + protractor.Key.ENTER);
};

module.exports = DropDownWidget;