define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var Icon = {}; 
	Icon = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' icon', 
			template: _.template('<%= text %>'),
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'select', 
				view: 'Icon'
			}
		}),
	}; 	
	return Icon; 
}); 