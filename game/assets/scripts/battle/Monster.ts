import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export type MonsterTier = 'normal' | 'elite' | 'boss';

/** 怪物组件：朝玩家移动，受击掉血，死亡掉落 */
@ccclass('Monster')
export class Monster extends Component {
    private _hp: number = 0;
    private _maxHp: number = 0;
    private _atk: number = 0;
    private _speed: number = 0;
    private _expReward: number = 0;
    private _goldReward: number = 0;
    private _tier: MonsterTier = 'normal';
    private _alive: boolean = false;
    private _target: Node | null = null;
    private readonly _tempVec3: Vec3 = new Vec3();
    private readonly _dir: Vec3 = new Vec3();

    public get alive(): boolean { return this._alive; }
    public get atk(): number { return this._atk; }
    public get expReward(): number { return this._expReward; }
    public get goldReward(): number { return this._goldReward; }
    public get tier(): MonsterTier { return this._tier; }

    public init(
        hp: number, atk: number, speed: number,
        expReward: number, goldReward: number,
        tier: MonsterTier, target: Node
    ): void {
        this._maxHp = hp;
        this._hp = hp;
        this._atk = atk;
        this._speed = speed;
        this._expReward = expReward;
        this._goldReward = goldReward;
        this._tier = tier;
        this._target = target;
        this._alive = true;
    }

    protected update(dt: number): void {
        if (!this._alive || !this._target) return;

        // 朝玩家移动
        const targetPos = this._target.worldPosition;
        const myPos = this.node.worldPosition;
        this._dir.set(targetPos.x - myPos.x, targetPos.y - myPos.y, 0);
        const dist = this._dir.length();
        if (dist < 1) return;

        this._dir.normalize();
        this.node.getPosition(this._tempVec3);
        this._tempVec3.x += this._dir.x * this._speed * dt;
        this._tempVec3.y += this._dir.y * this._speed * dt;
        this.node.setPosition(this._tempVec3);
    }

    public takeDamage(damage: number): void {
        if (!this._alive) return;
        this._hp -= damage;
        if (this._hp <= 0) {
            this._hp = 0;
            this._alive = false;
            this.node.emit('monster-dead', this);
        }
    }
}
