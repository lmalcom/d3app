define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){ 
	'use strict'; 
	var DefaultRouter; 
	DefaultRouter = Backbone.Router.extend({ 
		routes: { 
			'': 'changePage', 
			'index': 'changePage', 
			'index.html': 'changePage', 
			':page': 'changePage', 
		}, 
		initialize: function(options){ 
			window.router = this; 
			this.parent = options.parent; 
		}, 
		//set active page 
		changePage: function(pageName){ 
			var page, rendered, controller; 
			rendered = false; 
			pageName = pageName || 'index'; 
			controller = this.parent; 

			//go through the pages
			_.each(this.parent.subviews, function(page){
				if(page.model.get('href') === pageName){
					rendered = true; 
					if(pageName !== 'questions') $('#title').text(page.model.get('header'));
					page.fadeIn(); 
					page.trigger('enabled'); 

				//else fade out the other pages, NOT the header
				}else if(page.model.has('href')){
					page.fadeOut(); 
					page.trigger('disabled'); 
				}
			}); 		
			if(rendered) return this; 
			
			//else get the model in the collection with the right pagename and render it
			page = controller.renderModel(controller.model.collection.where({href:pageName})[0])
				.fadeIn()
				.trigger('enabled'); 
			if(pageName !== 'questions') $('#title').text(page.model.get('header'));
			return this; 
		} 
	}); 
	return DefaultRouter
})