var gulp = require('gulp');
var rjs = require('requirejs');
var jeditor = require('gulp-json-editor');
var args   = require('yargs').argv;
var _ = require('lodash');
var pkg = require('./package.json');
var less = require('gulp-less');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');
var merge = require('merge-stream');

gulp.task('default', ['bump', 'less', 'makeDemoBuilds'], function() {
  return rjs.optimize(_.extend( require( __dirname + '/public/scripts/require-config.js' ), {
    include: [ 'requireLib', 'text', 'storage', 'router', 'LoadState', 'highlight', 'jquery.pulse', 'Layout' ],
    baseUrl: 'public/scripts/',
    name: 'app/main',
    mainConfigFile: 'public/scripts/app/main.js',
    out: 'public/scripts/main-build.js',
    // optimize: 'none',
    preserveLicenseComments: false,
    wrap: {
      start: "(function() {",
      end: "}());"
    }
  }));
});

gulp.task('bump', function() {
  if(typeof args.ver !== 'undefined') {
    pkg.buildVersion = buildVersion;
  } else {
    pkg.buildVersion++;
  }

  return gulp.src('./package.json')
    .pipe(jeditor(pkg))
    .pipe(gulp.dest('./'));
});

gulp.task('less', function() {
  return gulp.src('./public/css/app.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

/**
 * Package up the demo files using the current bower footwork
 */
gulp.task('makeDemoBuilds', function(callback) {
  runSequence('copyDemoFiles', 'zipDemoFiles', callback);
});

gulp.task('copyDemoFiles', function() {
  var globalExample = gulp.src(['./public/demo/global-example/files/**/*'], { base: './public/demo/global-example/files' }).pipe(gulp.dest('./scratch/footwork-bootstrap-global'));
  var globalExampleContribFw = gulp.src(['./public/bower_components/footwork/dist/footwork-all.js'], { base: './public/bower_components/footwork/dist' }).pipe(gulp.dest('./scratch/footwork-bootstrap-global/js'));

  var amdExample = gulp.src(['./public/demo/amd-example/files/**/*'], { base: './public/demo/amd-example/files' }).pipe(gulp.dest('./scratch/footwork-bootstrap-amd'));
  var amdExampleContribAmd = gulp.src(['./public/bower_components/requirejs/require.js'], { base: './public/bower_components/requirejs' }).pipe(gulp.dest('./scratch/footwork-bootstrap-amd'));
  var amdExampleContribFw = gulp.src(['./public/bower_components/footwork/dist/footwork-all.js'], { base: './public/bower_components/footwork/dist' }).pipe(gulp.dest('./scratch/footwork-bootstrap-amd/js'));

  return merge(globalExample, globalExampleContribFw, amdExample, amdExampleContribAmd);
});

gulp.task('zipDemoFiles', function() {
  var zipGlobal = gulp.src('./scratch/footwork-bootstrap-global')
        .pipe(zip('footwork-bootstrap-global.zip'))
        .pipe(gulp.dest('./public/demo/global-example'));
  var zipAmd = gulp.src('./scratch/footwork-bootstrap-amd')
        .pipe(zip('footwork-bootstrap-amd.zip'))
        .pipe(gulp.dest('./public/demo/amd-example'));
  return merge(zipGlobal, zipAmd);
});
