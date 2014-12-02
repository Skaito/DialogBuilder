
define(['jquery', 'snapsvg', 'Connection', 'NodeIO', 'Node'], function($, Snap, Connection, NodeIO, Node) {
	
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
				self.dragTarget.onMove();
			}
			if (self.dragConn) {
				self.dragConn.elem.attr({x2: pos.left, y2: pos.top});
			}
		});
		this.elem.on('mouseup', function() {
			self.dragTarget = null;
			if (self.dragConn && !self.dragConn.endNodeIO) {
				self.dragConn.setStartNodeIO(null);
				self.dragConn.dispose();
			}
			self.dragConn = null;
		});
		var svgElem = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
		this.elem.append(svgElem);
		self.svg = Snap(svgElem.get(0));
		//self.svg.circle(100,100, 50);
		Connection.init(self.svg);
		
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
		var inFunc = function(io) {
			if (self.dragConn) self.dragConn.setEndNodeIO(io);
		};
		var outFunc = function(e, io) {
			self.dragConn = new Connection(io);
			e.stopPropagation();
			e.preventDefault();
			return false;
		};
		var curFunc = function(io) {
			if (io.type === NodeIO.TYPE_INPUT) {
				if (self.dragConn) {
					io.elem.css('cursor', 'crosshair');
				} else {
					io.elem.css('cursor', 'default');
				}
			} else if (io.type === NodeIO.TYPE_OUTPUT) {
				if (self.dragConn) {
					io.elem.css('cursor', 'not-allowed');
				} else {
					io.elem.css('cursor', 'e-resize');
				}
			}
		};
		for (var i = 0; i < node.ios.length; i++) {
			(function(node) {
				var io = node.ios[i];
				if (io.type === NodeIO.TYPE_INPUT) {
					io.elem.on('mouseup', function() { inFunc.call(node, io); });
					io.elem.on('mousemove', function() { curFunc.call(node, io); });
				} else if (io.type === NodeIO.TYPE_OUTPUT) {
					io.elem.on('mousedown', function(e) { outFunc.call(node, e, io); });
					io.elem.on('mousemove', function() { curFunc.call(node, io); });
				}
			})(node);
		}
		this.elem.append(node.elem);
	};
	
	return self;
});