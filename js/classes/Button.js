define(['jquery', 'underscore', 'backbone', 'UIElement'], function($, _, Backbone, UIElement){
	'use strict'; 
	var Button = { 
		View: UIElement.View.extend({ 
			className: 'btn', 
			tagName: 'a', 
			events: { 
				//'click': 'emit', 
				'tap': 'emit'
			}, 
			//buttons trigger events primarily 
			emit: function(event){ 
				this.trigger(this.model.get('message'), event); 
				return this; 
			}
		}), 
		Model: Backbone.Model.extend({ 
			defaults: {
				message:'alert', 
				view: 'Button', 
				text: 'press'
			}
		}),
	}; 
	
	return Button; 
}); 