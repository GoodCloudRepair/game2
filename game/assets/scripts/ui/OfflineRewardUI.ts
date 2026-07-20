import { _decorator, Label, Node, Button } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

/** 离线收益弹窗 */
@ccclass('OfflineRewardUI')
export class OfflineRewardUI extends UIBase {
    @property(Label)
    private readonly timeLabel: Label | null = null;

    @property(Label)
    private readonly goldLabel: Label | null = null;

    @property(Label)
    private readonly materialLabel: Label | null = null;

    @property(Node)
    private readonly btnDouble: Node | null = null;

    @property(Node)
    private readonly btnCollect: Node | null = null;

    private _reward: { gold: number; material: number } = { gold: 0, material: 0 };
    private _onCollect: ((doubled: boolean) => void) | null = null;

    public showReward(hours: number, reward: { gold: number; material: number }, onCollect: (doubled: boolean) => void): void {
        this._reward = reward;
        this._onCollect = onCollect;

        const h = Math.floor(hours);
        const m = Math.floor((hours - h) * 60);
        if (this.timeLabel) this.timeLabel.string = `离线 ${h}小时${m}分钟`;
        if (this.goldLabel) this.goldLabel.string = `金币 +${reward.gold}`;
        if (this.materialLabel) this.materialLabel.string = `材料 +${reward.material}`;

        this.show();
    }

    protected onEnable(): void {
        this.btnDouble?.on(Button.EventType.CLICK, this.onDoubleClick, this);
        this.btnCollect?.on(Button.EventType.CLICK, this.onCollectClick, this);
    }

    protected onDisable(): void {
        this.btnDouble?.off(Button.EventType.CLICK);
        this.btnCollect?.off(Button.EventType.CLICK);
    }

    private onDoubleClick(): void {
        this.node.emit('request-ad', () => {
            if (this.goldLabel) this.goldLabel.string = `金币 +${this._reward.gold * 2}`;
            if (this.materialLabel) this.materialLabel.string = `材料 +${this._reward.material * 2}`;
            this.btnDouble!.active = false;
            this.hide();
            this._onCollect?.(true);
        });
    }

    private onCollectClick(): void {
        this.hide();
        this._onCollect?.(false);
    }
}
