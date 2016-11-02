var ebooking = ebooking || {};

var loginhtml = $('#login-template').html();
var logintemplate = Handlebars.compile(loginhtml);

ebooking.LoginView = ebooking.AuthenticateModalView.extend({
	template: logintemplate,
	
	events: {
		'submit': 'login'
	},
	render: function() {
		ebooking.AuthenticateModalView.prototype.render.call(this);
		this.delegateEvents();
		this.$error = this.$el.find('.error');
		return this;
	},
	login: function(ev) {
		ev.preventDefault();
		var username = $('input[name=username]').val();
		var password = $('input[name=password]').val();
		
		var that = this;
		ebooking.Session.getInstance().login(username, password);
	},
	
	initialize: function() {
		this.session = ebooking.Session.getInstance();
		this.listenTo(this.session, 'login:success', this.closeModal);
		return ebooking.AuthenticateModalView.prototype.initialize.call(this);
	}
	
});
