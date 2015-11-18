fw.viewModel.create({
  namespace: 'Person',
  initialize: function() {
    // Create a reference for 'this' to use inside the viewModel
    var Person = this;

    // Form input values
    Person.firstName = fw.observable('Dark');
    Person.lastName = fw.observable('Helmet');
    Person.message = fw.observable('I see your schwartz is as big as mine...');

    // The observableArray which will contain the list of messages
    Person.messages = fw.observableArray();

    // Create a computed value that is based on first and last name
    Person.name = fw.computed(function() {
      // Must use 'this' in a computed for dependency tracking to work
      return this.firstName() + ' ' + this.lastName();
    }, Person);

    // Form submit callback that adds a message to the messages list
    Person.addMessage = function() {
      Person.messages.push({
        message: Person.message(),
        from: Person.name()
      });
    };

    // Create a command handler for removing a message
    Person.$namespace.command.handler('removeMessage', function(message) {
      Person.messages.remove(message);
    });
  }
});
