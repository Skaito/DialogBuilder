
import { Panel } from './Panel';
import { Canvas2D } from './Canvas2D';

export class RaisedPanel extends Panel {
	
	constructor(x: number, y: number, width: number, height: number) {
		super(x, y, width, height);
		this._backgroundColor = '#474747';
	}
	
	render(ctx: CanvasRenderingContext2D) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#292929';
		ctx.fillStyle = this._backgroundColor;
		Canvas2D.roundRect(ctx, this.x + 0.5, this.y + 0.5, this.width, this.height, 3, true, true);
		ctx.strokeStyle = '#656565';
		ctx.beginPath();
		ctx.moveTo(this.x + 2.5, this.y + 1.5);
		ctx.lineTo(this.x + this.width - 3, this.y + 1.5);
		ctx.stroke();
	}
	
}
