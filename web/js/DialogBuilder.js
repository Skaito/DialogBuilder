
var $ = require('jquery');
var Canvas2D = require('./canvas/Canvas2D');
var Grid = require('./canvas/Grid');
var Toolbar = require('./canvas/Toolbar');
var ToolbarItem = require('./canvas/ToolbarItem');
var RootNode = require('./canvas/RootNode');
var DialogNode = require('./canvas/DialogNode');
var StatsPanel = require('./canvas/StatsPanel');

'use strict';

var self = {}, jqWindow, nodes, uiNodes,
	width, height, rootNode,
	lastTick = (new Date()).getTime();

self.init = function() {
	jqWindow = $(window);
	Canvas2D.init();
	Canvas2D.getElem().prependTo(document.body);
	nodes = [];
	uiNodes = [];

	var toolbar = Object.create(Toolbar).init(Canvas2D);
	toolbar.addItem(Object.create(ToolbarItem).init("Add Root Node", 120, 24, function() {
		var node = Object.create(RootNode).init(Canvas2D, 0, 0);
		nodes.push(node);
		node.startDrag();
	}));
	toolbar.addItem(Object.create(ToolbarItem).init("Add Dialog Node", 120, 24, function() {
		var node = Object.create(DialogNode).init(Canvas2D, 0, 0);
		nodes.push(node);
		node.startDrag();
	}));
	uiNodes.push(toolbar);
	uiNodes.push(Object.create(StatsPanel).init());

	nodes.push(Object.create(Grid).init());

	nodes.push(rootNode = Object.create(RootNode).init(Canvas2D, 0, 0));

	var nodeA = Object.create(DialogNode).init(Canvas2D, 150, 60);
	nodes.push(nodeA);

	var nodeB = Object.create(DialogNode).init(Canvas2D, 600, 80);
	nodes.push(nodeB);

	rootNode.getIO(0).connectTo(nodeA.getIO(0));
	nodeA.getIO(1).connectTo(nodeB.getIO(0));


	if (!('requestAnimationFrame' in window)) {
		window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	}
	jqWindow.on('resize', function() { self.resize(); });
	this.resize();

	rootNode.setPosition(10, (height - rootNode.getSize().height) / 2);

	var renderFrame;
	window.requestAnimationFrame(renderFrame = function() {
		self.render(Canvas2D.ctx);
		window.requestAnimationFrame(renderFrame);
	});
};

self.resize = function() {
	width = jqWindow.width();
	height = jqWindow.height();
	Canvas2D.getElem().attr({ width: width, height: height });
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].resize(width, height);
	}
	for (var i = 0; i < uiNodes.length; i++) {
		uiNodes[i].resize(width, height);
	}
};

self.render = function(ctx) {
	var i, tick = (new Date()).getTime(), delta = tick - lastTick;
	lastTick = tick;
	for (i = 0; i < nodes.length; i++) {
		nodes[i].act(delta);
	}
	for (i = 0; i < uiNodes.length; i++) {
		uiNodes[i].act(delta);
	}
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "#1d292b";
	ctx.fillRect(0, 0, width, height);
	for (i = 0; i < nodes.length; i++) {
		ctx.save();
		nodes[i].render(ctx);
		ctx.restore();
	}
	for (i = 0; i < uiNodes.length; i++) {
		ctx.save();
		uiNodes[i].render(ctx);
		ctx.restore();
	}
};

module.exports = self;
