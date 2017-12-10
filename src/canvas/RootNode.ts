
import { NodeIO } from './NodeIO';
import { Node } from './Node';
import { Canvas2D } from './Canvas2D';
import { Label } from './Label';

export class RootNode extends Node {

	private _titleLabel: Label;

	constructor(canvas: Canvas2D, x: number, y: number) {
		super(canvas, x, y, 70, 26);

		this._ios.push(new NodeIO(canvas, NodeIO.TYPE_OUTPUT, this));

		this._titleLabel = new Label("Interact", this.x + 6, this.y + 6, this.width - 12, 20);
		this._titleLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._titleLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);
	}

	act(delta: number) {
		super.act(delta);
		this._titleLabel.setPosition(this.x + 6, this.y + 4);
		this._titleLabel.setSize(this.width - 12, 20);
	}

	render(ctx: CanvasRenderingContext2D) {
		super.render(ctx);
		this._titleLabel.render(ctx);
	}
	
	destroy() {
		this._titleLabel.destroy();
		super.destroy();
	}
	
}
