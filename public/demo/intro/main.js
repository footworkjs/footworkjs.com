fw.viewModel({
  namespace: 'Person',
  initialize: function() {
    // Form input values
    this.firstName = fw.observable('Bruce');
    this.lastName = fw.observable('Wayne');
    this.message = fw.observable('Hello');

    // Computed value automatically updated based on first and last name
    this.name = fw.computed(function() {
      return this.firstName() + ' ' + this.lastName();
    }, this);

    // List of messages which is broadcast to any listeners
    this.messages = fw.observableArray().broadcastAs('messages');

    // Button click binding that adds a message to the messages list
    this.addMessage = function() {
      this.messages.push(this.message() + ' &#8594; ' + this.name());
    };
  }
});
