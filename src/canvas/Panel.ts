
import { Entity } from './Entity';
import { Canvas2D } from './Canvas2D';
import { Point } from '../math/Point';

export class Panel extends Entity {
	
	protected _backgroundColor = '#444444';

	constructor(protected x: number, protected y: number, protected width = 100, protected height = 100) {
		super();
	}

	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	getPosition() {
		return new Point(this.x, this.y);
	}

	setSize(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	getSize() {
		return {width: this.width, height: this.height};
	}

	setBackgroundColor(color: string) {
		this._backgroundColor = color;
	}

	getBackgroundColor() {
		return this._backgroundColor;
	}

	hitTest(p: Point) {
		if (!p) return false;
		return (p.x >= this.x && p.x <= (this.x + this.width) && p.y >= this.y && p.y <= (this.y + this.height));
	}

	renderShadow(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.lineWidth = 0;
		ctx.shadowColor = '#000000';
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		Canvas2D.roundRect(ctx, this.x + 0.5, this.y + 0.5, this.width, this.height, 5, false, true);
		ctx.restore();
	}

	renderBody(ctx: CanvasRenderingContext2D) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#656565";
		ctx.fillStyle = this._backgroundColor;
		Canvas2D.roundRect(ctx, this.x + 0.5, this.y + 0.5, this.width, this.height, 5, true, true);
	}

	render(ctx: CanvasRenderingContext2D) {
		this.renderShadow(ctx);
		this.renderBody(ctx);
	}
	
}
