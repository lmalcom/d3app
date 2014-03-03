define(['jquery', 'underscore', 'backbone', 'Form'], function($, _, Backbone, Form){
	'use strict'; 
	var ImageForm = {
		View: Form.View.extend({
			className: 'form imgForm',
			template: _.template('<form enctype="multipart/form-data" method="post" name="<%= name %>"> <label><%= label %></label> <input  id="<%= name %>" type="file"/> <img src="<% src %>"/></form>'),
			events: {
				'change':'setImage'
			},
			setImage: function(ev){
				var input, file; 
				input = ev.target; 
				file = input.files[0]; 

				//create a url from the img 
				this.$el.css({'background-image': 'url("' + URL.createObjectURL(file) + '")'});
			}
		}), 
		Model: Form.Model.extend({ 
			defaults: { 
				message: 'select', 
				text: 'Some interesting search', 
				view: 'ImageForm' 
			} 
		}), 
	}; 	
	return ImageForm; 
}); 