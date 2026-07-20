import { _decorator, Component, Node, Prefab, Vec2, Vec3, instantiate } from 'cc';
import { BulletBase } from '../battle/BulletBase';
import { Monster } from '../battle/Monster';
const { ccclass, property } = _decorator;

export interface WeaponConfig {
    id: number;
    name: string;
    type: 'pistol' | 'shotgun' | 'rifle' | 'launcher';
    damageMult: number;
    fireRate: number;
    bulletCount: number;
    bulletPattern: 'straight' | 'spread' | 'ring';
}

/** 武器系统：管理射击模式和子弹生成 */
@ccclass('WeaponSystem')
export class WeaponSystem extends Component {
    @property(Prefab)
    private readonly bulletPrefab: Prefab | null = null;

    @property(Node)
    private readonly bulletContainer: Node | null = null;

    @property(Node)
    private readonly playerNode: Node | null = null;

    private _config: WeaponConfig | null = null;
    private _baseDamage: number = 20;
    private _extraBullets: number = 0; // 肉鸽技能加的子弹数
    private _pierce: number = 0;
    private readonly _tempDir: Vec2 = new Vec2();

    public setWeapon(config: WeaponConfig): void {
        this._config = config;
    }

    public setBaseDamage(atk: number): void {
        this._baseDamage = atk;
    }

    public addExtraBullets(count: number): void {
        this._extraBullets += count;
    }

    public addPierce(count: number): void {
        this._pierce += count;
    }

    /** 开火：找最近怪物方向，按武器模式发射子弹 */
    public fire(monsters: readonly Monster[]): void {
        if (!this._config || !this.bulletPrefab || !this.bulletContainer || !this.playerNode) return;

        const target = this.findNearest(monsters);
        if (!target) return;

        // 计算朝向
        const px = this.playerNode.position.x;
        const py = this.playerNode.position.y;
        const tx = target.node.position.x;
        const ty = target.node.position.y;
        const dx = tx - px;
        const dy = ty - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) return;
        this._tempDir.set(dx / dist, dy / dist);

        const totalBullets = this._config.bulletCount + this._extraBullets;
        const damage = Math.floor(this._baseDamage * this._config.damageMult);

        switch (this._config.bulletPattern) {
            case 'straight':
                this.fireStraiht(damage, totalBullets);
                break;
            case 'spread':
                this.fireSpread(damage, totalBullets);
                break;
            case 'ring':
                this.fireRing(damage, totalBullets);
                break;
        }
    }

    private fireStraiht(damage: number, count: number): void {
        for (let i = 0; i < count; i++) {
            // 轻微偏移避免重叠
            const offset = (i - (count - 1) / 2) * 0.05;
            this.spawnBullet(damage, this._tempDir.x + offset, this._tempDir.y);
        }
    }

    private fireSpread(damage: number, count: number): void {
        const spreadAngle = Math.PI / 6; // 30度扇形
        const baseAngle = Math.atan2(this._tempDir.y, this._tempDir.x);
        for (let i = 0; i < count; i++) {
            const angle = baseAngle + (i - (count - 1) / 2) * (spreadAngle / Math.max(count - 1, 1));
            this.spawnBullet(damage, Math.cos(angle), Math.sin(angle));
        }
    }

    private fireRing(damage: number, count: number): void {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            this.spawnBullet(damage, Math.cos(angle), Math.sin(angle));
        }
    }

    private spawnBullet(damage: number, dirX: number, dirY: number): void {
        const node = instantiate(this.bulletPrefab!);
        this.bulletContainer!.addChild(node);
        node.setPosition(this.playerNode!.position.x, this.playerNode!.position.y, 0);

        const bullet = node.getComponent(BulletBase);
        bullet?.init(damage, dirX, dirY, this._pierce);
    }

    private findNearest(monsters: readonly Monster[]): Monster | null {
        let nearest: Monster | null = null;
        let minDist = Infinity;
        const px = this.playerNode!.position.x;
        const py = this.playerNode!.position.y;

        for (const m of monsters) {
            if (!m.alive) continue;
            const dx = m.node.position.x - px;
            const dy = m.node.position.y - py;
            const d = dx * dx + dy * dy;
            if (d < minDist) {
                minDist = d;
                nearest = m;
            }
        }
        return nearest;
    }
}
