
var Class = require('./lang/Class');
var ContainerEntity = require('./canvas/ContainerEntity');
var Canvas2D = require('./canvas/Canvas2D');
var Grid = require('./canvas/Grid');
var Toolbar = require('./canvas/Toolbar');
var ToolbarItem = require('./canvas/ToolbarItem');
var RootNode = require('./canvas/RootNode');
var DialogNode = require('./canvas/DialogNode');
var StatsPanel = require('./canvas/StatsPanel');

'use strict';

var self = Class.create(ContainerEntity, {
	
	_width: 0,
	_height: 0,
	_surface: null,
	_ui: null,
	
	_rootNode: null,
	
	initialize: function() {
		ContainerEntity.prototype.initialize.call(this);
		
		var thisSelf = this;
		
		Canvas2D.init();
		this.addChild(this._surface = new ContainerEntity());
		this.addChild(this._ui = new ContainerEntity());
		
		var toolbar = new Toolbar(Canvas2D);
		toolbar.addItem(new ToolbarItem("Add Root Node", 120, 24, function() {
			var node = new RootNode(Canvas2D, 0, 0);
			thisSelf._surface.addChild(node);
			node.startDrag();
		}));
		toolbar.addItem(new ToolbarItem("Add Dialog Node", 120, 24, function() {
			var node = new DialogNode(Canvas2D, 0, 0);
			thisSelf._surface.addChild(node);
			node.startDrag();
		}));
		this._ui.addChild(toolbar);
		this._ui.addChild(new StatsPanel());

		this._surface.addChild(new Grid());

		this._surface.addChild(this._rootNode = new RootNode(Canvas2D, 0, 0));

		var nodeA = new DialogNode(Canvas2D, 150, 60);
		this._surface.addChild(nodeA);

		var nodeB = new DialogNode(Canvas2D, 600, 80);
		this._surface.addChild(nodeB);

		this._rootNode.getIO(0).connectTo(nodeA.getIO(0));
		nodeA.getIO(1).connectTo(nodeB.getIO(0));
	},
	
	start: function() {
		var renderFrame, resizeFunc, thisSelf = this, lastTick = (new Date()).getTime();
		if (document.body.firstChild) {
			document.body.insertBefore(Canvas2D.getElem(), document.body.firstChild);
		} else {
			document.body.appendChild(Canvas2D.getElem());
		}
		
		window.addEventListener('resize', resizeFunc = function() {
			thisSelf.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
		}, false);
		resizeFunc();
		
		this._rootNode.setPosition(10, (this._height - this._rootNode.getSize().height) / 2);
		
		if (!('requestAnimationFrame' in window)) {
			window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
		}
		window.requestAnimationFrame(renderFrame = function() {
			var tick = (new Date()).getTime(), delta = tick - lastTick;
			lastTick = tick;
			thisSelf.act(delta);
			thisSelf.render(Canvas2D.ctx);
			window.requestAnimationFrame(renderFrame);
		});
	},

	resize: function(width, height) {
		this._width = width;
		this._height = height;
		Canvas2D.setSize(width, height);
		ContainerEntity.prototype.resize.call(this, width, height);
	},
	
	render: function(ctx) {
		//ctx.clearRect(0, 0, this._width, this._height);
		ctx.fillStyle = "#272727";
		ctx.fillRect(0, 0, this._width, this._height);
		ContainerEntity.prototype.render.call(this, ctx);
	}
	
});

module.exports = self;
