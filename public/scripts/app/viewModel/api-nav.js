define([ "footwork", "lodash" ],
  function( fw, _ ) {
    return fw.viewModel({
      namespace: 'apiNav',
      initialize: function(params) {
        this.navData = fw.observable(fw.unwrap(params.apiReferences));
      }
    });
  }
);
