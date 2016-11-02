var ebooking = ebooking || {};

ebooking.RoomListView = Backbone.View.extend({
	tagName: 'section',
	
	initialize: function(options) {
		this.router = options.router;
		this.collection = options.collection;
		this.listenTo(this.collection, 'reset', this.render);
	},
	render: function() {
		var that = this;
		var roomsView = this.collection.map(function(room) {
			return (new ebooking.RoomView({model: room, router: that.router})).render().el;
		});
		this.$el.html(roomsView);
		return this;
	}
});
