
import { MouseEntity } from './MouseEntity';
import { Point } from '../math/Point';

type BasicCallback = (e: Event) => void;
type BasicFunction = () => void;

export class Canvas2D {
	
	private static instance: Canvas2D;
	
	static init() {
		if (!Canvas2D.instance) {
			Canvas2D.instance = new Canvas2D();
		}
		return Canvas2D.instance;
	}
	
	private _elem: HTMLCanvasElement;
	private _scale: Point = new Point(1, 1);
	mouseEntity: MouseEntity = new MouseEntity();
	ctx: CanvasRenderingContext2D|null;
	
	private constructor() {
		this._elem = document.createElement('canvas');
		this.setSize(300, 300);
		this.ctx = this._elem.getContext('2d');
		this._elem.addEventListener('mousemove', (e) => {
			var pos = this.getPosition();
			this.mouseEntity.setPosition((e.pageX - pos.x), (e.pageY - pos.y));
		}, false);
	}
	
	getElem() {
		return this._elem;
	}
	
	getPosition(): Point {
		var b = this._elem.getBoundingClientRect();
		return new Point(
			b.left + window.pageXOffset - document.documentElement.clientLeft,
			b.top + window.pageYOffset - document.documentElement.clientTop
		);
	}
	
	setScale(scaleX: number, scaleY: number) {
		this._scale.x = scaleX;
		this._scale.y = scaleY;
	}
	
	setSize(width: number, height: number) {
		this._elem.style.width = width + 'px';
		this._elem.style.height = height + 'px';
		this._elem.setAttribute('width', '' + (width * this._scale.x));
		this._elem.setAttribute('height', '' + (height * this._scale.y));
	}
	
	on(event: string, func: BasicCallback) {
		this._elem.addEventListener(event, func, false);
		return this;
	}
	
	off(event: string, func: BasicCallback) {
		this._elem.removeEventListener(event, func, false);
		return this;
	}
	
	static roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number,
		radius: number = 5, fill: boolean|BasicFunction = false, stroke: boolean|BasicFunction = true) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		if (fill) {
			if (typeof fill === 'function') fill();
			ctx.fill();
		}
		if (stroke) {
			if (typeof stroke === 'function') stroke();
			ctx.stroke();
		}
	}
	
}
