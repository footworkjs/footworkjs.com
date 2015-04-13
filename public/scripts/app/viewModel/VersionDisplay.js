define([ "jquery", "lodash", "footwork" ],
  function( $, _, fw ) {
    return fw.viewModel({
      namespace: 'VersionDisplay',
      initialize: function() {
        this.version = fw.footworkVersion;
      }
    });
  }
);