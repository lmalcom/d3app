define(['require','jquery', 'underscore', 'backbone', 'UIElement'], function(require, $, _, Backbone, UIElement){
	'use strict'; 
	var Page = {}; 
	Page.View = UIElement.View.extend({
		className: 'Page', 
		subviews:[],
		initialize: function(){
			var view = this; 
			this.on('enabled', function(){
				console.log('showing' + view.model.get('title') + 'page'); 
			}); 
		},
		render 		: function(){ 
			//reset page view
			this.clear(); 
			
			//render data from the models 
			if( this.model.collection.length > 0 ){
				this.model.collection.each(this.renderModel, this); 

			}	
		    return this; 
	   	}, 	
	   	clear: function(){
			this.$el.empty(); 
			_.each(this.subviews, function(view){ 
				view.remove(); 
			}); 
			this.subviews = []; 
			return this; 
	   	}, 
		renderModel	: function( model ){ 
			var klass, view; 

			//get class 
			klass = require(model.get('view')); 

			//create view 
			var view = new klass.View({model:model}); 
			this.subviews.push(view); 

			//add to el
		    this.$el.append(view.render().el); 
		    return view; 
	    }, 	   
	}); 
	Page.Model = Backbone.Model.extend({
		defaults: {
			title: 'default', 
			header: '', 
			view: (Page.View), 
		}
	}); 
	return Page; 
}); 