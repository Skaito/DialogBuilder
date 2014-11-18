
define(['jquery'], function($) {
	'use strict';
	
	var self = function() {
		this.elem = $('<div>');
		this.elem.addClass('node');
		this.elem.append((this.input = $('<div>').addClass('node-input')));
		this.elem.append((this.output = $('<div>').addClass('node-output')));
	};
	
	/** @type jQuery */
	self.prototype.elem = null;
	/** @type jQuery */
	self.prototype.input = null;
	/** @type jQuery */
	self.prototype.output = null;
	self.prototype.touchOffset = null;
	self.prototype.inputConn = null;
	self.prototype.outputConn = null;
	
	self.prototype.asHelper = function(helper) {
		this.elem.css('opacity', helper ? 0.7 : 1);
	};
	
	self.prototype.getInputOffset = function() {
		var pos = this.input.position();
		var epos = this.elem.position();
		pos.left += epos.left;
		pos.top += epos.top + Math.round(this.input.outerHeight(true) / 2);
		return { left: pos.left, top: pos.top };
	};
	
	self.prototype.getOutputOffset = function() {
		var pos = this.output.position();
		var epos = this.elem.position();
		pos.left += epos.left + this.input.outerWidth(true);
		pos.top += epos.top + Math.round(this.input.outerHeight(true) / 2);
		return { left: pos.left, top: pos.top };
	};
	
	return self;
});
