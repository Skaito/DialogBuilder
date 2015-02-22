
var $ = require('../libs/jquery/jquery.min');
var Node = require('./Node');
var NodeIO = require('./NodeIO');
var LoweredPanel = require('./LoweredPanel');
var Label = require('./Label');
	
var dlgIndex = 0;

var self = $.extend(Object.create(Node), {

	_textPanel: null,
	_titleLabel: null,

	init: function(canvas, x, y) {
		Node.init.call(this, canvas, x, y, 200, 200);

		this._ios.push(Object.create(NodeIO).init(canvas, NodeIO.TYPE_INPUT, this));
		this._ios.push(Object.create(NodeIO).init(canvas, NodeIO.TYPE_OUTPUT, this));

		this._textPanel = Object.create(LoweredPanel).init(this._x + 6, this._y + 26, this._width - 12, this._height - 32);
		this._titleLabel = Object.create(Label).init("Dialog " + dlgIndex, this._x + 6, this._y + 6, this._width - 12, 20);
		this._titleLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._titleLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);

		dlgIndex++;

		return this;
	},

	setTitle: function(title) {
		this._titleLabel.setText(title);
	},

	getTitle: function() {
		return this._titleLabel.getText();
	},

	act: function(delta) {
		Node.act.call(this, delta);
		this._textPanel.setPosition(this._x + 6, this._y + 26);
		this._textPanel.setSize(this._width - 12, this._height - 32);
		this._titleLabel.setPosition(this._x + 6, this._y + 4);
		this._titleLabel.setSize(this._width - 12, 20);
	},

	render: function(ctx) {
		Node.render.call(this, ctx);
		this._textPanel.render(ctx);
		this._titleLabel.render(ctx);
	}
});

module.exports = self;
