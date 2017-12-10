
import { Entity } from './Entity';

export class ContainerEntity extends Entity {
	
	private _children: Entity[] = [];
	
	addChild(child: Entity) {
		var idx = this._children.indexOf(child);
		if (idx < 0) {
			this._children.push(child);
			child._parent = this;
		}
	}
	
	removeChild(child: Entity) {
		var idx = this._children.indexOf(child);
		if (idx >= 0) {
			this._children.splice(idx, 1);
			child._parent = null;
		}
	}
	
	resize(width: number, height: number) {
		for (let child of this._children) {
			child.resize(width, height);
		}
	}
	
	act(delta: number) {
		for (let child of this._children) {
			child.act(delta);
		}
	}
	
	render(ctx: CanvasRenderingContext2D) {
		for (let child of this._children) {
			ctx.save();
			child.render(ctx);
			ctx.restore();
		}
	}
	
	destroy() {
		for (let child of this._children) {
			child.destroy();
		}
		this._children.splice(0, this._children.length);
	}

}
