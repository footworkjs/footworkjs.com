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
        this.$link = $(element).children('.api-search-result');
        setTimeout(function() {
          this.height(this.$link.outerHeight());
          this.topOffset(this.$link.position().top);
          this.bottomOffset(this.topOffset() + this.height());
        }.bind(this), 20);
      },
      initialize: function(params) {
        _.extend(this, params.data);
        this.currentAPIResultSelection = fw.observable().receiveFrom('apiSearch', 'currentAPIResultSelection');

        this.$apiSearch = fw.namespace('apiSearch');
        this.active = fw.observable(this.index === 0);
        this.topOffset = fw.observable(undefined);
        this.bottomOffset = fw.observable(undefined);
        this.height = fw.observable(undefined);

        this.hasKeyboardFocus = fw.computed(function() {
          return this.currentAPIResultSelection() === this.index;
        }, this);

        this.isActive = fw.computed(function() {
          return this.active() || this.hasKeyboardFocus();
        }, this);

        this.hasKeyboardFocus.subscribe(function(hasKeyboardFocus) {
          if(hasKeyboardFocus) {
            this.$apiSearch.command('scrollWithin', {
              top: (this.index === 0 ? 0 : this.topOffset()),
              bottom: this.bottomOffset(),
              height: this.height()
            });
          }
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
