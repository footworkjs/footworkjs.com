define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return fw.viewModel({
      namespace: 'SearchResult',
      afterBinding: function(element) {
        this.topOffset($(element).children('.api-search-result').position().top - 5);
      },
      initialize: function(params) {
        _.extend(this, params.data);
        this.topOffset = fw.observable(undefined);

        var lastStep = _.last(this.path);
        this.path = _.reduce(this.path, function(path, stepLabel, index) {
          path.push({
            label: stepLabel,
            isLast: lastStep === stepLabel
          });
          return path;
        }, []);
      }
    });
  }
);
