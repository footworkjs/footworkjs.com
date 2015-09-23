// Create a collection constructor function
var GroupOfPeople = fw.collection({
  namespace: "GroupOfPeople",
  // It is recommended you store the dataModel in a separate file.
  // This example shows it inline.
  dataModel: fw.dataModel({
    namespace: "Person",
    initialize: function(personData) {
      this.name = fw.observable(personData.name).mapTo('name');
    }
  })
});

/**
 * Instantiate a new group of people.
 * NOTE: Each object in the following array is passed to a new
 *       instantiation of the Person dataModel
 */
var group = GroupOfPeople([
  { name: 'John Smith' },
  { name: 'Jane Doe' },
]);

// get() the JSON version of the data
var people = group.get();

// Display the names in the log output
demoLog( 'Name:', people[0].name );
demoLog( 'Name:', people[1].name );
