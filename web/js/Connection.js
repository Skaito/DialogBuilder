
define(['NodeIO'], function(NodeIO) {
	'use strict';
	
	/** @type Snap.Element */
	var markerEnd, _svg;
	
	/**
	 * 
	 * @param {NodeIO} nodeIO
	 * @class Connection
	 */
	var self = function(nodeIO) {
		var pos = nodeIO.getOffset();
		this.elem = _svg.line(pos.left, pos.top, pos.left, pos.top);
		this.elem.attr({stroke: '#000000', strokeWidth: 1, markerEnd: markerEnd});
		var thisSelf = this;
		this._onMoveFunc = function(e) { thisSelf._onMove.call(thisSelf, e); };
		this.setStartNodeIO(nodeIO);
	};
	
	/** @param {Snap.Paper} svg */
	self.init = function(svg) {
		_svg = svg;
		var arrowHead = svg.path('M2,3L2,9L10,6,L2,3');
		arrowHead.attr({ stroke: 'none', strokeWidth: 1, fill: '#000000' });
		markerEnd = arrowHead.marker(0, 0, 13, 13, 10, 6);
	};
	
	/** @type Snap.Line */
	self.prototype.elem = null;
	/** @type NodeIO */
	self.prototype.startNodeIO = null;
	/** @type NodeIO */
	self.prototype.endNodeIO = null;
	/** @type Function */
	self.prototype._onMoveFunc = null;
	
	self.prototype.dispose = function() {
		this.elem.remove();
		delete this.elem;
	};
	
	/** @param {NodeIO} nodeIO */
	self.prototype.setStartNodeIO = function(nodeIO) {
		if (this.startNodeIO) {
			this.startNodeIO.removeConnection(this);
			this.startNodeIO.removeMoveListener(this._onMoveFunc);
		}
		this.startNodeIO = nodeIO;
		if (this.startNodeIO) {
			this.startNodeIO.addConnection(this);
			var pos = nodeIO.getOffset();
			this.elem.attr({x1: pos.left, y1: pos.top});
			this.startNodeIO.addMoveListener(this._onMoveFunc);
		}
	};
	
	/** @param {NodeIO} nodeIO */
	self.prototype.setEndNodeIO = function(nodeIO) {
		if (this.endNodeIO) {
			this.endNodeIO.removeConnection(this);
			this.endNodeIO.removeMoveListener(this._onMoveFunc);
		}
		this.endNodeIO = nodeIO;
		if (this.endNodeIO) {
			this.endNodeIO.addConnection(this);
			var pos = nodeIO.getOffset();
			this.elem.attr({x2: pos.left, y2: pos.top});
			this.endNodeIO.addMoveListener(this._onMoveFunc);
		}
	};
	
	/** @param {NodeIO} nodeIO */
	self.prototype._onMove = function(nodeIO) {
		var pos = nodeIO.getOffset();
		if (this.startNodeIO === nodeIO) {
			this.elem.attr({x1: pos.left, y1: pos.top});
		} else if (this.endNodeIO === nodeIO) {
			this.elem.attr({x2: pos.left, y2: pos.top});
		}
	};
	
	return self;
});
