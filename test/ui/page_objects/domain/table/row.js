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

var DomainTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getNameCell = function () {
    return this.rowEl.element(by.css(this.locators.name.css));
  };

  this.getNameLink = function () {
    return this.getNameCell().element(by.css(this.locators.name.links.css));
  };

  this.getCNameCell = function () {
    return this.rowEl.element(by.css(this.locators.cName.css));
  };

  this.getLastUpdatedCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdated.css));
  };

  this.getStatusCell = function () {
    return this.rowEl.element(by.css(this.locators.status.css));
  };

  this.getStagingStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.staging.css));
  };

  this.getGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.css));
  };

  this.getName = function () {
    return this
      .getNameCell()
      .getText();
  };

  this.getCName = function () {
    return this
      .getCNameCell()
      .getText();
  };

  this.getLastUpdated = function () {
    return this
      .getLastUpdatedCell()
      .getText();
  };


  if (this.locators.actions && this.locators.actions.buttons.pencil) {

    this.getEditBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.pencil.className));
    };

    this.clickEdit = function () {
      return this
        .getEditBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.cog) {

    this.getConfigureBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.cog.className));
    };

    this.clickConfigure = function () {
      return this
        .getConfigureBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.trash) {

    this.getDeleteBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.trash.className));
    };

    this.clickDelete = function () {
      return this
        .getDeleteBtn()
        .click();
    };
  }


  if (this.locators.actions && this.locators.actions.buttons.stats) {

    this.getStatsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.stats.className));
    };

    this.clickStats = function () {
      return this
        .getStatsBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.book) {

    this.getVersionsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.book.className));
    };

    this.clickVersions = function () {
      return this
        .getVersionsBtn()
        .click();
    };
  }

};

module.exports = DomainTableRow;