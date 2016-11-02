var ebooking = ebooking || {};

var registerhtml = $('#register-template').html();
var registertemplate = Handlebars.compile(registerhtml);

ebooking.RegisterView = ebooking.AuthenticateModalView.extend({
	
	template: registertemplate,
	
	events: {
		'submit': 'registerUser',
	},
	
	render: function() {
		ebooking.AuthenticateModalView.prototype.render.call(this);
		this.delegateEvents();
		return this;
	},
		
	registerUser: function(ev) {
		ev.preventDefault();
		this.user.clear();
		var firstname = $('input[name=firstname]').val();
		var lastname = $('input[name=lastname]').val();
		var addressline1 = $('input[name=addressline1]').val();
		var password = $('input[name=password]').val();
		var email = $('input[name=email]').val();
		var role = $('input[name=role]').val();
		
		this.user.signup({firstname: firstname,
			              lastname: lastname,
			              password: password,
			              addressline1: addressline1,
			              email: email,
			              role: role
		});
     },
		
	//registerUser: registerUser,
	
	renderError: function(err, options) {
		var errors = _.map(_.keys(err.validationError), function(key) {
			return err.validationError[key];
		});
		this.$error.text(errors);
	},
	
	renderThanks: function() {
		this.$el.find('.register').html('thanks for signup');
	},
	
	initialize: function() {
		this.user = new ebooking.User();
		this.listenTo(this.user, 'all', function(ev) { console.log(ev);});
		this.listenTo(this.user, 'invalid', this.renderError);
		//this.listenTo(this.user, 'signup:success', this.renderThanks);
		this.listenTo(this.user, 'signup:success', this.closeModal);
		return ebooking.AuthenticateModalView.prototype.initialize.call(this);
	}
});
