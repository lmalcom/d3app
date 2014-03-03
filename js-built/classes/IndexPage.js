define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Image'], function($, _, Backbone, Page, TextButton, Image){
	'use strict'; 
	var IndexPage = {}; 
	IndexPage.View = Page.View.extend({ 
		id: 'index'
	}); 
	IndexPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Index', 
			href: 'index', 
			header: '',  
			view: 'IndexPage'
		}, 
		initialize: function(options){ 
			var collection, img, btn1, btn2; 

			//initialize objects on page 
			img = new Image.Model({src:'images/logo.png'}); 
			btn1 = new TextButton.Model({text:'Sign up'}); 
			btn2 = new TextButton.Model({text:'Login'}); 

			//add to the collection if you'd like
			var collection = new Backbone.Collection([img, btn1, btn2]);
			this.collection =  collection; 
		},
	});	
	return IndexPage; 
}); 