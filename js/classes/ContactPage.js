define(['jquery', 'underscore', 'backbone', 'Page', 'Text', 'Form'], function($, _, Backbone, Page, Text, Form){
	'use strict'; 
	var ContactPage = {}; 
	ContactPage.View = Page.View.extend({
		id: 'contact', 
		template: _.template('<div id="contactForm"><h2 class="miniHeader">Contact Us</h2></div><div id="contactOptions"></div>'), 
		render 		: function(){ 
			//reset page view
			this.clear(); 
			
			//template 
			this.$el.append(this.template()); 

			//render data from the models 
			if( this.model.collection.length > 0 ){
				this.model.collection.each(this.renderModel, this); 

			}	
			this.$el.append('<footer><a class="terms">Terms of Use</a><a class="privacy">Privacy Policy</a><a class="contact">Contact</a></footer>'); 
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
			header: 'Contact Us', 
			view: 'ContactPage' 
		}, 
		initialize: function(options){ 
			var arr; 

			//initialize objects on page 
			arr = [
				new Text.Model({header: 'Address:', text:'1234 Nice Lane'}),
				new Text.Model({header: 'Telephone:', text:'(123) 456 7890'}),
				new Text.Model({header: 'Email:', text:'somethinawesome@gmail.com'}),
				new Form.Model({
					action: '/message', 
					inputs: [
						{type:"text", label:'Name', text: 'Name', name:'name'}, 
						{type:"email", label:'Email', text: 'Email' ,name:'email'},
						{type:"textarea", text:'Write something awesome!' ,label:'Message', name:'message'},
					]
				}) 	
			]; 
			//add to the collection if you'd like 
			this.collection = new Backbone.Collection(arr); 
		},
	});	
	return ContactPage; 
}); 