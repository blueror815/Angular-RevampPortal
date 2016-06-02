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

// # Top Objects Page Object

// This `Top Objects` Page Object abstracts all operations or actions that a
// common top objects could do in the Portal app/site.
var TopObjectsForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    chartsTable: {
      css: '.panel-body'
    },
    models: {
      delay: 'delay',
      country: 'ngFilters.country',
      os: 'ngFilters.os',
      device: 'ngFilters.device',
      count: 'ngFilters.count'
    }
  },

  /**
   * ### TopObjectsForm.getChartsTableObj().
   *
   * Returns the reference to the `Reports` charts table object (Selenium
   * WebDriver Element) from the Top Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getChartsTableObj: function () {
    return element.all(by.css(this.locators.chartsTable.css));
  },

 /**
  * ### TopObjectsForm.getTopObjects().
  *
  * Selects a `Report` in the Top Objects page.
  *
  * @param {String} indexChart of Top Objects report panel.
  * @param {String} indexForm of Top Objects report panel.
  *
  * @returns {Promise}
  */
  getTopObjects: function (indexChart, indexForm) {
    return this
      .getChartsTableObj()
      .all(by.css('.row .col-md-12'))
      .get(indexChart)
      .all(by.css('.form-group'))
      .get(indexForm);
  },

  /**
   * ### TopObjectsForm.setDelay().
   *
   * Sets value for `Delay` text field.
   *
   * @param {String} indexChart of Top Objects report panel.
   * @param {String} indexForm of Top Objects report panel.
   * @param {String} value of Top Objects report panel.
   *
   * @returns {Promise}
   */
  setDelay: function (indexChart, indexForm, value) {
    return this
      .getTopObjects(indexChart, indexForm) // (0, 0)
      .element(by.model(this.locators.models.delay))
      .sendKeys(value); // 'Last 1 day'
  },

  /**
   * ### TopObjectsForm.setCountry()
   *
   * Sets value for `Country` text field.
   *
   * @param {String} indexChart of Top Objects report panel.
   * @param {String} indexForm of Top Objects report panel.
   * @param {String} value of Top Objects report panel.
   *
   * @returns {Promise}
   */
  setCountry: function (indexChart, indexForm, value) {
    return this
      .getTopObjects(indexChart, indexForm) // (0, 1)
      .element(by.model(this.locators.models.country))
      .sendKeys(value);
  },

  /**
   * ### TopObjectsForm.setOS()
   *
   * Sets value for `OS` text field
   *
   * @param {String} indexChart of Top Objects report panel.
   * @param {String} indexForm of Top Objects report panel.
   * @param {String} value of Top Objects report panel.
   *
   * @returns {Promise}
   */
  setOS: function (indexChart, indexForm, value) {
    return this
      .getTopObjects(indexChart, indexForm) // (0, 2)
      .element(by.model(this.locators.models.os))
      .sendKeys(value);
  },

  /**
   * ### TopObjectsForm.setDevice()
   *
   * Sets value for `Device` text field
   *
   * @param {String} indexChart of Top Objects report panel.
   * @param {String} indexForm of Top Objects report panel.
   * @param {String} value of Top Objects report panel.
   *
   * @returns {Promise}
   */
  setDevice: function (indexChart, indexForm, value) {
    return this
      .getTopObjects(indexChart, indexForm) // (0, 3)
      .element(by.model(this.locators.models.device))
      .sendKeys(value);
  },

  /**
   * ### TopObjectsForm.setCount()
   *
   * Sets value for `Count` text field
   *
   * @param {String} indexChart of Top Objects report panel.
   * @param {String} indexForm of Top Objects report panel.
   * @param {String} value of Top Objects report panel.
   *
   * @returns {Promise}
   */
  setCount: function (indexChart, indexForm, value) {
    return this
      .getTopObjects(indexChart, indexForm) // (0, 4)
      .element(by.model(this.locators.models.count))
      .sendKeys(value);
  },

  /**
   * ### TopObjectsForm.clickCreateReport().
   *
   * Clicks on `Create Report` button in report forms.
   *
   * @param {String} indexChart of Top Objects report panel.
   * @param {String} indexForm of Top Objects report panel.
   *
   * @returns {Promise}
   */
  clickCreateReport: function (indexChart, indexForm) {
    return this
      .getTopObjects(indexChart, indexForm) // (0, 4)
      .click();
  },

  /**
   * ### TopObjectsForm.getDelay().
   *
   * Gets the value from `Delay` combo box.
   *
   * @returns {Promise}
   */
  getDelay: function (indexChart, indexForm) {
    return this
      .getTopObjects(indexChart, indexForm)
      .element(by.model(this.locators.models.delay))
      .getText();
  },

  /**
   * ### TopObjectsForm.getCountry()
   *
   * Gets the value from `Country` combo box.
   *
   * @returns {Promise}
   */
  getCountry: function (indexChart, indexForm) {
    return this
      .getTopObjects(indexChart, indexForm)
      .element(by.model(this.locators.models.country))
      .getText();
  },

  /**
   * ### TopObjectsForm.getOS()
   *
   * Gets the value from `OS` combo box.
   *
   * @returns {Promise}
   */
  getOS: function (indexChart, indexForm) {
    return this
      .getTopObjects(indexChart, indexForm)
      .element(by.model(this.locators.models.os))
      .getText();
  },

  /**
   * ### TopObjectsForm.getDevice()
   *
   * Gets the value from `Device` combo box.
   *
   * @returns {Promise}
   */
  getDevice: function (indexChart, indexForm) {
    return this
      .getTopObjects(indexChart, indexForm)
      .element(by.model(this.locators.models.device))
      .getText();
  },

  /**
   * ### TopObjectsForm.getCount()
   *
   * Gets the value from `Count` combo box.
   *
   * @returns {Promise}
   */
  getCount: function (indexChart, indexForm) {
    return this
      .getTopObjects(indexChart, indexForm)
      .element(by.model(this.locators.models.count))
      .getText();
  }
};

module.exports = TopObjectsForm;
