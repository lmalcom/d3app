define(['jquery', 'underscore', 'backbone', 'jquery.hammer'], function($, _, Backbone){ 
	'use strict';
	var UIElement = {}; 
	UIElement = { 
		View: Backbone.View.extend({ 
			template: _.template(''),
			initialize: function( attributes ){ 
				//model events 
				this.listenTo(this.model, 'change', this.render); 
				this.listenTo(this.model, 'destroy', this.remove); 

				//general events
				this.on('hide', this.hide, this); 
				this.on('show', this.show, this); 
				this.on('remove', this.remove, this); 

			},
			fadeIn: function(){
				this.$el.css({'display':'inline-block'})
					 .css({'opacity':1});
		    	return this; 
		    },
		    fadeOut: function(){
		    	this.$el.css({'opacity':0})
		    		.delay(1000)
		    		.css({'display':'none'}); 

		    	return this; 
		    },
		    show: function(){
		    	this.$el.css('display', 'inline-block'); 
		    	return this; 
		    },
		    hide: function(){
		    	this.$el.css('display', 'none'); 
		    	return this; 
		    },
		    remove: function(){
				Backbone.View.prototype.remove.call(this);

				//remove all event listeners
				this.off(); 

				//delete references in jquery and DOM 
				delete this.$el; 
				delete this.el;  
			},
			render: function(){ 
				this.$el.html(this.template(this.model.toJSON())); 
				this.$el.hammer(); 
				return this; 
			}, 
		}),
		Model: Backbone.Model.extend({
			defaults: {
				view: 'UIElement'
			}
		})
	}; 
	
	 
	return UIElement; 
}); 