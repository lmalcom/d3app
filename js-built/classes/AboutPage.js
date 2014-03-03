define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Text', 'Image'], function($, _, Backbone, Page, TextButton, Text, Image){
	'use strict'; 
	var AboutPage = {}; 
	AboutPage.View = Page.View.extend({
		id: 'about'
	}); 
	AboutPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'About', 
			href: 'about', 
			header: 'About Broadenet',  
			view: 'AboutPage'
		}, 
		initialize: function( options ){ 
			var collection, img, btn1, btn2; 

			//initialize objects on page 
			img = new Image.Model({src:'images/logo.png'}); 
			btn1 = new Text.Model({header: 'About Broadenet'}); 
			btn2 = new Text.Model({header: 'How to Use'}); 

			//*add to the collection here if you'd like 
			var collection = new Backbone.Collection([img, btn1, btn2]);
			this.collection =  collection; 
		}, 
	});	
	return AboutPage; 
}); 