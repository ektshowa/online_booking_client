Backbone.$ = $; 

var ebooking = ebooking || {};
var ENTER_KEY = 13;

var data = [
   {"id": 1, "roomNumber": 1, "roomCategory": "category 1","price": 50, "bedType":"simple", "description":"simple bed room", "selected": false},
   {"id": 2, "roomNumber": 3, "roomCategory": "category 2", "price": 150, "bedType":"king", "description":"king bed room", "selected": false},
   {"id": 3, "roomNumber": 5, "roomCategory": "category 3", "price": 200, "bedType":"double", "description":"double bed room", "selected": false}
];

var roomList = new ebooking.Rooms(data);
var room = roomList.get(1);
var roomView = new ebooking.RoomView({model: room});
var roomListView = new ebooking.RoomListView({collection: roomList});
//var ebookingObject = {rooms: roomList, RoomView: roomView, roomListView: roomListView};
var ebookingObject = new ebooking.MainRouter({el: $('#roomsList'), collection: roomList});

$(document).ready(function() {
	var router = new ebooking.MainRouter({el: $('#roomsList')});
	Backbone.history.start({
		root: '/'
	});
	console.log('Initialize EBooking ...');	
	return ebookingObject;
});


