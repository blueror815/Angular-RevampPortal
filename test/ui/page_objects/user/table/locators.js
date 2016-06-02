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
    repeater: 'user in filteredRecords'
  }
};

var headerLocators = {
  firstName: {
    css: 'th:nth-of-type(1) a'
  },
  lastName: {
    css: 'th:nth-of-type(2) a'
  },
  email: {
    css: 'th:nth-of-type(3) a'
  },
  role: {
    css: 'th:nth-of-type(4) a'
  },
  status2fa: {
    css: 'th:nth-of-type(5) a'
  },
  updatedAt: {
    css: 'th:nth-of-type(6) a'
  },
  lastLoginAt: {
    css: 'th:nth-of-type(7) a'
  }
};

var rowLocators = {
  firstName: {
    css: 'td:nth-of-type(1)'
  },
  lastName: {
    css: 'td:nth-of-type(2)'
  },
  email: {
    css: 'td:nth-of-type(3)'
  },
  role: {
    css: 'td:nth-of-type(4)'
  },
  status2fa: {
    css: 'td:nth-of-type(5)'
  },
  updatedAt: {
    css: 'th:nth-of-type(6)'
  },
  lastLoginAt: {
    css: 'th:nth-of-type(7)'
  },
  actions: {
    css: 'td:nth-of-type(8)',
    buttons: {
      pencil: {
        className: 'glyphicon-pencil'
      },
      trash: {
        className: 'glyphicon-trash'
      }
    }
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};
