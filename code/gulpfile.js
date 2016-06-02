'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var ngAnnotate = require('gulp-ng-annotate');
var htmlhint = require('gulp-htmlhint');
var gulpRequireTasks = require('gulp-require-tasks');
var flatten = require('gulp-flatten');

// Call it when neccesary.
gulpRequireTasks({
  // Pass any options to it. Please see below.
  path: __dirname + '/gulptasks' // This is default
});
var devFolder = 'dev/';
var destFolder = './';

gulp.task('valid', function() {
  return gulp.src(devFolder + 'parts/**/*.html')
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('less', function() {
  return gulp.src(devFolder + 'less/styles.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less')]
    }))
    .pipe(gulp.dest(devFolder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('copyCss', function() {
  return gulp.src(devFolder + 'css/**/*.css')
    .pipe(gulp.dest(destFolder + 'css'));
});

gulp.task('copyImages', function() {
  return gulp.src(devFolder + 'images/**/*')
    .pipe(gulp.dest(destFolder + 'images'));
});

gulp.task('copyParts', function() {
  return gulp.src(devFolder + 'parts/**/*.html')
    .pipe(gulp.dest(destFolder + 'parts'));
});

gulp.task('copyJson', function() {
  return gulp.src(devFolder + 'js/**/*.json')
    .pipe(gulp.dest(destFolder + 'js'));
});

// copy custom fonts
gulp.task('copyFonts', function() {
  return gulp.src(devFolder + 'fonts/**/*.*')
    .pipe(gulp.dest(destFolder + 'fonts'));
});

gulp.task('fonts', function () {
  return gulp.src('./bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(destFolder + 'fonts'));
});

gulp.task('vulcanize', function() {
  return gulp.src(devFolder + 'polymer/elements.html')
    .pipe(vulcanize({
      stripExcludes: false,
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest(destFolder + 'polymer/'));
});

gulp.task('dist', function() {
  var assets = useref.assets();

  var uglifyOptions = {
    mangle: false //,
      //compress: {
      //  dead_code: false,
      //  hoist_funs: false
      //}
  };
  return gulp.src(devFolder + 'index.html')
    .pipe(assets)
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglify(uglifyOptions)))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(destFolder));
});

// linting
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
gulp.task('lintjs', function() {
  return gulp.src([
      'gulpfile.js',
      devFolder + 'js/**/*.js'
    ])
    .pipe(jshint({
      linter: 'jshint'
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './dev',
      routes: {
        '/bower_components': 'bower_components',
        '/portal': '/',
        '/widgets': '/../widgets',
      }
    }
  });

  gulp.watch([devFolder + '**/*.html'], reload);
  gulp.watch([devFolder + 'less/**/*.less'], ['less']);
  gulp.watch([devFolder + 'polymer/**/*.html', '!./polymer/dist/*'], ['vulcanize', reload]);

  gulp.watch([devFolder + 'js/**/*.js'], ['lintjs', reload]);
  gulp.watch([devFolder + 'js/**/*.html'], reload);
  gulp.watch([devFolder + 'images/**/*'], reload);
  gulp.watch([devFolder + 'widgets/**/*'], ['widgets:build']);
});

gulp.task('copy', ['copyCss', 'copyParts', 'copyImages', 'copyJson', 'copyFonts', 'fonts','widgets:build']);
gulp.task('build', ['copy', 'dist', 'vulcanize']);
gulp.task('default', ['serve', 'less']);
