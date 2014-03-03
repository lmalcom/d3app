define(['jquery', 'underscore', 'backbone', 'UIElement'], function($, _, Backbone, UIElement){
	'use strict'; 
	var Text = { 
		View: UIElement.View.extend({ 
			className: 'txt', 
			template: _.template('<h2><%= header %></h2><p><%= text %></p>'),
		}), 
		Model: Backbone.Model.extend({ 
			defaults: { 
				view: 'Text', 
				header: 'Header', 
				text: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
			}
		}),
	}; 
	
	return Text; 
}); 