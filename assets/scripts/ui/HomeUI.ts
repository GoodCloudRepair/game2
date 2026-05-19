import { _decorator, Label, Button, Node } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

/** 主界面：显示玩家信息，入口按钮 */
@ccclass('HomeUI')
export class HomeUI extends UIBase {
    @property(Label)
    private readonly goldLabel: Label | null = null;

    @property(Label)
    private readonly powerLabel: Label | null = null;

    @property(Label)
    private readonly levelLabel: Label | null = null;

    @property(Node)
    private readonly btnStart: Node | null = null;

    @property(Node)
    private readonly btnHero: Node | null = null;

    @property(Node)
    private readonly btnShop: Node | null = null;

    private _onStart: (() => void) | null = null;
    private _onHero: (() => void) | null = null;
    private _onShop: (() => void) | null = null;

    public init(onStart: () => void, onHero: () => void, onShop: () => void): void {
        this._onStart = onStart;
        this._onHero = onHero;
        this._onShop = onShop;
    }

    protected onEnable(): void {
        this.btnStart?.on(Button.EventType.CLICK, () => this._onStart?.(), this);
        this.btnHero?.on(Button.EventType.CLICK, () => this._onHero?.(), this);
        this.btnShop?.on(Button.EventType.CLICK, () => this._onShop?.(), this);
    }

    protected onDisable(): void {
        this.btnStart?.off(Button.EventType.CLICK);
        this.btnHero?.off(Button.EventType.CLICK);
        this.btnShop?.off(Button.EventType.CLICK);
    }

    public updateInfo(gold: number, power: number, level: number): void {
        if (this.goldLabel) this.goldLabel.string = `${gold}`;
        if (this.powerLabel) this.powerLabel.string = `战力 ${power}`;
        if (this.levelLabel) this.levelLabel.string = `Lv.${level}`;
    }
}
