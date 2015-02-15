
define(['jquery', 'canvas/Panel', 'canvas/Canvas2D'], function($, Panel, Canvas2D) {
	
	var self = $.extend(Object.create(Panel), {
		init: function(x, y, width, height) {
			Panel.init.call(this, x, y, width, height);
			this._backgroundColor = '#474747';
			return this;
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
	
	return self;
});
