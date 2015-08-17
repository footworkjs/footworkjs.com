define([ "footwork", "lodash" ],
  function( fw, _ ) {
    return fw.viewModel({
      namespace: 'apiNav',
      initialize: function(params) {
        this.navData = fw.observable(fw.unwrap(params.apiReferences));

        this.active = fw.observable(false);

        this.paneWidth = fw.observable().receiveFrom('Pane', 'width');

        this.apiNavWidth = fw.computed(function() {
          return (parseInt(this.paneWidth(), 10) - 65) + 'px';
        }, this);

        this.labelIcon = fw.computed(function() {
          if(this.active()) {
            return 'icon-chevron-up';
          }
          return 'icon-chevron-down';
        }, this);

        this.toggleVisibility = function() {
          this.active(!this.active());
        };
      }
    });
  }
);
