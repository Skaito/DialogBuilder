
var Class = require('../lang/Class');
var Panel = require('./Panel');
var RaisedPanel = require('./RaisedPanel');
var Label = require('./Label');

'use strict';

var self = Class.create(Panel, {
	
	__static__: {
		STATE_NORMAL: 0,
		STATE_HOVER: 1
	},
	
	_basePanel: null,
	_textLabel: null,
	_state: null,
	_defBgColor: null,
	_hoverBgColor: null,
	clickAction: null,

	initialize: function(text, x, y, width, height, clickAction) {
		Panel.prototype.initialize.call(this, x, y, width, height);
		this._basePanel = new RaisedPanel(this._x, this._y, this._width, this._height);
		this._defBgColor = this._basePanel.getBackgroundColor();
		this._hoverBgColor = '#3b3b3b';
		this._textLabel = new Label(text, this._x, this._y, this._width, this._height);
		this._textLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._textLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);
		this.clickAction = clickAction;
		this._state = self.STATE_NORMAL;
		
	},

	setText: function(text) {
		this._textLabel.setText(text);
	},

	getText: function() {
		return this._textLabel.getText();
	},

	setState: function(state) {
		this._state = state;
	},

	getState: function() {
		return this._state;
	},

	act: function() {
		this._basePanel.setPosition(this._x, this._y);
		this._basePanel.setSize(this._width, this._height);
		this._basePanel.setBackgroundColor(((this._state === self.STATE_HOVER) ? this._hoverBgColor : this._defBgColor));
		this._textLabel.setPosition(this._x, this._y + 2);
		this._textLabel.setSize(this._width, this._height);
	},

	render: function(ctx) {
		this._basePanel.render(ctx);
		this._textLabel.render(ctx);
	},
	
	destroy: function() {
		this._basePanel.destroy();
		this._textLabel.destroy();
		this._basePanel = null;
		this._textLabel = null;
		this.clickAction = null;
		Panel.prototype.destroy.call(this);
	}
	
});

module.exports = self;
