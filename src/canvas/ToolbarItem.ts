
var Class = require('../lang/Class');
var Button = require('./Button');

'use strict';

var self = Class.create(Button, {

	initialize: function(title, width, height, clickAction) {
		Button.prototype.initialize.call(this, title, 0, 0, width, height, clickAction);
	}

});

module.exports = self;
