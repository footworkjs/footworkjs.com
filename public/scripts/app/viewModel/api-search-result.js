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
        this.currentAPIResultSelection = fw.observable().receiveFrom('apiSearch', 'currentAPIResultSelection');

        this.$apiSearch = fw.namespace('apiSearch');
        this.active = fw.observable(this.index === this.currentAPIResultSelection());
        this.topOffset = fw.observable(undefined);
        this.isActive = fw.computed(function() {
          return this.active() || this.currentAPIResultSelection() === this.index;
        }, this);

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
          this.currentAPIResultSelection(undefined);
          this.active(true);
          return true;
        };

        this.goToResult = function(event, url) {
          var currentPage = _.last($router.request('urlParts').path.split('/'));
          var myPage = new RegExp('\/docs\/' + selectedDocsVersion().replace(/\./g,'\\.') + '\/' + currentPage + '#');
          this.$apiSearch.command('close');

          if(!url.match(myPage) && event.which !== 2) {
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
