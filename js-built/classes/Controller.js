define(['jquery', 'underscore', 'backbone', 'NavBar', 'Page', 'IndexPage', 'ConnectionsPage', 'QuestionsPage', 'SearchPage', 'MapPage', 'AboutPage', 'ProfilePage', 'ContactPage'], function( $, _, Backbone, NavBar,Page){
	'use strict'; 

	var Controller; 

	Controller = {
		Model: Backbone.Model.extend({ 
			defaults: { 

			}, 	
			initialize: function(){ 
				var arr, controller; 
				controller = this; 
				arr = []; 

				//create NavBar 
				arr.push(new NavBar.Model); 

				//create pages
				_.each([{title:'Index'},{title:'Connections'}, {title:'Questions'}, {title:'Search'}, {title:'Map'}, {title:'Profile'}, {title:'About'}, {title:'Contact'}], function(page){
					arr.push(controller.createPageModel(page)); 
				}); 

				controller.collection = new Backbone.Collection(arr); 
			},
			createPageModel: function( modelData ){
				var pageClass, page; 

				//get class and create model and view
				pageClass = require(['require',modelData.title + 'Page'], function(require, klass){return klass}); 
				console.log(pageClass); 
				page = new pageClass.Model( modelData );

				//return page 
				return page;
			}
			
		}),
		View: Backbone.View.extend({
			subviews:[],
			template: _.template('<div id="headerBody"></div><div id="pageBody"></div>'),
			render: function(){ 
				//reset page view
				this.clear();  

				this.$el.append(this.template()); 
				this.renderModel(this.model.collection.at(0)); 

			    return this; 
		   	}, 	
		   	clear: function(){
				this.$el.empty(); 
				
				_.each(this.subviews, function(view){ 
					view.remove(); 
				}); 
				this.subviews = []; 
		   	}, 
			renderModel: function( model ){ 
				var controller, klass, view; 
				controller = this; 

				//get class
				klass = require(model.get('view')); 								

				//create view 
				view = new klass.View({model:model});	
				controller.subviews.push(view);  

				//add to el
			   	if(model.get('view') == 'NavBar'){
					this.$el.find('#headerBody').append(view.render().el); 
			   	}else{
			   		this.$el.find('#pageBody').append(view.render().el); 
				}

				return view; 
		    }, 
		})
	}; 
	
	
	return Controller; 
}); 