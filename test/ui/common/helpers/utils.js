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

// # Utils object

// Requiring config file
var config = require('config');

// `Utils` object that has definitions of methods fo specific operations that
// could be used in different classes and resources.
var Utils = {

  /**
   * ### Utils.getBaseUrl()
   *
   * Generates the base-url of the App under test.
   *
   * @returns {string} The baseUrl
   */
  getBaseUrl: function () {
    var protocol = config.get('portal.host.protocol');
    var hostName = config.get('portal.host.name');
    var hostPort = config.get('portal.host.port');
    var basePath = config.get('portal.host.path');
    var baseUrl = protocol + '://' + hostName;
    if (hostPort) {
      baseUrl += ':' + hostPort;
    }
    if (basePath) {
      baseUrl += basePath;
    }
    return baseUrl + '/';
  }
};

module.exports = Utils;