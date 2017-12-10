
import { Node } from './Node';
import { NodeIO } from './NodeIO';
import { LoweredPanel } from './LoweredPanel';
import { Label } from './Label';
import { Canvas2D } from './Canvas2D';

var dlgIndex = 0;

export class DialogNode extends Node {

	private _textPanel: LoweredPanel;
	private _titleLabel: Label;

	constructor(canvas: Canvas2D, x: number, y: number) {
		super(canvas, x, y, 200, 200);

		this._ios.push(new NodeIO(canvas, NodeIO.TYPE_INPUT, this));
		this._ios.push(new NodeIO(canvas, NodeIO.TYPE_OUTPUT, this));

		this._textPanel = new LoweredPanel(this.x + 6, this.y + 26, this.width - 12, this.height - 32);
		this._titleLabel = new Label("Dialog " + dlgIndex, this.x + 6, this.y + 6, this.width - 12, 20);
		this._titleLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._titleLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);

		dlgIndex++;
	}

	setTitle(title: string) { this._titleLabel.setText(title); }

	getTitle() { return this._titleLabel.getText(); }

	act(delta: number) {
		super.act(delta);
		this._textPanel.setPosition(this.x + 6, this.y + 26);
		this._textPanel.setSize(this.width - 12, this.height - 32);
		this._titleLabel.setPosition(this.x + 6, this.y + 4);
		this._titleLabel.setSize(this.width - 12, 20);
	}

	render(ctx: CanvasRenderingContext2D) {
		super.render(ctx);
		this._textPanel.render(ctx);
		this._titleLabel.render(ctx);
	}
	
	destroy() {
		this._textPanel.destroy();
		this._titleLabel.destroy();
		super.destroy();
	}
	
}
