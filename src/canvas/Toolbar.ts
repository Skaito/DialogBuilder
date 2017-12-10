
import { Entity } from './Entity';
import { Canvas2D } from './Canvas2D';
import { ToolbarItem } from './ToolbarItem';
import { Panel } from './Panel';

export class Toolbar extends Entity {

	private _width = 0;
	private _height = 40;
	private _items: ToolbarItem[] = [];
	private _basePanel: Panel;

	constructor(canvas: Canvas2D) {
		super();
		canvas.on('click', () => {
			var mOff = canvas.mouseEntity.getPosition();
			for (let item of this._items) {
				if (item.hitTest(mOff)) {
					if (typeof item.clickAction === 'function') item.clickAction();
				}
			}
		}).on('mousemove', () => {
			var mOff = canvas.mouseEntity.getPosition();	
			for (let item of this._items) {
				if (item.hitTest(mOff)) {
					item.setState(ToolbarItem.STATE_HOVER);
				} else {
					item.setState(ToolbarItem.STATE_NORMAL);
				}
			}
		});
		this._basePanel = new Panel(0, 0, this._width, this._height);
	}

	addItem(item: ToolbarItem) {
		this._items.push(item);
	}

	resize(width: number, height: number) {
		this._width = width;
	}

	act(delta: number) {
		let px = 10, sp = 10;
		for (let item of this._items) {
			let size = item.getSize();
			item.setPosition(px, (this._height - size.height) / 2);
			item.act(delta);
			px += size.width + sp;
		}
		this._basePanel.setPosition(-5, -5);
		this._basePanel.setSize(this._width + 10, this._height + 5);
	}

	render(ctx: CanvasRenderingContext2D) {
		if (this._width > 0) {
			ctx.save();
			this._basePanel.render(ctx);
			ctx.restore();

			for (let item of this._items) {
				ctx.save();
				item.render(ctx);
				ctx.restore();
			}
		}
	}
	
	destroy() {
		for (let item of this._items) {
			item.destroy();
		}
		this._items.splice(0, this._items.length);
		this._basePanel.destroy();
		super.destroy();
	}

}
