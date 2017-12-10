
import { Point } from '../math/Point';

export interface Positionable {
	setPosition(x: number, y: number): void;
	getPosition(): Point;
}
