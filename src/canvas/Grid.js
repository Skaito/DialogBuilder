
var Class = require('../lang/Class');
var Entity = require('./Entity');

'use strict';

var self = Class.create(Entity, {
	
	_width: 0,
	_height: 0,
	_size: 20,
	_delta: 0,
	
	initialize: function() {
		Entity.prototype.initialize.call(this);
	},
	
	resize: function(width, height) {
		this._width = width;
		this._height = height;
	},
	
	act: function(delta) {
		this._delta = delta;
	},
	
	render: function(ctx) {
		var x, y;
		ctx.beginPath();
		for (y = 0.5; y < this._height; y += this._size) {
			if (y === 0) continue;
			ctx.moveTo(0, y);
			ctx.lineTo(this._width, y);
		}
		for (x = 0.5; x < this._width; x += this._size) {
			if (x === 0) continue;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, this._height);
		}
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#3a4345";
		ctx.stroke();
	}
	
});

module.exports = self;
