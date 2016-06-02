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

// # Activity Log Page Object

// This `Activity Log Table` Page Object abstracts all operations or actions
// that a common user could do in the Activity Log page the Portal app/site.
var ActivityLogTable = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: '.col-md-12 .panel .panel-heading',
    panelBody: '.col-md-12 .panel .panel-body',
    pullLeft: '.pull-left',
    pullRight: '.pull-right',
    tables: {
      log: {
        repeater: 'log in filteredRecords | limitTo:filter.limit:filter.skip ' +
        'track by $index'
      }
    },
    pagination: {
      first: {
        css: '[ng-click=\"goToPage(1)\"]'
      },
      previous: {
        css: '[ng-click=\"prevPage()\"]'
      },
      next: {
        css: '[ng-click=\"nextPage()\"]'
      },
      last: {
        css: '[ng-click=\"goToPage(page.pages.length)\"]'
      }
    },
    links: {
      datetime: {
        css: '[ng-click=\"order(\'datetime\')\"]'
      },
      user: {
        css: '[ng-click=\"order(\'user_name\')\"]'
      },
      activityType: {
        css: '[ng-click=\"order(\'activity_type\')\"]'
      },
      activityTarget: {
        css: '[ng-click=\"order(\'activity_target\')\"]'
      }
    }
  },

  /**
   * ### ActivityLogTable.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Activity Log page in the Portal app.
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
   * ### ActivityLogTable.getActivityLogTbl()
   *
   * Gets the reference to `Activity Log` table element.
   *
   * @returns {Promise}
   */
  getActivityLogTbl: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.tables.log.repeater));
  },

  /**
   * ### ActivityLogTable.getFirstBtn()
   *
   * Gets the reference to `First` pagination button element.
   *
   * @returns {Promise}
   */
  getFirstBtn: function () {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.pagination.first.css))
      .get(0);
  },

  /**
   * ### ActivityLogTable.getPreviousBtn()
   *
   * Gets the reference to `Previous` pagination button element.
   *
   * @returns {Promise}
   */
  getPreviousBtn: function () {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.pagination.previous.css))
      .get(0);
  },

  /**
   * ### ActivityLogTable.getNextBtn()
   *
   * Gets the reference to `Next` pagination button element.
   *
   * @returns {Promise}
   */
  getNextBtn: function () {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.pagination.next.css))
      .get(0);
  },

  /**
   * ### ActivityLogTable.getLastBtn()
   *
   * Gets the reference to `Last` pagination button element.
   *
   * @returns {Promise}
   */
  getLastBtn: function () {
    return this
      .getPanelBodyElem()
      .all(by.css(this.locators.pagination.last.css))
      .get(0);
  },

  /**
   * ### ActivityLogTable.getDatetimeColumnLnk()
   *
   * Gets the reference to `Datetime` column link element from table.
   *
   * @returns {Promise}
   */
  getDatetimeColumnLnk: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.links.datetime.css));
  },

  /**
   * ### ActivityLogTable.getUserColumnLnk()
   *
   * Gets the reference to `User` column link element from table.
   *
   * @returns {Promise}
   */
  getUserColumnLnk: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.links.user.css));
  },

  /**
   * ### ActivityLogTable.getActivityTypeColumnLnk()
   *
   * Gets the reference to `Activity Type` column link element from table.
   *
   * @returns {Promise}
   */
  getActivityTypeColumnLnk: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.links.activityType.css));
  },

  /**
   * ### ActivityLogTable.getActivityTargetColumnLnk()
   *
   * Gets the reference to `Activity Target` column link element from table.
   *
   * @returns {Promise}
   */
  getActivityTargetColumnLnk: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.links.activityTarget.css));
  },

  // ## Helper Methods

  /**
   * ### ActivityLogTable.clickFirst()
   *
   * Clicks on the `First` button element.
   *
   * @returns {Promise}
   */
  clickFirst: function () {
    return this
      .getFirstBtn()
      .click();
  },

  /**
   * ### ActivityLogTable.clickPrevious()
   *
   * Clicks on the `Previous` button element.
   *
   * @returns {Promise}
   */
  clickPrevious: function () {
    return this
      .getPreviousBtn()
      .click();
  },

  /**
   * ### ActivityLogTable.clickNext()
   *
   * Clicks on the `Next` button element.
   *
   * @returns {Promise}
   */
  clickNext: function () {
    return this
      .getNextBtn()
      .click();
  },

  /**
   * ### ActivityLogTable.clickLast()
   *
   * Clicks on the `Last` button element.
   *
   * @returns {Promise}
   */
  clickLast: function () {
    return this
      .getLastBtn()
      .click();
  },

  /**
   * ### ActivityLogTable.clickDatetime()
   *
   * Clicks on the `Datetime` link column element.
   *
   * @returns {Promise}
   */
  clickDatetime: function () {
    return this
      .getDatetimeColumnLnk()
      .click();
  },

  /**
   * ### ActivityLogTable.clickUser()
   *
   * Clicks on the `User` link column element.
   *
   * @returns {Promise}
   */
  clickUser: function () {
    return this
      .getUserColumnLnk()
      .click();
  },

  /**
   * ### ActivityLogTable.clickActivityType()
   *
   * Clicks on the `Activity Type` link column element.
   *
   * @returns {Promise}
   */
  clickActivityType: function () {
    return this
      .getActivityTypeColumnLnk()
      .click();
  },

  /**
   * ### ActivityLogTable.clickActivityTarget()
   *
   * Clicks on the `Activity Target` link column element.
   *
   * @returns {Promise}
   */
  clickActivityTarget: function () {
    return this
      .getActivityTargetColumnLnk()
      .click();
  },

  /**
   * ### ActivityLogTable.countTotalRows()
   *
   * Gets the total of `Activity Logs` in the table element per page.
   *
   * @returns {Promise}
   */
  countTotalRows: function() {
    return this
      .getActivityLogTbl()
      .count();
  },

  /**
   * ### ActivityLogTable.hasPagination()
   *
   * Checks whether the Purge Cached Objects page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  hasPagination: function () {
    var firstButton = this.getFirstBtn().isPresent();
    var previousButton = this.getPreviousBtn().isPresent();
    var nextButton = this.getNextBtn().isPresent();
    var lastButton = this.getLastBtn().isPresent();
    return (firstButton && previousButton && nextButton && lastButton);
  }
};

module.exports = ActivityLogTable;
