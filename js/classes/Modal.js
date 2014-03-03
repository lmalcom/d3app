define(['UIElement','Form'], function(UIElement, Form){
	var Modal = {}; 

	//Page View 
	Modal.View = UIElement.View.extend({ 
		id: 'Modal', 
		className: 'Modal', 
		events: { 
			'touch': 'hide', 
			'click': 'hide' 
		}, 
		render: function(){ 
			var model, view; 

			//set name 
			this.$el.append('<h2><span id="loginName">BroadeNet </span><span id="loginVerb">Login to </span></h2>'); 

			//render form, has a collection in case you wanted to add multiple things to the modal 
			model = this.model.collection.at(0); 
			view = new Form.View({model:model}); 

			//render form 
			this.subviews = [view]; 
			this.$el.append(view.render().el); 
			return this; 
		}, 
		hide: function(event){ 
			if(event.target === this.el){ 
				this.$el.css({ 
					opacity: 0, 
			    	/*'z-index': -1 */
			    	'pointer-events':'none'
				}); 
			} 
			return this; 
		}, 
		changeName: function(name){
			this.$el.find('#loginName').text(name || 'BroadeNet'); 
			return this; 
		}
	});  
	Modal.Model = UIElement.Model.extend({
		defaults: {
			view: 'Modal'
		}, 
		initialize: function(attributes){
			UIElement.Model.prototype.initialize.call(this, attributes); 

			this.collection = new Backbone.Collection([
				new Form.Model({
					inputs: [
						{type:"email", label:'Email', text: 'Email', name:'email'}, 
						{type:"password", label:'Password', name:'password'},				
					]
				})
			])
		},
	}); 
	return Modal; 
}); 