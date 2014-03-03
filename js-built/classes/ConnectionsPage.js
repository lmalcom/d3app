define(['jquery', 'underscore', 'backbone', 'Page', 'SocialMediaButton'], function($, _, Backbone, Page, SocialMediaButton){
	'use strict'; 
	var ConnectionsPage = {}; 
	ConnectionsPage.View = Page.View.extend({
		id: 'connections'
	}); 
	ConnectionsPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Connections', 
			href: 'connections', 
			header: 'Make Connections',  
			view: 'ConnectionsPage'
		}, 
		initialize: function(options){ 
			var collection, btn1, btn2; 

			//initialize objects on page 
			btn1 = new SocialMediaButton.Model({name:'google', image:'images/social/googlesmall.png'}); 
			btn2 = new SocialMediaButton.Model({name:'facebook', image:'images/social/facebooksmall.png'});

			//add to the collection if you'd like
			var collection = new Backbone.Collection([btn1, btn2]);
			this.collection =  collection; 
		},
	});	
	return ConnectionsPage; 
}); 