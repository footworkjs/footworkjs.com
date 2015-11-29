require.config({
  baseUrl: '/',
  paths: {
    "footwork": "js/footwork-all"
  }
});

require([ "footwork", "MyViewModel" ],
  function(fw) {
    // Tell Footwork that MyViewModel is located at js/MyViewModel.js
    fw.viewModel.registerLocation('MyViewModel', 'js/');

    // Tell Footwork to start (begin processing bindings on the DOM, which 'starts' the app)
    fw.start();
  }
);
