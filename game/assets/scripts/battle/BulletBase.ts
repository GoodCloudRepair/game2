import { _decorator, Component, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/** 子弹基类：直线飞行，超出范围回收 */
@ccclass('BulletBase')
export class BulletBase extends Component {
    @property
    private speed: number = 500;

    @property
    private maxDistance: number = 800;

    private _damage: number = 0;
    private _pierce: number = 0; // 穿透次数
    private _traveled: number = 0;
    private readonly _dir: Vec2 = new Vec2();
    private readonly _tempVec3: Vec3 = new Vec3();

    public get damage(): number { return this._damage; }

    /** 初始化子弹（从池中取出时调用） */
    public init(damage: number, dirX: number, dirY: number, pierce: number = 0): void {
        this._damage = damage;
        this._pierce = pierce;
        this._traveled = 0;
        this._dir.set(dirX, dirY);
    }

    protected update(dt: number): void {
        const step = this.speed * dt;
        this._traveled += step;

        this.node.getPosition(this._tempVec3);
        this._tempVec3.x += this._dir.x * step;
        this._tempVec3.y += this._dir.y * step;
        this.node.setPosition(this._tempVec3);

        if (this._traveled >= this.maxDistance) {
            this.recycle();
        }
    }

    /** 命中怪物时调用，返回是否应回收 */
    public onHitMonster(): boolean {
        if (this._pierce > 0) {
            this._pierce--;
            return false; // 继续飞行
        }
        this.recycle();
        return true;
    }

    private recycle(): void {
        this.node.emit('bullet-recycle', this.node);
    }
}
