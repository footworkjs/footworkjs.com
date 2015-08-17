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
        this.anchorPositions = fw.observable({});
        this.$namespace.subscribe('anchorPos', function(anchorDef) {
          var anchorPositions = this.anchorPositions();
          anchorPositions[anchorDef.anchor] = anchorDef.position;
          this.anchorPositions.valueHasMutated();
        }.bind(this));
        this.anchorPositions.subscribe(function(pos) {
          console.info('anchorPositions',pos);
        });

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

        this.toggleVisibility = function(viewModel, event) {
          this.active(!this.active());
          event.stopPropagation();
        };

        this.$globalNamespace.subscribe('clear', function() {
          this.active(false);
        }).context(this);
      }
    });
  }
);
