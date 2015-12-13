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

    function pageLoad(metaData, article) {
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
    }

    function getPageLoadPromise() {
      var pagePromise = $.Deferred();
      pageLoading(true);
      pagePromise.done(pageLoad);

      $pageNamespace.publish('loadingPage', pagePromise);
      return pagePromise;
    }

    function resolvePage(pageLoadPromise, element) {
      pageLoadPromise.resolve( $('#metaData').text(), element.children[0] );
    }

    function showNotFoundPage() {
      var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
      this.outlet('mainContent', 'not-found-page', showLoadedPage);
    }

    function getViewName(docVersion, page) {
      return docVersion + '-' + page;
    }

    return fw.router.create({
      namespace: 'MainRouter',
      relativeToParent: false,
      initialize: function() {
        var showNotFoundTimeout;
        pageLoading.subscribe(function(isLoading) {
          if(isLoading) {
            showNotFoundTimeout = setTimeout(showNotFoundPage.bind(this), 7000);
          } else {
            clearTimeout(showNotFoundTimeout);
          }
        }.bind(this));
      },
      routes: [
        {
          route: '/',
          title: 'footwork.js',
          controller: function($routeParams) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'index-page', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/get-started',
          title: 'Get Started - footwork.js',
          controller: function($routeParams) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'get-started-page', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/tutorials/TodoMVC/creatingApplication',
          title: 'Footworkjs - Tutorials - TodoMVC - Creating the Application',
          controller: function($routeParams) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'todomvc-creating-page', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/tutorials/TodoMVC/routing',
          title: 'Footworkjs - Tutorials - TodoMVC - Routing',
          controller: function($routeParams) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'todomvc-routing-page', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/tutorials/TodoMVC/generalFunctionality',
          title: 'Footworkjs - Tutorials - TodoMVC - General Functionality',
          controller: function($routeParams) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'todomvc-general-page', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/about',
          title: 'About - footwork.js',
          controller: function($routeParams) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'about-page', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/docs/list',
          title: 'Documentation - footwork.js',
          controller: function(params) {
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', 'docs', { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }, {
          route: '/docs/:docVersion/:page',
          title: 'Documentation - footwork.js',
          controller: function(docVersion, page) {
            var viewName = getViewName(docVersion, page);
            if(!selectedDocsVersion()) {
              selectedDocsVersion(docVersion);
            }
            if(!fw.components.locationIsRegistered(viewName)) {
              fw.components.registerLocation(viewName, {
                viewModel: '/scripts/app/viewModel/DocPage.js',
                template: '/docs/' + docVersion + '/' + page
              });
            }
            var showLoadedPage = _.bind(resolvePage, this, getPageLoadPromise());
            this.outlet('mainContent', viewName, { onComplete: showLoadedPage, onFailure: showNotFoundPage });
          }
        }
      ],
      unknownRoute: {
        title: '404 not found',
        controller: showNotFoundPage
      }
    });
  }
);
