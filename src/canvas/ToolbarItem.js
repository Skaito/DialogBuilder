
var $ = require('jquery');
var Button = require('./Button');

var self = $.extend(Object.create(Button), {

	init: function(title, width, height, clickAction) {
		Button.init.call(this, title, 0, 0, width, height, clickAction);
		return this;
	}

});

module.exports = self;
