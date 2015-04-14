define(['footwork', 'jquery', 'lodash'],
  function(fw, $, _) {
    var profileLabelMap = {
      'all': 'All',
      'all-history': 'All + History.js',
      'min': 'Minimal',
      'minimal': 'Minimal',
      'bare': 'Bare',
      'bare-jquery': 'Bare (jQuery)',
      'bare-reqwest': 'Bare (reqwest)'
    };

    return fw.viewModel({
      namespace: 'DownloadBox',
      initialize: function() {
        this.environment = fw.observable('production');
        this.environments = [
          { label: 'Production', value: 'production' },
          { label: 'Development', value: 'development' }
        ];

        this.releases = fw.observable(window.releaseList);
        if(!this.releases()) {
          $.getJSON('/release/list')
            .done(function(releaseList) {
              this.releases(releaseList);
            }.bind(this));
        }

        this.buildVersion = fw.observable();
        this.buildVersions = fw.computed(function() {
          return _.keys(this.releases() || []);
        }, this);
        this.buildVersions.subscribe(function(versions) {
          if(!this.buildVersion()) {
            this.buildVersion(_.first(versions));
          }
        }, this);

        this.buildProfile = fw.observable();
        this.buildProfiles = fw.computed(function() {
          var buildVersion = this.buildVersion();
          var releases = this.releases();
          this.buildProfile(undefined);
          if(buildVersion) {
            return _.map(releases[buildVersion].profileList, function(profileName) {
              return { value: profileName, label: profileLabelMap[profileName] || profileName };
            });
          }
          return [];
        }, this);
        this.buildProfiles.subscribe(function(profiles) {
          if(!this.buildProfile()) {
            this.buildProfile(_.first(profiles).value);
          }
        }, this);

        this.buildSize = fw.computed(function() {
          var size = '- kb';
          var releases = this.releases();
          var buildVersion = this.buildVersion();
          var buildProfile = this.buildProfile();
          var environment = this.environment();
          var envPostfix = (environment === 'production' ? '.min' : '');

          if(buildVersion && buildProfile && environment) {
            var release = releases[buildVersion];
            _.each(releases[buildVersion].builds, function(buildInfo) {
              if(buildInfo.build.match('footwork-' + buildProfile + envPostfix + '.js')) {
                size = (environment === 'production' ? buildInfo.gzFilesize : buildInfo.filesize);
              }
            });
          }

          return size;
        }, this);

        this.buildURL = fw.computed(function() {
          return "/release/" + this.buildVersion() + "/download/footwork-" + this.buildProfile() + (this.environment() === 'production' ? '.min' : '') + ".js";
        }, this);
        this.buildLabel = fw.computed(function() {
          return 'footwork-' + this.buildProfile() + (this.environment() === 'production' ? '.min' : '') + '.js';
        }, this);
        this.buildType = fw.computed(function() {
          if(this.environment() === 'production') {
            return 'min + gzip';
          }
          return 'uncompressed';
        }, this);

        this.dependenciesNeeded = fw.computed(function() {
          var dependencies = [];

          var releases = this.releases();
          var buildVersion = this.buildVersion();
          var buildProfile = this.buildProfile();
          var environment = this.environment();

          if(releases && buildVersion && buildProfile && environment) {
            var build = _.find(releases[buildVersion].builds, function(buildInfo) {
              return buildInfo.build.match(/^footwork-([a-z-]+)(\.min){0,1}\.js$/)[1] === buildProfile;
            });
            if(build) {
              dependencies = build.dependencies.required;
            }
          }

          return _.map(dependencies, function(dependency) {
            return _.extend({ title: '', note: '' }, dependency);
          });
        }, this);
        this.hasDependencies = fw.computed(function() { return this.dependenciesNeeded().length > 0; }, this);

        this.optionalDependencies = fw.computed(function() {
          var dependencies = [];

          var releases = this.releases();
          var buildVersion = this.buildVersion();
          var buildProfile = this.buildProfile();
          var environment = this.environment();

          if(releases && buildVersion && buildProfile && environment) {
            var build = _.find(releases[buildVersion].builds, function(buildInfo) {
              return buildInfo.build.match(/^footwork-([a-z-]+)(\.min){0,1}\.js$/)[1] === buildProfile;
            });
            if(build) {
              dependencies = build.dependencies.optional;
            }
          }

          return _.map(dependencies, function(dependency) {
            return _.extend({ title: '', note: '' }, dependency);
          });
        }, this);
        this.hasOptionalDependencies = fw.computed(function() { return this.optionalDependencies().length > 0; }, this);

        this.buildDescription = fw.computed(function() {
          if(this.hasDependencies()) {
            return 'This build requires the following dependencies:';
          }
          return 'This build requires no external dependencies.';
        }, this);
      }
    });
  }
);
