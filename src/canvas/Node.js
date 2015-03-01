
var Class = require('../lang/Class');
var NodeIO = require('./NodeIO');
var Connector = require('./Connector');
var Panel = require('./Panel');
var Point = require('../math/Point');

'use strict';

var cConn = null, nodes = [], commonMouseUp = null;

var self = Class.create(Panel, {
	
	_ios: null,
	_mPos: null,
	_mouseEntity: null,
	_events: null,
	_canvas: null,

	initialize: function(canvas, x, y, width, height) {
		Panel.prototype.initialize.call(this, x, y, width, height);
		this._ios = [];
		this._events = {};
		this._canvas = canvas;
		this._setupEvents(canvas);
	},

	_setupEvents: function(canvas) {
		this._mouseEntity = canvas.mouseEntity;
		var thisSelf = this;
		canvas.on('mousedown', this._events.mousedown = function() {
			var mOff = canvas.mouseEntity.getPosition();
			if (thisSelf.hitTest(mOff)) {
				thisSelf._mPos = {
					x: (mOff.x - thisSelf._x),
					y: (mOff.y - thisSelf._y)
				};
			} else {
				for (var i = 0; i < thisSelf._ios.length; i++) {
					if (thisSelf._ios[i].type === NodeIO.TYPE_OUTPUT && thisSelf._ios[i].hitTest(mOff)) {
						cConn = thisSelf._ios[i].connectTo(null);
					} else {
						for (var n = 0; n < thisSelf._ios[i]._connectors.length; n++) {
							if (thisSelf._ios[i]._connectors[n].hitTest(mOff)) {
								cConn = thisSelf._ios[i]._connectors[n];
							}
						}
					}
				}
			}
		}).on('mouseup', this._events.mouseup = function() {
			thisSelf._mPos = null;
		}).on('mousemove', this._events.mousemove = function() {
			var mOff = canvas.mouseEntity.getPosition();
			if (thisSelf._mPos) {
				thisSelf._x = (mOff.x - thisSelf._mPos.x);
				thisSelf._y = (mOff.y - thisSelf._mPos.y);
			}
			for (var i = 0; i < thisSelf._ios.length; i++) {
				if (thisSelf._ios[i].hitTest(mOff)) {
					thisSelf._ios[i].setState(NodeIO.STATE_HOVER);
				} else {
					thisSelf._ios[i].setState(NodeIO.STATE_NORMAL);
					for (var n = 0; n < thisSelf._ios[i]._connectors.length; n++) {
						if (thisSelf._ios[i]._connectors[n].hitTest(mOff)) {
							thisSelf._ios[i]._connectors[n].setState(Connector.STATE_HOVER);
						} else {
							thisSelf._ios[i]._connectors[n].setState(Connector.STATE_NORMAL);
						}
					}
				}
			}
		});
		if (!commonMouseUp) {
			canvas.on('mouseup', function() {
				if (cConn && (!cConn.source || !cConn.target)) {
					var mOff = canvas.mouseEntity.getPosition();
					for (var n = 0; n < nodes.length; n++) {
						for (var i = 0; i < nodes[n]._ios.length; i++) {
							if (!cConn.source) {
								if (nodes[n]._ios[i].type === NodeIO.TYPE_OUTPUT && nodes[n]._ios[i].hitTest(mOff) && nodes[n]._ios[i].parent !== cConn.target.parent) {
									cConn.target.connectFrom(nodes[n]._ios[i], cConn);
									cConn = null;
									break;
								}
							} else if (!cConn.target) {
								if (nodes[n]._ios[i].type === NodeIO.TYPE_INPUT && nodes[n]._ios[i].hitTest(mOff) && nodes[n]._ios[i].parent !== cConn.source.parent) {
									cConn.source.connectTo(nodes[n]._ios[i], cConn);
									cConn = null;
									break;
								}
							}
						}
						if (!cConn) break;
					}
					if (cConn && (cConn.source === null || cConn.target === null)) {
						if (cConn.source) {
							cConn.source.disconnect(cConn);
						} else if (cConn.target) {
							cConn.target.disconnect(cConn);
						}
						delete cConn;
						cConn = null;
					}
				}
			}).on('mousemove', function() {
				if (cConn && cConn.source && cConn.target) {
					if (cConn._endGrab) {
						cConn.source.connectTo(null, cConn);
					} else {
						cConn.target.connectFrom(null, cConn);
					}
				}
			});
		}
		nodes.push(this);
	},

	startDrag: function() {
		this._mPos = new Point(10, 10);
		var mOff = this._mouseEntity.getPosition();
		this._x = (mOff.x - this._mPos.x);
		this._y = (mOff.y - this._mPos.y);
	},

	getIO: function(idx) {
		return (idx >= 0 && idx < this._ios.length) ? this._ios[idx] : null;
	},

	act: function(delta) {
		Panel.prototype.act.call(this, delta);
		for (var i = 0; i < this._ios.length; i++) {
			if (this._ios[i].type === NodeIO.TYPE_INPUT) {
				this._ios[i].setPosition(this._x - 3, this._y + (this._height / 2));
			} else if (this._ios[i].type === NodeIO.TYPE_OUTPUT) {
				this._ios[i].setPosition(this._x + this._width + 3, this._y + (this._height / 2));
			}
			this._ios[i].act(delta);
		}
	},

	renderIOs: function(ctx) {
		for (var i = 0; i < this._ios.length; i++) {
			ctx.save();
			this._ios[i].render(ctx);
			ctx.restore();
		}
	},

	render: function(ctx) {
		this.renderShadow(ctx);
		this.renderIOs(ctx);
		this.renderBody(ctx);
	},
	
	destroy: function() {
		for (var k in this._events) {
			this._canvas.off(k, this._events[k]);
			this._events[k] = null;
		}
		this._events = {};
		for (var i = 0; i < this._ios.length; i++) {
			this._ios[i].destroy();
		}
		this._ios.splice(0, this._ios.length);
		Panel.prototype.destroy.call(this);
	}
	
});

module.exports = self;
