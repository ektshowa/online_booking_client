var ebooking = ebooking || {};

ebooking.Rooms = Backbone.Collection.extend({
	model: ebooking.Room,
	//url: 'http://0.0.0.0:5000/index.get.json/1',
	
	// Unselect all models
	resetSelected: function() {
		this.each(function(model) {
			model.set({"selected": false});
		});
	},
	
	getSelected: function() {
        return this.pluck('selected').indexOf(true);
    },
	
	// Select a specific model from the collection
	selectByID: function(id) {
		this.resetSelected();
		var room = this.get(id);
		room.set({"selected": true});
		return room.id;
	},
	sortByHotelID: function() {
		return this.sortBy('hotelID');
	},
	sortByRoomCategory: function() {
		return this.sortBy('roomCategory');
	},
	sortByPrice: function() {
		return this.sortBy('price');
	},
	//Example of how to delay a response from the server
	//delayedFetch: function(delay) {
	//	return this.fetch({headers: {"X-DELAY": delay}});
	//}
});




//ebooking.Rooms = new RoomsList(data);



