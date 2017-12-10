
import { Point } from '../math/Point';
import { Entity } from './Entity';
import { Positionable } from './Positionable';
import { NodeIO } from './NodeIO';

export class Connector extends Entity {
	
	static readonly STATE_NORMAL = 0;
	static readonly STATE_HOVER = 1;
	
	source: NodeIO|null = null;
	target: NodeIO|null = null;
	defaultTarget: Positionable|null = null;
	private _pS = new Point(0, 0);
	private _pT = new Point(0, 0);
	private _pA = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
	private _rot = 0;
	private _state = Connector.STATE_NORMAL;
	_endGrab = true;
	
	/** Set state on of STATE_* constants */
	setState(state: number) { this._state = state; }
	
	/** Test collision with point p */
	hitTest(p: Point) {
		let d0 = this._pS.distance(this._pT),
			d1 = this._pS.distance(p),
			d2 = this._pT.distance(p);
		if (d1 < d0 && d2 < d0 && ((d1 + d2) - d0) < 0.08) {
			return true;
		}
		return false;
	}

	act(delta: number) {
		if (this.source && this.target && this._state === Connector.STATE_HOVER) {
			let p = this.defaultTarget ? this.defaultTarget.getPosition() : new Point(0, 0),
			d1 = this._pS.distance(p),
			d2 = this._pT.distance(p);
			this._endGrab = (d1 >= d2);
		}
		if (this.source) {
			let pos = this.source.getPosition();
			this._pS.x = pos.x;
			this._pS.y = pos.y;
		} else if (this.target && this.defaultTarget) {
			let pos = this.defaultTarget.getPosition();
			this._pS.x = pos.x;
			this._pS.y = pos.y;
		} else {
			this._pS.x = this._pS.y = 0;
		}
		if (this.target) {
			let pos = this.target.getPosition();
			this._pT.x = pos.x;
			this._pT.y = pos.y;
		} else if (this.defaultTarget) {
			let pos = this.defaultTarget.getPosition();
			this._pT.x = pos.x;
			this._pT.y = pos.y;
		} else {
			this._pT.x = this._pT.y = 0;
		}
		let a = this._pS.x - this._pT.x,
			b = this._pS.y - this._pT.y,
			c = Math.sqrt(a*a + b*b),
			r = -Math.asin(b / c);
		if (this._pS.x > this._pT.x) {
			this._rot = Math.PI - r;
		} else if (r < 0) {
			this._rot = Math.PI + Math.PI + r;
		} else {
			this._rot = r;
		}
		if (this.source) {
			r = this._rot;
			this._pS.x += (Math.cos(r) * 9);
			this._pS.y += (Math.sin(r) * 9);
		}
		if (this.target) {
			r = this._rot - Math.PI;
			this._pT.x += (Math.cos(r) * 14);
			this._pT.y += (Math.sin(r) * 14);
		} else {
			r = this._rot - Math.PI;
			this._pT.x += (Math.cos(r) * 5);
			this._pT.y += (Math.sin(r) * 5);
		}
		let hs = 9, hr = 9, rl = this._rot - (Math.PI * (hr - 1) / hr), rr = this._rot - (Math.PI * (hr + 1) / hr);
		this._pA[0].x = this._pT.x + (Math.cos(this._rot) * 5);
		this._pA[0].y = this._pT.y + (Math.sin(this._rot) * 5);
		this._pA[1].x = this._pA[0].x + (Math.cos(rl) * hs);
		this._pA[1].y = this._pA[0].y + (Math.sin(rl) * hs);
		this._pA[2].x = this._pA[0].x + (Math.cos(rr) * hs);
		this._pA[2].y = this._pA[0].y + (Math.sin(rr) * hs);

	}

	render(ctx: CanvasRenderingContext2D) {	
		if ((this.source && (this.target || this.defaultTarget)) || (this.target && (this.source || this.defaultTarget))) {
			if (this._state === Connector.STATE_HOVER) {
				ctx.shadowColor = '#ffffff';
				//ctx.shadowColor = 'yellow';
				//ctx.shadowOffsetY = 10;
				//ctx.shadowOffsetX = 10;
				ctx.shadowBlur = 6;
				ctx.strokeStyle = "yellow";
				ctx.fillStyle = "yellow";
			} else {
				ctx.strokeStyle = "#ffffff";
				ctx.fillStyle = "#ffffff";
			}
		
			// line
			ctx.beginPath();
			ctx.moveTo(this._pS.x, this._pS.y);
			ctx.lineTo(this._pT.x, this._pT.y);
			ctx.lineWidth = 2;
			ctx.stroke();

			//head
			ctx.beginPath();
			ctx.moveTo(this._pA[0].x, this._pA[0].y);
			ctx.lineTo(this._pA[1].x, this._pA[1].y);
			ctx.lineTo(this._pA[2].x, this._pA[2].y);
			ctx.lineTo(this._pA[0].x, this._pA[0].y);
			ctx.fill();
			
			if (this._state === Connector.STATE_HOVER) {
				let p = this._endGrab ? this._pT : this._pS;
				if (this._endGrab) {
					p.x += (Math.cos(this._rot) * 6);
					p.y += (Math.sin(this._rot) * 6);
				}
				
				ctx.beginPath();
				ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI, false);
				ctx.fillStyle = '#d05555';
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#712e2e';
				ctx.stroke();
			}
			
			/*
			ctx.fillStyle = "#ffffff";
			ctx.font = "14px arial";
			ctx.fillText("R: " + (Math.round(this._rot * 100) / 100), this._pS.x, this._pS.y - 10);
			*/
		}
	}

}
