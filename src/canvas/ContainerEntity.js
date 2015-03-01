
var Class = require('../lang/Class');
var Entity = require('./Entity');

'use strict';

var self = Class.create(Entity, {
	
	_children: null,
	
	initialize: function() {
		Entity.prototype.initialize.call(this);
		this._children = [];
	},
	
	addChild: function(child) {
		var idx = this._children.indexOf(child);
		if (idx < 0) this._children.push(child);
	},
	
	removeChild: function(child) {
		var idx = this._children.indexOf(child);
		if (idx >= 0) this._children.splce(idx, 1);
	},
	
	resize: function(width, height) {
		var i;
		for (i = 0; i < this._children.length; i++) {
			this._children[i].resize(width, height);
		}
	},
	
	act: function(delta) {
		var i;
		for (i = 0; i < this._children.length; i++) {
			this._children[i].act(delta);
		}
	},
	
	render: function(ctx) {
		var i;
		for (i = 0; i < this._children.length; i++) {
			ctx.save();
			this._children[i].render(ctx);
			ctx.restore();
		}
	}

});

module.exports = self;
