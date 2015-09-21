typeof REQUIRECONFIG === 'object' && require.config(REQUIRECONFIG);

require([
  "jquery", "lodash", "footwork", "jwerty", "resourceHelper",
  "Page", "ViewPort",
  "koBindings", "koExtenders", "jquery.easing" ],
  function(
      $, _, fw, jwerty, resourceHelper,
      Page, ViewPort ) {

    resourceHelper({
      rootViewModelPath: '/scripts/app/viewModel/',
      rootTemplatePath: '/scripts/app/template/'
    });

    if( window.isCrappyBrowser === true ) {
      return false;
    }
    window.fw = fw;

    var $window = $(window);
    var $document = $(document);
    var $body = $('body');
    var globalNamespace = fw.namespace();
    var layoutControlNamespace = fw.namespace('LayoutControl');
    var navigationNamespace = fw.namespace('Navigation');
    var configurationNamespace = fw.namespace('Configuration');
    var layoutNamespace = fw.namespace('Layout');
    var apiSearchFocused = fw.observable().receiveFrom('apiSearch', 'hasFocus');
    var pageHashURL = fw.observable().receiveFrom('Page', 'hashURL');
    var bodyHeight = fw.observable().receiveFrom('Layout', 'height');
    var scrollPosition = fw.observable().receiveFrom('ViewPort', 'scrollPosition');
    var viewPortDim = fw.observable().receiveFrom('ViewPort', 'dimensions');
    var configVisible = fw.observable().receiveFrom('Configuration', 'visible');
    var paneContentMaxHeight = fw.observable().receiveFrom('Pane', 'contentMaxHeight');
    var paneScrolling = fw.observable().receiveFrom('Pane', 'scrolling');
    var viewPortLayoutMode = fw.observable().receiveFrom('ViewPort', 'layoutMode');
    var refreshDocSize;

    var selectedDocsVersion = fw.observable().broadcastAs({ name: 'selectedDocsVersion', namespace: 'navData', writable: true });

    (new ViewPort());
    (new Page());

    if( Modernizr.touch === true ) {
      require( ['PaneTouchManager'], function(PaneTouchManager) {
        (new PaneTouchManager());
      });
    }

    fw.start();

    $window.scroll( function() {
      var position = $document.scrollTop();
      scrollPosition(position);
    }).resize( function() {
      viewPortDim({ width: $window.width(), height: $window.height() });
    }).on('mouseup', function() {
      layoutControlNamespace.publish('disableControl');
    }).on('hashchange', function() {
      pageHashURL(location.hash);
    }).trigger('scroll').trigger('resize');

    globalNamespace.subscribe('refreshDocSize', refreshDocSize = function() {
      bodyHeight( $document.height() );
    }).context(this);
    refreshDocSize();

    globalNamespace.subscribe( 'enableControl', function( controlHandler ) {
      $window.on( 'mousemove', controlHandler );
    });
    globalNamespace.subscribe( 'disableControl', function( controlHandler ) {
      $window.unbind( 'mousemove', controlHandler );
    });

    _.each({
      'alt+r': function() { viewPortLayoutMode() !== 'mobile' && configurationNamespace.publish('reset'); },
      // Shortcuts disabled because of live ace-editors conflicting
      // 'ctrl+x': function() {
      //   if(!apiSearchFocused()) {
      //     navigationNamespace.publish('toggleHeader');
      //   }
      // },
      // 'ctrl+z': function() {
      //   if(!apiSearchFocused()) {
      //     layoutNamespace.publish('togglePane');
      //   }
      // },
      'esc': function() { globalNamespace.publish('clear'); configVisible( false ); }
    }, function(handler, keyCombo) {
      jwerty.key( keyCombo, handler );
    });

    $body.on('keydown', 'article', function(event) {
      event.stopPropagation();
    });
  }
);
