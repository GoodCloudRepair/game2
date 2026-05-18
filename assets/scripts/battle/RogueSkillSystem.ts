import { _decorator, Component } from 'cc';
import { PlayerController } from './PlayerController';
import { LevelSystem } from './LevelSystem';
const { ccclass, property } = _decorator;

export interface SkillConfig {
    id: string;
    name: string;
    category: 'atk' | 'def' | 'util';
    baseValue: number;
    stackValue: number;
    maxStack: number;
    weight: number;
    description: string;
}

/** 肉鸽技能系统：升级时随机3选1，效果叠加 */
@ccclass('RogueSkillSystem')
export class RogueSkillSystem extends Component {
    @property(PlayerController)
    private readonly player: PlayerController | null = null;

    @property(LevelSystem)
    private readonly levelSystem: LevelSystem | null = null;

    private _skillPool: SkillConfig[] = [];
    private readonly _acquired: Map<string, number> = new Map(); // id → 当前层数
    private _paused: boolean = false;

    protected onEnable(): void {
        if (this.levelSystem) {
            this.levelSystem.node.on('level-up', this.onLevelUp, this);
        }
    }

    protected onDisable(): void {
        if (this.levelSystem) {
            this.levelSystem.node.off('level-up', this.onLevelUp, this);
        }
    }

    public initPool(skills: SkillConfig[]): void {
        this._skillPool = skills;
        this._acquired.clear();
    }

    private onLevelUp(level: number): void {
        const choices = this.rollChoices(3);
        if (choices.length === 0) return;
        // 暂停游戏，弹出选择UI
        this._paused = true;
        this.node.emit('show-skill-choices', choices);
    }

    /** 玩家选择技能后调用 */
    public selectSkill(skillId: string): void {
        const skill = this._skillPool.find(s => s.id === skillId);
        if (!skill) return;

        const currentStack = this._acquired.get(skillId) ?? 0;
        this._acquired.set(skillId, currentStack + 1);
        this.applySkill(skill, currentStack + 1);

        this._paused = false;
        this.node.emit('skill-selected', skillId, currentStack + 1);
    }

    /** 按权重随机抽取N个可选技能 */
    private rollChoices(count: number): SkillConfig[] {
        const available = this._skillPool.filter(s => {
            const stack = this._acquired.get(s.id) ?? 0;
            return stack < s.maxStack;
        });

        if (available.length <= count) return [...available];

        // 加权随机
        const totalWeight = available.reduce((sum, s) => sum + s.weight, 0);
        const result: SkillConfig[] = [];
        const used = new Set<number>();

        while (result.length < count) {
            let roll = Math.random() * totalWeight;
            for (let i = 0; i < available.length; i++) {
                if (used.has(i)) continue;
                roll -= available[i].weight;
                if (roll <= 0) {
                    result.push(available[i]);
                    used.add(i);
                    break;
                }
            }
        }
        return result;
    }

    private applySkill(skill: SkillConfig, stack: number): void {
        if (!this.player) return;
        const value = skill.baseValue + skill.stackValue * (stack - 1);

        switch (skill.id) {
            case 'A1': // 多重射击 - 通过事件通知武器系统
                this.node.emit('skill-multishot', stack);
                break;
            case 'A2': // 射速提升
                this.player.modifyFireRate(1 + value / 100);
                break;
            case 'A5': // 暴击强化 - 通过事件
                this.node.emit('skill-crit', value);
                break;
            case 'D1': // 生命提升
                this.player.modifyMaxHp(1 + value / 100);
                break;
            case 'U1': // 移速提升
                this.player.modifyMoveSpeed(1 + value / 100);
                break;
            case 'U3': // 经验加成
                if (this.levelSystem) this.levelSystem.addExpBonus(value / 100);
                break;
            default:
                this.node.emit('skill-apply', skill.id, value, stack);
                break;
        }
    }

    public get isPaused(): boolean { return this._paused; }
}
