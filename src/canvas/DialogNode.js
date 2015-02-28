
var Class = require('../lang/Class');
var Node = require('./Node');
var NodeIO = require('./NodeIO');
var LoweredPanel = require('./LoweredPanel');
var Label = require('./Label');
	
var dlgIndex = 0;

var self = Class.create(Node, {

	_textPanel: null,
	_titleLabel: null,

	initialize: function(canvas, x, y) {
		Node.prototype.initialize.call(this, canvas, x, y, 200, 200);

		this._ios.push(new NodeIO(canvas, NodeIO.TYPE_INPUT, this));
		this._ios.push(new NodeIO(canvas, NodeIO.TYPE_OUTPUT, this));

		this._textPanel = new LoweredPanel(this._x + 6, this._y + 26, this._width - 12, this._height - 32);
		this._titleLabel = new Label("Dialog " + dlgIndex, this._x + 6, this._y + 6, this._width - 12, 20);
		this._titleLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._titleLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);

		dlgIndex++;
	},

	setTitle: function(title) {
		this._titleLabel.setText(title);
	},

	getTitle: function() {
		return this._titleLabel.getText();
	},

	act: function(delta) {
		Node.prototype.act.call(this, delta);
		this._textPanel.setPosition(this._x + 6, this._y + 26);
		this._textPanel.setSize(this._width - 12, this._height - 32);
		this._titleLabel.setPosition(this._x + 6, this._y + 4);
		this._titleLabel.setSize(this._width - 12, 20);
	},

	render: function(ctx) {
		Node.prototype.render.call(this, ctx);
		this._textPanel.render(ctx);
		this._titleLabel.render(ctx);
	}
});

module.exports = self;
