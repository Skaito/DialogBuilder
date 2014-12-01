
define(['jquery', 'snapsvg'], function($, Snap) {
	
	/** @class */
	var self = function() {
		var self = this;
		this.elem = $('<div>');
		this.elem.addClass('board');
		this.elem.on('mousemove', function(e) {
			var pos = $(this).offset();
			pos.left = e.pageX - pos.left;
			pos.top = e.pageY - pos.top;
			if (self.dragTarget) {
				pos.left -= self.dragTarget.touchOffset.left;
				pos.top -= self.dragTarget.touchOffset.top;
				self.dragTarget.elem.css({left: pos.left, top: pos.top});
				
				if (self.dragTarget.inputConn) {
					var ipos = self.dragTarget.getInputOffset();
					self.dragTarget.inputConn.attr({x2: ipos.left, y2: ipos.top});
				}
				
				if (self.dragTarget.outputConn) {
					var opos = self.dragTarget.getOutputOffset();
					self.dragTarget.outputConn.attr({x1: opos.left, y1: opos.top});
				}
			}
			if (self.dragConn) {
				self.dragConn.attr({x2: pos.left, y2: pos.top});
			}
		});
		this.elem.on('mouseup', function() {
			self.dragTarget = null;
			self.dragConn = null;
		});
		var svgElem = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
		this.elem.append(svgElem);
		self.svg = Snap(svgElem.get(0));
		//self.svg.circle(100,100, 50);
		var arrowHead = self.svg.path('M0,0L10,5L0,10');
		arrowHead.attr({ stroke: '#000000', fill: 'none' });
		this.markerEnd = arrowHead.marker(0, 0, 10, 10, 10, 5);
		
		//var line = self.svg.line(10, 10, 100, 100);
		//line.attr({stroke: '#000000', markerEnd: this.markerEnd});
	};
	
	/** @type jQuery */
	self.prototype.elem = null;
	/** @type Node */
	self.prototype.dragTarget = null;
	self.prototype.dragConn = null;
	/** @type Snap.Paper */
	self.prototype.svg = null;
	/** @type Snap.Element */
	self.prototype.markerEnd = null;
	
	/**
	 * @param {Node} node
	 * @param {Number} x
	 * @param {Number} y
	 */
	self.prototype.addNode = function(node, x, y) {
		self = this;
		node.elem.css({left: x, top: y});
		node.elem.on('mousedown', function(e) {
			var pos = $(this).offset();
			pos.left = e.pageX - pos.left;
			pos.top = e.pageY - pos.top;
			node.touchOffset = pos;
			self.dragTarget = node;
			e.stopImmediatePropagation();
		});
		node.input.on('mouseup', function(e) {
			if (self.dragConn) {
				var pos = node.getInputOffset();
				node.inputConn = self.dragConn;
				node.inputConn.attr({x2: pos.left, y2: pos.top});
			}
		});
		node.output.on('mousedown', function(e) {
			var pos = node.getOutputOffset();
			self.dragConn = self.svg.line(pos.left, pos.top, pos.left, pos.top);
			self.dragConn.attr({stroke: '#000000', markerEnd: self.markerEnd});
			node.outputConn = self.dragConn;
			e.stopImmediatePropagation();
		});
		this.elem.append(node.elem);
	};
	
	return self;
});