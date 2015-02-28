
var Class = require('../lang/Class');
var Entity = require('./Entity');
var Canvas2D = require('./Canvas2D');

var self = Class.create(Entity, {
	_x: 0,
	_y: 0,
	_width: 100,
	_height: 100,
	_backgroundColor: '#444444',

	initialize: function(x, y, width, height) {
		Entity.prototype.initialize.call(this);
		this._x = x;
		this._y = y;
		if (width) this._width = width;
		if (height) this._height = height;
	},

	setPosition: function(x, y) {
		this._x = x;
		this._y = y;
	},

	getPosition: function() {
		return {x: this._x, y: this._y};
	},

	setSize: function(width, height) {
		this._width = width;
		this._height = height;
	},

	getSize: function() {
		return {width: this._width, height: this._height};
	},

	setBackgroundColor: function(color) {
		this._backgroundColor = color;
	},

	getBackgroundColor: function() {
		return this._backgroundColor;
	},

	hitTest: function(p) {
		if (!p) return false;
		return (p.x >= this._x && p.x <= (this._x + this._width) && p.y >= this._y && p.y <= (this._y + this._height));
	},

	renderShadow: function(ctx) {
		ctx.save();
		ctx.lineWidth = 0;
		ctx.shadowColor = '#000000';
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		Canvas2D.roundRect(ctx, this._x + 0.5, this._y + 0.5, this._width, this._height, 5, false, true);
		ctx.restore();
	},

	renderBody: function(ctx) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#656565";
		ctx.fillStyle = this._backgroundColor;
		Canvas2D.roundRect(ctx, this._x + 0.5, this._y + 0.5, this._width, this._height, 5, true, true);
	},

	render: function(ctx) {
		this.renderShadow(ctx);
		this.renderBody(ctx);
	}
});

module.exports = self;
