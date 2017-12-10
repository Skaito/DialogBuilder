
import { Panel } from './Panel';

export class Label extends Panel {
	
	static readonly ALIGN_LEFT = 'left';
	static readonly ALIGN_CENTER = 'center';
	static readonly ALIGN_RIGHT = 'right';
	static readonly ALIGN_TOP = 'top';
	static readonly ALIGN_MIDDLE = 'middle';
	static readonly ALIGN_BOTTOM = 'bottom';

	private _font = '12px arial';
	private _color = '#ffffff';
	private _vAlign = Label.ALIGN_TOP;
	private _hAlign = Label.ALIGN_LEFT;
	
	constructor(private _text: string, x: number, y: number, width: number, height: number) {
		super(x, y, width, height);
	}
	
	setFont(font: string) { this._font = font; }
	
	setColor(color: string) { this._color = color; }
	
	setText(text: string) { this._text = text; }
	
	getText() { return this._text; }
	
	setVerticalAlignment(align: string) { this._vAlign = align; }
	
	setHorizontalAlignment(align: string) { this._hAlign = align; }
	
	render(ctx: CanvasRenderingContext2D) {
		//ctx.fillStyle = "#000000"; ctx.fillRect(this._x, this._y, this._width, this._height);
		ctx.fillStyle = this._color;
		ctx.font = this._font;
		//var tm = ctx.measureText(this._text);
		var x = this.x, y = this.y;
		if (this._vAlign === Label.ALIGN_BOTTOM) {
			y = this.y + this.height;
			ctx.textBaseline = 'bototm';
		} else if (this._vAlign === Label.ALIGN_MIDDLE || this._vAlign === Label.ALIGN_CENTER) {
			y = this.y + (this.height / 2);
			ctx.textBaseline = 'middle';
		} else {
			ctx.textBaseline = 'top';
		}
		if (this._hAlign === Label.ALIGN_RIGHT) {
			x = this.x + this.width;
			ctx.textAlign = 'bottom';
		} else if (this._hAlign === Label.ALIGN_CENTER || this._hAlign === Label.ALIGN_MIDDLE) {
			x = this.x + (this.width / 2);
			ctx.textAlign = 'center';
		} else {
			ctx.textAlign = 'left';
		}
		ctx.fillText(this._text, x, y);
	}
	
}
