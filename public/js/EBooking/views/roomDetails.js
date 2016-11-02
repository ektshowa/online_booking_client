var $ = Backbone.$;

var ebooking = ebooking || {};
//var room = new ebooking.Room({"id": 3, "roomNumber": 5, "roomCategory": "category 3", "price": 200, "bedType":"double", "description":"double bed room", "selected": false});

ebooking.RoomDetailsView = Backbone.View.extend({
	el: '#roomDetails',
	template: _.template('<%= roomCategory %> <br> <%= description %> <br> <a href="#" class="addToCart">Add room to cart</a>'),
	//events: {
	//    'click .addToCart': '_setCartContent',	
	//},
	_setCartContent: function() {
		//if (this.cartView) this.cartView.remove();
		this.cartView = new ebooking.CartView({model: room});
		alert("this cart view ROOM DETAIL");
		//this.render();
		//this.cartView.setElement(this.$('#cart')).render();
		//$('#cart').append(this.cartView.render());
		this.router.navigate("/add-room-to-cart/", {trigger: true, replace: true});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		//this.$el.delegate('.addToCart', 'click', this.setCartContent);
		return this;
	},
	initialize: function(options) {
		this.router = options.router;
	}
});
