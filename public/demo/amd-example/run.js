define([],
  function() {
    return {
      resources: {
        indexHTML: {
          type: 'html',
          file: 'files/index.html'
        },
        myApp: {
          type: 'javascript',
          label: 'main.js',
          file: 'files/main.js'
        },
        myViewModel: {
          type: 'javascript',
          label: 'js/MyViewModel.js',
          file: 'files/js/MyViewModel.js'
        }
      }
    };
  }
);
