fw.viewModel({
  namespace: 'PersonViewModel',
  autoRegister: true,
  initialize: function() {
    this.firstName = fw.observable('Bruce');
    this.lastName = fw.observable('Wayne');

    this.name = fw.computed(function() {
      return this.firstName() + ' ' + this.lastName();
    }, this);

    this.messages = fw.observableArray().broadcastAs('messages');
    this.sayHello = function() {
      this.messages.push('Hello ' + this.name());
    };
  }
});
