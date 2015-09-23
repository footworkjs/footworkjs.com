define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return {
      resources: {
        collectionExample: {
          type: 'javascript',
          file: 'collection-example.js'
        },
      },
      runDemo: function(container, resources, demoLog) {
        eval(resources.collectionExample);
      }
    };
  }
);
