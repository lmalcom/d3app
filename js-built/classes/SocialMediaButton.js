define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var SocialMediaButton = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' socbtn', 
			template: _.template(' <img src="<%= image %>"/> ')
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'social', 
				name: 'google', 
				image: 'images/googlesmall.jpg',
				view: 'SocialMediaButton'
			}
		}),
	}; 	
	return SocialMediaButton; 
}); 