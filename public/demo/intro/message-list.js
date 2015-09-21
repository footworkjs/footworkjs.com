fw.viewModel({
  namespace: 'messagesList',
  initialize: function() {
    // Automatically receive the messages from the PersonViewModel
    this.messages = fw.observable().receiveFrom('Person', 'messages');
  }
});
