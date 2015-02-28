
var Class = require('../lang/Class');
var Entity = require('./Entity');
var ToolbarItem = require('./ToolbarItem');
var Panel = require('./Panel');

var self = Class.create(Entity, {

	_width: 0,
	_height: 40,
	_items: null,
	_basePanel: null,

	initialize: function(canvas) {
		Entity.prototype.initialize.call(this);
		this._items = [];
		var thisSelf = this;
		canvas.on('click', function() {
			var mOff = canvas.mouseEntity.getPosition();
			for (var i = 0; i < thisSelf._items.length; i++) {
				if (thisSelf._items[i].hitTest(mOff)) {
					if (typeof thisSelf._items[i].clickAction === 'function') thisSelf._items[i].clickAction();
				}
			}
		}).on('mousemove', function() {
			var mOff = canvas.mouseEntity.getPosition();	
			for (var i = 0; i < thisSelf._items.length; i++) {
				if (thisSelf._items[i].hitTest(mOff)) {
					thisSelf._items[i].setState(ToolbarItem.STATE_HOVER);
				} else {
					thisSelf._items[i].setState(ToolbarItem.STATE_NORMAL);
				}
			}
		});
		this._basePanel = new Panel(0, 0, this._width, this._height);
	},

	addItem: function(item) {
		this._items.push(item);
	},

	resize: function(width, height) {
		this._width = width;
	},

	act: function(delta) {
		var px = 10, sp = 10;
		for (var i = 0; i < this._items.length; i++) {
			this._items[i]._x = px;
			this._items[i]._y = (this._height - this._items[i]._height) / 2;
			this._items[i].act(delta);
			px += this._items[i]._width + sp;
		}
		this._basePanel.setPosition(-5, -5);
		this._basePanel.setSize(this._width + 10, this._height + 5);
	},

	render: function(ctx) {
		if (this._width > 0) {
			ctx.save();
			this._basePanel.render(ctx);
			ctx.restore();

			for (var i = 0; i < this._items.length; i++) {
				ctx.save();
				this._items[i].render(ctx);
				ctx.restore();
			}
		}
	}

});

module.exports = self;
