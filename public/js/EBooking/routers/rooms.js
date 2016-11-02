var ebooking = ebooking || {};

var data = [
   {"id": 1, "roomNumber": 1, "roomCategory": "category 1","price": 50, "bedType":"simple", "description":"simple bed room", "selected": false, "hotelID":1, "hotelName": "Hotel One"},
   {"id": 2, "roomNumber": 3, "roomCategory": "category 2", "price": 150, "bedType":"king", "description":"king bed room", "selected": false, "hotelID":1, "hotelName": "Hotel One"},
   {"id": 3, "roomNumber": 5, "roomCategory": "category 3", "price": 100, "bedType":"double", "description":"double bed room", "selected": false, "hotelID":1, "hotelName": "Hotel One"},
   {"id": 4, "roomNumber": 1, "roomCategory": "category 1","price": 50, "bedType":"simple", "description":"simple bed room", "selected": false, "hotelID":2, "hotelName": "Hotel Two"},
   {"id": 5, "roomNumber": 3, "roomCategory": "category 2", "price": 150, "bedType":"king", "description":"king bed room", "selected": false, "hotelID":2, "hotelName": "Hotel Two"},
   {"id": 6, "roomNumber": 5, "roomCategory": "category 3", "price": 100, "bedType":"double", "description":"double bed room", "selected": false, "hotelID":2, "hotelName": "Hotel Two"},
   {"id": 7, "roomNumber": 1, "roomCategory": "category 1","price": 50, "bedType":"simple", "description":"simple bed room", "selected": false, "hotelID":3, "hotelName": "Hotel Three"},
   {"id": 8, "roomNumber": 3, "roomCategory": "category 2", "price": 150, "bedType":"king", "description":"king bed room", "selected": false, "hotelID":3, "hotelName": "Hotel Three"},
   {"id": 9, "roomNumber": 5, "roomCategory": "category 3", "price": 100, "bedType":"double", "description":"double bed room", "selected": false, "hotelID":3, "hotelName": "Hotel Three"}
];
var roomsList = new ebooking.Rooms(data);
//var roomsListView = new ebooking.RoomListView({collection: roomsList});

ebooking.MainRouter = Backbone.Router.extend({
	routes: {
		'rooms/:id': 'selectRoom',
		'/add-room-to-cart/': 'addRoomToCart',
		'': 'showMain'
	},
	selectRoom: function(id) {
		this.roomsList.resetSelected();
		this.roomsList.selectByID(id);
		this.layout.setRoomDetails(this.roomsList.get(id));
	},
	//Here the roomsList collection is used.
	//Have to create another collection of models that can
	//represent all the object that can be added to the cart
	addRoomToCart: function() {
		this.layout.setCartContent(this.roomsList.getSelected());
	},
	showMain: function() {
		//this.roomsListView.render();
		this.roomsList.resetSelected();
		this.layout.setChose();
	},
	initialize: function(options) {
		this.roomsList = roomsList;
		
		//this.navbar = new ebooking.NavbarView({el: "#session"});
		this.roomsListView = new ebooking.RoomListView({
					el: options.elRoomsList,
					collection: roomsList
				});
				_.extend(this.roomsListView, {router: this});
				this.roomsListView.render();
		this.layout = ebooking.Layout.getInstance({
			el: '#container', elRoomsList: '#overview', router: this
		});
		this.layout.render();
	}
});
