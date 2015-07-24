define(['jquery', 'underscore', 'backbone', 'Page', 'SocialMediaButton'], function($, _, Backbone, Page, SocialMediaButton){
	'use strict'; 
	var ConnectionsPage = {}; 
	ConnectionsPage.View = Page.View.extend({
		id: 'connections', 
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
			btn1 = new SocialMediaButton.Model({name:'Google', image:'/media/images/social/googlesmall.png'}); 
			btn2 = new SocialMediaButton.Model({name:'Facebook', image:'/media/images/social/facebooksmall.png'});

			//add to the collection if you'd like
			var collection = new Backbone.Collection([btn1, btn2]);
			this.collection =  collection; 
		},
		updateURLs: function(token){
			var page = this; 
			var sendData = { 
				crossDomain: true, 
				method: "GET", 
				url: 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/get_urls/', 
				processData: false,  
				contentType: false,  
				withCredentials: true, 
				headers : { 'Authorization' : 'Token ' + token}, 
				success: function(data){
					if(data){
						if(data.google) page.collection.where({name: 'Google'})[0].set('href', data.google); 
						if(data.facebook) page.collection.where({name: 'Google'})[0].set('href', data.facebook); 
					}
				}, 
				error: function(err){
					console.log('error!: ', err.responseText); 
				}
			}; 
		}
	});	
	return ConnectionsPage; 
}); 