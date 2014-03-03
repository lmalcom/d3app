(function(){
	var PageView = Backbone.View.extend({
		className: 'Page', 
		template: _.template('<h3> <%= header %></h3>'), 
		render: function(){
			if(collection = this.collection){
				var parent = this; 
				collection.each(function(model){
					parent.$el.append(parent.renderPart(model)); 
				})
			}
			this.html(this.template(this.model.toJSON())); 
			return this; 
		}, 
	});
})()