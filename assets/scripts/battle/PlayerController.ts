import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
import { Joystick } from './Joystick';
const { ccclass, property } = _decorator;

/** 角色控制器：移动 + 自动射击朝向最近敌人 */
@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(Joystick)
    private readonly joystick: Joystick | null = null;

    @property
    private moveSpeed: number = 200;

    @property
    private fireRate: number = 2.0; // 子弹/秒

    private _fireTimer: number = 0;
    private _hp: number = 200;
    private _maxHp: number = 200;
    private _alive: boolean = true;
    private readonly _tempVec3: Vec3 = new Vec3();

    // 外部读取
    public get hp(): number { return this._hp; }
    public get maxHp(): number { return this._maxHp; }
    public get alive(): boolean { return this._alive; }
    public get fireInterval(): number { return 1 / this.fireRate; }

    public init(maxHp: number, moveSpeed: number, fireRate: number): void {
        this._maxHp = maxHp;
        this._hp = maxHp;
        this.moveSpeed = moveSpeed;
        this.fireRate = fireRate;
        this._alive = true;
    }

    protected update(dt: number): void {
        if (!this._alive) return;
        this.handleMove(dt);
        this.handleFire(dt);
    }

    private handleMove(dt: number): void {
        if (!this.joystick || !this.joystick.isTouching) return;

        const dir = this.joystick.direction;
        this.node.getPosition(this._tempVec3);
        this._tempVec3.x += dir.x * this.moveSpeed * dt;
        this._tempVec3.y += dir.y * this.moveSpeed * dt;
        this.node.setPosition(this._tempVec3);
    }

    private handleFire(dt: number): void {
        this._fireTimer += dt;
        if (this._fireTimer >= this.fireInterval) {
            this._fireTimer = 0;
            this.node.emit('player-fire');
        }
    }

    public takeDamage(amount: number): void {
        if (!this._alive) return;
        this._hp -= amount;
        this.node.emit('player-hit', this._hp, this._maxHp);
        if (this._hp <= 0) {
            this._hp = 0;
            this._alive = false;
            this.node.emit('player-dead');
        }
    }

    public heal(amount: number): void {
        this._hp = Math.min(this._hp + amount, this._maxHp);
    }

    /** 供技能系统调用 */
    public modifyFireRate(mult: number): void {
        this.fireRate *= mult;
    }

    public modifyMoveSpeed(mult: number): void {
        this.moveSpeed *= mult;
    }

    public modifyMaxHp(mult: number): void {
        const ratio = this._hp / this._maxHp;
        this._maxHp *= mult;
        this._hp = Math.floor(this._maxHp * ratio);
    }
}
