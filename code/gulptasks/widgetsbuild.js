var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var jsReporter = require('jshint-stylish');
var annotateAdfPlugin = require('ng-annotate-adf-plugin');
var path = require('path');

var widgetDirPath = path.join('widgets', 'adf-widget-analytics-proxy-traffic');
var widgetDir = path.join(__dirname, '..', 'dev',widgetDirPath);
var widgetSrcDir = path.join(widgetDir, 'src');
var widgetDistDir = path.join(widgetDir, '..','..','..',widgetDirPath,'dist');

var pkg = require(widgetDir + '/package.json');

var annotateOptions = {
  plugin: [
    annotateAdfPlugin
  ]
};

var templateOptions = {
  root: '{widgetsPath}/analytics-proxy-traffic/src',
  module: 'adf.widget.analytics-proxy-traffic'
};

/** lint **/

gulp.task('csslint', function() {
  gulp.src(path.join(widgetSrcDir, '**', '*.css'))
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});

gulp.task('jslint', function() {
  gulp.src(path.join(widgetSrcDir, '**', '*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(jsReporter));
});

gulp.task('lint', ['csslint', 'jslint']);

/** serve **/

gulp.task('templates', function() {
  return gulp.src(path.join(widgetSrcDir, '**', '*.html'))
    .pipe($.angularTemplatecache('templates.tpl.js', templateOptions))
    .pipe(gulp.dest(path.join(widgetDir, '.tmp', 'dist')));
});

/** build **/

gulp.task('css', function() {
  gulp.src([path.join(widgetSrcDir, '**', '*.css'), path.join(widgetSrcDir, '**', '*.less')])
    .pipe($.if('*.less', $.less()))
    .pipe($.concat(pkg.name + '.css'))
    .pipe(gulp.dest(widgetDistDir))
    .pipe($.rename(pkg.name + '.min.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(widgetDistDir));
});

gulp.task('js', function() {
  gulp.src([path.join(widgetSrcDir, '**', '*.js'), path.join(widgetSrcDir, '**', '*.html')])
    .pipe($.if('*.html', $.minifyHtml()))
    .pipe($.if('*.html', $.angularTemplatecache(pkg.name + '.tpl.js', templateOptions)))
    .pipe($.angularFilesort())
    .pipe($.if('*.js', $.replace(/'use strict';/g, '')))
    .pipe($.concat(pkg.name + '.js'))
    .pipe($.headerfooter('(function(window, undefined) {\'use strict\';\n', '})(window);'))
    .pipe($.ngAnnotate(annotateOptions))
    .pipe(gulp.dest(widgetDistDir))
    .pipe($.rename(pkg.name + '.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(widgetDistDir));
});

/** clean **/
gulp.task('clean', function(cb) {
  del([widgetDistDir, path.join(widgetDir, '.tmp')], cb);
});

gulp.task('widgets:build', ['css', 'js'],function(cb){
  cb()
});
