
define(['jquery', 'Toolbar', 'Board', 'Button', 'Node'], function($, Toolbar, Board, Button, Node) {
	'use strict';
	
	var self = {}, container, board, toolbar, node;
	
	self.init = function() {
		container = $('<div>');
		container.addClass('container');
		container.on('mousemove', function(e) {
			var pos = board.elem.offset();
			pos.left = e.pageX - pos.left;
			pos.top = e.pageY - pos.top;
			if (node) {
				pos.left -= node.elem.outerWidth(true) / 2;
				pos.top -= node.elem.outerHeight(true) / 2;
				node.elem.css({left: pos.left, top: pos.top});
			}
		});
		toolbar = new Toolbar();
		container.append(toolbar.elem);
		
		board = new Board();
		board.elem.on('click', function(e) {
			var pos = board.elem.offset();
			pos.left = e.pageX - pos.left;
			pos.top = e.pageY - pos.top;
			if (node) {
				pos.left -= node.elem.outerWidth(true) / 2;
				pos.top -= node.elem.outerHeight(true) / 2;
				board.addNode(node, pos.left, pos.top);
				node.asHelper(false);
				node = null;
			}
		});
		container.append(board.elem);
		$(document.body).append(container);
		
		var nodeBtn = new Button('glyphicon-comment', 'Node');
		toolbar.addButton(nodeBtn);
		nodeBtn.elem.on('click', function() {
			node = new Node();
			node.asHelper(true);
			board.elem.append(node.elem);
		});
		
	};
	
	return self;
});
