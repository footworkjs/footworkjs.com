define([ "footwork", "lodash" ],
  function( fw, _ ) {
    return fw.viewModel.create({
      namespace: 'apiCategory',
      initialize: function(params) {
        _.extend(this, { label: '' }, fw.unwrap(params.categoryData));
        this.isSubCategory = !!params.parent;
        this.parent = params.parent;

        this.hasSubCategories = _.isArray(this.subCategories || null) && this.subCategories.length > 0;
        this.hasReferences = _.isArray(this.references || null) && this.references.length > 0;
      }
    });
  }
);
