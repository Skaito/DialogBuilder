
var Class = require('../lang/Class');
var NodeIO = require('./NodeIO');
var Node = require('./Node');
var Label = require('./Label');

'use strict';

var self = Class.create(Node, {

	_titleLabel: null,

	initialize: function(canvas, x, y) {
		Node.prototype.initialize.call(this, canvas, x, y, 70, 26);

		this._ios.push(new NodeIO(canvas, NodeIO.TYPE_OUTPUT, this));

		this._titleLabel = new Label("Interact", this._x + 6, this._y + 6, this._width - 12, 20);
		this._titleLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._titleLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);
	},

	act: function(delta) {
		Node.prototype.act.call(this, delta);
		this._titleLabel.setPosition(this._x + 6, this._y + 4);
		this._titleLabel.setSize(this._width - 12, 20);
	},

	render: function(ctx) {
		Node.prototype.render.call(this, ctx);
		this._titleLabel.render(ctx);
	}
});

module.exports = self;
