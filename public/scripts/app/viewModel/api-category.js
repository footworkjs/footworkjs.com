define([ "footwork", "lodash" ],
  function( fw, _ ) {
    return fw.viewModel({
      namespace: 'apiCategory',
      initialize: function(params) {
        _.extend(this, fw.unwrap(params.categoryData));
        this.isSubCategory = !!params.parent;
        this.parent = params.parent;

        this.hasSubCategories = _.isArray(this.subCategories) && this.subCategories.length > 0;
        this.hasReferences = _.isArray(this.references) && this.references.length > 0;
      }
    });
  }
);
