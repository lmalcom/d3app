define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'EditableSearchButton'], function($, _, Backbone, Page, TextButton, EditableSearchButton){
	'use strict'; 
	var SearchPage = {}; 
	SearchPage.View = Page.View.extend({ 
		id: 'search' 
	}); 
	SearchPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Search', 
			href: 'search', 
			header: 'Search for Connections', 
			view: 'SearchPage'
		}, 
		initialize: function(options){ 
			var collection, img, btn1, btn2, submit; 

			//initialize objects on page 
			img = new EditableSearchButton.Model({text:'Free search'}); 
			btn1 = new EditableSearchButton.Model({text:'Name...'}); 
			btn2 = new EditableSearchButton.Model({text:'Organization...'}); 
			submit = new TextButton.Model({text: 'Search'});  

			//add to the collection if you'd like 
			var collection = new Backbone.Collection([img, btn1, btn2]); 
			this.collection =  collection; 
		}, 
	});	
	return SearchPage; 
}); 