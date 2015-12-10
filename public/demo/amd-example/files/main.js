require.config({
  paths: {
    "footwork": "js/footwork-all"
  }
});

require(["footwork"],
  function(fw) {
    // Tell Footwork it can load MyViewModel from js/MyViewModel.js when it is needed
    fw.viewModel.registerLocation('MyViewModel', 'js/');

    // Tell Footwork to begin processing bindings on the DOM, which 'starts' the app
    fw.start();
  }
);
