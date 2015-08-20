define([ "footwork", "lodash", "jquery", "jwerty" ],
  function( fw, _, $, jwerty ) {
    var $router = fw.namespace('MainRouter');
    var $searchResult = fw.namespace('SearchResult');
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');

    jwerty.key('enter', function(event, key) {
      $searchResult.command('goToResult');
    });

    return fw.viewModel({
      namespace: 'SearchResult',
      afterBinding: function(element) {
        var $element = $(element).children('.api-search-result');
        this.topOffset($element.position().top - 5);
        this.$link = $element;
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

        this.$namespace.command.handler('goToResult', function() {
          if(this.isActive()) {
            this.$link[0].click();
          }
        }.bind(this));
      }
    });
  }
);
