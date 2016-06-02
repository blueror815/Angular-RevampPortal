var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

gulp.task('clean', function() {
  return del(['results']);
});

gulp.task('lint', function () {
  return gulp.src([
    './*.js',
    './config/**/*.js',
    './common/**/*.js',
    './page_objects/**/*.js',
    './suites/**/*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('smokeTest', shell.task([
  'node node_modules/.bin/protractor config/smoke.js'
]));

gulp.task('regressionTest', shell.task([
  'node node_modules/.bin/protractor config/regression.js'
]));

gulp.task('doc', shell.task([
  'node node_modules/.bin/docker -o results/doc -i config -n',
  'node node_modules/.bin/docker -o results/doc -i common -n',
  'node node_modules/.bin/docker -o results/doc -i page_objects -n'
]));

gulp.task('all', ['clean', 'lint', 'smokeTest', 'regressionTest', 'doc']);

gulp.task('test', ['smokeTest', 'regressionTest']);

gulp.task('default', ['all']);