
import { Entity } from './Entity';

export class StatsPanel extends Entity {

	private _delta = 0;

	act(delta: number) {
		this._delta = delta;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "#ffffff";
		ctx.font = "18px arial";
		ctx.fillText("FPS: " + (Math.round(100000 / this._delta) / 100), 10, 68);
	}

}
