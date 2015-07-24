define(['jquery', 'underscore', 'backbone', 'UIElement', 'TextButton', 'ImageButton'], function($, _, Backbone, UIElement, TextButton){
	'use strict'; 
	var NavBar; 
	NavBar = {
		View: UIElement.View.extend({
			id: 'header',
			subviews: [],
			events: { 
				'touch #homebtn': 'index'
			},
			template: _.template('<a id="homebtn" class="btn">BroadeNet</a> <a id="title"></a><ul id="navContainer"></ul>'), 
			className: 'navbar',
			initialize: function(attributes){
				UIElement.View.prototype.initialize.call(this, attributes); 
				$(window).resize(function(ev){
					if(window.innerWidth >= 1024){
						$('#navContainer').css({display:'inline-block'}); 
					}else{
						$('#navContainer').css({display:'none'}); 
					}
				}); 
			},
			render: function(){
				var navbar; 
				navbar = this; 
				//logo and sections elements
				navbar.$el.html(this.template()); 
				navbar.$el.hammer(); 

				//append buttons
				this.model.collection.each(this.renderIcon, this); 


				return this; 
			}, 
			renderIcon	: function( model, index, list ){ 
				var navbar, view, where; 
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
					if(txt === 'Sections'){ 
						navbar.toggleSections(); 
					}else if(txt === 'Login' || txt === 'Logout'){ 
						navbar.showLogin(); 
					}else{ 
						navbar.changePage(view.model.get('text').toLowerCase()); 
					}; 
					
				}); 

				//append to el, sections button is NOT in the navcontainer
				where = view.model.get('text') == 'Sections'? this.$el : this.$el.find('#navContainer'); 
				where.append(view.render().el);

			   return this; 
		    }, 	
		    changePage: function(page){
		    	Backbone.history.navigate(page, {trigger:true}); 
		    	return this; 
		    }, 
		    index: function(){
		    	Backbone.history.navigate('/', {trigger:true});
		    	return this; 
		    }, 
		    toggleSections: function(){ 
		    	var nav, height, body; 
		    	nav = this.$el.find('#navContainer'); 
		    	height = nav.height(); 
		    	body = $('#pageBody'); 
		    	if(nav.css('display') === 'block'){ 
		    		nav.fadeOut(); 
		    		//body.css({top: height}); 
		    	}else{
		    		nav.fadeIn(); 
		    		//body.css({top: height*2}); 
		    	}
		    },
		    showLogin: function(){
		    	//change text to sign up or log in 
				$('#Modal #loginVerb').text('Login'); 

				//change name if necessary
				$('#Modal #loginName').text('BroadeNet '); 

				//change where the data is sent 
				$('#Modal form').attr('action', 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/login/'); 
		    	$('#Modal').css({
		    		opacity: 1, 
		    		/*'z-index': 2*/
		    		'pointer-events':'auto',
		    	}); 
		    	return this; 
		    }, 
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
						src: '/media/images/icons/menu.svg'
					},
					{
						text: 'Profile', 
						src: '/media/images/icons/user.svg'
					}, 
					{
						text: 'About', 
						src: '/media/images/icons/info.svg'
					}, 
					{
						text: 'Contact', 
						src: '/media/images/icons/mail.svg'
					}, 
					{
						text: 'Login', 
						src: '/media/images/icons/enter.svg'
					}, 
					{
						text:'Search', 
						src: '/media/images/icons/search.svg'
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