import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

export interface HeroAttr {
    atk: number;
    hp: number;
    def: number;
    spd: number;   // 射速
    cri: number;   // 暴击率
    crd: number;   // 暴击伤害
    mov: number;   // 移速
    rng: number;   // 拾取范围
}

/** 角色养成系统：计算最终属性 = 基础(等级) × 星级 + 装备 */
@ccclass('HeroSystem')
export class HeroSystem extends Component {
    private _level: number = 1;
    private _star: number = 0;
    private _equipAtk: number = 0;
    private _equipHp: number = 0;
    private _equipDef: number = 0;

    private static readonly STAR_MULT = [1.0, 1.0, 1.15, 1.3, 1.5, 1.8, 2.2];
    private static readonly BASE_ATK = 20;
    private static readonly BASE_HP = 200;
    private static readonly BASE_DEF = 5;
    private static readonly GROWTH_ATK = 3;
    private static readonly GROWTH_HP = 15;
    private static readonly GROWTH_DEF = 1;

    public get level(): number { return this._level; }
    public get star(): number { return this._star; }

    /** 计算最终属性 */
    public getAttr(): HeroAttr {
        const starMult = HeroSystem.STAR_MULT[this._star] ?? 1.0;
        return {
            atk: Math.floor((HeroSystem.BASE_ATK + (this._level - 1) * HeroSystem.GROWTH_ATK) * starMult + this._equipAtk),
            hp: Math.floor((HeroSystem.BASE_HP + (this._level - 1) * HeroSystem.GROWTH_HP) * starMult + this._equipHp),
            def: Math.floor((HeroSystem.BASE_DEF + (this._level - 1) * HeroSystem.GROWTH_DEF) * starMult + this._equipDef),
            spd: 2.0,
            cri: 0.05,
            crd: 1.5,
            mov: 200,
            rng: 60,
        };
    }

    /** 战力（用于放置挂机产出计算） */
    public getPower(): number {
        const a = this.getAttr();
        return a.atk * 2 + a.hp * 0.5 + a.def * 3;
    }

    /** 升级消耗：100 * 1.18^(lv-1) */
    public getLevelUpCost(): number {
        return Math.floor(100 * Math.pow(1.18, this._level - 1));
    }

    public levelUp(): boolean {
        this._level++;
        this.node.emit('hero-changed');
        return true;
    }

    /** 星级消耗碎片：[10, 30, 60, 120, 200] */
    public getStarUpCost(): number {
        const costs = [10, 30, 60, 120, 200];
        return costs[this._star] ?? 999;
    }

    public starUp(): boolean {
        if (this._star >= 6) return false;
        this._star++;
        this.node.emit('hero-changed');
        return true;
    }

    public setEquip(atk: number, hp: number, def: number): void {
        this._equipAtk = atk;
        this._equipHp = hp;
        this._equipDef = def;
        this.node.emit('hero-changed');
    }

    public loadData(level: number, star: number): void {
        this._level = level;
        this._star = star;
    }
}
