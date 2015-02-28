
var $ = require('jquery');
var Panel = require('./Panel');
var Canvas2D = require('./Canvas2D');

var self = $.extend(Object.create(Panel), {
	ALIGN_LEFT: 'left',
	ALIGN_CENTER: 'center',
	ALIGN_RIGHT: 'right',
	ALIGN_TOP: 'top',
	ALIGN_MIDDLE: 'middle',
	ALIGN_BOTTOM: 'bottom',

	_font: '12px arial',
	_color: '#ffffff',
	_text: null,
	_vAlign: null,
	_hAlign: null,
	init: function(text, x, y, width, height) {
		Panel.init.call(this, x, y, width, height);
		this._text = text;
		this._vAlign = this.ALIGN_TOP;
		this._hAlign = this.ALIGN_LEFT;
		return this;
	},
	setFont: function(font) {
		this._font = font;
	},
	setColor: function(color) {
		this._color = color;
	},
	setText: function(text) {
		this._text = text;
	},
	getText: function() {
		return this._text;
	},
	setVerticalAlignment: function(align) {
		this._vAlign = align;
	},
	setHorizontalAlignment: function(align) {
		this._hAlign = align;
	},
	render: function(ctx) {
		if (typeof this._text === 'string' || typeof this._text === 'number') {
			//ctx.fillStyle = "#000000"; ctx.fillRect(this._x, this._y, this._width, this._height);
			ctx.fillStyle = this._color;
			ctx.font = this._font;
			//var tm = ctx.measureText(this._text);
			var x = this._x, y = this._y;
			if (this._vAlign === this.ALIGN_BOTTOM) {
				y = this._y + this._height;
				ctx.textBaseline = 'bototm';
			} else if (this._vAlign === this.ALIGN_MIDDLE || this._vAlign === this.ALIGN_CENTER) {
				y = this._y + (this._height / 2);
				ctx.textBaseline = 'middle';
			} else {
				ctx.textBaseline = 'top';
			}
			if (this._hAlign === this.ALIGN_RIGHT) {
				x = this._x + this._width;
				ctx.textAlign = 'bottom';
			} else if (this._hAlign === this.ALIGN_CENTER || this._hAlign === this.ALIGN_MIDDLE) {
				x = this._x + (this._width / 2);
				ctx.textAlign = 'center';
			} else {
				ctx.textAlign = 'left';
			}
			ctx.fillText(this._text, x, y);
		}
	}
});

module.exports = self;
