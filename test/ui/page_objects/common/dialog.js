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

// # Dialog Page Object

// Portal app has the ability to display confirm dialogs while doing several
// operations in the whole app. This Dialog PAge Objects abstracts those
// operations or actions that an common user could do in this kind of object.
var Dialog = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    modal: {
      className: 'modal-dialog',
      buttons: {
        ok: {
          css: 'button[ng-click="ok()"]'
        },
        cancel: {
          css: 'button[ng-click="cancel()"]'
        }
      }
    }
  },

  // ## Methods

  /**
   * ### Dialog.isDisplayed()
   *
   * Checks whether the Dialog is displayed in the UI or not
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
        .getModalEl()
        .isPresent() &&
      this
        .getOkBtn()
        .isPresent();
  },

  /**
   * ### Dialog.getModalEl()
   *
   * Return the reference to the Modal Dialog (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getModalEl: function () {
    return element(by.className(this.locators.modal.className));
  },

  /**
   * ### Dialog.getOkBtn()
   *
   * Return the reference to the `OK` button (Selenium WebDriver Element) from
   * the Modal Dialog component from Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getOkBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.ok.css));
  },

  /**
   * ### Dialog.getCancelBtn()
   *
   * Return the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.cancel.css));
  },

  /**
   * ### Dialog.clickOk()
   *
   * Triggers a click action on the `OK` button fro the Modal Dialog component
   *
   * @returns {Promise}
   */
  clickOk: function () {
    return this
      .getOkBtn()
      .click();
  },

  /**
   * ### Dialog.clickCancel()
   *
   * Triggers a click action on the `Cancel` button fro the Modal Dialog
   * component
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  }
};

module.exports = Dialog;