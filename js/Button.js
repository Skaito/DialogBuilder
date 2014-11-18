
define(['jquery'], function($) {
	'use strict';
	
	/** @class */
	var self = function(icon, name) {
		this.elem = $('<button>');
		this.elem.addClass('btn btn-default');
		this.elem.attr('type', 'button');
		this.elem.text(name);
		if (icon) this.elem.prepend($('<span></span>').addClass('glyphicon ' + icon));
	};
	
	/** @type jQuery */
	self.prototype.elem = null;
	
	return self;
});
