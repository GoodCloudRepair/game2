import { _decorator, Component, Node, Vec2, Vec3, UITransform, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

/** 虚拟摇杆：输出归一化方向向量 */
@ccclass('Joystick')
export class Joystick extends Component {
    @property(Node)
    private readonly stick: Node | null = null;

    @property
    private readonly maxRadius: number = 60;

    private readonly _direction: Vec2 = new Vec2();
    private _touching: boolean = false;
    private readonly _startPos: Vec2 = new Vec2();

    public get direction(): Readonly<Vec2> { return this._direction; }
    public get isTouching(): boolean { return this._touching; }

    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch): void {
        this._touching = true;
        const uiPos = event.getUILocation();
        this._startPos.set(uiPos.x, uiPos.y);
        this.updateStick(uiPos.x, uiPos.y);
    }

    private onTouchMove(event: EventTouch): void {
        const uiPos = event.getUILocation();
        this.updateStick(uiPos.x, uiPos.y);
    }

    private onTouchEnd(): void {
        this._touching = false;
        this._direction.set(0, 0);
        if (this.stick) this.stick.setPosition(0, 0, 0);
    }

    private updateStick(x: number, y: number): void {
        const dx = x - this._startPos.x;
        const dy = y - this._startPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1) {
            this._direction.set(0, 0);
            return;
        }

        // 归一化方向
        this._direction.set(dx / dist, dy / dist);

        // 限制摇杆显示范围
        const clampDist = Math.min(dist, this.maxRadius);
        if (this.stick) {
            this.stick.setPosition(
                this._direction.x * clampDist,
                this._direction.y * clampDist,
                0
            );
        }
    }
}
