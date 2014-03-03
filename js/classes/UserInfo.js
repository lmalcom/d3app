define(['UIElement','Form'], function(UIElement, Form){
	var UserInfo = {}; 

	//Page View 
	UserInfo.View = UIElement.View.extend({ 
		id: 'userInfo', 
		events: { 
			'touch #hidebtn': 'hide', 
			'click #hidebtn': 'hide' 
		}, 
		template: _.template('<a id="hidebtn" class="btn">Hide</a><div id="profileInfo"><figure><img id="profileImg" src="<%= image %>"><figcaption><h3 id="profileUsername"><%= name %></h3><p><i id="profileJob"><%= title %></i></p><p><i id="profileOrganization"><%= organization %></i></p></figcaption></figure><p id="profileDescription"><%= description %></p></div><div id="profileSocial"><a id="googleProfile" href="<%= googleProfile %>"><img  src="images/social/googlesmall.png"/></a><a id="facebookProfile" href="<%= facebookProfile %>"><img src="images/social/facebooksmall.png"/></a><a id="linkedinProfile" href="<%= linkedinProfile %>"><img id="linkedinProfile" src="images/social/linkedin.svg"/></a></div>'), 
		initialize: function(options){
			var view = this; 
			Form.View.prototype.initialize.call(this, options); 
			console.log(this); 
			this.listenTo(this.model, 'change', this.render); 
		},
		hide: function(event){
			this.$el.css({
				'-webkit-transform':'translateX(-100%)', 
				'-moz-transform':'translateX(-100%)',
				'transform':'translateX(-100%)'
			}); 	
			return this; 
		},
		show: function(ev){
			this.$el.css({
				'-webkit-transform':'translateX(0)', 
				'-moz-transform':'translateX(0)', 
				'transform':'translateX(0)', 
			});
		}
	});  
	UserInfo.Model = UIElement.Model.extend({
		defaults: {
			view: 'UserInfo', 
			image: 'images/logo.png',
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
		}, 
	}); 
	return UserInfo; 
}); 