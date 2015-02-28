
var Class = require('../lang/Class');
var Entity = require('./Entity');

'use strict';

var self = Class.create(Entity, {

	_delta: 0,

	initialize: function() {
		Entity.prototype.initialize.call(this);
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
