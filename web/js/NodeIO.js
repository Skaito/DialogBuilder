
define([], function() {
	'use strict';
	
	/** @class NodeIO */
	var self = function() {
		this.connections = [];
		this._moveListeners = [];
		this.elem = $('<div>');
		var thisSelf = this;
		this._onMoveFunc = function(e) { thisSelf._onMove.call(thisSelf, e); };
		this.setType(self.TYPE_INPUT);
	};
	
	self.TYPE_INPUT = 1;
	self.TYPE_OUTPUT = 2;
	/** @type jQuery */
	self.prototype.elem = null;
	/** @type Node */
	self.prototype.node = null;
	/** @type Number */
	self.prototype.type = null;
	/** @type Connection[] */
	self.prototype.connections = null;
	/** @type Function */
	self.prototype._onMoveFunc = null;
	/** @type Function[] */
	self.prototype._moveListeners = null;
	
	/** @param {Function} l */
	self.prototype.addMoveListener = function(l) {
		var idx = this._moveListeners.indexOf(l);
		if (idx < 0) this._moveListeners.push(l);
	};
	
	/** @param {Function} l */
	self.prototype.removeMoveListener = function(l) {
		var idx = this._moveListeners.indexOf(l);
		if (idx >= 0) this._moveListeners.splice(idx, 1);
	};
	
	/** @param {Connection} conn */
	self.prototype.addConnection = function(conn) {
		var idx = this.connections.indexOf(conn);
		if (idx < 0) this.connections.push(conn);
	};
	
	/** @param {Connection} conn */
	self.prototype.removeConnection = function(conn) {
		var idx = this.connections.indexOf(conn);
		if (idx >= 0) this.connections.splice(idx, 1);
	};
	
	/** @return {Object} */
	self.prototype.getOffset = function() {
		var pos = this.elem.position();
		var epos = this.node ? this.node.elem.position() : {left: 0, top: 0};
		if (this.type === self.TYPE_INPUT) {
			pos.left += epos.left;
			pos.top += epos.top + Math.round(this.elem.outerHeight(true) / 2);
		} else {
			pos.left += epos.left + this.elem.outerWidth(true);
			pos.top += epos.top + Math.round(this.elem.outerHeight(true) / 2);
		}
		// TODO: calc pos with offset from io end center not edge
		return { left: pos.left, top: pos.top };
	};
	
	/**
	 * @param {Node} node
	 * @return {NodeIO}
	 */
	self.prototype.setNode = function(node) {
		if (this.node) this.node.removeMoveListener(this._onMoveFunc);
		this.node = node;
		if (this.node) this.node.addMoveListener(this._onMoveFunc);
		return this;
	};
	
	/**
	 * @param {Number} type one of TYPE_* constants
	 * @return NodeIO
	 */
	self.prototype.setType = function(type) {
		this.type = type;
		if (this.type === self.TYPE_INPUT) this.elem.removeClass('node-output').addClass('node-input');
		if (this.type === self.TYPE_OUTPUT) this.elem.removeClass('node-input').addClass('node-output');
		return this;
	};
	
	self.prototype._onMove = function() {
		for (var i = 0; i < this._moveListeners.length; i++) {
			this._moveListeners[i].call(this, this);
		}
	};
	
	return self;
});

