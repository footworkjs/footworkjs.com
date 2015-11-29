define([ "footwork", "lodash", "jquery" ],
  function(fw, _, $) {
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
        editor.setTheme("ace/theme/tomorrow_night");
        editor.getSession().setMode("ace/mode/" + syntax);
        editor.getSession().setOptions({
          tabSize: 2,
          useSoftTabs: true
        });

        if(_.result(params, 'readOnly')) {
          editor.keyBinding.addKeyboardHandler({
            handleKeyboard : function(data, hash, keyString, keyCode, event) {
              return { command: "null", passEvent: false };
            }
          });
        }

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

    return fw.viewModel.create({
      namespace: 'CodeDemo',
      autoIncrement: true,
      afterRender: function(element) {
        var CodeDemo = this;
        var demoSrc = element.getAttribute('src');
        var outputContainer = element.querySelector('.output > .content');
        var deps = {};

        this.$namespace.subscribe('change', function(changeDef) {
          var resourceName = changeDef.name;
          var resourceValue = changeDef.value;
          deps[resourceName].content = resourceValue;
          CodeDemo.changed(true);
        });

        require([demoSrc + '/run.js'], function(demo) {
          !CodeDemo.explanation() && CodeDemo.explanation(demo.explanation);
          CodeDemo.className(demo.className);

          var resourceDefs = _.extend({}, demo.resources);

          // Turn our resource definition list into a require deps array (and generate the dependencyList to re-map later on)
          var dependencyList = [];
          var dependencies = _.reduce(resourceDefs || {}, function(resourceList, resourceDef, resourceName) {
            var prefix = 'text!';
            resourceList.push(prefix + demoSrc + '/' + resourceDef.file);
            dependencyList.push({ name: resourceName, label: resourceDef.label || resourceDef.file, index: resourceDef.index, type: resourceDef.type });
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
              CodeDemo.$namespace.subscribe('show', function(depName) {
                resource.active(false);
              });

              var resource = {
                name: depName,
                label: depResource.label,
                type: depResource.type,
                source: depResource.content,
                index: depResource.index,
                parentNS: CodeDemo.$namespace,
                selectResource: function() {
                  CodeDemo.$namespace.publish('show', depName);
                  this.active(true);
                },
                active: fw.observable(false)
              };

              CodeDemo.resources.push(resource);
            });

            // pre-select/show the first resource if available
            var firstResource = CodeDemo.resources()[0];
            if(firstResource && _.isFunction(firstResource.selectResource)) {
              firstResource.selectResource();
            }

            CodeDemo.runDemo = function() {
              CodeDemo.consoleLog.removeAll();

              // first we need to clean out the container
              fw.cleanNode(outputContainer);
              while (outputContainer.firstChild) {
                outputContainer.removeChild(outputContainer.firstChild);
              }

              // now run the demo code
              CodeDemo.hasError(false);
              try {
                CodeDemo.runningCode(true);
                demo.runDemo.call(CodeDemo, outputContainer,
                  _.reduce(deps, function(depsHash, dep, depName) {
                    depsHash[depName] = dep.content;
                    return depsHash;
                  }, {}),
                  function demoLog() {
                    var messageText = '';
                    _.each(arguments, function(message) {
                      if(message) {
                        messageText = messageText + (messageText.length ? ' ' : '') + message;
                      }
                    });
                    messageText.length && CodeDemo.consoleLog.push(messageText);
                  });
              } catch(error) {
                CodeDemo.hasError(true);
                console.error(error);
              }

              CodeDemo.changed(false);
            };

            var hasRunDemo = false;
            if(!CodeDemo.collapsed()) {
              if(!CodeDemo.resourceOnly()) {
                CodeDemo.runDemo();
              } else {
                CodeDemo.resourceSub = CodeDemo.resourceOnly.subscribe(function(isResourceOnly) {
                  if(!hasRunDemo && !isResourceOnly) {
                    hasRunDemo = true;
                    CodeDemo.runDemo();
                  }
                });
              }
            }
          });
        });
      },
      initialize: function(params) {
        var CodeDemo = this;
        function noop() {};

        this.runDemo = noop;

        this.collapsed = fw.observable(params.collapsed || false);
        this.openEditor = function() {
          this.collapsed(false);
        };
        this.collapsed.subscribe(function(isCollapsed) {
          if(!isCollapsed) {
            CodeDemo.runDemo();
          }
        });

        this.demoTitle = fw.observable(params.title || 'Live Demo');
        this.runningCode = fw.observable().extend({ autoDisable: 50 });
        this.className = fw.observable();
        this.hasError = fw.observable(false);
        this.explanation = fw.observable(params.explanation);
        this.changed = fw.observable(false);
        this.resourceOnly = fw.observable(params.resourceOnly);
        this.canRun = fw.observable(params.canRun);
        this.noTitle = fw.observable(_.isUndefined(params.noTitle) ? false : params.noTitle);
        this.showBare = fw.observable(_.isUndefined(params.showBare) ? false : params.showBare);
        this.readOnly = fw.observable(_.isUndefined(params.readOnly) ? false : params.readOnly);
        this.editorHeight = fw.observable(_.isUndefined(params.editorHeight) ? undefined : params.editorHeight + 'px');

        this.openRunner = function() {
          CodeDemo.resourceOnly(false);
        };

        this.resources = fw.observableArray();

        if(_.isUndefined(params.demoTitle)) {
          params.outputTitle = 'Output Area';
        }

        this.outputTitle = fw.observable(params.outputTitle);
        this.consoleLog = fw.observableArray();
      }
    });
  }
);
