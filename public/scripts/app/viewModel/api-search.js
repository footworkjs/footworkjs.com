define([ "footwork", "lodash", "jquery" ],
  function( fw, _, $ ) {
    var minQueryLength = 2;
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');
    var searchTouched = fw.observable();
    var apiSearchData = fw.observable(undefined).broadcastAs({ name: 'searchData', namespace: 'apiSearchModule' });
    var isLoadingSearchData = false;

    searchTouched.subscribe(function(wasTouched) {
      if(wasTouched && _.isUndefined(apiSearchData()) && !isLoadingSearchData) {
        isLoadingSearchData = true;
        $.get('/docs/search-data/' + selectedDocsVersion())
          .done(function(response) {
            apiSearchData(response);
          });
      }
    });

    return fw.viewModel({
      namespace: 'apiSearch',
      initialize: function(params) {
        this.hasFocus = fw.observable(false).broadcastAs('hasFocus');
        this.query = fw.observable();
        this.queryString = fw.observable();
        this.searchData = fw.observable().receiveFrom('apiSearchModule', 'searchData');

        this.touch = function() {
          searchTouched(true);
        };

        this.hasFocus.subscribe(this.touch);

        var computeSearchResultsTimeout;
        this.query.subscribe(function(query) {
          clearTimeout(computeSearchResultsTimeout);

          if(_.isString(query) && query.length > minQueryLength) {
            computeSearchResultsTimeout = setTimeout(function() {
              this.queryString(query);
            }.bind(this), 400);
          } else {
            this.queryString(undefined);
          }
        }.bind(this));
        this.hasQueryString = fw.computed(function() {
          var queryString = this.queryString();
          return _.isString(queryString) && queryString.length > 0;
        }, this);

        this.searchResultsVisible = fw.observable(false);
        this.searchResultsVisibleEval = fw.computed(function() {
          var query = this.query();
          var searchData = this.searchData();
          var hasFocus = this.hasFocus();
          if(hasFocus && _.isString(query) && query.length > minQueryLength && !_.isUndefined(searchData)) {
            this.searchResultsVisible(true);
          } else {
            if(hasFocus) {
              this.searchResultsVisible(false);
            }
          }
        }, this);

        this.close = function() {
          this.searchResultsVisible(false);
        }.bind(this);

        this.$globalNamespace.subscribe('clear', this.close);
        this.$namespace.command.handler('close', this.close);
      }
    });
  }
);
