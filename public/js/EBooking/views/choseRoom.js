var ebooking = ebooking || {};

ebooking.ChoseRoomView = Backbone.View.extend({
	template: '<h1>Welcome to EBooking</h1> \
	           <h2>Please chose the room category to book</h2>',
	           
	render: function() {
		this.$el.html(this.template);
		return this;
	}

});
