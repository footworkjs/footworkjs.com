define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var viewPortLayoutMode = fw.observable().receiveFrom('ViewPort', 'layoutMode');
    var headerHeight = fw.observable().receiveFrom('Header', 'height');
    var viewPortDimensions = fw.observable().receiveFrom('ViewPort', 'dimensions');
    var paneWidth = fw.observable().receiveFrom('Pane', 'width');
    var paneCollapsed = fw.observable().receiveFrom('Configuration', 'paneCollapsed');
    var apiReferenceNamespace = fw.namespace('apiReference');
    var sectionAnchors = fw.observable().receiveFrom('sectionAnchors', 'sectionAnchors');
    var apiScrollPosition = fw.observable(0).broadcastAs({ name: 'apiScrollPosition', namespace: 'apiNav' });
    var apiWindowHeight = fw.observable(0).broadcastAs({ name: 'apiWindowHeight', namespace: 'apiNav' });

    var computeAnchorDelay;
    function computeAnchorPos() {
      clearTimeout(computeAnchorDelay);
      computeAnchorDelay = setTimeout(function() {
        apiReferenceNamespace.command('computePosition');
      }, 500);
    };

    this.layoutModeSub = viewPortLayoutMode.subscribe(computeAnchorPos);
    this.dimensionSub = viewPortDimensions.subscribe(computeAnchorPos);
    this.heightSub = headerHeight.subscribe(computeAnchorPos);
    this.widthSub = paneWidth.subscribe(computeAnchorPos);
    this.collapsedSub = paneCollapsed.subscribe(computeAnchorPos);
    var $scrollContainer;

    fw.bindingHandlers["apiScroll"] = {
      'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        $scrollContainer = $(element);
        var updateScrollPosition = function(event) {
          apiScrollPosition(event.target.scrollTop);
        };
        apiWindowHeight($scrollContainer.outerHeight());

        $scrollContainer.on('scroll', updateScrollPosition);

        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          $scrollContainer.off('scroll', updateScrollPosition);
        });
      }
    };

    return fw.viewModel.create({
      namespace: 'apiNav',
      initialize: function(params) {
        this.viewPortScrollPos = fw.observable().receiveFrom('ViewPort', 'scrollPosition');
        this.anchorPositions = fw.observable({});
        this.$namespace.subscribe('anchorPos', function(anchorDef) {
          var anchorPositions = this.anchorPositions();
          anchorPositions[anchorDef.anchor] = anchorDef;
          this.anchorPositions.valueHasMutated();
        }.bind(this));

        this.apiNavHeight = fw.observable(400).broadcastAs('apiNavHeight');
        this.mouseOver = fw.observable().broadcastAs('mouseOver', true);
        this.currentAPISection = fw.observable().broadcastAs('currentAPISection');
        this.inAPISection = fw.computed(function() {
          var currentAPISection = this.currentAPISection();
          return _.isString(currentAPISection) && currentAPISection.length > 0;
        }, this);

        this.navData = fw.observable(fw.unwrap(params.apiReferences));
        this.$namespace.subscribe('newNavData', function(navData) {
          this.navData(navData);
        }.bind(this));

        this.active = fw.observable(false);
        this.active.subscribe(function() {
          apiReferenceNamespace.command('computePopupPosition');
        });

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

        var showTimeout = 600;
        var hideTimeout = 500;
        var hideDescriptionTimer;
        var showDescriptionTimer;
        this.toggleDescriptionVisibility = function() {
          this.hideDescriptions(!this.hideDescriptions());
        };
        this.hideDescriptions = fw.observable().receiveFrom('Page', 'hideDescriptions');
        this.showDescription = fw.observable(false);
        this.mouseOver.subscribe(function(mouseIsOver) {
          if(mouseIsOver) {
            clearTimeout(hideDescriptionTimer);
            hideDescriptionTimer = undefined;

            if(_.isUndefined(showDescriptionTimer)) {
              showDescriptionTimer = setTimeout(function() {
                if(!this.hideDescriptions()) {
                  this.showDescription(true);
                }
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

        this.nextClickAction = fw.computed(function() {
          if(this.hideDescriptions()) {
            return 'enable';
          }
          return 'disable';
        }, this);

        this.viewPortScrollPos.subscribe(function(scrollPosition) {
          this.currentAPISection(undefined);
          var anchors = _.sortBy(sectionAnchors(), 'position');
          var insideDef = undefined;
          _.each(anchors, function(anchor, index) {
            var nextAnchor = anchors[index + 1];
            if(!insideDef) {
              if(scrollPosition >= anchor.position && (_.isUndefined(nextAnchor) || scrollPosition < nextAnchor.position)) {
                insideDef = anchor.anchor;
              }
            }
          });

          if(insideDef) {
            _.each(this.anchorPositions(), function(anchorDef) {
              if(anchorDef.anchor === insideDef) {
                this.currentAPISection(anchorDef.title);
              }
            }.bind(this));
          } else {
            this.currentAPISection(undefined);
          }
        }.bind(this));

        this.toggleVisibility = function(viewModel, event) {
          var isVisible = !this.active();
          if(isVisible) {
            this.$globalNamespace.publish('clear');
          }
          this.active(isVisible);
          event.stopPropagation();
        };

        this.close = function() {
          this.active(false);
        }.bind(this);

        this.open = function() {
          this.$globalNamespace.publish('clear');
          this.active(true);
        }.bind(this);

        this.$globalNamespace.subscribe('clear', this.close);

        this.$namespace.command.handler('close', this.close);
        this.$namespace.command.handler('open', this.open);
      }
    });
  }
);
