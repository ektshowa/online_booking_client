var ebooking = ebooking || {};

var $ = Backbone.$;

ebooking.ControlsView = Backbone.View.extend({
	events: {
		'click #by_hotelID': 'sortByHotelID',
		'click #by_roomCategory': 'sortByRoomCategory',
		'click #by_price': 'sortByPrice',
		'change select[name="roomCategory"]': 'selectRoomCategory'
	},
	
	selectRoomCategory: function(ev) {
		var roomCat = $("select[name='roomCategory']").val();
		var that = this;
		if (roomCat === "all") {
			that.collection.reset(that.superset.toJSON());
		}
		else {
			that.collection.reset(that.superset.toJSON());
			this.filterByRoomCategory(roomCat);
		}
	},
	
	filterByRoomCategory: function(roomCategory) {
		var filtered = this.rooms.filter(function(m) {
			return m.attributes.roomCategory === roomCategory;
			//return (_.indexOf(m.get('roomCategory'), m.roomCategory) !== -1);
		});
		this.collection.reset(filtered);
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
	initialize: function(options) {
		this.rooms = this.collection;
		this.superset = options.superset;
	}
});
