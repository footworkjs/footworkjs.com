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
        var outputContainer = element.querySelector('.output > .content');
        var deps = {};

        require([demoSrc + '/run.js'], function(demo) {
          var resourceDefs = _.extend({
            mainJS: { type: 'script', location: demoSrc + '/main.js' },
            mainHTML: { type: 'template', location: demoSrc + '/main.html' }
          }, demo.resources);

          // Turn our resource definition list into a require deps array (and generate the dependencyList to re-map later on)
          var dependencyList = [];
          var dependencies = _.reduce(resourceDefs || {}, function(resourceList, resourceDef, resourceName) {
            var prefix = 'text!';
            resourceList.push(prefix + resourceDef.location);
            dependencyList.push({ name: resourceName, type: resourceDef.type });
            return resourceList;
          }, []);

          require(dependencies, function() {
            var resolvedDependencies = arguments;

            // create hash-map of the resolved dependencies using the dependencyList
            _.each(dependencyList, function(dep, indexNum) {
              deps[dep.name] = resolvedDependencies[indexNum];
            });

            (codeDemo.runDemo = function() {
              // first we need to clean out the container
              fw.cleanNode(outputContainer);
              while (outputContainer.firstChild) {
                outputContainer.removeChild(outputContainer.firstChild);
              }

              // now run the demo code
              demo.runDemo.apply(codeDemo, [outputContainer].concat(deps));
            })();
            // demo.runDemo.bind(codeDemo, element.querySelector('.output > .content'), deps);
          });
          console.info('dependencies', dependencies);
        })
      },
      initialize: function(params) {
        this.runDemo = function noop() {};

        this.demoTitle = fw.observable('Demo');
      }
    });
  }
);
