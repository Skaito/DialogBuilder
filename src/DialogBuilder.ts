
import { ContainerEntity } from './canvas/ContainerEntity';
import { Canvas2D } from './canvas/Canvas2D';
import { Grid } from './canvas/Grid';
import { Toolbar } from './canvas/Toolbar';
import { ToolbarItem } from './canvas/ToolbarItem';
import { RootNode } from './canvas/RootNode';
import { DialogNode } from './canvas/DialogNode';
import { StatsPanel } from './canvas/StatsPanel';
import { NodeIO } from './canvas/NodeIO';

export class DialogBuilder extends ContainerEntity {
	
	private _width = 0;
	private _height = 0;
	private _surface: ContainerEntity;
	private _ui: ContainerEntity;
	private canvas: Canvas2D;
	private _rootNode: RootNode;
	
	constructor() {
		super();
		
		this.canvas = Canvas2D.init();
		this.addChild(this._surface = new ContainerEntity());
		this.addChild(this._ui = new ContainerEntity());
		
		let toolbar = new Toolbar(this.canvas);
		toolbar.addItem(new ToolbarItem("Add Root Node", 120, 24, () => {
			let node = new RootNode(this.canvas, 0, 0);
			this._surface.addChild(node);
			node.startDrag();
		}));
		toolbar.addItem(new ToolbarItem("Add Dialog Node", 120, 24, () => {
			let node = new DialogNode(this.canvas, 0, 0);
			this._surface.addChild(node);
			node.startDrag();
		}));
		this._ui.addChild(toolbar);
		this._ui.addChild(new StatsPanel());

		this._surface.addChild(new Grid());

		this._surface.addChild(this._rootNode = new RootNode(this.canvas, 0, 0));

		var nodeA = new DialogNode(this.canvas, 150, 60);
		this._surface.addChild(nodeA);

		var nodeB = new DialogNode(this.canvas, 600, 80);
		this._surface.addChild(nodeB);

		(this._rootNode.getIO(0) as NodeIO).connectTo(nodeA.getIO(0));
		(nodeA.getIO(1) as NodeIO).connectTo(nodeB.getIO(0));
	}
	
	start() {
		let renderFrame: () => void, resizeFunc, thisSelf = this, lastTick = (new Date()).getTime();
		if (document.body.firstChild) {
			document.body.insertBefore(this.canvas.getElem(), document.body.firstChild);
		} else {
			document.body.appendChild(this.canvas.getElem());
		}
		
		window.addEventListener('resize', resizeFunc = function() {
			thisSelf.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
		}, false);
		resizeFunc();
		
		this._rootNode.setPosition(10, (this._height - this._rootNode.getSize().height) / 2);
		
		if (!('requestAnimationFrame' in window)) {
			window.requestAnimationFrame = (window.webkitRequestAnimationFrame
				|| (window as any).mozRequestAnimationFrame
				|| (window as any).oRequestAnimationFrame
				|| (window as any).msRequestAnimationFrame);
		}
		window.requestAnimationFrame(renderFrame = () => {
			var tick = (new Date()).getTime(), delta = tick - lastTick;
			lastTick = tick;
			this.act(delta);
			if (this.canvas.ctx) this.render(this.canvas.ctx);
			window.requestAnimationFrame(renderFrame);
		});
	}

	resize(width: number, height: number) {
		this._width = width;
		this._height = height;
		this.canvas.setSize(width, height);
		super.resize(width, height);
	}
	
	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "#272727";
		ctx.fillRect(0, 0, this._width, this._height);
		super.render(ctx);
	}
	
}
