fw.viewModel({
  namespace: 'MessagesViewModel',
  autoRegister: true,
  initialize: function() {
    this.messages = fw.observable().receiveFrom('PersonViewModel', 'messages');
  }
});
