
define(['jquery', 'canvas/Panel', 'canvas/Connector'], function($, Panel, Connector) {
	
	var self = $.extend(Object.create(Panel), {
		
		TYPE_INPUT: 1,
		TYPE_OUTPUT: 2,
		STATE_NORMAL: 0,
		STATE_HOVER: 1,
		
		type: 0,
		parent: null,
		_state: null,
		_defBgColor: null,
		_hoverBgColor: null,
		_roundness: 6,
		/** @type Connector[] */
		_connectors: null,
		_mouseEntity: null,
		
		/**
		 * @param {Canvas2D} canvas
		 * @param {Number} type
		 * @param {DialogNode} parent
		 * @returns {NodeIO}
		 */
		init: function(canvas, type, parent) {
			Panel.init.call(this, 0, 0, 11, 16);
			this.type = type;
			if (parent) this.parent = parent;
			this._connectors = [];
			this._mouseEntity = canvas.mouseEntity;
			this._state = this.STATE_NORMAL;
			this._backgroundColor = this._defBgColor = '#373737';
			this._hoverBgColor = '#444444';
			return this;
		},
		
		hitTest: function(p) {
			if (!p) return false;
			var halfH = this._height / 2, x1 = 0, y1 = 0, x2 = 0, y2 = 0;
			if (this.type === this.TYPE_OUTPUT) {
				x1 = this._x - (this._width - halfH),
				y1 = this._y - halfH,
				x2 = this._x + halfH,
				y2 = this._y + halfH;
			} else if (this.type === this.TYPE_INPUT) {
				x2 = this._x + (this._width - halfH),
				y2 = this._y + halfH,
				x1 = this._x - halfH,
				y1 = this._y - halfH;
			}
			//console.log('Hit: ' + p.x + "x" + p.y + " :: " + x1 + "x" + y1 + ", " + x2 + "x" + y2);
			return (p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2);
		},
		
		/**
		 * @param {NodeIO} inputIO
		 * @returns {Connector}
		 */
		connectTo: function(inputIO) {
			var conn = Object.create(Connector).init();
			conn.source = this;
			conn.target = inputIO ? inputIO : null;
			conn.defaultTarget = this._mouseEntity;
			this._connectors.push(conn);
			return conn;
		},
		
		/** @param {Connector} conn */
		disconnect: function(conn) {
			var idx = this._connectors.indexOf(conn);
			if (idx >= 0) this._connectors.splice(idx, 1);
		},
		
		setState: function(state) {
			this._state = state;
		},
		
		getState: function() {
			return this._state;
		},
		
		act: function(delta) {
			Panel.act.call(this, delta);
			for (var i = 0; i < this._connectors.length; i++) {
				this._connectors[i].act(delta);
			}
			this.setBackgroundColor(((this._state === this.STATE_HOVER) ? this._hoverBgColor : this._defBgColor));
		},
		
		render: function(ctx) {
			for (var i = 0; i < this._connectors.length; i++) {
				ctx.save();
				this._connectors[i].render(ctx);
				ctx.restore();
			}
			var halfH = this._height / 2, x = this._x + 0.5, y = this._y + 0.5;
			ctx.beginPath();
			if (this.type === this.TYPE_OUTPUT) {
				ctx.moveTo(x - (this._width - halfH), y - halfH);
				ctx.lineTo(x + (halfH - this._roundness), y - halfH);
				ctx.arc(x + (halfH - this._roundness), y - halfH + this._roundness, this._roundness, -0.5 * Math.PI, 0);
				ctx.lineTo(x + halfH, y + halfH - this._roundness);
				ctx.arc(x + (halfH - this._roundness), y + halfH - this._roundness, this._roundness, 0, 0.5 * Math.PI);
				ctx.lineTo(x - (this._width - halfH), y + halfH);
			} else if (this.type === this.TYPE_INPUT) {
				ctx.moveTo(x + (this._width - halfH), y - halfH);
				ctx.lineTo(x - (halfH - this._roundness), y - halfH);
				ctx.arc(x - (halfH - this._roundness), y - halfH + this._roundness, this._roundness, -0.5 * Math.PI, -Math.PI, true);
				ctx.lineTo(x - halfH, y + halfH - this._roundness);
				ctx.arc(x - (halfH - this._roundness), y + halfH - this._roundness, this._roundness, -Math.PI, 0.5 * Math.PI, true);
				ctx.lineTo(x + (this._width - halfH), y + halfH);
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#656565';
			ctx.fillStyle = this._backgroundColor;
			ctx.fill();
			ctx.stroke();
		}
		
	});
	
	return self;
});
