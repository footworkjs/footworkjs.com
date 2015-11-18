fw.viewModel.create({
  namespace: 'Message',
  initialize: function(params) {
    // Create a reference for 'this' to use inside the viewModel
    var Message = this;

    // Create a reference to the message object passed in
    var thisMessage = params.message;

    /**
     * Extract the 'message' and 'from' values from the passed-in message data.
     * Note: No creation of a fw.observable() for these values because they
     *       never need to update, they are read only once when the markup is
     *       bound to the instance (therefore we can use primitives).
     */
    Message.message = thisMessage.message;
    Message.from = thisMessage.from;

    // Create a Person namespace channel we will use to send commands with
    Message.PersonNS = fw.namespace('Person');

    // Click-bound callback which sends the command to remove this message
    Message.remove = function() {
      // Tell the Person instance to remove thisMessage
      Message.PersonNS.command('removeMessage', thisMessage);
    };
  }
});
