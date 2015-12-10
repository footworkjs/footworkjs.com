define(["footwork"],
  function(fw) {
    // Return the created viewModel and tell footwork to register it using the namespace name
    return fw.viewModel.create({
      namespace: 'MyViewModel',
      autoRegister: true,
      initialize: function() {
        // Create an observable value on the viewModel which is bound against in the DOM
        this.something = fw.observable('world');
      }
    });
  }
);
