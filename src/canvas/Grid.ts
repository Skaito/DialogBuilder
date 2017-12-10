
import { Entity } from './Entity';

export class Grid extends Entity {
	
	private width = 0;
	private height = 0;
	private size = 20;
	
	resize(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	
	render(ctx: CanvasRenderingContext2D) {
		let x, y;
		ctx.beginPath();
		for (y = 0.5; y < this.height; y += this.size) {
			if (y === 0) continue;
			ctx.moveTo(0, y);
			ctx.lineTo(this.width, y);
		}
		for (x = 0.5; x < this.width; x += this.size) {
			if (x === 0) continue;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, this.height);
		}
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#464646";
		ctx.stroke();
	}
	
}
