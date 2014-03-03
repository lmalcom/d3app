define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var TextButton = {}; 
	TextButton = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' txtbtn', 
			template: _.template('<%= text %>'),
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'select', 
				view: 'TextButton'
			}
		}),
	}; 	
	return TextButton; 
}); 