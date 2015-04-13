define([ "footwork", "lodash" ],
  function( fw, _ ) {
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');

    return fw.viewModel({
      namespace: 'DocPage',
      initialize: function() {
        this.docLink = function(page) {
          return '/docs/' + selectedDocsVersion() + '/' + page;
        };
      }
    });
  }
);
