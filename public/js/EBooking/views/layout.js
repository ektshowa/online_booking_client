var ebooking = ebooking || {};

var $ = Backbone.$;

var htmlHeader = '<div class="page-header"> \
        <h1>The Online Hotel Booking Place</h1> \
        <p> \
            Please feel free to browse the rooms list. Use the filter to view only the rooms category \
            you are interested in or sort by any available criteria. \
        </p> \
        <nav id="controls"> \
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
        <div id="message"> \
        </div> \
     </div>';  
var htmlContent = '<div class="row"> \
                       <div class="col-xs-12 col-sm-6 col-md-8" id="listAndDetails"> \
                           <div class="row" id="roomsList"> \
                               <div class="col-xs-6 col-sm-4" id="overview">Rooms</div> \
                               <div class="clearfix visible-xs-block"></div> \
                               <div class="col-xs-6 col-sm-7" id="roomDetails">DETAILS</div> \
                           </div> \
                       </div> \
                       <div class="col-xs-6 col-md-4" id="adminAndMore" style="border:1px solid green;"> \
                           <div class="row"> \
                               <div class="col-xs-6 col-md-4" id="admin" style="border:1px solid green;"></div> \
                           </div> \
                           <div class="row"> \
                               <div class="col-xs-6 col-md-4" id="cart" style="border:1px solid blue; margin-top:20px;"></div>\
                           </div> \
                       </div> \
                   </div>';
 

ebooking.Layout = Backbone.View.extend({
	
	template: _.template(htmlHeader + htmlContent),
	
	render: function() {
		//this.$el.append(this.roomsListView.render().el);
		this.$el.html(this.template());
		this.currentDetails.setElement(this.$('#roomDetails')).render();
		this.overview.setElement(this.$('#overview')).render();
		this.controls.setElement(this.$('#controls'));
		this.navbar.setElement(this.$('#admin')).render();
		//this.cartView.setElement(this.$('#cart')).render();
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
		this.cartView = new ebooking.CartView();
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
	},
	setCartContent: function(room) {
		if (this.cartView) this.cartView.remove();
			this.cartView = new ebooking.CartView({model: room});
			//this.render();
			this.cartView.setElement(this.$('#cart')).render();
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




