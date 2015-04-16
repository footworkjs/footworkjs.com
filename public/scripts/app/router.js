define([ "jquery", "footwork", "lodash", "highlight", "jquery.collapsible", "history" ],
  function( $, fw, _ ) {
    var $pageNamespace = fw.namespace('Page');
    var $pageSectionsNamespace = fw.namespace('PageSections');
    var $pageSectionNamespace = fw.namespace('PageSection');
    var $pageSubSectionNamespace = fw.namespace('PageSubSection');
    var $paneElementsNamespace = fw.namespace('PaneElements');
    var scrollPosition = fw.observable().receiveFrom('ViewPort', 'scrollPosition');
    var maxScrollResetPosition = fw.observable().receiveFrom('ViewPort', 'maxScrollResetPosition');
    var pageLoading = fw.observable().broadcastAs({ name: 'pageLoading', namespace: 'MainRouter' });
    var viewPortLayoutMode = fw.observable().receiveFrom('ViewPort', 'layoutMode');
    var currentPageSection = fw.observable().receiveFrom('PageSections', 'currentSection');
    var initialLoad = fw.observable().receiveFrom('ViewPort', 'initialLoad');
    var firstLoad = true;
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');

    function initPage(metaData) {
      $pageNamespace.publish( 'initMeta', metaData );
    }

    History.Adapter.bind(window, 'popstate', function() {
      $pageSectionNamespace.trigger('resetURL');
      $pageSubSectionNamespace.trigger('resetURL');
    });

    function getPageLoadPromise() {
      var pagePromise = $.Deferred();
      pageLoading(true);
      pagePromise.done(function(metaData, article) {
        var maxScrollResetPos = maxScrollResetPosition();
        var $article = $(article);

        if( metaData.length ) {
          metaData = JSON.parse(metaData);
          initPage(metaData);
        }

        if( viewPortLayoutMode() !== 'mobile' ) {
          $paneElementsNamespace.publish('hideAll');
        }
        if( scrollPosition() > maxScrollResetPos && !firstLoad ) {
          window.scrollTo( 0, maxScrollResetPos );
        } else {
          firstLoad = false;
        }

        var $collapsible = $article.find('.collapsible');
        if( $collapsible.length ) {
          $collapsible.collapsible();
        }

        $article.find('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });

        if(window.location.hash.length) {
          $pageSectionsNamespace.command('goToSection', window.location.hash.substring(1));
        }
        pageLoading(false);
        initialLoad(false);
      });

      $pageNamespace.publish('loadingPage', pagePromise);
      return pagePromise;
    }

    function resolvePage(pageLoadPromise, element) {
      pageLoadPromise.resolve( $('#metaData').text(), element.children[0] );
    }

    function getViewName(docVersion, page) {
      return docVersion + '-' + page;
    }

    return fw.router({
      namespace: 'MainRouter',
      relativeToParent: false,
      routes: [
        {
          route: '/',
          title: 'footwork.js',
          controller: function($routeParams) {
            this.$outlet('mainContent', 'index-page', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/tutorials',
          title: 'Tutorials - footwork.js',
          controller: function($routeParams) {
            this.$outlet('mainContent', 'tutorials-page', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/tutorials/TodoMVC/creatingApplication',
          title: 'footworkjs - Tutorials - TodoMVC - Creating the Application',
          controller: function($routeParams) {
            this.$outlet('mainContent', 'todomvc-creating-page', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/tutorials/TodoMVC/routing',
          title: 'footworkjs - Tutorials - TodoMVC - Routing',
          controller: function($routeParams) {
            this.$outlet('mainContent', 'todomvc-routing-page', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/tutorials/TodoMVC/generalFunctionality',
          title: 'footworkjs - Tutorials - TodoMVC - General Functionality',
          controller: function($routeParams) {
            this.$outlet('mainContent', 'todomvc-general-page', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/about',
          title: 'about - footwork.js',
          controller: function($routeParams) {
            this.$outlet('mainContent', 'about-page', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/docs/list',
          title: 'Documentation - footwork.js',
          controller: function(params) {
            this.$outlet('mainContent', 'docs', _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }, {
          route: '/docs/:docVersion/:page',
          title: 'Documentation - footwork.js',
          controller: function(params) {
            var viewName = getViewName(params.docVersion, params.page);
            if(!selectedDocsVersion()) {
              selectedDocsVersion(params.docVersion);
            }
            if(!fw.components.locationIsRegistered(viewName)) {
              fw.components.registerLocation(viewName, {
                viewModel: '/scripts/app/viewModel/DocPage.js',
                template: '/docs/' + params.docVersion + '/' + params.page
              });
            }
            this.$outlet('mainContent', viewName, _.bind(resolvePage, this, getPageLoadPromise()));
          }
        }
      ],
      unknownRoute: {
        title: '404 not found',
        controller: function($routeParams) {
          this.$outlet('mainContent', 'not-found-page', _.bind(resolvePage, this, getPageLoadPromise()));
        }
      }
    });
  }
);
