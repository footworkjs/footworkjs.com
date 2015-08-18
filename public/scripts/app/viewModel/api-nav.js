define([ "footwork", "lodash" ],
  function( fw, _ ) {
    var viewPortLayoutMode = fw.observable().receiveFrom('ViewPort', 'layoutMode');
    var headerHeight = fw.observable().receiveFrom('Header', 'height');
    var viewPortDimensions = fw.observable().receiveFrom('ViewPort', 'dimensions');
    var paneWidth = fw.observable().receiveFrom('Pane', 'width');
    var paneCollapsed = fw.observable().receiveFrom('Configuration', 'paneCollapsed');
    var apiReferenceNamespace = fw.namespace('apiReference');

    // var anchorPositions = fw.observable([]);
    var computeAnchorDelay;
    function computeAnchorPos() {
      clearTimeout(computeAnchorDelay);
      computeAnchorDelay = setTimeout(function() {
        apiReferenceNamespace.command('computePosition');
      }, 500);
    };

    this.layoutModeSub = viewPortLayoutMode.subscribe( computeAnchorPos );
    this.dimensionSub = viewPortDimensions.subscribe( computeAnchorPos );
    this.heightSub = headerHeight.subscribe( computeAnchorPos );
    this.widthSub = paneWidth.subscribe( computeAnchorPos );
    this.collapsedSub = paneCollapsed.subscribe( computeAnchorPos );

    return fw.viewModel({
      namespace: 'apiNav',
      initialize: function(params) {
        this.viewPortScrollPos = fw.observable().receiveFrom('ViewPort', 'scrollPosition');
        this.anchorPositions = fw.observable({});
        this.$namespace.subscribe('anchorPos', function(anchorDef) {
          var anchorPositions = this.anchorPositions();
          anchorPositions[anchorDef.anchor] = anchorDef;
          this.anchorPositions.valueHasMutated();
        }.bind(this));

        this.mouseOver = fw.observable().broadcastAs('mouseOver', true);
        this.currentAPISection = fw.observable().broadcastAs('currentAPISection');
        this.inAPISection = fw.computed(function() {
          var currentAPISection = this.currentAPISection();
          return _.isString(currentAPISection) && currentAPISection.length > 0;
        }, this);

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

        var showTimeout = 1000;
        var hideTimeout = 500;
        var hideDescriptionTimer;
        var showDescriptionTimer;
        this.showDescription = fw.observable(false);
        this.mouseOver.subscribe(function(mouseIsOver) {
          if(mouseIsOver) {
            clearTimeout(hideDescriptionTimer);
            hideDescriptionTimer = undefined;

            if(_.isUndefined(showDescriptionTimer)) {
              showDescriptionTimer = setTimeout(function() {
                this.showDescription(true);
              }.bind(this), showTimeout);
            }
          } else {
            clearTimeout(showDescriptionTimer);
            showDescriptionTimer = undefined;

            if(_.isUndefined(hideDescriptionTimer)) {
              hideDescriptionTimer = setTimeout(function() {
                this.showDescription(false);
              }.bind(this), hideTimeout);
            }
          }
        }.bind(this));

        this.viewPortScrollPos.subscribe(function(scrollPosition) {
          this.currentAPISection(undefined);
          _.each(this.anchorPositions(), function(anchorDef) {
            if(scrollPosition >= anchorDef.position) {
              this.currentAPISection(anchorDef.title);
            }
          }.bind(this));
        }.bind(this));

        this.toggleVisibility = function(viewModel, event) {
          this.active(!this.active());
          event.stopPropagation();
        };

        this.close = function() {
          this.active(false);
        }.bind(this);

        this.$globalNamespace.subscribe('clear', this.close);

        this.$namespace.command.handler('close', this.close);
      }
    });
  }
);
