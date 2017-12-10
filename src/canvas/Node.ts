
import { NodeIO } from './NodeIO';
import { Connector } from './Connector';
import { Panel } from './Panel';
import { Point } from '../math/Point';
import { Canvas2D } from './Canvas2D';
import { MouseEntity } from './MouseEntity';

type BasicFunction = () => void;

let cConn: Connector|null = null, nodes: Node[] = [], commonMouseUp: BasicFunction|null = null;

export class Node extends Panel {
	
	protected _ios: NodeIO[] = [];
	private _mPos: Point|null;
	private _mouseEntity: MouseEntity;
	private _events: {[key: string]: () => void} = {};

	constructor(private _canvas: Canvas2D, x: number, y: number, width: number, height: number) {
		super(x, y, width, height);
		this._mouseEntity = _canvas.mouseEntity;
		this._setupEvents(_canvas);
	}

	private _setupEvents(canvas: Canvas2D) {
		canvas.on('mousedown', this._events.mousedown = () => {
			let mOff = canvas.mouseEntity.getPosition();
			if (this.hitTest(mOff)) {
				this._mPos = new Point((mOff.x - this.x), (mOff.y - this.y));
			} else {
				for (let io of this._ios) {
					if (io.type === NodeIO.TYPE_OUTPUT && io.hitTest(mOff)) {
						cConn = io.connectTo(null);
					} else {
						for (let conn of io._connectors) {
							if (conn.hitTest(mOff)) cConn = conn;
						}
					}
				}
			}
		}).on('mouseup', this._events.mouseup = () => {
			this._mPos = null;
		}).on('mousemove', this._events.mousemove = () => {
			let mOff = canvas.mouseEntity.getPosition();
			if (this._mPos) {
				this.x = (mOff.x - this._mPos.x);
				this.y = (mOff.y - this._mPos.y);
			}
			for (let io of this._ios) {
				if (io.hitTest(mOff)) {
					io.setState(NodeIO.STATE_HOVER);
				} else {
					io.setState(NodeIO.STATE_NORMAL);
					for (let conn of io._connectors) {
						if (conn.hitTest(mOff)) {
							conn.setState(Connector.STATE_HOVER);
						} else {
							conn.setState(Connector.STATE_NORMAL);
						}
					}
				}
			}
		});
		if (!commonMouseUp) {
			canvas.on('mouseup', function() {
				if (cConn && (!cConn.source || !cConn.target)) {
					var mOff = canvas.mouseEntity.getPosition();
					for (let node of nodes) {
						for (let io of node._ios) {
							if (!cConn.source && cConn.target) {
								if (io.type === NodeIO.TYPE_OUTPUT && io.hitTest(mOff) && io.parent !== cConn.target.parent) {
									cConn.target.connectFrom(io, cConn);
									cConn = null;
									break;
								}
							} else if (!cConn.target && cConn.source) {
								if (io.type === NodeIO.TYPE_INPUT && io.hitTest(mOff) && io.parent !== cConn.source.parent) {
									cConn.source.connectTo(io, cConn);
									cConn = null;
									break;
								}
							}
						}
						if (!cConn) break;
					}
					if (cConn && (cConn.source === null || cConn.target === null)) {
						if (cConn.source) {
							cConn.source.disconnect(cConn);
						} else if (cConn.target) {
							cConn.target.disconnect(cConn);
						}
						cConn = null;
					}
				}
			}).on('mousemove', function() {
				if (cConn && cConn.source && cConn.target) {
					if (cConn._endGrab) {
						cConn.source.connectTo(null, cConn);
					} else {
						cConn.target.connectFrom(null, cConn);
					}
				}
			});
		}
		nodes.push(this);
	}

	startDrag() {
		this._mPos = new Point(10, 10);
		var mOff = this._mouseEntity.getPosition();
		this.x = (mOff.x - this._mPos.x);
		this.y = (mOff.y - this._mPos.y);
	}

	getIO(idx: number) {
		return (idx >= 0 && idx < this._ios.length) ? this._ios[idx] : null;
	}

	act(delta: number) {
		super.act(delta);
		for (let io of this._ios) {
			if (io.type === NodeIO.TYPE_INPUT) {
				io.setPosition(this.x - 3, this.y + (this.height / 2));
			} else if (io.type === NodeIO.TYPE_OUTPUT) {
				io.setPosition(this.x + this.width + 3, this.y + (this.height / 2));
			}
			io.act(delta);
		}
	}

	renderIOs(ctx: CanvasRenderingContext2D) {
		for (let io of this._ios) {
			ctx.save();
			io.render(ctx);
			ctx.restore();
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		this.renderShadow(ctx);
		this.renderIOs(ctx);
		this.renderBody(ctx);
	}
	
	destroy() {
		for (var k in this._events) {
			this._canvas.off(k, this._events[k]);
			delete this._events[k];
		}
		this._events = {};
		for (let io of this._ios) { io.destroy(); }
		this._ios.splice(0, this._ios.length);
		super.destroy();
	}
	
}
