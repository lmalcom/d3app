define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Image'], function($, _, Backbone, Page, TextButton, Image){
	'use strict'; 
	var IndexPage = {}; 
	IndexPage.View = Page.View.extend({ 
		id: 'index', 
		events: { 
			'tap .btn': 'setModalTitle' 
		}, 
		setModalTitle: function(ev){ 
			var targ, text; 
			targ = $(ev.target); 
			text = targ.text(); 

			//change text to sign up or log in 
			$('#Modal #loginVerb').text(text); 

			//change name if necessary 
			$('#Modal #loginName').text('BroadeNet '); 

			//change where the data is sent
			if(text === 'Sign up'){
				$('#Modal form').attr('action', 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/signup/'); 
				//add password confirmation if using signup
				if($('#Modal form').children('.password_confirm').length == 0) $('#Modal form').find('input[type=submit]').before('<label class="password_confirm">Confirm Password</label><input class="password_confirm" name="password_confirm" type="password">'); 
			}
			else{
				$('#Modal form').attr('action', 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/' + text.toLowerCase() + '/'); 
				$('#Modal form').find('.password_confirm').remove(); 
			} 

			//clear data from form
			_.each($('#Modal form').find('input[type!=submit]'), function(input){
				//set value to null
				input.value = null;
			})

			//show Modal 
			this.showLogin(); 

			return this; 

		}, 
		showLogin: function(){ 
	    	$('#Modal').css({ 
	    		opacity: 1, 
	    		/*'z-index': 2 */
	    		'pointer-events':'auto'
	    	}); 
	    	return this; 
	    }, 
	}); 
	IndexPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Index', 
			href: 'index', 
			header: '',  
			view: 'IndexPage'
		}, 
		initialize: function(options){ 
			var collection, img, btn1, btn2; 

			//initialize objects on page 
			img = new Image.Model({src:'images/logo.png'}); 
			btn1 = new TextButton.Model({text:'Sign up'}); 
			btn2 = new TextButton.Model({text:'Login'}); 

			//add to the collection if you'd like
			var collection = new Backbone.Collection([img, btn1, btn2]);
			this.collection =  collection; 
		},
	});	
	return IndexPage; 
}); 