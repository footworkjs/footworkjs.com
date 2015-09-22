fw.viewModel({
  namespace: 'Message',
  initialize: function(params) {
    // Create a reference for 'this' to use inside the viewModel
    var Message = this;

    // Create a convenient reference to the message object passed in
    var thisMessage = params.message;

    // Extract the 'message' and 'from' values from the passed in message
    Message.message = fw.observable(thisMessage.message);
    Message.from = fw.observable(thisMessage.from);

    // Create a Person namespace channel we will use to send commands with
    Message.PersonNS = fw.namespace('Person');

    // Click-bound callback which sends the command to remove this message
    Message.remove = function() {
      Message.PersonNS.command('removeMessage', thisMessage);
    };
  }
});
