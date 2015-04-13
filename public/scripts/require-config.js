
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
  paths: {
    "text":               "../bower_components/requirejs-text/text",
    "jquery":             "../bower_components/jquery/dist/jquery",
    "postal":             "../bower_components/postal.js/lib/postal",
    "knockout":           "../bower_components/knockoutjs/dist/knockout",
    "footwork":           "../bower_components/footwork/dist/footwork-all.min",
    "storage":            "../bower_components/store-js/store",
    "lodash":             "../bower_components/lodash/lodash",
    "history":            "../bower_components/history.js/scripts/bundled/html5/native.history",
    "highlight":          "lib/highlight/highlight.pack",
    "jwerty":             "lib/jwerty", // jwerty does not provide an AMD build, this is a custom wrapped version
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
    "PageSubSection":     "app/viewModel/pane/PageSubSection"
  },
  waitSeconds: 1500
};

if(typeof module === 'object') {
  module.exports = REQUIRECONFIG;
}
