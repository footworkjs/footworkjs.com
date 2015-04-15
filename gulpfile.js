var gulp = require('gulp');
var rjs = require('requirejs');
var _ = require('lodash');

var requireConfig = _.extend( require( __dirname + '/public/scripts/require-config.js' ), {
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
});

gulp.task('default', function() {
  return rjs.optimize(requireConfig);
});

// var elixir = require('laravel-elixir');
// elixir(function(mix) {
//     mix.less('app.less');
// });
