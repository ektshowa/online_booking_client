var $ = Backbone.$;

var ebooking = ebooking || {};

var navbarhtml = $('#loginNavbar').html();
var navbartemplate = Handlebars.compile(navbarhtml);

ebooking.NavbarView = Backbone.View.extend({
	template: navbartemplate,
	
	initialize: function() {
		_.bindAll(this, 'render', 'login', 'register', 'logout');
		
		this.session = ebooking.Session.getInstance();
		this.loginView = new ebooking.LoginView();
		this.registerView = new ebooking.RegisterView();
		this.listenTo(this.session, 'all', function(ev) { console.log(ev); });
		this.listenTo(this.session, 'login:success', this.render);
		this.listenTo(this.session, 'logout:success', this.render);
	},
	render: function() {
		var session = this.session.currentUser();
		this.$el.html(this.template({session: session}));
		
		if (session) {
			this.$el.delegate('.logout', 'click', this.logout);
		}
		else {
			this.$el.delegate('.login', 'click', this.login);
			this.$el.delegate('.register', 'click', this.register);
		}
		//this.setElement(this.$('#session')).render();
		return this;
	},
	login: function(ev) {
		ev.preventDefault();
		$('body').append(this.loginView.render().el);
		
	},
	register: function(ev) {
		ev.preventDefault();
		$('body').append(this.registerView.render().el);
	},
	logout: function(ev) {
		ev.preventDefault();
		this.session.logout();
	},
	
});
