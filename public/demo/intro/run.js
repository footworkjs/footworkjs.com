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
          label: 'PersonViewModel.js',
          location: baseDir + '/main.js'
        },
        messagesVM: {
          index: 3,
          type: 'javascript',
          label: 'MessagesViewModel.js',
          location: baseDir + '/MessagesViewModel.js'
        }
      },
      runDemo: function(container, resources) {
        var messagesVM; eval('messagesVM = ' + resources.messagesVM);
        var MainVM; eval('MainVM = ' + resources.mainJS);
        var MainHTML = resources.mainHTML;

        container.innerHTML = MainHTML;
        fw.applyBindings(new MainVM(), container);
      }
    };
  }
);
