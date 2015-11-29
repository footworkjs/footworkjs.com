define(["footwork"],
  function(fw) {
    return {
      className: 'intro',
      explanation: 'Take a moment to play around with the demo below and get a quick feel for a few of Footworks features. Remember though this barely scratches the surface, there is a wide variety of useful and novel features in FootworkJS...check it out!',
      resources: {
        indexHTML: {
          type: 'html',
          file: 'index.html'
        },
        personVM: {
          type: 'javascript',
          file: 'Person.js'
        },
        messageHTML: {
          type: 'html',
          file: 'message.html'
        },
        messageVM: {
          type: 'javascript',
          file: 'message.js'
        },
      },
      runDemo: function(outputContainer, resources, demoLog) {
        var CodeDemo = this;

        var personVM; eval('personVM = ' + resources.personVM);
        var messageVM; eval('messageVM = ' + resources.messageVM);

        fw.viewModel.register('Person', personVM);

        fw.components.unregister('message');
        fw.components.register('message', {
          viewModel: messageVM,
          template: resources.messageHTML
        });

        outputContainer.innerHTML = resources.indexHTML;
        fw.start(outputContainer);
      }
    };
  }
);
