
var Class = require('../lang/Class');

/**
 * @class Point
 */
var self = Class.create({
	
	/** @type Number */
	x: 0,
	/** @type Number */
	y: 0,
	
	/**
	 * Create new point
	 * @param {Number} x
	 * @param {Number} y
	 */
	initialize: function(x, y) {
		if (x) this.x = x;
		if (y) this.y = y;
	},
	
	/**
	 * Set point position
	 * @param {Point} p
	 */
	setPosition: function(p) {
		this.x = p.x;
		this.y = p.y;
	},
	
	/**
	 * Distance to point p
	 * @param {Point} p
	 * @return {Number}
	 */
	distance: function(p) {
		var a = (p.x - this.x),
			b = (p.y - this.y);
		return Math.sqrt((a*a) + (b*b));
	}
	
});

module.exports = self;
