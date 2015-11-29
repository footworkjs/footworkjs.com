// Create the viewModel and tell footwork to register it using the namespace name
fw.viewModel.create({
  namespace: 'MyViewModel',
  autoRegister: true,
  initialize: function() {
    // Create an observable value on the viewModel which is bound against in the DOM
    this.someVariable = fw.observable('someValue');
  }
});

// Tell Footwork to start (begin processing bindings on the DOM, which 'starts' the app)
fw.start();
