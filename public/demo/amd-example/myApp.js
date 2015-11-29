require.config({
  baseUrl: '/',
  paths: {
    "footwork": "bower_components/footwork/dist/footwork-all",
  }
});

require([ "footwork" ],
  function(fw) {
    // ...

    fw.start();
  }
);
