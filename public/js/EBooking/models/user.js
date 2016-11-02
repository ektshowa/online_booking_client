var ebooking = ebooking || {};

ebooking.User = Backbone.Model.extend({
	defaults: {
		username: '',
		password: '',
		email: ''
	},
	
	urlRoot: 'https://mailinglistmanager.local',
	
	validate: function(attrs) {
		var errors = this.errors = {};
		if (!attrs.firstname) errors.firstname = 'firstname is required';
		if (!attrs.lastname) errors.firstname = 'lastname is required';
		if (!attrs.password) errors.password = 'password is required';
		if (!attrs.email) errors.email = 'email is required';
		if (!_.isEmpty(errors)) return errors;
	},
	
	signup: function(attrs) {
		var that = this;
		this.save(attrs, {success: function(model, response) {
			that.trigger('signup:success');
		    },
		    error: function(model, response) {
		    	var error = JSON.parse(response.responsetext).error;
		    	that.validationError = {"username": error};
		    	that.trigger('invalid', that);
		    }
		});
    },
    
    
    save: function(attrs, options) {
    /*
    	options || (options = {});
    	
    	options.contentType = 'application/json';
    	options.data = JSON.stringify(attrs);
    	return Backbone.Model.prototype.save.call(this, attrs, options);
    */
        var userdata = JSON.stringify(attrs);
        var that = this;
        
        $.ajax({type: 'POST', //dataType: 'json', contentType: "application/json",
    	    url: "http://mailinglistmanager.local/index.php/register-subscriber", data: userdata})
    	    .done(function(data) {
    	    	that.user = new ebooking.User(data);
    	    	that.trigger('login:success');
    	    })
    	    .fail(function(response) {
    	    	alert("IN FAIL");
    	    	var error = JSON.parse(response.responseText).error;
    	    	console.log(error);
    	    	that.validationError = {'username': error};
    	    	that.trigger('invalid', that);
    	});
    }
    
});
