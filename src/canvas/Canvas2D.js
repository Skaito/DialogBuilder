
var $ = require('jquery');
var MouseEntity = require('./MouseEntity');
	
var self = {
	
	_elem: null,
	mouseEntity: null,
	ctx: null,
	
	init: function() {
		this._elem = $('<canvas>').css({width: '100%', height: '100%'}).attr({width: 300, height: 300});
		this.ctx = this._elem.get(0).getContext("2d");
		this.mouseEntity = new MouseEntity();
		var thisSelf = this;
		this._elem.on('mousemove', function(e) {
			var off = thisSelf._elem.offset();
			thisSelf.mouseEntity.setPosition((e.pageX - off.left), (e.pageY - off.top));
		});
	},
	
	getElem: function() {
		return this._elem;
	},
	
	on: function(event, func) {
		this._elem.on(event, func);
		return this;
	},
	
	off: function(event, func) {
		this._elem.off(event, func);
		return this;
	},

	/**
	 * Draw round rectangle
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} radius
	 * @param {Boolean|Function} fill
	 * @param {Boolean|Function} stroke
	 */
	roundRect: function(ctx, x, y, width, height, radius, fill, stroke) {
		if (typeof stroke === "undefined") {
			stroke = true;
		}
		if (typeof radius === "undefined") {
			radius = 5;
		}
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		if (fill) {
			if (typeof fill === 'function') fill();
			ctx.fill();
		}
		if (stroke) {
			if (typeof stroke === 'function') stroke();
			ctx.stroke();
		}
	}
	
};

module.exports = self;
