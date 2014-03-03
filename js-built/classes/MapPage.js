define(['jquery', 'underscore', 'backbone', 'd3', 'Page', 'Map'], function($, _, Backbone, d3, Page, Map){
	'use strict'; 
	var MapPage = {}; 
	MapPage.View = Page.View.extend({
		id: 'map',
		initialize: function(options){
			this.on('disabled', function(){
				console.log('disabled!'); 
				this.subviews[0].trigger('disabled'); 
			}, this); 
			this.on('enabled', function(){
				console.log('enabled!'); 
				this.subviews[0].trigger('enabled'); 
			}, this);
		},
	}); 
	MapPage.Model = Page.Model.extend({
		defaults: {
			title: 'Map', 
			href: 'map', 
			header: '', 
			view: 'MapPage'
		}, 
		initialize: function(options){
			this.collection = new Backbone.Collection([new Map.Model]);
		}
	});	
	return MapPage; 
}); 