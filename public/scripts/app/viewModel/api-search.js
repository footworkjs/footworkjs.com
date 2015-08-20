define([ "footwork", "lodash", "jquery", "jwerty" ],
  function( fw, _, $, jwerty ) {
    var minQueryLength = 2;
    var selectedDocsVersion = fw.observable().receiveFrom('navData', 'selectedDocsVersion');
    var searchTouched = fw.observable();
    var apiSearchData = fw.observable(undefined).broadcastAs({ name: 'searchData', namespace: 'apiSearchModule' });
    var isLoadingSearchData = false;
    var $apiSearch = fw.namespace('apiSearch');

    jwerty.key('↓/↑', function(event, key) {
      if(key === '↓') {
        $apiSearch.command('next-result');
      } else {
        $apiSearch.command('prev-result');
      }
    });

    function searchArrayInArray(queryArray, haystacks) {
      var found = [];
      _.each(queryArray, function(query) {
        query = query.toLowerCase();
        _.each(haystacks, function(haystack) {
          if(haystack.toLowerCase().indexOf(query) !== -1) {
            found.push(query);
          }
        });
      });
      return found;
    }

    function searchArrayInString(queryArray, string) {
      var found = [];
      string = string.toLowerCase();
      _.each(queryArray, function(query) {
        query = query.toLowerCase();
        if(string.indexOf(query) !== -1) {
          found.push(query);
        }
      });
      return found;
    }

    fw.computed(function() {
      var searchData = this.apiSearchData();
      var docsVersion = this.selectedDocsVersion();

      if(this.searchTouched()) {
        if(_.isUndefined(searchData) && !_.isUndefined(docsVersion) && !isLoadingSearchData) {
          isLoadingSearchData = true;
          $.get('/docs/search-data/' + selectedDocsVersion())
            .done(function(response) {
              apiSearchData(response);
            });
        }
      }
    }, {
      searchTouched: searchTouched,
      apiSearchData: apiSearchData,
      selectedDocsVersion: selectedDocsVersion
    });

    return fw.viewModel({
      namespace: 'apiSearch',
      afterBinding: function(element) {
        $(element).find('.results').on('mouseleave', function() {
          this.inactivateSelection();
        }.bind(this));
      },
      initialize: function(params) {
        this.$searchResult = fw.namespace('SearchResult');
        this.hasFocus = fw.observable(false).broadcastAs('hasFocus');
        this.query = fw.observable();
        this.queryString = fw.observable();
        this.searchData = fw.observable().receiveFrom('apiSearchModule', 'searchData');
        this.userTyping = fw.observable(true);

        this.touch = function() {
          searchTouched(true);
        };

        this.hasFocus.subscribe(this.touch);

        var computeSearchResultsTimeout;
        this.query.subscribe(function(query) {
          clearTimeout(computeSearchResultsTimeout);
          this.userTyping(true);

          if(_.isString(query) && query.length > minQueryLength) {
            computeSearchResultsTimeout = setTimeout(function() {
              this.queryString(query);
              this.userTyping(false);
            }.bind(this), 400);
          } else {
            this.queryString(undefined);
            this.userTyping(false);
          }
        }.bind(this));

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
          this.currentAPIResultSelection(undefined);
        }.bind(this);

        this.results = fw.computed(function computeSearchResults() {
          var queryString = this.queryString();
          var searchData = this.searchData();
          var searchResults = [];
          if(_.isString(queryString) && queryString.length > 0 && !_.isUndefined(searchData)) {
            function lookForQueryInAPi(data, query, baseUrl, path) {
              _.each(data, function(entry) {
                var entryPath = _.clone(path || []);
                entryPath.push(entry.label);

                if(!_.isUndefined(entry.references)) {
                  _.each(entry.references, function(reference) {
                    var foundTerms = _.unique([].concat(
                      searchArrayInString(query, reference.title),
                      searchArrayInString(query, reference.description),
                      searchArrayInArray(query, reference.keywords)
                    ));

                    if(foundTerms.length === query.length) {
                      searchResults.push({
                        type: 'api',
                        title: reference.title,
                        description: reference.description,
                        url: baseUrl + '#' + reference.anchor,
                        path: entryPath
                      });
                    }
                  });
                }

                if(!_.isUndefined(entry.subCategories)) {
                  lookForQueryInAPi(entry.subCategories, query, baseUrl, entryPath);
                }
              });
            }

            _.each(searchData, function(docPageData, filename) {
              var baseUrl = '/docs/' + selectedDocsVersion() + '/' + filename.slice(0, -5);
              lookForQueryInAPi(docPageData.apiReferences, queryString.split(' '), baseUrl, [ filename.slice(0, -5) ]);
            });
          }

          if(searchResults.length) {
            // sort
            // TODO

            // mark indexes
            searchResults = _.map(searchResults, function(searchResult, indexNum) {
              return _.extend(searchResult, {
                index: indexNum
              })
            }.bind(this));
          }

          return searchResults;
        }, this);

        this.currentAPIResultSelection = fw.observable(0).broadcastAs('currentAPIResultSelection', true);

        this.$namespace.command.handler('next-result', function() {
          var currentAPIResultSelection = this.currentAPIResultSelection();
          if(_.isUndefined(currentAPIResultSelection)) { currentAPIResultSelection = -1; }

          if(this.searchResultsVisible() && currentAPIResultSelection < this.results().length - 1) {
            this.$searchResult.command('makeInactive');
            currentAPIResultSelection = currentAPIResultSelection + 1;
            this.currentAPIResultSelection(currentAPIResultSelection);
          }
        }.bind(this));

        this.$namespace.command.handler('prev-result', function() {
          var currentAPIResultSelection = this.currentAPIResultSelection();
          if(_.isUndefined(currentAPIResultSelection)) { currentAPIResultSelection = 1; }

          if(this.searchResultsVisible() && currentAPIResultSelection > 0) {
            this.$searchResult.command('makeInactive');
            currentAPIResultSelection = currentAPIResultSelection - 1;
            this.currentAPIResultSelection(currentAPIResultSelection);
          }
        }.bind(this));

        this.hasResults = fw.computed(function() {
          var results = this.results();
          return _.isArray(results) && results.length > 0;
        }, this);

        this.inactivateSelection = function() {
          this.$searchResult.command('makeInactive');
          return true;
        };

        this.$globalNamespace.subscribe('clear', this.close);
        this.$namespace.command.handler('close', this.close);
      }
    });
  }
);