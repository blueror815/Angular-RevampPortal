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

// # Help and Support Page Object

// This `Help and Support` Page Object abstracts all operations or actions that
// a common Help and Support could do in the Portal app/site.
var HelpAndSupport = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelBody: '.col-md-12 .panel .panel-body',
  },

  /**
   * ### HelpAndSupport.getTitleLbl()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Help and Support page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element
      .all(by.css(this.locators.container))
      .get(0);
  },

  /**
   * ### HelpAndSupport.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Help and Support page in the Portal app.
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
   * ### HelpAndSupport.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Help and Support page the portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### HelpAndSupport.isDisplayed()
   *
   * Checks whether the Help and Support page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitle()
      .isPresent();
  },

  /**
   * ### HelpAndSupport.existLink()
   *
   * Checks whether the link exists in the Help and Support page or not.
   *
   * @param String linkText, link text specified in the 'Help And Support page'.
   *
   * @returns {Promise}
   */
  existLink: function (linkText) {
    var exist = element(by.linkText(linkText));
    return exist.isPresent();
  },

  /**
   * ### HelpAndSupport.openUrl()
   *
   * Gets the url from link text in the 'Help and Support' page.
   *
   * @param String linkText, link text specified in the 'Help And Support page'.
   *
   * @returns {Promise}
   */
  openUrl: function(linkText) {
    if (this.existLink(linkText)) {
      element(by.linkText(linkText)).click();
      return element(by.linkText(linkText)).getAttribute('href');
    } else {
      return null;
    }
  }
};

module.exports = HelpAndSupport;
