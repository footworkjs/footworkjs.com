define([ "footwork" ],
  function( fw ) {
    return function resourceHelper(rootPaths) {
      fw.routers.registerLocation('SubRouter', '/scripts/routers/SubRouter.js');
      fw.routers.registerLocation('MainRouter', '/scripts/app/router.js');

      var locations = {
        viewModels: {
          root: rootPaths.rootViewModelPath,
          config: rootPaths.rootViewModelPath + 'config/',
          pane: rootPaths.rootViewModelPath + 'pane/'
        },
        templates: {
          root: rootPaths.rootTemplatePath,
          config: rootPaths.rootTemplatePath + 'config/',
          pane: rootPaths.rootTemplatePath + 'pane/'
        }
      };

      fw.viewModels.defaultLocation(locations.viewModels.root);

      fw.outlets.registerViewLocation([ 'index-page', 'tutorials-page', 'about-page', 'not-found-page', 'docs' ], '/pages/');
      fw.outlets.registerViewLocation(['todomvc-creating-page', 'todomvc-routing-page', 'todomvc-general-page'], '/pages/tutorials/');

      fw.components.registerLocation('configmanagement', {
        viewModel: locations.viewModels.config + 'ConfigManagement.js',
        template: locations.templates.config + 'configmanagement.html'
      });
      fw.components.registerLocation('configuration', {
        viewModel: locations.viewModels.config + 'Configuration.js',
        template: locations.templates.config + 'configuration.html'
      });
      fw.components.registerLocation('layoutcontrol', {
        viewModel: locations.viewModels.config + 'LayoutControl.js',
        template: locations.templates.config + 'layoutcontrol.html'
      });
      fw.components.registerLocation('api-search', {
        viewModel: locations.viewModels.root + 'api-search.js',
        template: locations.templates.root + 'api-search.html'
      });
      fw.components.registerLocation('api-search-result', {
        viewModel: locations.viewModels.root + 'api-search-result.js',
        template: locations.templates.root + 'api-search-result.html'
      });
      fw.components.registerLocation('api-nav', {
        viewModel: locations.viewModels.root + 'api-nav.js',
        template: locations.templates.root + 'api-nav.html'
      });
      fw.components.registerLocation('api-category', {
        viewModel: locations.viewModels.root + 'api-category.js',
        template: locations.templates.root + 'api-category.html'
      });
      fw.components.registerLocation('api-reference', {
        viewModel: locations.viewModels.root + 'api-reference.js',
        template: locations.templates.root + 'api-reference.html'
      });
      fw.components.registerLocation('pane', {
        viewModel: locations.viewModels.root + 'Pane.js',
        template: locations.templates.root + 'pane.html'
      });
      fw.components.registerLocation('panebackground', {
        viewModel: locations.viewModels.pane + 'PaneBackground.js',
        template: locations.templates.pane + 'panebackground.html'
      });
      fw.components.registerLocation('reddit', {
        viewModel: locations.viewModels.pane + 'Reddit.js',
        template: locations.templates.pane + 'reddit.html'
      });
      fw.components.registerLocation('github', {
        viewModel: locations.viewModels.pane + 'Github.js',
        template: locations.templates.pane + 'github.html'
      });
      fw.components.registerLocation('twitter', {
        viewModel: locations.viewModels.pane + 'Twitter.js',
        template: locations.templates.pane + 'twitter.html'
      });
      fw.components.registerLocation('pagesections', {
        viewModel: locations.viewModels.pane + 'PageSections.js',
        template: locations.templates.pane + 'pagesections.html'
      });
      fw.components.registerLocation('pagesection', {
        viewModel: locations.viewModels.pane + 'PageSection.js',
        template: locations.templates.pane + 'pagesection.html'
      });
      fw.components.registerLocation('pagesubsection', {
        viewModel: locations.viewModels.pane + 'PageSubSection.js',
        template: locations.templates.pane + 'pagesubsection.html'
      });
      fw.components.registerLocation('panelinks', {
        viewModel: locations.viewModels.pane + 'PaneLinks.js',
        template: locations.templates.pane + 'panelinks.html'
      });
      fw.components.registerLocation('navmenu', {
        viewModel: locations.viewModels.root + 'NavMenu.js',
        template: locations.templates.root + 'navmenu.html'
      });
      fw.components.registerLocation('documentation-nav', {
        viewModel: locations.viewModels.root + 'DocumentationNav.js',
        template: locations.templates.root + 'documentation-nav.html'
      });
      fw.components.registerLocation('contributors', {
        viewModel: locations.viewModels.root + 'Contributors.js',
        template: locations.templates.root + 'contributors.html'
      });
      fw.components.registerLocation('versiondisplay', {
        viewModel: locations.viewModels.root + 'VersionDisplay.js',
        template: locations.templates.root + 'versiondisplay.html'
      });
      fw.components.registerLocation('download-box', {
        viewModel: locations.viewModels.root + 'DownloadBox.js',
        template: locations.templates.root + 'download-box.html'
      });
    };
  }
);
