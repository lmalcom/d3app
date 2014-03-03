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
			var test, controller; 
			test = false; 		
			pageName = pageName || 'index'; 
			controller = this.parent; 

			console.log('PageName: ', pageName); 

			_.each(this.parent.subviews, function(page){
				if(page.model.get('href') === pageName){
					test = true; 
					$('#title').text(page.model.get('header')); 
					page.fadeIn(); 
					page.trigger('enabled'); 
					console.log('displaying' + pageName); 
				//else fade out the other pages, NOT the header
				}else if(page.model.has('href')){
					page.fadeOut(); 
					page.trigger('disabled'); 
				}
			}); 		
			if(test) return this; 
			
			//else get the model in the collection with the right pagename and render it
			controller.renderModel(controller.model.collection.where({href:pageName})[0])
				.fadeIn()
				.trigger('enabled'); 
			return this; 
		} 
	}); 
	return DefaultRouter
})