define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Form', 'ImageForm'], function($, _, Backbone, Page, TextButton, Form, ImageForm){
	'use strict'; 
	var ProfilePage = {}; 
	ProfilePage.View = Page.View.extend({ 
		id: 'profile',    
	}); 
	ProfilePage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Profile', 
			href: 'profile', 
			header: 'My Profile', 
			view: 'ProfilePage'
		}, 
		initialize: function(options){ 
			var collection, name, org, des, img; 

			//initialize objects on page 
			name = new Form.Model({label:'Name', name:'name'}); 
			org = new Form.Model({label:'Organization', name:'org'}); 
			des = new Form.Model({label:'Description', name:'description'}); 
			img = new ImageForm.Model({src:'images/sample.jpg', name: "profileImg", label:'Image'}); 

			//add to the collection if you'd like 
			var collection = new Backbone.Collection([img, name, org, des]); 
			this.collection =  collection; 
		}, 
	});	
	return ProfilePage; 
}); 