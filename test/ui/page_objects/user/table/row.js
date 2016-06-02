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

var UserTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getFirstNameCell = function () {
    return this.rowEl.element(by.css(this.locators.firstName.css));
  };

  this.getLastNameCell = function () {
    return this.rowEl.element(by.css(this.locators.lastName.css));
  };

  this.getEmailCell = function () {
    return this.rowEl.element(by.css(this.locators.email.css));
  };

  this.getRoleCell = function () {
    return this.rowEl.element(by.css(this.locators.role.css));
  };

  this.getStatus2faCell = function () {
    return this.rowEl.element(by.css(this.locators.status2fa.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.updatedAt.css));
  };

  this.getLastLoginCell = function () {
    return this.rowEl.element(by.css(this.locators.lastLoginAt.css));
  };

  this.getFirstName = function () {
    return this
      .getFirstNameCell()
      .getText();
  };

  this.getLastName = function () {
    return this
      .getLastNameCell()
      .getText();
  };

  this.getEmail = function () {
    return this
      .getEmailCell()
      .getText();
  };

  this.getRole = function () {
    return this
      .getRoleCell()
      .getText();
  };

  this.clickFirstName = function () {
    return this
      .getFirstNameCell()
      .click();
  };

  this.clickLastName = function () {
    return this
      .getLastNameCell()
      .click();
  };

  this.clickEmail = function () {
    return this
      .getEmailCell()
      .click();
  };

  this.clickRole = function () {
    return this
      .getRoleCell()
      .click();
  };

  this.clickLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .click();
  };

  this.clickLastLogin = function () {
    return this
      .getLastLoginCell()
      .click();
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
};

module.exports = UserTableRow;
