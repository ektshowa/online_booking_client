var ebooking = ebooking || {};

ebooking.SortRoomsView = Bacbone.View.extend({
	events: {
		'click #by_hotelID': 'sortByHotelID',
		'click #by_roomCategory': 'sortByRoomCategory',
		'click #by_price': 'sortByPrice',
	},
	sortByHotelID: function(ev) {
		this.rooms.reset(this.rooms.sortByHotelID());
	},
	sortByRoomCategory: function(ev) {
		this.rooms.reset(this.rooms.sortByRoomCategory());
	},
	sortByPrice: function(ev) {
		this.rooms.reset(this.rooms.sortByPrice());
	},
	initialize: function() {
		this.rooms = this.collection;
	}
});
