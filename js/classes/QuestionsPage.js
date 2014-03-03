define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Image'], function($, _, Backbone, Page, TextButton, Image){
	'use strict'; 
	var QuestionsPage = {}; 
	QuestionsPage.View = Page.View.extend({
		id: 'questions'
	}); 
	QuestionsPage.Model = Page.Model.extend({
		defaults: {
			title: 'Questions', 
			href: 'questions', 
			header: 'How would you like to use Broadenet', 
			view: 'QuestionsPage'
		}, 
		initialize: function(options){
			var collection, btn1, btn2, btn3; 

			//initialize objects on page 
			btn1 = new TextButton.Model({text:'Contact a person'}); 
			btn2 = new TextButton.Model({text:'Contact an organization'}); 
			btn3 = new TextButton.Model({text:'Expand my network'}); 

			//add to the collection if you'd like
			var collection = new Backbone.Collection([btn1, btn2, btn3]);
			this.collection =  collection; 
		},
	});	
	return QuestionsPage; 
}); 