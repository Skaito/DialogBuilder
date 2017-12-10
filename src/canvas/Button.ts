
import { Panel } from './Panel';
import { RaisedPanel } from './RaisedPanel';
import { Label } from './Label';

export class Button extends Panel {
	
	static readonly STATE_NORMAL = 0;
	static readonly STATE_HOVER = 1;
	
	private _basePanel: RaisedPanel;
	private _textLabel: Label;
	private _state: number;
	private _defBgColor: string;
	private _hoverBgColor: string;
	clickAction: () => void;

	constructor(text: string, x: number, y: number, width: number, height: number, clickAction: () => void) {
		super(x, y, width, height);
		this._basePanel = new RaisedPanel(this.x, this.y, this.width, this.height);
		this._defBgColor = this._basePanel.getBackgroundColor();
		this._hoverBgColor = '#3b3b3b';
		this._textLabel = new Label(text, this.x, this.y, this.width, this.height);
		this._textLabel.setHorizontalAlignment(Label.ALIGN_CENTER);
		this._textLabel.setVerticalAlignment(Label.ALIGN_MIDDLE);
		this.clickAction = clickAction;
		this._state = Button.STATE_NORMAL;
	}

	setText(text: string) { this._textLabel.setText(text); }

	getText() { return this._textLabel.getText(); }

	setState(state: number) { this._state = state; }

	getState() { return this._state; }
	
	act(delta: number) {
		this._basePanel.setPosition(this.x, this.y);
		this._basePanel.setSize(this.width, this.height);
		this._basePanel.setBackgroundColor(((this._state === Button.STATE_HOVER) ? this._hoverBgColor : this._defBgColor));
		this._textLabel.setPosition(this.x, this.y + 2);
		this._textLabel.setSize(this.width, this.height);
	}

	render(ctx: CanvasRenderingContext2D) {
		this._basePanel.render(ctx);
		this._textLabel.render(ctx);
	}
	
	destroy() {
		this._basePanel.destroy();
		this._textLabel.destroy();
		super.destroy();
	}
	
}
