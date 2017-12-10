
export class Point {
	
	constructor(public x: number, public y: number) {}
	
	setPosition(p: Point) {
		this.x = p.x;
		this.y = p.y;
	}
	
	distance(p: Point) {
		let a = (p.x - this.x),
			b = (p.y - this.y);
		return Math.sqrt((a*a) + (b*b));
	}
	
}
