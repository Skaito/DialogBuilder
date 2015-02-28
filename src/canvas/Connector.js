
var $ = require('jquery');
var Entity = require('./Entity');
	
var self = $.extend(Object.create(Entity), {

	/** @type NodeIO */
	source: null,
	/** @type NodeIO */
	target: null,
	defaultTarget: null,
	_pS: null,
	_pT: null,
	_pA: null,
	_rot: 0,

	init: function() {
		Entity.init.call(this);
		this._pS = {x: 0, y: 0};
		this._pT = {x: 0, y: 0};
		this._pA = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
		return this;
	},

	act: function(delta) {
		if (this.source) {
			var pos = this.source.getPosition();
			this._pS.x = pos.x;
			this._pS.y = pos.y;
		} else {
			this._pS.x = this._pS.y = 0;
		}
		if (this.target) {
			var pos = this.target.getPosition();
			this._pT.x = pos.x;
			this._pT.y = pos.y;
		} else if (this.defaultTarget) {
			var pos = this.defaultTarget.getPosition();
			this._pT.x = pos.x;
			this._pT.y = pos.y;
		} else {
			this._pT.x = this._pT.y = 0;
		}
		var a = this._pS.x - this._pT.x,
			b = this._pS.y - this._pT.y,
			c = Math.sqrt(a*a + b*b),
			r = -Math.asin(b / c);
		if (this._pS.x > this._pT.x) {
			this._rot = Math.PI - r;
		} else if (r < 0) {
			this._rot = Math.PI + Math.PI + r;
		} else {
			this._rot = r;
		}
		if (this.target) {
			var r = this._rot - Math.PI;
			this._pT.x += (Math.cos(r) * 14);
			this._pT.y += (Math.sin(r) * 14);
		} else {
			var r = this._rot - Math.PI;
			this._pT.x += (Math.cos(r) * 5);
			this._pT.y += (Math.sin(r) * 5);
		}
		var hs = 9, hr = 9, rl = this._rot - (Math.PI * (hr - 1) / hr), rr = this._rot - (Math.PI * (hr + 1) / hr);
		this._pA[0].x = this._pT.x + (Math.cos(this._rot) * 5);
		this._pA[0].y = this._pT.y + (Math.sin(this._rot) * 5);
		this._pA[1].x = this._pA[0].x + (Math.cos(rl) * hs);
		this._pA[1].y = this._pA[0].y + (Math.sin(rl) * hs);
		this._pA[2].x = this._pA[0].x + (Math.cos(rr) * hs);
		this._pA[2].y = this._pA[0].y + (Math.sin(rr) * hs);

	},

	render: function(ctx) {	
		if (this.source && (this.target || this.defaultTarget)) {
			// line
			ctx.beginPath();
			ctx.moveTo(this._pS.x, this._pS.y);
			ctx.lineTo(this._pT.x, this._pT.y);
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#ffffff";
			ctx.stroke();

			//head
			ctx.beginPath();
			ctx.moveTo(this._pA[0].x, this._pA[0].y);
			ctx.lineTo(this._pA[1].x, this._pA[1].y);
			ctx.lineTo(this._pA[2].x, this._pA[2].y);
			ctx.lineTo(this._pA[0].x, this._pA[0].y);
			ctx.fillStyle = "#ffffff";
			ctx.fill();

			/*
			ctx.fillStyle = "#ffffff";
			ctx.font = "14px arial";
			ctx.fillText("R: " + (Math.round(this._rot * 100) / 100), this._pS.x, this._pS.y - 10);
			*/
		}
	}

});

module.exports = self;
