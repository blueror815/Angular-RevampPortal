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

// # Usage Report Domains (sub)Page Object

// This `Usage Report Domains` Page Object abstracts all operations or actions
// that a common Usage Report could do in the Portal app/site.
var UsageReportDomains = module.exports = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    domainsTable: {
      repeater: '( domain, usage ) in report.domains_usage'
    },
  },

  /**
   * ### UsageReportDomains.getDomainsList()
   *
   * Returns the reference to the `Domains Usage` table (Selenium WebDriver
   * Element) from the Usage Report page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainsList: function() {
    return element
      .all(by.repeater(this.locators.domainsTable.repeater));
  },

  /**
   * ### UsageReportDomains.getDomainRows()
   *
   * Returns the reference to 2 rows of the `Domains Usage` table with the name given
   * (Selenium WebDriver Element) from the Usage Report page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainRows: function( domain ) {
    return element
      .all(by.name(domain));
  }

};

