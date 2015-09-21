define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var baseDir = '/demo/intro';

    return {
      resources: {
        mainJS: {
          type: 'javascript',
          label: 'main.js',
          location: baseDir + '/main.js'
        },
        mainHTML: {
          type: 'html',
          label: 'main.html',
          location: baseDir + '/main.html'
        }
      },
      runDemo: function(container, resources) {
        var MainVM; eval('MainVM = ' + resources.mainJS);
        var MainHTML = resources.mainHTML;
        var contactListVM; eval('contactListVM = ' + resources.contactListVM);

        container.innerHTML = MainHTML;
        var main = new MainVM();
        fw.applyBindings(main, container);
      }
    };
  }
);
