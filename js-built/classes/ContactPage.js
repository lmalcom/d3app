define(['jquery', 'underscore', 'backbone', 'Page', 'Text', 'Form'], function($, _, Backbone, Page, Text, Form){
	'use strict'; 
	var ContactPage = {}; 
	ContactPage.View = Page.View.extend({
		id: 'contact', 
		template: _.template('<div id="contactOptions"></div><div id="contactForm"><h3>Or leave a message!</h3></div>'), 
		render 		: function(){ 
			//reset page view
			this.clear(); 
			
			//template 
			this.$el.append(this.template()); 

			//render data from the models 
			if( this.model.collection.length > 0 ){
				this.model.collection.each(this.renderModel, this); 

			}	
		    return this; 
	   	}, 	
		renderModel	: function( model ){ 
			var klass, view; 

			//get class 
			klass = require(model.get('view')); 

			//create view 
			var view = new klass.View({model:model}); 
			this.subviews.push(view); 

			//add to el
			if(model.get('view') === 'Text'){
				this.$el.find('#contactOptions').append(view.render().el);
			}else{
				this.$el.find('#contactForm').append(view.render().el); 
			};		    
	    }, 	
	}); 
	ContactPage.Model = Page.Model.extend({
		defaults: {
			title: 'Contact', 
			href: 'contact', 
			header: 'Contact', 
			view: 'ContactPage' 
		}, 
		initialize: function(options){ 
			var arr; 

			//initialize objects on page 
			arr = [
				new Text.Model({header: 'Address:', text:'1234 Nice Lane'}),
				new Text.Model({header: 'Telephone:', text:'(123) 456 7890'}),
				new Text.Model({header: 'Email:', text:'somethinawesome@gmail.com'}),
				new Form.Model({label:'Name', name:'name'}),
				new Form.Model({label:'Email', name:'email'}),
				new Form.Model({label:'Message', name:'message', type:"textarea"})			
			]; 
			//add to the collection if you'd like 
			this.collection = new Backbone.Collection(arr); 
		},
	});	
	return ContactPage; 
}); 