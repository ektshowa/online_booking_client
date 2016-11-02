var ebooking = ebooking || {};

var $ = Backbone.$;

var htmlHeader = '<header> \
                     <a href="#">Home</a> \
                        <nav id="controls"> \
                            <p>Sort:</p> \
                            <button id="prev">Previous</button> \
                            <button id="next">Next</button> \
                            <p>Sort:</p> \
                            <button id="by_hotelID">By Hotel</button> \
                            <button id="by_roomCategory">By Room Category</button> \
                            <button id="by_price">By Price</button> \
                            <div id="filter-controls"> \
                                <select name="roomCategory"> \
                                    <option value="all">All</option> \
                                    <option value="category 1">Category 1</option> \
                                    <option value="category 2">Category 2</option> \
                                    <option value="category 3">Category 3</option> \
                                </select> \
                            </div> \
                        </nav> \
                        <nav id="session"> \
                        </nav> \
                        <span id="info"> \
                        </span> \
                   </header>';  
var htmlContent = '<div id="overview"></div> \
                   <div id="roomDetails"></div>';

ebooking.Layout = Backbone.View.extend({
	
	template: _.template(htmlHeader + htmlContent),
	
	render: function() {
		//this.$el.append(this.roomsListView.render().el);
		this.$el.html(this.template());
		this.currentDetails.setElement(this.$('#roomDetails')).render();
		this.overview.setElement(this.$('#overview')).render();
		this.controls.setElement(this.$('#controls'));
		this.navbar.setElement(this.$('#session')).render();
		return this;
	},
	initialize: function(options) {
		//this.roomsListView = new ebooking.RoomListView({
		//	el: options.el,
		//	collection: options.collection,
		//	router: options.router
		//});
		_.bindAll(this, "render");
		this.overview = new ebooking.RoomListView({
			collection: options.router.roomsList,
			router: options.router
		});
		this.currentDetails = new ebooking.ChoseRoomView();
		var superset = new Backbone.Collection(options.router.roomsList.models);
		this.controls = new ebooking.ControlsView({ collection: options.router.roomsList, superset: superset});
		this.navbar = new ebooking.NavbarView();
	},
	setRoomDetails: function(room) {
		if (this.currentDetails) this.currentDetails.remove();
		this.currentDetails = new ebooking.RoomDetailsView({model: room});
		this.render();
	},
	setChose: function() {
		if (this.currentDetails) this.currentDetails.remove();
		this.currentDetails = new ebooking.ChoseRoomView();
		this.render();
	}
	
});

var instance;
ebooking.Layout.getInstance = function(options) {
	if (!instance) {
		instance = new ebooking.Layout({
			el: options.el,
			router: options.router,
			collection: options.router.roomsList
		});
	}
	return instance;
};




