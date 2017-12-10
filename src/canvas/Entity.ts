
export class Entity {
	
	_parent: Entity|null = null;
	
	resize(width: number, height: number): void {};
	
	act(delta: number): void {};
	
	render(ctx: CanvasRenderingContext2D): void {};
	
	destroy(): void {};

};
