import { _decorator, Component, Label, ProgressBar, Node } from 'cc';
const { ccclass, property } = _decorator;

/** 战斗HUD：血条、经验条、等级、波次显示 */
@ccclass('BattleHUD')
export class BattleHUD extends Component {
    @property(ProgressBar)
    private readonly hpBar: ProgressBar | null = null;

    @property(ProgressBar)
    private readonly expBar: ProgressBar | null = null;

    @property(Label)
    private readonly levelLabel: Label | null = null;

    @property(Label)
    private readonly waveLabel: Label | null = null;

    @property(Node)
    private readonly bossWarning: Node | null = null;

    public updateHp(current: number, max: number): void {
        if (this.hpBar) this.hpBar.progress = Math.max(0, current / max);
    }

    public updateExp(current: number, max: number, level: number): void {
        if (this.expBar) this.expBar.progress = current / max;
        if (this.levelLabel) this.levelLabel.string = `Lv.${level}`;
    }

    public updateWave(current: number, total: number): void {
        if (this.waveLabel) this.waveLabel.string = `第${current}/${total}波`;
    }

    public showBossWarning(): void {
        if (this.bossWarning) this.bossWarning.active = true;
    }

    public hideBossWarning(): void {
        if (this.bossWarning) this.bossWarning.active = false;
    }
}
