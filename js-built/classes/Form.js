define(['jquery', 'underscore', 'backbone', 'UIElement'], function($, _, Backbone, UIElement){
	'use strict'; 
	var Form = { 
		View: UIElement.View.extend({ 
			className: 'form', 
			template: _.template('<form id="<%= name %>" enctype="multipart/form-data" method="post" name="<%= name %>"> <label><%= label %></label> <div contenteditable="true"><%= label %></div> </form>'),
		}), 
		Model: UIElement.Model.extend({ 
			defaults: { 
				message: 'select', 
				text: 'Some interesting search', 
				view: 'Form', 
				label:'default', 
				type:'text', 
			} 
		}), 
	}; 	
	return Form; 
}); 