
define(['jquery', 'NodeIO'], function($, NodeIO) {
	'use strict';
	
	/** @class Node */
	var self = function() {
		this._moveListeners = [];
		this.elem = $('<div>');
		this.elem.addClass('node');
		this.ios = [];
		this.ios.push((new NodeIO()).setType(NodeIO.TYPE_INPUT).setNode(this));
		this.ios.push((new NodeIO()).setType(NodeIO.TYPE_OUTPUT).setNode(this));
		for (var i = 0; i < this.ios.length; i++) { this.elem.append(this.ios[i].elem); }
	};
	
	/** @type jQuery */
	self.prototype.elem = null;
	/** @type NodeIO[] */
	self.prototype.ios = null;
	self.prototype.touchOffset = null;
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
	
	self.prototype.onMove = function() {
		for (var i = 0; i < this._moveListeners.length; i++) {
			this._moveListeners[i].call(this, this);
		}
	};
	
	self.prototype.asHelper = function(helper) {
		this.elem.css('opacity', helper ? 0.7 : 1);
	};
	
	return self;
});
