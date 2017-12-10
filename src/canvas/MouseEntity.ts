
import { Entity } from './Entity';
import { Positionable } from './Positionable';
import { Point } from '../math/Point';

export class MouseEntity extends Entity implements Positionable {
	
	private x = 0;
	private y = 0;
	
	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	getPosition(): Point {
		return new Point(this.x, this.y);
	}

}
