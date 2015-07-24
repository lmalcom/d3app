define(['jquery', 'underscore', 'backbone', 'UIElement'], function($, _, Backbone, UIElement){
	'use strict'; 
	var Image = {}; 
	Image = {
		View: UIElement.View.extend({
			className: 'image', 
			template: _.template('<img src="<%= src %>" alt="<%= alt %>" />'), 
		}),
		Model: UIElement.Model.extend({
			defaults: {
				src: '/media/images/img.jpg',
				alt: '', 
				view: 'Image'
			}
		}),
	}; 	
	return Image; 
}); 