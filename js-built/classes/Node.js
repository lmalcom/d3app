define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var Node = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' node', 
			template: _.template('<img src="<%= src %>"/>'), 
			initialize: function(options){
				var css, x, y, transX, transY; 
				css = {}, 
				x = options.x || 0, 
				y = options.y || 0; 

				transX = 'translateX(' + x +'%)'; 
				transY = 'translateY(' + x +'%)'; 
			}
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'show',
				src: 'images/samplePerson.jpg', 
				personIndex: 0, 
			}
		}),
	}; 	
	return Node; 
}); 