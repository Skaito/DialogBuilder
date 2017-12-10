
import { Panel } from './Panel';
import { Canvas2D } from './Canvas2D';

export class LoweredPanel extends Panel {
	
	constructor(x: number, y: number, width: number, height: number) {
		super(x, y, width, height);
		this._backgroundColor = '#373737';
	}
	
	render(ctx: CanvasRenderingContext2D) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#616161';
		Canvas2D.roundRect(ctx, this.x + 0.5, this.y + 1.5, this.width, this.height - 1, 3, false, true);
		ctx.strokeStyle = '#202020';
		Canvas2D.roundRect(ctx, this.x + 0.5, this.y + 0.5, this.width, this.height - 1, 3, false, true);
		ctx.fillStyle = this._backgroundColor;
		ctx.strokeStyle = '#2b2b2b';
		Canvas2D.roundRect(ctx, this.x + 0.5, this.y + 1.5, this.width, this.height - 2, 3, true, true);
	}
	
}
