fw.viewModel({
  autoRegister: true,
  namespace: 'MainViewModel',
  initialize: function() {
    this.value = fw.observable('SUCCESS!');
  }
});
