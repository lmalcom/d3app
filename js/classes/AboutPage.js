define(['jquery', 'underscore', 'backbone', 'Page', 'TextButton', 'Text', 'Image'], function($, _, Backbone, Page, TextButton, Text, Image){
	'use strict'; 
	var AboutPage = {}; 
	AboutPage.View = Page.View.extend({
		id: 'about'
	}); 
	AboutPage.Model = Page.Model.extend({ 
		defaults: { 
			title: 'About', 
			href: 'about', 
			header: 'About Us',  
			view: 'AboutPage'
		}, 
		initialize: function( options ){ 
			var collection, img, btn1, btn2; 

			//initialize objects on page 
			img = new Image.Model({src:'images/logo.png'}); 
			btn1 = new Text.Model({header: '', text:"BroadeNet maps social connectivity pathways across multiple social networks to show users how they are connected, through their classmates, to people of interest.  For example, a student can search for ways in which she is connected to prospective employers, former employees of prospective employers, professionals in a particular industry, or professionals with shared interests.  By bridging multiple social networks, BroadeNet can show users the most direct and efficient ways to connect with a person of interest, regardless of whether there are connectivity gaps within a single network.  For example, if a user wishes to connect with a principal at a particular company, she could leverage the Facebook friendship of one of her classmates to connect with someone who is, in turn, a LinkedIn connection of the principal of interest. <br><br> BroadeNet treats a user's academic class as the user's core professional networking group, enabling classmates (even those who may not yet have met each other in person) to leverage each other's professional and personal networks.  In this way, BroadeNet encourages collaborative career development among classmates."}); 

			//*add to the collection here if you'd like 
			var collection = new Backbone.Collection([img, btn1]);
			this.collection =  collection; 
		}, 
	});	
	return AboutPage; 
}); 