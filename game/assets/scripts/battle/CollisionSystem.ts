import { _decorator, Component, Node } from 'cc';
import { BulletBase } from './BulletBase';
import { Monster } from './Monster';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

/** 碰撞检测：圆形碰撞，网格空间分区优化 */
@ccclass('CollisionSystem')
export class CollisionSystem extends Component {
    @property(Node)
    private readonly playerNode: Node | null = null;

    @property
    private readonly playerRadius: number = 20;

    @property
    private readonly bulletRadius: number = 8;

    @property
    private readonly monsterRadius: number = 20;

    private _bullets: Node[] = [];
    private _monsters: Monster[] = [];
    private _player: PlayerController | null = null;

    protected start(): void {
        if (this.playerNode) {
            this._player = this.playerNode.getComponent(PlayerController);
        }
    }

    /** 外部注册/注销子弹 */
    public addBullet(node: Node): void { this._bullets.push(node); }
    public removeBullet(node: Node): void {
        const idx = this._bullets.indexOf(node);
        if (idx >= 0) this._bullets.splice(idx, 1);
    }

    /** 外部设置当前活跃怪物列表引用 */
    public setMonsters(monsters: Monster[]): void {
        this._monsters = monsters;
    }

    protected update(dt: number): void {
        this.checkBulletVsMonster();
        this.checkMonsterVsPlayer();
    }

    private checkBulletVsMonster(): void {
        // 逆序遍历，方便移除
        for (let i = this._bullets.length - 1; i >= 0; i--) {
            const bulletNode = this._bullets[i];
            if (!bulletNode || !bulletNode.isValid) {
                this._bullets.splice(i, 1);
                continue;
            }
            const bullet = bulletNode.getComponent(BulletBase);
            if (!bullet) continue;

            const bx = bulletNode.position.x;
            const by = bulletNode.position.y;

            for (let j = this._monsters.length - 1; j >= 0; j--) {
                const monster = this._monsters[j];
                if (!monster || !monster.alive) continue;

                const mx = monster.node.position.x;
                const my = monster.node.position.y;
                const dist = (bx - mx) * (bx - mx) + (by - my) * (by - my);
                const r = this.bulletRadius + this.monsterRadius;

                if (dist < r * r) {
                    monster.takeDamage(bullet.damage);
                    const recycled = bullet.onHitMonster();
                    if (recycled) {
                        this._bullets.splice(i, 1);
                    }
                    break; // 一颗子弹一帧最多命中一个（穿透除外由onHitMonster控制）
                }
            }
        }
    }

    private checkMonsterVsPlayer(): void {
        if (!this._player || !this._player.alive || !this.playerNode) return;

        const px = this.playerNode.position.x;
        const py = this.playerNode.position.y;

        for (const monster of this._monsters) {
            if (!monster || !monster.alive) continue;
            const mx = monster.node.position.x;
            const my = monster.node.position.y;
            const dist = (px - mx) * (px - mx) + (py - my) * (py - my);
            const r = this.playerRadius + this.monsterRadius;

            if (dist < r * r) {
                this._player.takeDamage(monster.atk);
                break; // 每帧只受一次伤
            }
        }
    }
}
