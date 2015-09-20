define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    fw.bindingHandlers['demoCodeEditor'] = {
      init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var syntax = element.getAttribute('data-syntax') || 'javascript';

        var editor = ace.edit(element);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/" + syntax);

        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          editor.destroy();
        });
      }
    };

    return fw.viewModel({
      namespace: 'codeDemo',
      afterBinding: function(element) {
        var codeDemo = this;
        var demoSrc = element.getAttribute('src');

        require([demoSrc + '/run.js'], function(runDemo) {
          codeDemo.runDemo = runDemo.bind(runDemo, element);
        })
      },
      initialize: function(params) {
        this.runDemo = function noop() {};

        this.demoTitle = fw.observable('Demo');
      }
    });
  }
);
