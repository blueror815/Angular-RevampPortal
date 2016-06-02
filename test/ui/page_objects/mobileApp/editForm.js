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

// # Edit App Page Object

// This `Edit App` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var EditAppForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body',
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      advancedMode: {
        linkText: 'Advanced Mode'
      },
      addNewVersion: {
        linkText: 'Add New Version'
      },
      cancel: {
        linkText: 'Cancel'
      },
      verify: {
        css: '[ng-click=\"verify(model, configuration)\"]'
      },
      update: {
        css: '[ng-click=\"updateConfig(model, configuration)\"]'
      },
      publish: {
        css: '[ng-click=\"publish(model, configuration)\"]'
      }
    },
    inputs: {
      appName: {
        id: 'app_name'
      }
    },
    radios: {
      debug: {
        model: 'configuration.logging_level'
      },
      info: {
        model: 'configuration.logging_level'
      },
      warning: {
        model: 'configuration.logging_level'
      },
      error: {
        model: 'configuration.logging_level'
      },
      critical: {
        model: 'configuration.logging_level'
      }
    },
    checkboxes: {
      standard: {
        css: '[ng-click=\"toggleProtocolSelection(protocol, configuration)\"]'
      },
      quic: {
        css: '[ng-click=\"toggleProtocolSelection(protocol, configuration)\"]'
      },
      rpm: {
        css: '[ng-click=\"toggleProtocolSelection(protocol, configuration)\"]'
      }
    },
    dropDowns: {
      sdkReleaseVersion: {
        id: 'sdk_release_version'
      },
      sdkOperationMode: {
        id: 'operation_mode'
      },
      configurationRefreshInterval: {
        id: 'configuration_refresh_interval_sec'
      },
      configurationStaleTimeout: {
        id: 'configuration_stale_timeout_sec'
      },
      initialTransportProtocol: {
        id: 'initial_transport_protocol'
      },
      analyticsReportingLevel: {
        id: 'stats_reporting_level'
      },
      analyticsReportingInterval: {
        id: 'stats_reporting_interval_sec'
      },
      domainsWhiteList: {
        css: '[ng-click=\"$select.activate()\"]'
      },
      domainsBlackList: {
        css: '[ng-click=\"$select.activate()\"]'
      },
      domainsProvisionedList: {
        css: '[ng-click=\"$select.activate()\"]'
      },
      testingOffloadingRatio: {
        id: 'a_b_testing_origin_offload_ratio'
      }
    }
  },

  /**
   * ### EditAppForm.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Edit App page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(2)
      .element(by.css(this.locators.views.panelBody));
  },

  /**
   * ### EditAppForm.getAppNameTxt()
   *
   * Gets the reference to `App Name` text field element.
   *
   * @returns {Promise}
   */
  getAppNameTxt: function () {
    return element(by.id(this.locators.inputs.appName.id));
  },

  /**
   * ### EditAppForm.getSDKReleaseVersionDDown()
   *
   * Gets the reference to `Platform` Drop Down element.
   *
   * @returns {Promise}
   */
  getSDKReleaseVersionDDown: function () {
    return element(by.id(this.locators.dropDowns.sdkReleaseVersion.id));
  },

  /**
   * ### EditAppForm.getSDKOperationModeDDown()
   *
   * Gets the reference to `Platform` Drop Down element.
   *
   * @returns {Promise}
   */
  getSDKOperationModeDDown: function () {
    return element(by.id(this.locators.dropDowns.sdkOperationMode.id));
  },

  /**
   * ### EditAppForm.getConfigurationRefreshIntervalDDown()
   *
   * Gets the reference to `Configuration Refresh Interval` Drop Down element.
   *
   * @returns {Promise}
   */
  getConfigurationRefreshIntervalDDown: function () {
    return element(
      by.id(this.locators.dropDowns.configurationRefreshInterval.id));
  },

  /**
   * ### EditAppForm.getConfigurationStaleTimeoutDDown()
   *
   * Gets the reference to `Configuration Stale Timeout` Drop Down element.
   *
   * @returns {Promise}
   */
  getConfigurationStaleTimeoutDDown: function () {
    return element(by.id(this.locators.dropDowns.configurationStaleTimeout.id));
  },

  /**
   * ### EditAppForm.getInitialTransportProtocol()
   *
   * Gets the reference to `Initial Transport Protocol` Drop Down element.
   *
   * @returns {Promise}
   */
  getInitialTransportProtocol: function () {
    return element(by.id(this.locators.dropDowns.initialTransportProtocol.id));
  },

  /**
   * ### EditAppForm.getAnalyticsReportingLevel()
   *
   * Gets the reference to `Analytics Reporting Level` Drop Down element.
   *
   * @returns {Promise}
   */
  getAnalyticsReportingLevel: function () {
    return element(by.id(this.locators.dropDowns.analyticsReportingLevel.id));
  },

  /**
   * ### EditAppForm.getAnalyticsReportingInterval()
   *
   * Gets the reference to `Analytics Reporting Interval` Drop Down element.
   *
   * @returns {Promise}
   */
  getAnalyticsReportingInterval: function () {
    return element(
      by.id(this.locators.dropDowns.analyticsReportingInterval.id));
  },

  /**
   * ### EditAppForm.getDomainsWhiteList()
   *
   * Gets the reference to `Domains White List` Drop Down element.
   *
   * @returns {Promise}
   */
  getDomainsWhiteList: function () {
    return element(by.id(this.locators.dropDowns.domainsWhiteList.id));
  },

  /**
   * ### EditAppForm.getDomainsBlackList()
   *
   * Gets the reference to `Domains Black List` Drop Down element.
   *
   * @returns {Promise}
   */
  getDomainsBlackList: function () {
    return element(by.id(this.locators.dropDowns.domainsBlackList.id));
  },

  /**
   * ### EditAppForm.getDomainsProvisionedList()
   *
   * Gets the reference to `Domains Provisioned List` Drop Down element.
   *
   * @returns {Promise}
   */
  getDomainsProvisionedList: function () {
    return element(by.id(this.locators.dropDowns.getDomainsProvisionedList.id));
  },

  /**
   * ### EditAppForm.getTestingOffloadingRatio()
   *
   * Gets the reference to `Testing Offloading Ratio` Drop Down element.
   *
   * @returns {Promise}
   */
  getTestingOffloadingRatio: function () {
    return element(by.id(this.locators.dropDowns.getTestingOffloadingRatio.id));
  },

  /**
   * ### EditAppForm.getBackToListBtn()
   *
   * Gets the reference to `Back To List` button element.
   *
   * @returns {Promise}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditAppForm.getBackToListBtn()
   *
   * Gets the reference to `Back To List` button element.
   *
   * @returns {Promise}
   */
  getAdvancedModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.advancedMode.linkText));
  },

  /**
   * ### EditAppForm.getAddNewVersionBtn()
   *
   * Gets the reference to `Add New Version` button element.
   *
   * @returns {Promise}
   */
  getAddNewVersionBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewVersion.linkText));
  },

  /**
   * ### EditAppForm.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditAppForm.getVerifyBtn()
   *
   * Gets the reference to `Verify` button element.
   *
   * @returns {Promise}
   */
  getVerifyBtn: function () {
    return element(by.css(this.locators.buttons.verify.css));
  },

  /**
   * ### EditAppForm.getUpdateBtn()
   *
   * Gets the reference to `Update` button element.
   *
   * @returns {Promise}
   */
  getUpdateBtn: function () {
    return element(by.css(this.locators.buttons.update.css));
  },

  /**
   * ### EditAppForm.getPublishBtn()
   *
   * Gets the reference to `Publish` button element.
   *
   * @returns {Promise}
   */
  getPublishBtn: function () {
    return element(by.css(this.locators.buttons.publish.css));
  },

  // ## Helper Methods

  /**
   * ### EditAppForm.setAppName(value)
   *
   * Sets a value into App Name field in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setAppName: function (value) {
    this.getAppNameTxt().clear();
    return this
      .getAppNameTxt()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setSDKReleaseVersion(value)
   *
   * Sets a value into SDK Release Version drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setSDKReleaseVersion: function (value) {
    return this
      .getSDKOperationModeDDown()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setSDKOperationMode(value)
   *
   * Sets a value into SDK Operation Mode drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setSDKOperationMode: function (value) {
    return this
      .getSDKOperationModeDDown()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setConfigurationRefreshInterval(value)
   *
   * Sets into Configuration Refresh Interval drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setConfigurationRefreshInterval: function (value) {
    return this
      .getConfigurationRefreshIntervalDDown()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setConfigurationStaleTimeout(value)
   *
   * Sets value into Configuration Stale Timeout drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setConfigurationStaleTimeout: function (value) {
    return this
      .getConfigurationStaleTimeoutDDown()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setInitialTransportProtocol(value)
   *
   * Sets value into Initial Transport Protocol drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setInitialTransportProtocol: function (value) {
    return this
      .getInitialTransportProtocol()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setAnalyticsReportingLevel(value)
   *
   * Sets value into Analytics Reporting Level drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setAnalyticsReportingLevel: function (value) {
    return this
      .getAnalyticsReportingLevel()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setAnalyticsReportingInterval(value)
   *
   * Sets value into Analytics Reporting Interval drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setAnalyticsReportingInterval: function (value) {
    return this
      .getAnalyticsReportingInterval()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setDomainsWhiteList(value)
   *
   * Sets value into Domains White List drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setDomainsWhiteList: function (value) {
    return this
      .getDomainsWhiteList()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setDomainsBlackList(value)
   *
   * Sets value into Domains Black List drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setDomainsBlackList: function (value) {
    return this
      .getDomainsBlackList()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setDomainsProvisionedList(value)
   *
   * Sets value into Domains Provisioned List drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setDomainsProvisionedList: function (value) {
    return this
      .getDomainsProvisionedList()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setTestingOffloadingRatio(value)
   *
   * Sets value into Testing Offloading Ratio drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setTestingOffloadingRatio: function (value) {
    return this
      .getTestingOffloadingRatio()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.clickBackToList()
   *
   * Clicks on Back To List button of `Add New App` Page.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickAdvancedMode()
   *
   * Clicks on Advanced Mode button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickAddNewVersion()
   *
   * Clicks on Add New Version button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickAddNewVersion: function () {
    return this
      .getAddNewVersionBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickCancel()
   *
   * Clicks on Cancel button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickVerify()
   *
   * Clicks on Verify button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickVerify: function () {
    return this
      .getVerifyBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickUpdate()
   *
   * Clicks on Update button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickPublish()
   *
   * Clicks on Publish button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickPublish: function () {
    return this
      .getPublishBtn()
      .click();
  },

  /**
   * ### EditAppForm.isEnabledVerify()
   *
   * Checks if Verify button is enabled in `Edit App` Page.
   *
   * @returns {Promise}
   */
  isEnabledVerify: function () {
    return this
      .getVerifyBtn()
      .isEnabled();
  },

  /**
   * ### EditAppForm.isEnabledUpdate()
   *
   * Checks if Update button is enabled in `Edit App` Page.
   *
   * @returns {Promise}
   */
  isEnabledUpdate: function () {
    return this
      .getUpdateBtn()
      .isEnabled();
  },

  /**
   * ### EditAppForm.isEnabledPublish()
   *
   * Checks if Publish button is enabled in `Edit App` Page.
   *
   * @returns {Promise}
   */
  isEnabledPublish: function () {
    return this
      .getPublishBtn()
      .isEnabled();
  },

  /**
   * ### EditAppForm.fill(app)
   *
   * Fills on Edit App from of `Edit App` Page.
   *
   * @param {object} app, app data with following schema.
   *
   *    {
   *        name: String,
   *        sdkOperationMode: String
   *    }
   *
   * @returns {Promise}
   */
  fill: function (app) {
    this.setAppName(app.name);
    //this.setSDKOperationMode(app.sdkOperationMode);
    //this.setConfigurationRefreshInterval(app.configurationRefreshInterval);
    //this.setConfigurationStaleTimeout(app.configurationStaleTimeout);
  }
};

module.exports = EditAppForm;
