define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var baseDir = '/demo/intro';

    return {
      className: 'intro',
      title: 'Introductory Demo',
      explanation: 'Play around with the demo code below to get a quick feel for how footwork operates...',
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
        messageListHTML: {
          index: 3,
          type: 'html',
          label: 'message-list.html',
          location: baseDir + '/message-list.html'
        },
        messageListVM: {
          index: 4,
          type: 'javascript',
          label: 'message-list.js',
          location: baseDir + '/message-list.js'
        }
      },
      runDemo: function(container, resources) {
        var personVM; eval('personVM = ' + resources.mainJS);
        var messageListVM; eval('messageListVM = ' + resources.messageListVM);

        fw.viewModels.register('Person', personVM);

        fw.components.register('message-list', {
          viewModel: messageListVM,
          template: resources.messageListHTML
        });

        container.innerHTML = resources.mainHTML;
        fw.start(container);
      }
    };
  }
);
