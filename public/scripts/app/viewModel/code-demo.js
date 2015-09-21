define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var demoCodeEditorNS = fw.namespace('demoCodeEditor');

    fw.bindingHandlers['demoCodeEditor'] = {
      init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var demoCodeEditor = fw.namespace('demoCodeEditor');
        var $element = $(element);
        var params = valueAccessor();
        var name = params.name;
        var parentNS = params.parentNS;
        var source = params.source || '';
        var syntax = params.type || element.getAttribute('data-syntax') || 'javascript';

        var editor = ace.edit(element);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/" + syntax);
        editor.getSession().setOptions({
          tabSize: 2,
          useSoftTabs: true
        });
        editor.setValue(source);
        editor.gotoLine(1);
        editor.on('change', function() {
          parentNS.publish('change', {
            name: name,
            value: editor.getValue()
          });
        })

        var showSub = parentNS.subscribe('show', function(editorName) {
          if(editorName === name) {
            $element.addClass('active');
          } else {
            $element.removeClass('active');
          }
        })

        fw.utils.domNodeDisposal.addDisposeCallback(element, function() {
          editor.destroy();
          parentNS.unsubscribe(showSub);
        });
      }
    };

    return fw.viewModel({
      namespace: 'codeDemo',
      autoIncrement: true,
      afterBinding: function(element) {
        var codeDemo = this;
        var demoSrc = element.getAttribute('src');
        var outputContainer = element.querySelector('.output > .content');
        var deps = {};

        this.$namespace.subscribe('change', function(changeDef) {
          var resourceName = changeDef.name;
          var resourceValue = changeDef.value;
          deps[resourceName].content = resourceValue;
          codeDemo.changed(true);
        });

        require([demoSrc + '/run.js'], function(demo) {
          codeDemo.demoTitle(demo.title || 'Code Demo');
          codeDemo.explanation(demo.explanation);
          codeDemo.className(demo.className);

          var resourceDefs = _.extend({
            mainJS: { type: 'javascript', location: demoSrc + '/main.js' },
            mainHTML: { type: 'html', location: demoSrc + '/main.html' }
          }, demo.resources);

          // Turn our resource definition list into a require deps array (and generate the dependencyList to re-map later on)
          var dependencyList = [];
          var dependencies = _.reduce(resourceDefs || {}, function(resourceList, resourceDef, resourceName) {
            var prefix = 'text!';
            resourceList.push(prefix + resourceDef.location);
            dependencyList.push({ name: resourceName, label: resourceDef.label || resourceName, index: resourceDef.index, type: resourceDef.type });
            return resourceList;
          }, []);

          require(dependencies, function() {
            var resolvedDependencies = arguments;

            // create hash-map of the resolved dependencies using the dependencyList
            _.each(dependencyList, function(dep, indexNum) {
              deps[dep.name] = { label: dep.label, type: dep.type, index: dep.index, content: resolvedDependencies[indexNum] };
            });

            // inject the deps list into the resources view editors
            _.each(deps, function(depResource, depName) {
              codeDemo.$namespace.subscribe('show', function(depName) {
                resource.active(false);
              });
              var resource = {
                name: depName,
                label: depResource.label,
                type: depResource.type,
                source: depResource.content,
                index: depResource.index,
                parentNS: codeDemo.$namespace,
                selectResource: function() {
                  codeDemo.$namespace.publish('show', depName);
                  this.active(true);
                },
                active: fw.observable(false)
              };

              codeDemo.resources.push(resource);
            });

            // pre-select/show the first resource if available
            var firstResource = codeDemo.resources()[0];
            if(firstResource && _.isFunction(firstResource.selectResource)) {
              firstResource.selectResource();
            }

            (codeDemo.runDemo = function() {
              // first we need to clean out the container
              fw.cleanNode(outputContainer);
              while (outputContainer.firstChild) {
                outputContainer.removeChild(outputContainer.firstChild);
              }

              // now run the demo code
              codeDemo.hasError(false);
              try {
                demo.runDemo.apply(codeDemo, [outputContainer].concat(_.reduce(deps, function(depsHash, dep, depName) {
                  depsHash[depName] = dep.content;
                  return depsHash;
                }, {})));
              } catch(error) {
                codeDemo.hasError(true);
                console.error(error);
              }

              codeDemo.changed(false);
            })();
          });
        })
      },
      initialize: function() {
        var codeDemo = this;

        this.runDemo = function noop() {};

        this.className = fw.observable();
        this.hasError = fw.observable(false);
        this.demoTitle = fw.observable('Loading ...');
        this.explanation = fw.observable();
        this.changed = fw.observable(false);
        this.resources = fw.observableArray();
        this.orderedResources = fw.computed(function() {
          return this.resources().sort(function(a, b) {
            return a.index > b.index ? 1 : -1;
          });
        }, this);
      }
    });
  }
);
