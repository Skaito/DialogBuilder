
var Class = require('../lang/Class');

'use strict';

var self = Class.create({
	
	_parent: null,
	
	initialize: function() {},
	
	resize: function(width, height) {},
	
	act: function(delta) {},
	
	render: function(ctx) {}

});

module.exports = self;
