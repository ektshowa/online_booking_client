var ebooking = ebooking || {};

ebooking.Room = Backbone.Model.extend({
	defaults: {
		id:0,
		roomCategory: "empty",
		roomNumber: 0,
		price: 0,
		NumberOfBeds: 0,
		bedType: "empty",
		description: "empty",
		selected: false
	},
	
	//Convert an epoch timestamp to a date object
	toShowtimeDate: function() {
		var d = new Date(0);
		d.setUTCSeconds(this.get('showtime'));
		return d;
	},
	// Show a Date in the local timezone
	showtimeToString: function() {
		return this.toShowtimeDate().toLocaleString();
	}	
});


