define(['jquery', 'underscore', 'backbone', 'Button'], function($, _, Backbone, Button){
	'use strict'; 
	var EditableSearchButton = {
		View: Button.View.extend({
			className: Button.View.prototype.className + ' searchbtn', 
			events: { 
				'click .edit': 'edit',
				'click .add': 'add', 
				'click .delete': 'del',
			}, 
			template: _.template('<a class="edit">Edit</a> <div class="editText" contenteditable="true"> <%= text %> </div> <a class="delete"><img src="/media/images/icons/x.svg"/></a><a class="add"><img src="/media/images/icons/plus.svg"/></a>'),
			edit: function(){
				//
				if(this.filled){
					
				}
			}, 
			add: function(){}, 
			del: function(){}
		}),
		Model: Button.Model.extend({
			defaults: {
				message: 'select', 
				text: 'Some interesting search',
				view: 'EditableSearchButton' 
			}
		}),
	}; 	
	return EditableSearchButton; 
}); 