var regression = require('./base');

regression.specs = [
  '../suites/negative/**/*Spec.js',
  '../suites/boundary/**/*Spec.js',
  '../suites/functional/**/*Spec.js',
  '../suites/workflow/**/*Spec.js'
];

exports.config = regression;