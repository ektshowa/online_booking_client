var ebooking = ebooking || {};

ebooking.RoomView = Backbone.View.extend({
	tagName: 'article',
	className: 'room',
	template: _.template( $('#room-item-template').html()),
	
	events: {
		'click': '_selectRoom'
	},
	render: function() {
		this.$el.html( this.template(this.model.attributes));
		this.$el.toggleClass('selected', this.model.get('selected'));
		return this;
	},
	_selectRoom: function(ev) {
		ev.preventDefault();
		if (!this.model.get('selected')) {
		   console.log("room view");
		   console.log(this.model);	
		   this.model.collection.resetSelected();
		   this.model.collection.selectByID(this.model.id);
		   this.router.navigate("/rooms/" + this.model.id, {trigger: true, replace: true});
		   //console.log($(ev.currentTarget).html());
		   //console.log(this.model);	
		}	
	},
	initialize: function(options) {
		_.bindAll(this, "render");
		this.listenTo(this.model, 'change:roomCategory', this.render);
		this.listenTo(this.model, 'change:selected', this.render);
		this.router = options.router;
	}
});
