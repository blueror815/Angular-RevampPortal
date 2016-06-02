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
  name: {
    css: 'th:nth-of-type(1) a'
  },
  cName: {
    css: 'th:nth-of-type(2) a'
  },
  lastUpdated: {
    css: 'th:nth-of-type(3) a'
  },
  status: {
    css: 'th:nth-of-type(4)'
  }
};

var rowLocators = {
  name: {
    css: 'td:nth-of-type(1)',
    links: {
      css: 'a'
    }
  },
  cName: {
    css: 'td:nth-of-type(2)'
  },
  lastUpdated: {
    css: 'td:nth-of-type(3)'
  },
  status: {
    css: 'td:nth-of-type(4)',
    icons: {
      staging: {
        css: 'i:nth-of-type(1)',
        type: {
          published: {
            css: 'i:nth-of-type(1).glyphicon-ok-sign'
          },
          error: {
            css: 'i:nth-of-type(1).glyphicon-remove'
          },
          inProgress: {
            css: 'i:nth-of-type(1).glyphicon-refresh'
          }
        }
      },
      global: {
        css: 'i:nth-of-type(2)',
        type: {
          published: {
            css: 'i:nth-of-type(2).glyphicon-ok-circle'
          },
          error: {
            css: 'i:nth-of-type(2).glyphicon-remove'
          },
          inProgress: {
            css: 'i:nth-of-type(2).glyphicon-refresh'
          }
        }
      }

    }
  },
  actions: {
    css: 'td:nth-of-type(5)',
    buttons: {
      pencil: {
        className: 'glyphicon-pencil'
      },
      cog: {
        className: 'glyphicon-cog'
      },
      trash: {
        className: 'glyphicon-trash'
      },
      stats: {
        className: 'glyphicon-stats'
      },
      book: {
        className: 'glyphicon-book'
      }
    }
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};