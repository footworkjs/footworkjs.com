define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    return fw.viewModel.create({
      namespace: 'Contributors',
      initialize: function() {
        $.getJSON('/bower_components/footwork/package.json')
          .done(function(pkg) {
            if( _.isArray(pkg.contributors) ) {
              this.contributors( _.map(pkg.contributors, function(contributor) {
                contributor.contribution = contributor.contribution.join(', ');
                return contributor;
              }) );
            }
          }.bind(this));
        this.contributors = fw.observableArray();
      }
    });
  }
);
