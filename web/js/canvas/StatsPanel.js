
var $ = require('../libs/jquery/jquery.min');
var Entity = require('./Entity');

var self = $.extend(Object.create(Entity), {

	_delta: 0,

	init: function() {
		Entity.init.call(this);
		return this;
	},

	act: function(delta) {
		this._delta = delta;
	},

	render: function(ctx) {
		ctx.fillStyle = "#ffffff";
		ctx.font = "18px arial";
		ctx.fillText("FPS: " + (Math.round(100000 / this._delta) / 100), 10, 68);
	}

});

module.exports = self;
