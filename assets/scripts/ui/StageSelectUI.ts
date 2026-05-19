import { _decorator, Label, Node, Button } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

export interface StageInfo {
    id: number;
    chapter: number;
    level: number;
    unlockPower: number;
    rewardGold: number;
}

/** 关卡选择界面 */
@ccclass('StageSelectUI')
export class StageSelectUI extends UIBase {
    @property(Label)
    private readonly chapterLabel: Label | null = null;

    @property([Node])
    private readonly levelButtons: Node[] = [];

    @property(Label)
    private readonly powerLabel: Label | null = null;

    private _stages: StageInfo[] = [];
    private _currentChapter: number = 1;
    private _playerPower: number = 0;
    private _callback: ((stageId: number) => void) | null = null;

    public init(stages: StageInfo[], playerPower: number, callback: (stageId: number) => void): void {
        this._stages = stages;
        this._playerPower = playerPower;
        this._callback = callback;
        this.showChapter(1);
        if (this.powerLabel) this.powerLabel.string = `战力: ${playerPower}`;
    }

    public showChapter(chapter: number): void {
        this._currentChapter = chapter;
        if (this.chapterLabel) this.chapterLabel.string = `第${chapter}章`;

        const chapterStages = this._stages.filter(s => s.chapter === chapter);
        this.levelButtons.forEach((btn, i) => {
            if (i < chapterStages.length) {
                btn.active = true;
                const label = btn.getChildByName('Label')?.getComponent(Label);
                if (label) label.string = `${chapter}-${chapterStages[i].level}`;
                const locked = this._playerPower < chapterStages[i].unlockPower;
                btn.getComponent(Button)!.interactable = !locked;
                btn.off(Button.EventType.CLICK);
                if (!locked) {
                    const stageId = chapterStages[i].id;
                    btn.on(Button.EventType.CLICK, () => this._callback?.(stageId), this);
                }
            } else {
                btn.active = false;
            }
        });
    }

    public nextChapter(): void { this.showChapter(this._currentChapter + 1); }
    public prevChapter(): void { if (this._currentChapter > 1) this.showChapter(this._currentChapter - 1); }
}
