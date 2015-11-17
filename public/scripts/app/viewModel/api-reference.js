define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return fw.viewModel({
      namespace: 'apiReference',
      afterBinding: function(element) {
        this.$refElement = $(element);
      },
      initialize: function(params) {
        var apiReference = this;
        _.extend(this, {
          description: null,
          subDescriptions: []
        }, fw.unwrap(params.reference));
        this.apiNavNamespace = fw.namespace('apiNav');
        this.currentAPISection = fw.observable().receiveFrom('apiNav', 'currentAPISection');
        this.apiScrollPosition = fw.observable().receiveFrom('apiNav', 'apiScrollPosition');
        this.apiNavHeight = fw.observable().receiveFrom('apiNav', 'apiNavHeight');
        this.$anchor = $('#' + this.anchor);

        this.hasSubDescriptions = this.subDescriptions.length;

        this.mouseOver = fw.observable().receiveFrom('apiNav', 'mouseOver');
        this.position = fw.observable(0);
        this.popupOnTop = fw.observable(false);
        this.id = _.uniqueId();

        var updatePopupPositionNow = function(scrollTop) {
          if(!_.isUndefined(this.$refElement)) {
            scrollTop = scrollTop || 0;
            var apiNavHeight = this.apiNavHeight();
            var windowBottom = scrollTop + apiNavHeight;
            var breakPoint = (windowBottom - scrollTop) / 2;
            var showOnTop = this.$refElement.position().top > breakPoint;
            this.popupOnTop(showOnTop);
          }
        }.bind(this);
        var updatePopupPositionTimout;
        var updatePopupPosition = function(scrollTop) {
          clearTimeout(updatePopupPositionTimout);
          updatePopupPositionTimout = setTimeout(function() {
            updatePopupPositionNow(scrollTop);
          }, 100);
        }.bind(this);
        this.$namespace.command.handler('computePopupPosition', function() {
          setTimeout(function() {
            updatePopupPosition();
          }, 200);
        });

        this.apiScrollPosition.subscribe(updatePopupPosition);

        var oldPosition;
        this.position.subscribe(function(position) {
          this.apiNavNamespace.publish('anchorPos', {
            title: this.title,
            anchor: this.anchor,
            position: position,
            id: this.id
          });

          if(_.isUndefined(oldPosition) && position && this.anchor ===  window.location.hash.substring(1)) {
            window.scrollTo(0, position);
          }

          updatePopupPosition();

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
