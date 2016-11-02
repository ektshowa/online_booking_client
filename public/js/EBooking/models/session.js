var ebooking = ebooking || {};

ebooking.Session = Backbone.Model.extend({
    isValid: function(callback) {
	
    },
    login: function(email, password) {
    	var that = this;
    	
    	var credentials = JSON.stringify({email: email, password: password});
    	
    	$.ajax({type: 'POST', //dataType: 'json', contentType: "application/json",
    	    //url: "http://mailinglistmanager.local?service=LoginServices&action=doLogin", data: credentials})
    	    url: "http://mailinglistmanager.local/index.php/login-subscriber", data: credentials})
    	    .done(function(data) {
    	    	that.user = new ebooking.User(data);
    	    	console.log("IN LOGIN EVENT");
    	    	console.log(data);
    	    	that.trigger('login:success');
    	    })
    	    .fail(function(response) {
    	    	alert("IN FAIL");
    	    	var error = JSON.parse(response.responseText).error;
    	    	console.log(error);
    	    	that.validationError = {'username': error};
    	    	that.trigger('invalid', that);
    	});
    },	
    	
    currentUser: function() {
    	if (this.user && (this.user.get('auth') == 'OK')) {
    	    return this.user;	
        }
        else {
        	return false;
        }
    },
    
    logout: function() {
    	var that = this;
    	$.ajax({type: 'DELETE', dataType: 'json', contentType: 'application/json',
    	        url: 'http://mailinglistmanager.local/'})
    	      .done(function(data) {
    	      	that.user.set('auth', 'NOK');
    	      	that.trigger('logout:success');
    	});
    }
});

var session;
ebooking.Session.getInstance = function() {
	if (!session) {
		session = new ebooking.Session();
	}
	return session;
};


