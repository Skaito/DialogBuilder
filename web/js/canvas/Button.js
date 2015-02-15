
define(['jquery',
		'canvas/Panel',
		'canvas/RaisedPanel',
		'canvas/Label'
	], function($, Panel, RaisedPanel, Label) {
	
	var self = $.extend(Object.create(Panel), {
		STATE_NORMAL: 0,
		STATE_HOVER: 1,
		
		_basePanel: null,
		_textLabel: null,
		_state: null,
		_defBgColor: null,
		_hoverBgColor: null,
		clickAction: null,
		
		init: function(text, x, y, width, height, clickAction) {
			Panel.init.call(this, x, y, width, height);
			this._basePanel = Object.create(RaisedPanel).init(this._x, this._y, this._width, this._height);
			this._defBgColor = this._basePanel.getBackgroundColor();
			this._hoverBgColor = '#3b3b3b';
			this._textLabel = Object.create(Label).init(text, this._x, this._y, this._width, this._height);
			this._textLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
			this._textLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);
			this.clickAction = clickAction;
			this._state = this.STATE_NORMAL;
			return this;
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
			this._basePanel.setBackgroundColor(((this._state === this.STATE_HOVER) ? this._hoverBgColor : this._defBgColor));
			this._textLabel.setPosition(this._x, this._y + 2);
			this._textLabel.setSize(this._width, this._height);
		},
		
		render: function(ctx) {
			this._basePanel.render(ctx);
			this._textLabel.render(ctx);
		}
	});
	
	return self;
});