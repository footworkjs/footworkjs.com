fw.viewModel({
  namespace: 'Message',
  initialize: function(params) {
    // Create a convenient reference to the message object passed in
    var thisMessage = params.message;

    // Extract the 'message' and 'from' values from the passed in message
    this.message = fw.observable(thisMessage.message);
    this.from = fw.observable(thisMessage.from);

    // Create a Person namespace channel we will use to send commands with
    this.PersonNS = fw.namespace('Person');

    // Click-bound callback which sends the command to remove this message
    this.remove = function() {
      this.PersonNS.command('removeMessage', thisMessage);
    };
  }
});
