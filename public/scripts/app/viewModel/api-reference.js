define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return fw.viewModel({
      namespace: 'apiReference',
      initialize: function(params) {
        _.extend(this, fw.unwrap(params.reference));
        this.apiNavNamespace = fw.namespace('apiNav');
        this.$anchor = $('#' + this.anchor);

        this.element = fw.observable();
        this.position = fw.observable();
        this.position.subscribe(function(position) {
          this.apiNavNamespace.publish('anchorPos', {
            anchor: this.anchor,
            position: position
          });
        }.bind(this));

        this.anchorAddress = window.location.pathname + '#' + this.anchor;

        (this.getPlacement = function() {
          if(this.$anchor.length) {
            this.position(this.$anchor.offset().top);
          }
        }.bind(this))();

        this.$namespace.command.handler('computePosition', this.getPlacement);
      }
    });
  }
);
