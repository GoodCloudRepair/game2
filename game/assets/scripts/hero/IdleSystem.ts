import { _decorator, Component } from 'cc';
import { HeroSystem } from './HeroSystem';
const { ccclass, property } = _decorator;

/** 放置挂机系统：计算离线收益 */
@ccclass('IdleSystem')
export class IdleSystem extends Component {
    @property(HeroSystem)
    private readonly heroSystem: HeroSystem | null = null;

    private static readonly MAX_OFFLINE_HOURS: number = 8;
    private static readonly BASE_GOLD_PER_HOUR: number = 50;
    private static readonly BASE_MAT_PER_HOUR: number = 5;
    private static readonly POWER_GOLD_RATIO: number = 0.5;
    private static readonly POWER_MAT_RATIO: number = 0.1;

    /** 计算离线收益 */
    public calcOfflineReward(offlineSeconds: number, isMonthCard: boolean = false): { gold: number; material: number } {
        const hours = Math.min(offlineSeconds / 3600, IdleSystem.MAX_OFFLINE_HOURS);
        const power = this.heroSystem?.getPower() ?? 100;

        const goldPerHour = power * IdleSystem.POWER_GOLD_RATIO + IdleSystem.BASE_GOLD_PER_HOUR;
        const matPerHour = Math.floor(power * IdleSystem.POWER_MAT_RATIO) + IdleSystem.BASE_MAT_PER_HOUR;

        const monthCardMult = isMonthCard ? 1.5 : 1.0;

        return {
            gold: Math.floor(goldPerHour * hours * monthCardMult),
            material: Math.floor(matPerHour * hours * monthCardMult),
        };
    }

    /** 广告双倍 */
    public doubleReward(reward: { gold: number; material: number }): { gold: number; material: number } {
        return {
            gold: reward.gold * 2,
            material: reward.material * 2,
        };
    }
}
