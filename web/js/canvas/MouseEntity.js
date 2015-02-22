
var $ = require('../libs/jquery/jquery.min');
var Entity = require('./Entity');

var self = $.extend(Object.create(Entity), {

	_x: 0,
	_y: 0,

	setPosition: function(x, y) {
		this._x = x;
		this._y = y;
	},

	getPosition: function() {
		return {x: this._x, y: this._y};
	}

});

module.exports = self;
