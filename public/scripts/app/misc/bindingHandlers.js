define(["jquery", "lodash", "knockout", "postal" ],
  function( $, _, fw, postal ) {
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
