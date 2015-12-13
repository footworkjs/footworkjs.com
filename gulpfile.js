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
var watch = require('gulp-watch');

var buildJS = function() {
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
};

gulp.task('default', ['bump', 'build-css', 'build-js', 'makeDemoBuilds'], buildJS);

gulp.task('build-js', buildJS);

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

gulp.task('build-css', function() {
  return gulp.src('./public/css/app.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', ['watch-css', 'watch-js']);

gulp.task('watch-css', function() {
  gulp.watch('public/**/*.less', ['build-css']);
});

gulp.task('watch-js', function() {
  gulp.watch(['public/scripts/app/**/*.js', 'public/scripts/require-config.js'], ['build-js']);
});

/**
 * Package up the demo files using the current bower footwork
 */
gulp.task('makeDemoBuilds', function(callback) {
  runSequence('copyDemoFiles', 'zipAmd', 'zipGlobal', callback);
});

gulp.task('copyDemoFiles', function() {
  var globalExample = gulp.src(['./public/demo/global-example/files/**/*'], { base: './public/demo/global-example/files' }).pipe(gulp.dest('./scratch/footwork-bootstrap-global/footwork-bootstrap-global'));
  var globalExampleContribFw = gulp.src(['./public/bower_components/footwork/dist/footwork-all.js'], { base: './public/bower_components/footwork/dist' }).pipe(gulp.dest('./scratch/footwork-bootstrap-global/footwork-bootstrap-global/js'));

  var amdExample = gulp.src(['./public/demo/amd-example/files/**/*'], { base: './public/demo/amd-example/files' }).pipe(gulp.dest('./scratch/footwork-bootstrap-amd/footwork-bootstrap-amd'));
  var amdExampleContribAmd = gulp.src(['./public/bower_components/requirejs/require.js'], { base: './public/bower_components/requirejs' }).pipe(gulp.dest('./scratch/footwork-bootstrap-amd/footwork-bootstrap-amd'));
  var amdExampleContribFw = gulp.src(['./public/bower_components/footwork/dist/footwork-all.js'], { base: './public/bower_components/footwork/dist' }).pipe(gulp.dest('./scratch/footwork-bootstrap-amd/footwork-bootstrap-amd/js'));

  return merge(globalExample, globalExampleContribFw, amdExample, amdExampleContribAmd);
});

gulp.task('zipAmd', function() {
  return gulp.src('./scratch/footwork-bootstrap-amd/**/*')
        .pipe(zip('footwork-bootstrap-amd.zip'))
        .pipe(gulp.dest('./public/demo/amd-example'));
});

gulp.task('zipGlobal', function() {
  return gulp.src('./scratch/footwork-bootstrap-global/**/*')
        .pipe(zip('footwork-bootstrap-global.zip'))
        .pipe(gulp.dest('./public/demo/global-example'));
});
