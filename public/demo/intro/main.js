fw.viewModel({
  namespace: 'Person',
  initialize: function() {
    // Create a reference for 'this' to use within the viewModel
    var Person = this;

    // Form input values
    this.firstName = fw.observable('Dark');
    this.lastName = fw.observable('Helmet');
    this.message = fw.observable('I see your schwartz is as big as mine...');

    // The observableArray which will contain the list of messages
    this.messages = fw.observableArray();

    // Create a computed value that is based on first and last name
    this.name = fw.computed(function() {
      return this.firstName() + ' ' + this.lastName();
    }, this);

    // Form submit callback that adds a message to the messages list
    this.addMessage = function() {
      this.messages.push({
        message: this.message(),
        from: this.name()
      });
    };

    // Create a command handler for removing a message
    this.$namespace.command.handler('removeMessage', function(message) {
      Person.messages.remove(message);
    });
  }
});
