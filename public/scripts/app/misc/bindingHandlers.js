define(["jquery", "lodash", "footwork", "postal" ],
  function( $, _, fw, postal ) {
    var viewPortLayoutMode = fw.observable().receiveFrom('ViewPort', 'layoutMode');
    var headerHeight = fw.observable().receiveFrom('Header', 'height');
    var viewPortDimensions = fw.observable().receiveFrom('ViewPort', 'dimensions');
    var paneWidth = fw.observable().receiveFrom('Pane', 'width');
    var paneCollapsed = fw.observable().receiveFrom('Configuration', 'paneCollapsed');
    var sectionAnchors = fw.observable().receiveFrom('sectionAnchors', 'sectionAnchors');
    var $sectionAnchors = fw.namespace('sectionAnchors');

    var computeAnchorDelay;
    function computeAnchorPos() {
      clearTimeout(computeAnchorDelay);
      computeAnchorDelay = setTimeout(function() {
        $sectionAnchors.command('computePosition');
      }, 500);
    };

    this.layoutModeSub = viewPortLayoutMode.subscribe( computeAnchorPos );
    this.dimensionSub = viewPortDimensions.subscribe( computeAnchorPos );
    this.heightSub = headerHeight.subscribe( computeAnchorPos );
    this.widthSub = paneWidth.subscribe( computeAnchorPos );
    this.collapsedSub = paneCollapsed.subscribe( computeAnchorPos );

    var sectionAnchors = fw.observableArray().broadcastAs({ name: 'sectionAnchors', namespace: 'sectionAnchors' });
    fw.bindingHandlers['sectionAnchor'] = {
      init: function ( element, valueAccessor, allBindings, viewModel, bindingContext ) {
        var $element = $(element);
        var elementPosition;
        var sectionAnchorsNamespace = fw.namespace('sectionAnchors');

        function computePosition() {
          if(!_.isUndefined(elementPosition)) {
            sectionAnchors.remove(elementPosition);
          }
          elementPosition = { anchor: $element[0].getAttribute('id'), position: $element.offset().top };
          sectionAnchors.push(elementPosition);
        };

        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          sectionAnchors.remove(elementPosition);
          sectionAnchorsNamespace.dispose();
        });

        sectionAnchorsNamespace.command.handler('computePosition', computePosition);
        computePosition();
      }
    };

    fw.bindingHandlers['limitScroll'] = {
      init: function ( element, valueAccessor, allBindings, viewModel, bindingContext ) {
        var $element = $(element);
        var scrollEvents = 'mousewheel DOMMouseScroll';

        function trackScrollEvent(event) {
          if(this.scrollHeight === this.offsetHeight) {
            return true;
          }
          var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
          var direction = delta > 0 ? 'up' : 'down';
          if((direction == 'up' && this.scrollTop === 0) || (direction === 'down' && this.scrollTop === (this.scrollHeight - this.offsetHeight))) {
            event.preventDefault();
          }
        };

        $element.on(scrollEvents, trackScrollEvent);
        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          $element.off(scrollEvents, trackScrollEvent);
        });
      }
    };

    fw.bindingHandlers['autoSelect'] = fw.bindingHandlers['autoFocus'] = {
      update: function( element, valueAccessor ) {
        var shouldFocus = fw.unwrap(valueAccessor());
        if(shouldFocus) {
          console.info('should autofocus', shouldFocus);
          $(element).focus();
        }
      }
    };

    fw.bindingHandlers['hoverTrack'] = {
      init: function ( element, valueAccessor, allBindings, viewModel, bindingContext ) {
        var $element = $(element);
        var trackVar = valueAccessor();
        var enableTrackVar = function() {
          trackVar(true);
        };
        var disableTrackVar = function() {
          trackVar(false);
        };

        $element
          .on('mouseenter', enableTrackVar)
          .on('mouseleave', disableTrackVar);

        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          $element
            .off('mouseenter', enableTrackVar)
            .off('mouseleave', disableTrackVar);
        });
      }
    };

    fw.bindingHandlers['transition'] = {
      'update': function( element, valueAccessor ) {
        var transitionDefinition = fw.utils.unwrapObservable(valueAccessor());
        $(element).css({ WebkitTransition : transitionDefinition,
                             MozTransition: transitionDefinition,
                              MsTransition: transitionDefinition,
                               OTransition: transitionDefinition,
                                transition: transitionDefinition });
      }
    };

    fw.bindingHandlers['transform'] = {
      'update': function( element, valueAccessor ) {
        var transformDefinition = fw.utils.unwrapObservable(valueAccessor());
        $(element).css({ WebkitTransform : transformDefinition,
                             MozTransform: transformDefinition,
                              MsTransform: transformDefinition,
                               OTransform: transformDefinition,
                                transform: transformDefinition });
      }
    };

    // credit: http://www.knockmeout.net/
    fw.bindingHandlers['logger'] = {
      update: function( element, valueAccessor, allBindings ) {
        //store a counter with this element
        var count = fw.utils.domData.get( element, "_ko_logger" ) || 0,
        data = fw.toJS( valueAccessor() || allBindings() );

        fw.utils.domData.set(element, "_ko_logger", ++count);

        if( console && console.log ) {
          console.log(count, element, data);
        }
      }
    };

    fw.bindingHandlers['stopProp'] = {
      update: function( element ) {
        var $element = $(element);
        var stopProp = function(event) {
          event.stopPropagation();
        };

        $element.on('click', stopProp);

        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          $element.off('click', stopProp);
        });
      }
    };

    /**
     * Source: https://github.com/SteveSanderson/knockout/wiki/Bindings---class
     */
    fw.bindingHandlers['class'] = {
      'update': function( element, valueAccessor ) {
        var $element = $(element);
        if( element['__ko__previousClassValue__'] ) {
          $element.removeClass(element['__ko__previousClassValue__']);
        }
        var value = fw.utils.unwrapObservable(valueAccessor());
        typeof value !== 'undefined' && $element.addClass(value);
        element['__ko__previousClassValue__'] = value;
      }
    };

    fw.bindingHandlers['stopBinding'] = {
      init: function() {
        return { controlsDescendantBindings: true };
      }
    };
  }
);
