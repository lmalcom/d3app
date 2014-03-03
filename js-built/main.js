require.config({
	baseUrl:'./js/classes', 
	shim : {
		underscore : 
		{
			exports:'_'
		}, 
		backbone: 
		{
	      deps: ["underscore", "jquery"],
	      exports: "Backbone"
	    }, 
	    d3: 
	    {
	    	exports:'d3'
	    }
	},
	packages: [
		{
			name: 'jquery', 
			location: '../libs', 
			main:'jquery'
		}, 
		{
			name: 'underscore', 
			location: '../libs', 
			main:'underscore'
		}, 
		{
			name: 'backbone', 
			location: '../libs', 
			main:'backbone'
		}, 
		{
			name: 'less', 
			location: '../libs', 
			main:'less'
		},
		{
			name: 'd3', 
			location: '../libs', 
			main:'d3'
		}, 
	]
}); 
require(['require','Controller', 'Page', 'DefaultRouter'], function(require, Controller, Page, Router){
	var controller, controllerView;

	//link CSS first so something shows up
	var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = '../styles.css';
    document.getElementsByTagName("head")[0].appendChild(link);

	//start module 
	controller = new Controller.Model;	

	//create and render view
	controllerView = new Controller.View({model:controller}); 
	console.log('oh hey', new Date); 
	$('body').append(controllerView.render().el); 

	//initialize router
	controllerView.router = new Router({parent:controllerView}); 
	Backbone.history.start({pushState:true}); 
}); 
