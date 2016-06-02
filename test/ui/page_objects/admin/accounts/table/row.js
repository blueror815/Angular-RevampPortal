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

var CompanyTableRow = function (rowElem, locators) {

  // Properties
  this.rowElem = rowElem;
  this.locators = locators;

  // Methods
  this.getCompanyNameCell = function () {
    return this.rowElem.element(by.css(this.locators.companyName.css));
  };

  this.getCompanyNameLink = function () {
    return this
      .getCompanyNameCell()
      .element(by.css(this.locators.companyName.links.css));
  };

  this.getCreatedAtCell = function () {
    return this.rowElem.element(by.css(this.locators.createdAt.css));
  };

  this.getCreatedByCell = function () {
    return this.rowElem.element(by.css(this.locators.createdBy.css));
  };

  this.getSubscriptionStateCell = function () {
    return this.rowElem.element(by.css(this.locators.subscriptionState.css));
  };

  this.getBillingPlanCell = function () {
    return this.rowElem.element(by.css(this.locators.billingPlan.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowElem.element(by.css(this.locators.lastUpdate.css));
  };

  this.getCompanyName = function () {
    return this
      .getCompanyNameCell()
      .getText();
  };

  this.getCreatedAt = function () {
    return this
      .getCreatedAtCell()
      .getText();
  };

  this.getCreatedBy = function () {
    return this
      .getCreatedByCell()
      .getText();
  };

  this.getSubscriptionState = function () {
    return this
      .getSubscriptionStateCell()
      .getText();
  };

  this.getBillingPlan = function () {
    return this
      .getBillingPlanCell()
      .getText();
  };

  this.getLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .getText();
  };

  if (this.locators.actions && this.locators.actions.buttons.scale) {
    this.getUsageReportBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.scale.className));
    };
    this.clickUsageReport = function () {
      return this
        .getUsageReportBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.billing) {
    this.getChangeBillingPlanBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.billing.className));
    };
    this.clickChangeBillingPlan = function () {
      return this
        .getChangeBillingPlanBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.money) {
    this.getStatementsBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.money.className));
    };
    this.clickStatements = function () {
      return this
        .getStatementsBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.pencil) {
    this.getEditCompanyBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.pencil.className));
    };
    this.clickEditCompany = function () {
      return this
        .getEditCompanyBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.trash) {
    this.getDeleteCompanyBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.trash.className));
    };
    this.clickDeleteCompany = function () {
      return this
        .getDeleteCompanyBtn()
        .click();
    };
  }
};

module.exports = CompanyTableRow;
