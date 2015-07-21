define(['footwork', 'jquery', 'lodash'],
  function(fw, $, _) {
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');
    var navData = fw.observable(window.docNavData).broadcastAs({ name: 'navData', namespace: 'navData' });
    var viewPortIsMobile = fw.observable().receiveFrom('ViewPort', 'isMobile');
    var paneCollapsed = fw.observable().receiveFrom('Configuration', 'paneCollapsed');
    var paneElementsNamespace = fw.namespace('PaneElements');
    var documentationNavNamespace = fw.namespace('DocumentationNav');
    var versionMatch = /\/([0-9]+\.[0-9]+\.[0-9\-a-zA-Z]+)\//;

    selectedDocsVersion.subscribe(function(version) {
      if(window.location.pathname.match(versionMatch)) {
        History.pushState(null, "", window.location.pathname.replace(versionMatch, '/' + version + '/'));
      }
    });

    if(!navData()) {
      $.getJSON('/docs/navigation-data')
        .done(function(docsNavData) {
          navData(docsNavData);
          if(!selectedDocsVersion()) {
            selectedDocsVersion( _.first(_.keys(docsNavData)) );
          }
        });
    } else {
      if(!selectedDocsVersion()) {
        selectedDocsVersion( _.first(_.keys(navData())) );
      }
    }

    var DocLink = fw.viewModel({
      namespace: 'DocLink',
      initialize: function(linkDesc) {
        this.display = '';
        _.extend(this, linkDesc);
        this.linkAddr = '/docs/' + selectedDocsVersion() + '/' + linkDesc.page;

        this.clickHandler = function(event, url) {
          var routeToURL = true;
          var $target = $(event.target);
          var stopHere = false;

          if( !fw.utils.isFullURL(url) && event.which !== 2 ) {
            stopHere = true;
          } else if(event.which === 2) {
            routeToURL = false;
          }

          paneElementsNamespace.publish('collapseSubMenu');

          if(routeToURL) {
            documentationNavNamespace.command('clearMenu');
          }

          if(stopHere) {
            event.preventDefault();
            event.stopPropagation();
          }
          return routeToURL;
        };
      }
    });

    var DocVersionOption = fw.viewModel({
      namespace: 'DocVersionOption',
      initialize: function(version) {
        this.selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');
        this.version = version;
        this.isSelected = fw.computed(function() {
          return this.selectedDocsVersion() === this.version;
        }, this);

        this.select = function() {
          this.selectedDocsVersion(this.version);
        };
      }
    });

    return fw.viewModel({
      namespace: 'DocumentationNav',
      initialize: function() {
        this.navData = fw.observable().receiveFrom('navData', 'navData');
        this.selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');
        this.versionsAvailable = fw.computed(function() {
          var navData = this.navData();
          if(navData) {
            return _.map(_.keys(navData), function(navItem) {
              return new DocVersionOption(navItem);
            });
          }
          return [];
        }, this);

        this.menuVisible = fw.observable(false);

        this.selectorIcon = fw.computed(function() {
          return this.menuVisible() ? 'icon-chevron-up' : 'icon-chevron-down';
        }, this);

        this.toggleMenu = function(viewModel, event) {
          this.menuVisible(!this.menuVisible());
          event.stopPropagation();
          return true;
        };

        this.clearMenu = function(viewModel, event) {
          this.menuVisible(false);
        };
        this.$namespace.command.handler('clearMenu', this.clearMenu, this);

        this.$globalNamespace.subscribe('clear', function() {
          this.menuVisible(false);
        }.bind(this));

        this.docLinks = fw.computed(function() {
          var navData = this.navData();
          var selectedDocsVersion = this.selectedDocsVersion();
          if(navData && selectedDocsVersion && _.isArray(navData[selectedDocsVersion])) {
            return _.map(navData[selectedDocsVersion], function(linkData) {
              return new DocLink( _.extend({
                label: '',
                description: '',
                path: ''
              }, linkData) );
            });
          }
          return [];
        }, this);
      }
    });
  }
);
