define(['jquery', 'underscore', 'backbone', 'UIElement', 'TextButton', 'ImageButton'], function($, _, Backbone, UIElement, TextButton){
	'use strict'; 
	var NavBar = {}; 
	NavBar = {
		View: UIElement.View.extend({
			id: 'header',
			subviews: [],
			events: {
				'click #homebtn': 'index', 
			},
			template: _.template('<a id="homebtn" class="btn">BroadeNet</a> <a id="title"></a><ul id="navContainer"></ul>'), 
			className: 'navbar',
			render: function(){
				var navbar; 
				navbar = this; 
				//logo and sections elements
				navbar.$el.html(this.template()); 

				//append buttons
				this.model.collection.each(this.renderIcon, this); 


				return this; 
			}, 
			renderIcon	: function( model, index, list ){ 
				var navbar, view; 
				navbar = this; 

				//create view 
				view = new TextButton.View({model:model}); 
				this.subviews.push(view); 

				//special attributes for these buttons
				view.tagName = 'li'; 
				view.el.id = model.get('text') + 'btn'; 

				//set bg to img
				view.$el.css({
					'background-image': 'url("'+ view.model.get('src') + '")', 
				})

				//listen to click events
				this.listenTo(view, 'select', function(){
					var txt = view.model.get('text'); 

					//show modal for login
					if(txt === 'Login' || txt === 'Logout'){
						navbar.showLogin(); 
					}else{
						navbar.changePage(view.model.get('text').toLowerCase()); 
					}; 
					
				}); 

				//append to el
				this.$el.find('#navContainer').append(view.render().el);

			   return this; 
		    }, 	
		    changePage: function(page){
		    	Backbone.history.navigate(page, {trigger:true}); 
		    	return this; 
		    }, 
		    index: function(){
		    	Backbone.history.navigate('/', {trigger:true});
		    	return this; 
		    }
		}),
		Model: UIElement.Model.extend({
			defaults: {
				src: 'images/img.jpg',
				alt: '', 
				view: 'NavBar'
			}, 
			initialize: function(){ 
				var home, sections, btns, arr; 
				arr = []; 

				//nav icons 
				btns = [
					{
						text: 'Sections', 
						src: 'images/icons/menu.svg'
					},
					{
						text: 'Profile', 
						src: 'images/icons/user.svg'
					}, 
					{
						text: 'About', 
						src: 'images/icons/info.svg'
					}, 
					{
						text: 'Contact', 
						src: 'images/icons/mail.svg'
					}, 
					{
						text: 'Login', 
						src: 'images/icons/enter.svg'
					}, 
					{
						text:'Search', 
						src: 'images/icons/search.svg'
					}
				]; 
				_.each(btns, function(btn){
					arr.push(new TextButton.Model(btn)); 
				})

				this.collection = new Backbone.Collection(arr)
			}
		}),
	}; 	
	return NavBar; 
}); 