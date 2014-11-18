
define(['jquery'], function($) {
	'use strict';
	
	/** @class */
	var self = function() {
		this.elem = $('<div>');
		this.elem.addClass('btn-toolbar');
		this.elem.attr('role', 'toolbar');
		
		this.group = $('<div>');
		this.group.addClass('btn-group');
		this.group.attr('role', 'group');
	};
	
	/** @type jQuery */
	self.prototype.elem = null;
	/** @type jQuery */
	self.prototype.group = null;
	
	/** @param {Button} button */
	self.prototype.addButton = function(button) {
		this.elem.append(button.elem);
	};
	
	return self;
});