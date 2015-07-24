define(['jquery', 'underscore', 'backbone', 'd3', 'Page', 'Map', 'UserInfo'], function($, _, Backbone, d3, Page, Map, UserInfo){
	'use strict'; 
	var MapPage = {}; 
	MapPage.View = Page.View.extend({
		id: 'map',
		events: {
			'touch foreignObject': 'showUserInfo', 
			'click foreignObject': 'showUserInfo', 
		},
		masterList: {
			'john': {
					image: '/media/images/logo.png',
					name: 'John Doe', 
					title: 'Financial Analyst', 
					organization: 'Goldman Sachs', 
					school: 'Harvard Business School', 
					description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.', 
					twitterProfile: 'twitterid', 
					facebookProfile: 'facebookid', 
					googleProfile: 'gplusid', 
					linkedinProfile: 'gplusid', 
					email: 'email'
			} 
			// create new object for each person 
		},
		initialize: function(options){
			this.on('disabled', function(){
				console.log('disabled!'); 
				this.subviews[0].trigger('disabled'); 
			}, this); 
			this.on('enabled', function(){
				this.subviews[0].trigger('enabled'); 
			}, this);
		},
		updateMap: function(ev){

		},
		showUserInfo: function(ev){
			var id, userInfo, user; 
			id = ev.currentTarget.__data__,
			user = this.masterList[id], 
			userInfo = this.$el.find('#userInfo'); 

			//change content
			this.subviews[1].model.set(userInfo); 
			/*userInfo.find('#profileImg').attr('src', user.img); 
			userInfo.find('#profileUsername').text(user.name); 
			userInfo.find('#profileJob').text(user.title); 
			userInfo.find('#profileOrganization').text(user.organization); 
			userInfo.find('#profileDescription').text(user.description); 
			userInfo.find('#googleProfile').attr('href', user.googleplus); 
			userInfo.find('#facebookProfile').attr('href', user.facebook); 
			userInfo.find('#linkedinProfile').attr('href', user.linkedin); */

			//change css
			/*userInfo.css({
				'-webkit-transform':'translateX(0)', 
				'-moz-transform':'translateX(0)', 
				'transform':'translateX(0)', 
			});*/
			this.subviews[1].show(); 
		},
		render: function(){
			Page.View.prototype.render.call(this); 
			return this; 
		}
	}); 
	MapPage.Model = Page.Model.extend({
		defaults: {
			title: 'Map', 
			href: 'map', 
			header: '', 
			view: 'MapPage'
		}, 
		initialize: function(options){
			this.collection = new Backbone.Collection([new Map.Model, new UserInfo.Model]);
		}
	});	
	return MapPage; 
}); 