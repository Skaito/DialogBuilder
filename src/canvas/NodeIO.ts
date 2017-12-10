
import { Panel } from './Panel';
import { Canvas2D } from './Canvas2D';
import { MouseEntity } from './MouseEntity';
import { Node } from './Node';
import { Connector } from './Connector';
import { Point } from '../math/Point';

export class NodeIO extends Panel {
	
	static readonly TYPE_INPUT = 1;
	static readonly TYPE_OUTPUT = 2;
	static readonly STATE_NORMAL = 0;
	static readonly STATE_HOVER = 1;
	
	private _state = NodeIO.STATE_NORMAL;
	private _defBgColor = '#373737';
	private _hoverBgColor = '#444444';
	private _roundness = 6;
	_connectors: Connector[] = [];
	private _mouseEntity: MouseEntity;
	
	constructor(canvas: Canvas2D, public type: number, public parent: Node|null = null) {
		super(0, 0, 11, 16);
		this._mouseEntity = canvas.mouseEntity;
		this._backgroundColor = this._defBgColor;
	}

	hitTest(p: Point) {
		if (!p) return false;
		var halfH = this.height / 2, x1 = 0, y1 = 0, x2 = 0, y2 = 0;
		if (this.type === NodeIO.TYPE_OUTPUT) {
			x1 = this.x - (this.width - halfH),
			y1 = this.y - halfH,
			x2 = this.x + halfH,
			y2 = this.y + halfH;
		} else if (this.type === NodeIO.TYPE_INPUT) {
			x2 = this.x + (this.width - halfH),
			y2 = this.y + halfH,
			x1 = this.x - halfH,
			y1 = this.y - halfH;
		}
		//console.log('Hit: ' + p.x + "x" + p.y + " :: " + x1 + "x" + y1 + ", " + x2 + "x" + y2);
		return (p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2);
	}
	
	connectTo(inputIO: NodeIO|null, conn: Connector|null = null): Connector {
		if (!conn) {
			conn = new Connector();
		} else {
			if (conn.source) conn.source.disconnect(conn);
			if (conn.target) conn.target.disconnect(conn);
		}
		conn.source = this;
		conn.target = inputIO ? inputIO : null;
		conn.defaultTarget = this._mouseEntity;
		this._connectors.push(conn);
		return conn;
	}
	
	connectFrom(inputIO: NodeIO|null, conn: Connector): Connector {
		if (!conn) {
			conn = new Connector();
		} else {
			if (conn.source) conn.source.disconnect(conn);
			if (conn.target) conn.target.disconnect(conn);
		}
		conn.source = inputIO ? inputIO : null;
		conn.target = this;
		conn.defaultTarget = this._mouseEntity;
		this._connectors.push(conn);
		return conn;
	}
	
	disconnect(conn: Connector) {
		var idx = this._connectors.indexOf(conn);
		if (idx >= 0) this._connectors.splice(idx, 1);
	}

	setState(state: number) { this._state = state; }

	getState() { return this._state; }
	
	act(delta: number) {
		super.act(delta);
		for (let conn of this._connectors) { conn.act(delta); }
		this.setBackgroundColor(((this._state === NodeIO.STATE_HOVER) ? this._hoverBgColor : this._defBgColor));
	}

	render(ctx: CanvasRenderingContext2D) {
		for (let conn of this._connectors) {
			ctx.save();
			conn.render(ctx);
			ctx.restore();
		}
		var halfH = this.height / 2, x = this.x + 0.5, y = this.y + 0.5;
		ctx.beginPath();
		if (this.type === NodeIO.TYPE_OUTPUT) {
			ctx.moveTo(x - (this.width - halfH), y - halfH);
			ctx.lineTo(x + (halfH - this._roundness), y - halfH);
			ctx.arc(x + (halfH - this._roundness), y - halfH + this._roundness, this._roundness, -0.5 * Math.PI, 0);
			ctx.lineTo(x + halfH, y + halfH - this._roundness);
			ctx.arc(x + (halfH - this._roundness), y + halfH - this._roundness, this._roundness, 0, 0.5 * Math.PI);
			ctx.lineTo(x - (this.width - halfH), y + halfH);
		} else if (this.type === NodeIO.TYPE_INPUT) {
			ctx.moveTo(x + (this.width - halfH), y - halfH);
			ctx.lineTo(x - (halfH - this._roundness), y - halfH);
			ctx.arc(x - (halfH - this._roundness), y - halfH + this._roundness, this._roundness, -0.5 * Math.PI, -Math.PI, true);
			ctx.lineTo(x - halfH, y + halfH - this._roundness);
			ctx.arc(x - (halfH - this._roundness), y + halfH - this._roundness, this._roundness, -Math.PI, 0.5 * Math.PI, true);
			ctx.lineTo(x + (this.width - halfH), y + halfH);
		}
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#656565';
		ctx.fillStyle = this._backgroundColor;
		ctx.fill();
		ctx.stroke();
	}
	
	destroy() {
		let i, c;
		for (i = (this._connectors.length - 1); i >= 0; i--) {
			c = this._connectors[i];
			this.disconnect(c);
			c.destroy();
		}
		super.destroy();
	}

}
