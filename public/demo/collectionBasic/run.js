define(["footwork"],
  function(fw) {
    return {
      resources: {
        collectionExample: {
          type: 'javascript',
          file: 'collection-example.js'
        },
      },
      runDemo: function(outputContainer, resources, demoLog) {
        eval(resources.collectionExample);
      }
    };
  }
);
