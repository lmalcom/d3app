define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Form'], function($, _, Backbone, Page, TextButton, Form){
	'use strict'; 
	var SearchPage = {}; 
	SearchPage.View = Page.View.extend({ 
		id: 'search', 
		events: { 
			'submit form': 'submit', 
		}, 
		submit: function(ev){ 
			ev.preventDefault(); 
			console.log(this); 
			//make ajax request for data 

			//set master list 

			//navigate to page

		}, 
	}); 
	SearchPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'Search', 
			href: 'search', 
			header: 'Find Connections', 
			view: 'SearchPage' 
		}, 
		initialize: function(options){ 
			var collection, form, img, btn1, btn2, submit; 

			//initialize objects on page 
			form = new Form.Model({
					action: '/search', 
					inputs: [
						{label: 'Name: ', type:"text", text: 'Name...' ,name:'name'},
						{label: 'Organization: ', type:"text", text: 'Organization...' ,name:'organization'},
						{label: 'Free Search: ', type:"text", text: 'Free search', name:'free'}, 
					], 
					toggleState: true, 
					allowPartial: true
				}) 

			//add to the collection if you'd like 
			var collection = new Backbone.Collection([form]); 
			this.collection =  collection; 
		}, 
	});	
	return SearchPage; 
}); 