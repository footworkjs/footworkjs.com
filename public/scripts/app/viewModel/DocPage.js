define([ "footwork", "lodash" ],
  function( fw, _ ) {
    return fw.viewModel.create({
      namespace: 'DocPage',
      initialize: function() {
        this.selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');

        this.versionDisplay = fw.computed(function() {
          return 'v' + this.selectedDocsVersion();
        }, this);

        this.docLink = function(page) {
          return '/docs/' + this.selectedDocsVersion() + '/' + page;
        };
      }
    });
  }
);
