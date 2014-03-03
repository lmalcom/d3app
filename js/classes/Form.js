define(['jquery', 'underscore', 'backbone', 'UIElement'], function($, _, Backbone, UIElement){
	'use strict'; 
	var Form = { 
		View: UIElement.View.extend({ 
			className: 'form', 
			tagName: 'form', 
			events: { 
				'change input[type=file]':'setImage', 
				'tap .formImg': 'changeFile', 
				'submit': 'submit', 
				'keyup input,textarea' : 'toggleSubmit', 
				'blur input, textarea': 'toggleSubmit',
				'tap .deletebtn': 'deleteInput', 
			}, 
			initialize: function(){ 
				this.el.action = this.model.get('action') || null; 
				this.enctype = "multipart/form-data"; 

			}, 
			template: function(dat){ 
				var text = ''; 
				if(!dat.inputs) return _.template('<i>this form has no inputs</i>'); 

				//create labels and inputs for all of the inputs in the array 
				_.each(dat.inputs, function(input){ 
					//wrap each input in a div if toggle state is set 
					//this is so that we can put a +/x button on the right of the input 
					if(input.label) text +=		'<label>' + input.label + '</label>'; 
					if(dat.toggleState) text+= '<div>'; 						
						text +=		input.type == 'textarea' ? '<textarea ': '<input type="' + (input.type || 'text') + '"'; 
						text +=		'name = "' + (input.name || '') + '"'; 
						text +=		'placeholder="' + (input.text || '') + '"'; 
						if(input.value) text += 'value="' + (input.value) + '"'; 
						text +=		input.type == 'file' ? 'style="display:none">' : '>'; 
						text +=		input.type == 'textarea' ? '</textarea> ': '</input"><br>'; 
						if(input.type =='file') text+= '<div class="formImg" style="background-image:url(' + "'" + input.src +"'" + ')"><a class="btn">Change Image</a></div>'; 
						if(dat.toggleState) text+= '<a class="deletebtn">X</a>'; 
					if(dat.toggleState) text+= '</div>'; 
				}); 

				//submit button
				text+= '<input type="submit" class="btn" disabled="disabled" value="Submit"></input>'; 
				return _.template(text); 
			}, 
			changeFile: function(ev){ 
				var input = this.$el.find('input[type=file]'); 
				input.trigger('click'); 
				return this; 
			}, 
			setImage: function(ev){ 
				var input, file; 
				input = ev.target; 
				file = input.files[0]; 

				//create a url from the img 
				this.$el.find('.formImg').css('background-image', 'url("' + URL.createObjectURL(file) + '")'); 
				this.toggleSubmit(); 
				return this; 
			}, 
			toggleState: function(targ, len){ 
				var del; 
				del = $(targ).siblings('.deletebtn'); 

				//toggle 
				if(len > 0) { // zero-length string AFTER a trim 
			        del.fadeIn(); 
			    }else{
			    	del.fadeOut(); 
			    }
				return this; 
			},
			toggleSubmit: function(){
				var form, submit, inputs, hasValue;
				form = this,				
				submit = this.$el.find('input[type=submit]'),
				inputs = this.$el.find('input[type!=submit], textarea'),
				hasValue = 0; 

				_.each(inputs, function(input){
					var len; 
					len  = $.trim(input.value).length; 

					// zero-length string AFTER a trim 
					if(len !== 0) hasValue++; 
				    form.toggleState(input, len); 
				}); 

				//if ALL fields are required
				if(!form.model.get('allowPartial') && hasValue === inputs.length){
					submit.removeClass('disabled');
					submit.addClass('active'); 
				    submit.attr('disabled', false); 

				//else if any field will do
				}else if(form.model.get('allowPartial') && hasValue !== 0){
					submit.removeClass('disabled');
					submit.addClass('active'); 
				    submit.attr('disabled', false); 

				//else disable
				}else{
					submit.removeClass('active'); 
					submit.addClass('disabled');
				    submit.attr('disabled', true);
				}
				return this; 
			},
			deleteInput: function(ev){
				var input, btn, submit; 
				btn = $(ev.target); 				
				btn.siblings('input, textarea').val(''); 
				btn.fadeOut(); 
				this.toggleSubmit(); 
				return this; 
			},
			getFormData: function(ev){
				var ret = new FormData(); 

				//get reference to current view from edit target 
				_.each(this.$el.find('input[type!=submit]'), function(input){
					//get the name 
					var name, val; 
					name = input.name,

					//get value or file or send null
					val = (input.files && input.files.length > 0)? input.files[0]: 
						  (input.value)?  			input.value: 
						  				  			null; 
					console.log('name: ', name, 'val: ', val); 

					//put in into the return object 
					ret.append(name, val); 
				}); 
				return ret; 
			}, 
			submit: function(ev){ 
				var form = this; 
				ev.preventDefault(); 
				var data = this.getFormData(); 
				console.log('data!: ', data); 

				//base data
				var sendData = { 
					crossDomain: true, 
					method: "POST", 
					url: form.el.action, 
					data: data, 
					processData: false,  
    				contentType: false,  
					success: function(data){
						//if we logged in successfully and got a user token (this will only be true if this is the login form)
						//other forms will not return this data 
						if(data && data.token){
							controller.set('token', data.token); 
							var profilePage = controller.collection.where({href: 'profile'})[0]; 	
							profilePage.updateProfile(); 						
						}

						//hide login modal
				    	$('#Modal').css({
				    		opacity: 0, 
				    		'pointer-events':'none'
				    	}); 
					}, 
					error: function(err){
						console.log('error!: ', err.responseText); 
					}
				}; 

				//send user token if available
				if(controller.has('token')){
					_.extend(sendData, {
						withCredentials: true, 
						headers : { 'Authorization' : 'Token ' + controller.get('token') },
					}); 					
				}

				//ajax request
				$.ajax(sendData); 
		    	return this; 
			},
		}), 
		Model: UIElement.Model.extend({ 
			defaults: { 
				message: 'select', 
				inputs: [], 
				view: 'Form', 
				label:'default', 
				type:'text', 
				allowPartial: false, 
				action: 'POST'
			} 
		}), 
	}; 	
	return Form; 
}); 