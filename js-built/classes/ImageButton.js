define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var ImageButton = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' ImageButton', 
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'show',
				view: 'ImageButton', 
			}
		}),
	}; 	
	return ImageButton; 
}); 