define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var SocialMediaButton = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' socbtn', 
			template: _.template('<a href="<%= href %>"><img src="<%= image %>"/></a>'), 
			events: {
				//'touch':'showLogin'
			}, 
			showLogin: function(ev){
		    	//change text to sign up or log in 
				$('#Modal #loginVerb').text(' Login'); 

				//change name if necessary
				$('#Modal #loginName').text(this.model.get('name')); 

				//change where the data is sent 
				$('#Modal form').attr('action', '/' + this.model.get('name')); 
		    	$('#Modal').css({
		    		opacity: 1, 
		    		'z-index': 2
		    	}); 
		    	return this; 
		    }, 
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'social', 
				name: 'Google', 
				image: '/media/images/googlesmall.jpg',
				view: 'SocialMediaButton', 
				href:"https://www.linkedin.com/uas/oauth2/authorization?client_id=7t9knttib68z&redirect_uri=www.google.com&response_type=json&scope=r_fullprofile%20r_network"
			}
		}),
	}; 	
	return SocialMediaButton; 
}); 