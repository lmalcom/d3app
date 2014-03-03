define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Form', 'ImageForm'], function($, _, Backbone, Page, TextButton, Form, ImageForm){
	'use strict'; 
	var ProfilePage = {}; 
	ProfilePage.View = Page.View.extend({ 
		id: 'profile',  
		initialize: function(options){
			var page = this; 
			Page.View.prototype.initialize.call(this, options); 
			this.listenTo(this.model.collection, 'reset', function(){
				page.render(); 
			})
		}  
	}); 
	ProfilePage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Profile', 
			href: 'profile', 
			header: 'My Profile', 
			view: 'ProfilePage'
		}, 
		initialize: function(options){ 
			var form; 
			//initialize objects on page 
			form = new Form.Model({
				action: 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/update_profile/', 
				inputs: [
					{type:"file", label: 'Profile Image', src:'images/icons/user.svg', name: "image"},
					{type:"text", label:'Name', text: 'Name', name:'name'}, 
					{type:"text", label:'Organization', text: 'Organization Affiliation', name:'org'},
					{type:"textarea", label:'Description', text: 'Description', name:'description'}					
				]
			}); 
			//add to the collection if you'd like 
			this.collection =  new Backbone.Collection([form]);
		}, 
		updateProfile: function(){
			var page = this; 
			$.ajax({ 
					crossDomain: true, 
					method: "POST", 
					url: 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/get_profile/', 
					processData: false,  
    				contentType: false, 
    				withCredentials: true, 
					headers : { 'Authorization' : 'Token ' + controller.get('token') }, 
					success: function(data){
						console.log('data for this user: ', data); 
						var form; 
						//initialize objects on page 
						form = new Form.Model({
							action: 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/update_profile/', 
							inputs: [
								{type:"file", label: 'Profile Image', src: ('http://ec2-54-242-145-25.compute-1.amazonaws.com:8000' + data.image || 'images/icons/user.svg'), name: "image"},
								{type:"text", label:'Name', text: (data.name || 'Name'), name:'name', value: (data.name || 'Name')}, 
								{type:"text", label:'Organization', text: (data.organization || 'Organization Affiliation'), value: (data.organization || ''), name:'org'},
								{type:"textarea", label:'Description', text: (data.description || 'Description'), value: (data.description || ''), name:'description'}					
							]
						}); 
						//add to the collection if you'd like 
						page.collection.reset([form]);

						//hide login modal
				    	$('#Modal').css({
				    		opacity: 0, 
				    		'pointer-events':'none'
				    	}); 
					}, 
					error: function(err){
						console.log('error!: ', err.responseText); 
					}
				}); 
		}
	});	
	return ProfilePage; 
}); 