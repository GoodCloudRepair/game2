import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/** 经验宝石：掉落后磁吸向玩家 */
@ccclass('ExpGem')
export class ExpGem extends Component {
    private _exp: number = 1;
    private _target: Node | null = null;
    private _attracted: boolean = false;
    private readonly _tempVec3: Vec3 = new Vec3();
    private static readonly ATTRACT_SPEED: number = 400;

    public init(exp: number, target: Node): void {
        this._exp = exp;
        this._target = target;
        this._attracted = false;
    }

    public get exp(): number { return this._exp; }

    /** 进入拾取范围时调用 */
    public attract(): void { this._attracted = true; }

    protected update(dt: number): void {
        if (!this._attracted || !this._target) return;

        const targetPos = this._target.position;
        this.node.getPosition(this._tempVec3);
        const dx = targetPos.x - this._tempVec3.x;
        const dy = targetPos.y - this._tempVec3.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
            this.node.emit('gem-collected', this._exp);
            this.node.destroy(); // TODO: 对象池回收
            return;
        }

        const speed = ExpGem.ATTRACT_SPEED * dt;
        this._tempVec3.x += (dx / dist) * speed;
        this._tempVec3.y += (dy / dist) * speed;
        this.node.setPosition(this._tempVec3);
    }
}
