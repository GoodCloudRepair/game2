import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

declare const tt: any;

export type AdScene = 'revive' | 'double_settle' | 'double_idle' | 'chest' | 'wheel' | 'skill_reroll';

/** 广告管理器：激励视频封装 */
@ccclass('AdManager')
export class AdManager extends Component {
    private static _instance: AdManager | null = null;
    private _rewardedAd: any = null;
    private _adReady: boolean = false;
    private _callback: ((success: boolean) => void) | null = null;

    /** 每日广告次数限制 */
    private readonly _dailyLimits: Record<AdScene, number> = {
        revive: 3, double_settle: 5, double_idle: 3,
        chest: 3, wheel: 3, skill_reroll: 99,
    };
    private readonly _dailyUsed: Record<string, number> = {};

    public static get instance(): AdManager {
        if (!AdManager._instance) throw new Error('AdManager not initialized');
        return AdManager._instance;
    }

    protected onLoad(): void {
        AdManager._instance = this;
        this.createAd();
    }

    private createAd(): void {
        if (typeof tt === 'undefined') return;

        this._rewardedAd = tt.createRewardedVideoAd({
            adUnitId: 'YOUR_AD_UNIT_ID', // 替换为实际广告位ID
        });

        this._rewardedAd.onLoad(() => { this._adReady = true; });
        this._rewardedAd.onError(() => { this._adReady = false; });
        this._rewardedAd.onClose((res: any) => {
            this._adReady = false;
            const rewarded = res?.isEnded ?? false;
            this._callback?.(rewarded);
            this._callback = null;
            // 预加载下一条
            this._rewardedAd.load();
        });
    }

    /** 检查某场景是否还有广告次数 */
    public canShowAd(scene: AdScene): boolean {
        const used = this._dailyUsed[scene] ?? 0;
        return used < this._dailyLimits[scene];
    }

    /** 播放激励视频 */
    public showAd(scene: AdScene, callback: (success: boolean) => void): void {
        if (!this.canShowAd(scene)) {
            callback(false);
            return;
        }

        // 开发环境直接成功
        if (typeof tt === 'undefined') {
            this._dailyUsed[scene] = (this._dailyUsed[scene] ?? 0) + 1;
            callback(true);
            return;
        }

        if (!this._adReady) {
            this._rewardedAd?.load();
            callback(false);
            return;
        }

        this._callback = (success) => {
            if (success) {
                this._dailyUsed[scene] = (this._dailyUsed[scene] ?? 0) + 1;
            }
            callback(success);
        };
        this._rewardedAd.show();
    }

    /** 每日重置（登录时调用） */
    public resetDaily(): void {
        Object.keys(this._dailyUsed).forEach(k => { this._dailyUsed[k] = 0; });
    }
}
