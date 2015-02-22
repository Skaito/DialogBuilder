
var $ = require('../libs/jquery/jquery.min');
var Panel = require('./Panel');
var Canvas2D = require('./Canvas2D');

var self = $.extend(Object.create(Panel), {
	init: function(x, y, width, height) {
		Panel.init.call(this, x, y, width, height);
		this._backgroundColor = '#373737';
		return this;
	},
	render: function(ctx) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#616161';
		Canvas2D.roundRect(ctx, this._x + 0.5, this._y + 1.5, this._width, this._height - 1, 3, false, true);
		ctx.strokeStyle = '#202020';
		Canvas2D.roundRect(ctx, this._x + 0.5, this._y + 0.5, this._width, this._height - 1, 3, false, true);
		ctx.fillStyle = this._backgroundColor;
		ctx.strokeStyle = '#2b2b2b';
		Canvas2D.roundRect(ctx, this._x + 0.5, this._y + 1.5, this._width, this._height - 2, 3, true, true);
	}
});

module.exports = self;
