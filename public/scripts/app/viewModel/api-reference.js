define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return fw.viewModel({
      namespace: 'apiReference',
      initialize: function(params) {
        _.extend(this, {
          description: null,
          subDescriptions: []
        }, fw.unwrap(params.reference));
        this.apiNavNamespace = fw.namespace('apiNav');
        this.currentAPISection = fw.observable().receiveFrom('apiNav', 'currentAPISection');
        this.$anchor = $('#' + this.anchor);

        this.hasSubDescriptions = this.subDescriptions.length;

        this.mouseOver = fw.observable().receiveFrom('apiNav', 'mouseOver');
        this.position = fw.observable();

        var oldPosition;
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

        this.isFocused = fw.observable(false);
        this.isFocused.subscribe(function(isFocused) {
          if(isFocused) {
            this.apiNavNamespace.command('open');
          }
        }.bind(this));

        this.anchorAddress = window.location.pathname + '#' + this.anchor;
        this.choose = function() {
          this.apiNavNamespace.command('close');
          return true;
        };

        this.active = fw.computed(function() {
          return this.currentAPISection() === this.title;
        }, this);

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
