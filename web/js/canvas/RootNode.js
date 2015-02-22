
var $ = require('../libs/jquery/jquery.min');
var NodeIO = require('./NodeIO');
var Node = require('./Node');
var Label = require('./Label');

var self = $.extend(Object.create(Node), {

	_titleLabel: null,

	init: function(canvas, x, y) {
		Node.init.call(this, canvas, x, y, 70, 26);

		this._ios.push(Object.create(NodeIO).init(canvas, NodeIO.TYPE_OUTPUT, this));

		this._titleLabel = Object.create(Label).init("Interact", this._x + 6, this._y + 6, this._width - 12, 20);
		this._titleLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._titleLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);

		return this;
	},

	act: function(delta) {
		Node.act.call(this, delta);
		this._titleLabel.setPosition(this._x + 6, this._y + 4);
		this._titleLabel.setSize(this._width - 12, 20);
	},

	render: function(ctx) {
		Node.render.call(this, ctx);
		this._titleLabel.render(ctx);
	}
});

module.exports = self;
