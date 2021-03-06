var $ = Backbone.$;

var ebooking = ebooking || {};

ebooking.AuthenticateModalView = Backbone.View.extend({
	className: 'ui-modal',
	
	render: function() {
		this.$el.html(this.template());
		this.$el.delegate('.close', 'click', this.closeModal);
		this.$error = this.$el.find('.error');
		return this;
	},
	
	closeModal: function(ev) {
		if(ev) ev.preventDefault();
		this.$el.unbind();
		this.$el.empty();
		this.$el.remove();
	},
	
	initialize: function() {
		_.bindAll(this, 'render', 'closeModal');
		return Backbone.View.prototype.initialize.call(this);
	}
});
