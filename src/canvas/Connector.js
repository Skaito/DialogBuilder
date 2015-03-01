
var Class = require('../lang/Class');
var Point = require('../math/Point');
var Entity = require('./Entity');

'use strict';

var self = Class.create(Entity, {
	
	__static__: {
		STATE_NORMAL: 0,
		STATE_HOVER: 1
	},
	
	/** @type NodeIO */
	source: null,
	/** @type NodeIO */
	target: null,
	defaultTarget: null,
	_pS: null,
	_pT: null,
	_pA: null,
	_rot: 0,
	_state: null,
	_endGrab: true,

	initialize: function() {
		Entity.prototype.initialize.call(this);
		this._state = self.STATE_NORMAL;
		this._pS = new Point(0, 0);
		this._pT = new Point(0, 0);
		this._pA = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
	},
	
	/**
	 * Set state on of STATE_* constants
	 * @param {Number} state
	 */
	setState: function(state) {
		this._state = state;
	},
	
	/**
	 * Test collision with point p
	 * @param {Point} p
	 * @return {Boolean}
	 */
	hitTest: function(p) {
		var d0 = this._pS.distance(this._pT),
			d1 = this._pS.distance(p),
			d2 = this._pT.distance(p);
		if (d1 < d0 && d2 < d0 && ((d1 + d2) - d0) < 0.08) {
			return true;
		}
		return false;
	},

	act: function(delta) {
		if (this.source && this.target && this._state === self.STATE_HOVER) {
			var p = this.defaultTarget.getPosition(),
			d1 = this._pS.distance(p),
			d2 = this._pT.distance(p);
			this._endGrab = (d1 >= d2);
		}
		if (this.source) {
			var pos = this.source.getPosition();
			this._pS.x = pos.x;
			this._pS.y = pos.y;
		} else if (this.target && this.defaultTarget) {
			var pos = this.defaultTarget.getPosition();
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
		if (this.source) {
			r = this._rot;
			this._pS.x += (Math.cos(r) * 9);
			this._pS.y += (Math.sin(r) * 9);
		}
		if (this.target) {
			r = this._rot - Math.PI;
			this._pT.x += (Math.cos(r) * 14);
			this._pT.y += (Math.sin(r) * 14);
		} else {
			r = this._rot - Math.PI;
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
		if ((this.source && (this.target || this.defaultTarget)) || (this.target && (this.source || this.defaultTarget))) {
			if (this._state === self.STATE_HOVER) {
				ctx.shadowColor = '#ffffff';
				//ctx.shadowColor = 'yellow';
				//ctx.shadowOffsetY = 10;
				//ctx.shadowOffsetX = 10;
				ctx.shadowBlur = 6;
				ctx.strokeStyle = "yellow";
				ctx.fillStyle = "yellow";
			} else {
				ctx.strokeStyle = "#ffffff";
				ctx.fillStyle = "#ffffff";
			}
		
			// line
			ctx.beginPath();
			ctx.moveTo(this._pS.x, this._pS.y);
			ctx.lineTo(this._pT.x, this._pT.y);
			ctx.lineWidth = 2;
			ctx.stroke();

			//head
			ctx.beginPath();
			ctx.moveTo(this._pA[0].x, this._pA[0].y);
			ctx.lineTo(this._pA[1].x, this._pA[1].y);
			ctx.lineTo(this._pA[2].x, this._pA[2].y);
			ctx.lineTo(this._pA[0].x, this._pA[0].y);
			ctx.fill();
			
			if (this._state === self.STATE_HOVER) {
				var p = this._endGrab ? this._pT : this._pS;
				if (this._endGrab) {
					p.x += (Math.cos(this._rot) * 6);
					p.y += (Math.sin(this._rot) * 6);
				}
				
				ctx.beginPath();
				ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI, false);
				ctx.fillStyle = '#d05555';
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#712e2e';
				ctx.stroke();
			}
			
			/*
			ctx.fillStyle = "#ffffff";
			ctx.font = "14px arial";
			ctx.fillText("R: " + (Math.round(this._rot * 100) / 100), this._pS.x, this._pS.y - 10);
			*/
		}
	}

});

module.exports = self;
