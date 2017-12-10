
import { Button } from './Button';

export class ToolbarItem extends Button {

	constructor(title: string, width: number, height: number, clickAction: () => void) {
		super(title, 0, 0, width, height, clickAction);
	}

}
