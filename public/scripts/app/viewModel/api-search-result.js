define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var $router = fw.namespace('MainRouter');
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');

    return fw.viewModel({
      namespace: 'SearchResult',
      afterBinding: function(element) {
        this.topOffset($(element).children('.api-search-result').position().top - 5);
      },
      initialize: function(params) {
        _.extend(this, params.data);

        this.active = fw.observable(this.isFirst);
        this.topOffset = fw.observable(undefined);

        var lastStep = _.last(this.path);
        this.path = _.reduce(this.path, function(path, stepLabel, index) {
          path.push({
            label: stepLabel,
            isLast: lastStep === stepLabel
          });
          return path;
        }, []);

        this.makeActive = function() {
          this.$namespace.command('makeInactive');
          this.active(true);
          return true;
        };

        this.goToResult = function(event, url) {
          var currentPage = _.last($router.request('urlParts').path.split('/'));
          var myPage = new RegExp('\/docs\/' + selectedDocsVersion().replace(/\./g,'\\.') + '\/' + currentPage + '#');

          if(!url.match(myPage)) {
            event.preventDefault();
            return true;
          }

          return false;
        };

        this.$namespace.command.handler('makeInactive', function() {
          this.active(false);
        }.bind(this));
      }
    });
  }
);
