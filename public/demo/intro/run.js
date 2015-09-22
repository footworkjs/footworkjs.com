define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var baseDir = '/demo/intro';

    return {
      className: 'intro',
      title: 'Footwork.js at a glance...',
      explanation: 'Please take a moment to play around with the demo below and get a quick feel for a few of footworks features. Remember though this barely scratches the surface, there are a lot of useful and novel features in footwork...check it out!',
      resources: {
        mainHTML: {
          index: 1,
          type: 'html',
          label: 'index.html',
          location: baseDir + '/main.html'
        },
        mainJS: {
          index: 2,
          type: 'javascript',
          label: 'Person.js',
          location: baseDir + '/main.js'
        },
        messageHTML: {
          index: 3,
          type: 'html',
          label: 'message.html',
          location: baseDir + '/message.html'
        },
        messageVM: {
          index: 4,
          type: 'javascript',
          label: 'message.js',
          location: baseDir + '/message.js'
        },
      },
      runDemo: function(container, resources) {
        var CodeDemo = this;
        var showDemoMessage = function(message) {
          CodeDemo.consoleLog.push(message);
        };

        var mainHTML = resources.mainHTML;
        var personVM; eval('personVM = ' + resources.mainJS);
        var messageVM; eval('messageVM = ' + resources.messageVM);
        var messageHTML = resources.messageHTML;

        fw.viewModels.register('Person', personVM);

        fw.components.unregister('message');
        fw.components.register('message', {
          viewModel: messageVM,
          template: messageHTML
        });

        container.innerHTML = mainHTML;
        fw.start(container);
      }
    };
  }
);
