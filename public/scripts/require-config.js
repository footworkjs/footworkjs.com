var buildVersion = (typeof buildVersion === 'undefined' ? 0 : buildVersion);
var REQUIRECONFIG = {
  baseUrl: "/scripts",
  map: {
    "*": {
      "jquery": "noconflict-jquery"
    },
    "noconflict-jquery": {
      "jquery": "jquery"
    }
  },
  urlArgs: "v=" +  buildVersion,
  paths: {
    "requireLib":         "/bower_components/requirejs/require",
    "text":               "/bower_components/requirejs-text/text",
    "jquery":             "/bower_components/jquery/dist/jquery",
    "postal":             "/bower_components/postal.js/lib/postal",
    "knockout":           "/bower_components/knockoutjs/dist/knockout",
    "footwork":           "/bower_components/footwork/dist/footwork-bare-jquery",
    "storage":            "/bower_components/store-js/store",
    "lodash":             "/bower_components/lodash/lodash",
    "history":            "/bower_components/history.js/scripts/bundled/html5/native.history",
    "highlight":          "lib/highlight/highlight.pack",
    "jwerty":             "lib/jwerty",
    "jquery.pulse":       "lib/jquery-plugins/jquery.pulse",
    "jquery.easing":      "lib/jquery-plugins/jquery.easing",
    "jquery.collapsible": "lib/jquery-plugins/jquery.collapsible",

    "paneEntry":          "app/mixin/paneEntry",
    "paneArea":           "app/mixin/paneArea",
    "koExtenders":        "app/misc/extenders",
    "koBindings":         "app/misc/bindingHandlers",
    "noconflict-jquery":  "app/misc/noconflict-jquery",
    "LoadProfile":        "app/helper/LoadProfile",
    "LoadState":          "app/helper/LoadState",
    "resourceHelper":     "app/helper/resourceHelper",
    "router":             "app/router",

    "PaneTouchManager":   "app/viewModel/PaneTouchManager",
    "ViewPort":           "app/viewModel/ViewPort",
    "Header":             "app/viewModel/Header",
    "Navigation":         "app/viewModel/Navigation",
    "Layout":             "app/viewModel/Layout",
    "Page":               "app/viewModel/Page",
    "PageSection":        "app/viewModel/pane/PageSection",
    "PageSubSection":     "app/viewModel/pane/PageSubSection",
    "navmenu":            "app/viewModel/NavMenu",
    "PaneLinks":          "app/viewModel/pane/PaneLinks",
    "downloadbox":        "app/viewModel/DownloadBox"
  },
  waitSeconds: 1500
};

if(typeof module === 'object') {
  module.exports = REQUIRECONFIG;
}
