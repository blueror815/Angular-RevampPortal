var smoke = require('./base');

smoke.specs = [
  '../suites/setup/*Spec.js',
  '../suites/smoke/**/*Spec.js'
];

exports.config = smoke;