
var MouseEntity = require('./MouseEntity');

'use strict';

var self = {
	
	_elem: null,
	_scale: {x: 1, y: 1},
	mouseEntity: null,
	ctx: null,
	
	init: function() {
		this._elem = document.createElement('canvas');
		this.setSize(300, 300);
		this.ctx = this._elem.getContext('2d');
		this.mouseEntity = new MouseEntity();
		var thisSelf = this;
		this._elem.addEventListener('mousemove', function(e) {
			var pos = thisSelf.getPosition();
			thisSelf.mouseEntity.setPosition((e.pageX - pos.x), (e.pageY - pos.y));
		}, false);
	},
	
	getElem: function() {
		return this._elem;
	},
	
	getPosition: function() {
		var b = this._elem.getBoundingClientRect();
		return {
			x: (b.left + window.pageXOffset - document.documentElement.clientLeft),
			y: (b.top + window.pageYOffset - document.documentElement.clientTop)
		};
	},
	
	setScale: function(scaleX, scaleY) {
		this._scale.x = scaleX;
		this._scale.y = scaleY;
	},
	
	setSize: function(width, height) {
		this._elem.style.width = width + 'px';
		this._elem.style.height = height + 'px';
		this._elem.setAttribute('width', width * this._scale.x);
		this._elem.setAttribute('height', height * this._scale.y);
	},
	
	on: function(event, func) {
		this._elem.addEventListener(event, func, false);
		return this;
	},
	
	off: function(event, func) {
		this._elem.removeEventListener(event, func, false);
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
