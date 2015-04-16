var gulp = require('gulp');
var rjs = require('requirejs');
var jeditor = require('gulp-json-editor');
var args   = require('yargs').argv;
var _ = require('lodash');
var pkg = require('./package.json');

gulp.task('default', ['bump'], function() {
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
