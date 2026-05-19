import { _decorator, Label, Node, Button } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

/** 战斗结算界面 */
@ccclass('SettleUI')
export class SettleUI extends UIBase {
    @property(Label)
    private readonly resultLabel: Label | null = null;

    @property(Label)
    private readonly goldLabel: Label | null = null;

    @property(Label)
    private readonly levelLabel: Label | null = null;

    @property(Node)
    private readonly btnDouble: Node | null = null; // 看广告双倍

    @property(Node)
    private readonly btnConfirm: Node | null = null;

    private _gold: number = 0;
    private _onConfirm: ((doubled: boolean) => void) | null = null;

    public showResult(victory: boolean, gold: number, level: number, onConfirm: (doubled: boolean) => void): void {
        this._gold = gold;
        this._onConfirm = onConfirm;

        if (this.resultLabel) this.resultLabel.string = victory ? '通关成功！' : '挑战失败';
        if (this.goldLabel) this.goldLabel.string = `金币 +${gold}`;
        if (this.levelLabel) this.levelLabel.string = `达到 Lv.${level}`;

        this.show();
    }

    protected onEnable(): void {
        this.btnDouble?.on(Button.EventType.CLICK, this.onDoubleClick, this);
        this.btnConfirm?.on(Button.EventType.CLICK, this.onConfirmClick, this);
    }

    protected onDisable(): void {
        this.btnDouble?.off(Button.EventType.CLICK);
        this.btnConfirm?.off(Button.EventType.CLICK);
    }

    private onDoubleClick(): void {
        // TODO: 调用广告SDK，成功后回调
        this.node.emit('request-ad', () => {
            if (this.goldLabel) this.goldLabel.string = `金币 +${this._gold * 2}`;
            this.btnDouble!.active = false;
        });
    }

    private onConfirmClick(): void {
        this.hide();
        this._onConfirm?.(false);
    }
}
