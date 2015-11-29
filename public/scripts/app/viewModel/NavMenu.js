define([ "jquery", "lodash", "footwork" ],
  function( $, _, fw ) {
    var viewPortIsMobile = fw.observable().receiveFrom('ViewPort', 'isMobile');

    var Entry = fw.viewModel.create({
      namespace: 'PaneElements',
      initialize: function(entryData) {
        this.headerContentHeight = fw.observable().receiveFrom('Header', 'contentHeight');
        this.visible = fw.observable( null ).extend({ autoEnable: _.random( 200, 600 ) });
        this.paneCollapsed = fw.observable().receiveFrom('Configuration', 'paneCollapsed').extend({ debounce: { timeout: 200, when: function(collapsed) { return collapsed === false; } } });
        this.labelText = fw.observable( entryData.label );
        this.url = fw.observable( entryData.url );
        this.options = entryData || {};
        this.subMenuItems = entryData.subMenu;
        this.inHeader = entryData.inHeader;
        this.showInHeader = _.isUndefined(entryData.showInHeader) || entryData.showInHeader;
        this.hasSubMenu = (_.isArray(entryData.subMenu) && !!entryData.subMenu.length);
        this.hasDocsMenu = entryData.label === 'Docs';
        this.target = entryData.target;
        this.menuActive = fw.observable(false);
        this.dontClose = false;
        this.menuActive.subscribe(function(isActive) {
          if(isActive) {
            this.dontClose = true;
            this.$globalNamespace.publish('clear');
          }
        }.bind(this));
        this.$globalNamespace.subscribe('clear', _.bind(function() {
          if(!this.dontClose) {
            this.menuActive(false);
          }
          this.dontClose = false;
        }, this));
        this.componentName = entryData.component;
        this.type = _.isString(entryData.component) ? 'component' : 'menuItem';

        this.stopPropagation = function(viewModel, event) {
          if(event.which !== 2) {
            event.stopPropagation();
          }
          return true;
        };

        this.clickHandler = function(event, url) {
          var routeToURL = false;
          var stopHere = false;

          if( (this.hasSubMenu || this.hasDocsMenu) && !viewPortIsMobile() ) {
            this.menuActive(!this.menuActive());
            stopHere = true;
          } else {
            if(!viewPortIsMobile() || !this.paneCollapsed()) {
              routeToURL = true;
            }
            if( !fw.utils.isFullURL(url) && event.which !== 2 ) {
              stopHere = true;
            } else if(event.which === 2) {
              routeToURL = false;
            }
            this.$namespace.publish('collapseSubMenu');
          }

          if(stopHere) {
            event.preventDefault();
            event.stopPropagation();
          }
          return routeToURL;
        };

        this.$namespace.subscribe('collapseSubMenu', function() {
          this.menuActive(false);
        }).context(this);

        this.$namespace.subscribe('hideAll', function() {
          this.visible(false);
        }).context(this);

        this.visible(false);
      }
    });

    return fw.viewModel.create({
      namespace: 'NavMenu',
      initialize: function(params) {
        this.visible = fw.observable(false);
        this.paneWidth = fw.observable().receiveFrom('Pane', 'width');
        this.currentSelection = fw.observable().receiveFrom('PaneLinks', 'currentSelection');
        this.paneContentMaxHeight = fw.observable().receiveFrom('Pane', 'contentMaxHeight').extend({ units: 'px' });
        this.headerContentHeight = fw.observable().receiveFrom('Header', 'contentHeight');
        this.configVisible = fw.observable().receiveFrom('Configuration', 'visible');
        this.paneCollapsed = fw.observable().receiveFrom('Configuration', 'paneCollapsed');
        this.inHeader = !!params.inHeader;

        this.toggleConfigView = function() {
          this.configVisible( !this.configVisible() );
          if( this.configVisible() && this.paneCollapsed() ) {
            this.paneCollapsed(false);
          }
        }.bind( this );

        this.mobileWidth = fw.computed(function() {
          return (parseInt(this.paneWidth(), 10) - 20) + 'px';
        }, this);
        this.visible = fw.observable(false);
        this.entries = fw.observableArray([
          new Entry({ label: 'Docs', url: '/docs/list', inHeader: this.inHeader }),
          new Entry({ label: 'Get Started', url: '/get-started', inHeader: this.inHeader }),
          new Entry({ component: 'api-search', showInHeader: true, inHeader: this.inHeader }),
          new Entry({ label: 'About', url: '/about', aside: true, inHeader: this.inHeader })
        ]);

        this.checkSelection = function(newSelection) {
          newSelection = newSelection || this.currentSelection();
          this.visible( newSelection === this.getNamespaceName() );
        };
        this.currentSelection.subscribe(this.checkSelection, this);

        this.checkSelection();
      }
    });
  }
);
