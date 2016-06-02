var config = require('config');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var JasmineSpecReporter = require('jasmine-spec-reporter');

module.exports = {
  directConnect: false,
  seleniumAddress: config.get('protractor.seleniumAddress'),
  capabilities: {
    browserName: 'firefox'
  },
  getPageTimeout: 120000,
  allScriptsTimeout: 300000,
  framework: 'jasmine2',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 360000,
    showColors: true,
    print: function() {} // Disable default reporter
  },
  onPrepare: function () {
    browser.manage().window().setSize(1024, 768);

    // add jasmine html reporter
    var htmlReporter = new Jasmine2HtmlReporter({
      savePath: './results/tests/',
      takeScreenshots: true,
      takeScreenshotsOnlyOnFailures: true,
      consolidate: true,
      consolidateAll: true
    });
    jasmine.getEnv().addReporter(htmlReporter);

    // add jasmine spec reporter
    var specReporter = new JasmineSpecReporter({
      displayStacktrace: 'summary'
    });
    jasmine.getEnv().addReporter(specReporter);
  }
};
