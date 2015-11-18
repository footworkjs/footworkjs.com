define([ "jquery", "lodash", "footwork" ],
  function( $, _, fw ) {
    return fw.viewModel.create({
      namespace: 'VersionDisplay',
      initialize: function() {
        this.version = fw.footworkVersion;
      }
    });
  }
);
