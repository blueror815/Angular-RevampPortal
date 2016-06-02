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

var tableLocators = {
  header: {
    css: 'table thead tr'
  },
  rows: {
    repeater: 'item in filteredRecords'
  }
};

var headerLocators = {
  companyName: {
    css: 'th:nth-of-type(1) a'
  },
  createdAt: {
    css: 'th:nth-of-type(2) a'
  },
  createdBy: {
    css: 'th:nth-of-type(3) a'
  },
  subscriptionState: {
    css: 'th:nth-of-type(4) a'
  },
  billingPlan: {
    css: 'th:nth-of-type(5) a'
  },
  lastUpdate: {
    css: 'th:nth-of-type(6) a'
  }
};

var rowLocators = {
  companyName: {
    css: 'td:nth-of-type(1)',
    links: {
      css: 'a'
    }
  },
  createdAt: {
    css: 'td:nth-of-type(2)'
  },
  createdBy: {
    css: 'td:nth-of-type(3)'
  },
  subscriptionState: {
    css: 'td:nth-of-type(4)'
  },
  billingPlan: {
    css: 'td:nth-of-type(5)'
  },
  lastUpdate: {
    css: 'td:nth-of-type(6)'
  },
  actions: {
    css: 'td:nth-of-type(7)',
    buttons: {
      scale: {
        className: 'fa-balance-scale'
      },
      billing: {
        className: 'fa-arrow-circle-up'
      },
      money: {
        className: 'fa-money'
      },
      pencil: {
        className: 'glyphicon-pencil'
      },
      trash: {
        className: 'glyphicon-trash'
      },
    }
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};