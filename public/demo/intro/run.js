define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var baseDir = '/demo/intro';

    return {
      resources: {
        contactListVM: {
          type: 'script',
          location: baseDir + '/contactList.js'
        }
      },
      runDemo: function(container, resources) {
        var MainVM; eval('MainVM = ' + resources.mainJS);
        var MainHTML = resources.mainHTML;
        var contactListVM; eval('contactListVM = ' + resources.contactListVM);

        console.info('RunDemo!', container, MainVM, contactListVM, MainHTML);
        container.innerHTML = MainHTML;
        var main = new MainVM();
        fw.applyBindings(main, container);
      }
    };
  }
);
