
var Class = require('../lang/Class');
var Panel = require('./Panel');
var Canvas2D = require('./Canvas2D');

'use strict';

var self = Class.create(Panel, {
	
	initialize: function(x, y, width, height) {
		Panel.prototype.initialize.call(this, x, y, width, height);
		this._backgroundColor = '#474747';
	},
	
	render: function(ctx) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#292929';
		ctx.fillStyle = this._backgroundColor;
		Canvas2D.roundRect(ctx, this._x + 0.5, this._y + 0.5, this._width, this._height, 3, true, true);
		ctx.strokeStyle = '#656565';
		ctx.beginPath();
		ctx.moveTo(this._x + 2.5, this._y + 1.5);
		ctx.lineTo(this._x + this._width - 3, this._y + 1.5);
		ctx.stroke();
	}
	
});

module.exports = self;
