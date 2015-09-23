define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return {
      className: 'intro',
      // explanation: 'Please take a moment to play around with the demo below and get a quick feel for a few of footworks features. Remember though this barely scratches the surface, there are a lot of useful and novel features in footwork...check it out!',
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
