define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var baseDir = '/demo/intro';

    return {
      title: 'Introductory Demo',
      explanation: 'Play around with the demo code below to get a quick feel for how footwork operates...',
      resources: {
        mainHTML: {
          index: 1,
          type: 'html',
          label: 'main.html',
          location: baseDir + '/main.html'
        },
        mainJS: {
          index: 2,
          type: 'javascript',
          label: 'main.js',
          location: baseDir + '/main.js'
        }
      },
      runDemo: function(container, resources) {
        var contactListVM; eval('contactListVM = ' + resources.contactListVM);
        var MainVM; eval('MainVM = ' + resources.mainJS);
        var MainHTML = resources.mainHTML;

        container.innerHTML = MainHTML;
        fw.applyBindings(new MainVM(), container);
      }
    };
  }
);
