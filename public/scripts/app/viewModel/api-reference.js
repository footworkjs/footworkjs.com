define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return fw.viewModel({
      namespace: 'apiReference',
      initialize: function(params) {
        _.extend(this, fw.unwrap(params.reference));
        this.apiNavNamespace = fw.namespace('apiNav');
        this.$anchor = $('#' + this.anchor);

        this.element = fw.observable();
        var oldPosition;
        this.position = fw.observable();
        this.position.subscribe(function(position) {
          this.apiNavNamespace.publish('anchorPos', {
            title: this.title,
            anchor: this.anchor,
            position: position
          });

          if(_.isUndefined(oldPosition) && position && this.anchor ===  window.location.hash.substring(1)) {
            window.scrollTo(0, position);
          }

          oldPosition = position;
        }.bind(this));

        this.anchorAddress = window.location.pathname + '#' + this.anchor;
        this.choose = function() {
          this.apiNavNamespace.command('close');
          return true;
        };

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
