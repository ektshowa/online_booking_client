var ebooking = ebooking || {};

var cartTemplate = '<%= roomCategory %> <br> <%= price %> <br>';
    cartTemplate += '<%= bedType %> <br> <a href="add-room-to-cart/" class="addToCart">Order</a>';
    
ebooking.CartView = Backbone.View.extend({
	el: '#cart',
	template: _.template(cartTemplate),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		alert("in cart view IN CART VIEW");
		return this;
	}
});
