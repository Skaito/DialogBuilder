
var Class = require('../lang/Class');
var Entity = require('./Entity');
var Point = require('../math/Point');

'use strict';

var self = Class.create(Entity, {

	_x: 0,
	_y: 0,
	
	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	setPosition: function(x, y) {
		this._x = x;
		this._y = y;
	},
	
	/** @return {Point} */
	getPosition: function() {
		return new Point(this._x, this._y);
	}

});

module.exports = self;
