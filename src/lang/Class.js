
'use strict';

var inheritInit = false, self = {
	
	create: function() {
		var i, args = arguments,
			parent = null,
			newClass = function() {
				if (!inheritInit) {
					this.initialize.apply(this, arguments);
					this.initialize = void 0;
				}
			};
		
		if (args.length > 1) {
			inheritInit = true;
			parent =  ((typeof args[0] === 'function') ? (new args[0]()) : args[0]);
			inheritInit = false;
			newClass.prototype = parent;
		}
		if (!('initialize' in newClass.prototype)) {
			newClass.prototype.initialize = function () {
				if (parent && typeof parent.initialize === 'function') {
					parent.initialize.apply(this, arguments);
				}
			};
		}
		for (i = ((args.length > 1) ? 1 : 0); i < args.length; i++) {
			if (i === (args.length - 1)) {
				if ('__static__' in args[i]) {
					var stat = args[i].__static__;
					args[i].__static__ = null;
					delete args[i].__static__;
					this.extend(newClass, stat);
				}
			}
			this.extend(newClass.prototype, args[i]);
		}
		newClass.prototype.constructor = newClass;
		newClass.__super__ = parent;
		
		return newClass;
	},
	
	extend: function(target, obj) {
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) { target[k] = obj[k]; }
		}
	}
	
};

module.exports = self;
