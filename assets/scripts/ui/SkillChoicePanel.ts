import { _decorator, Label, Node, Button } from 'cc';
import { UIBase } from './UIBase';
import { SkillConfig } from '../battle/RogueSkillSystem';
const { ccclass, property } = _decorator;

/** 肉鸽3选1技能面板 */
@ccclass('SkillChoicePanel')
export class SkillChoicePanel extends UIBase {
    @property([Node])
    private readonly cards: Node[] = [];

    private _choices: SkillConfig[] = [];
    private _callback: ((id: string) => void) | null = null;

    protected onEnable(): void {
        this.cards.forEach((card, i) => {
            card.on(Button.EventType.CLICK, () => this.onCardClick(i), this);
        });
    }

    protected onDisable(): void {
        this.cards.forEach(card => {
            card.off(Button.EventType.CLICK);
        });
    }

    /** 显示3个技能选项 */
    public showChoices(choices: SkillConfig[], callback: (id: string) => void): void {
        this._choices = choices;
        this._callback = callback;

        choices.forEach((skill, i) => {
            if (i >= this.cards.length) return;
            const card = this.cards[i];
            card.active = true;
            const nameLabel = card.getChildByName('Name')?.getComponent(Label);
            const descLabel = card.getChildByName('Desc')?.getComponent(Label);
            if (nameLabel) nameLabel.string = skill.name;
            if (descLabel) descLabel.string = skill.description;
        });

        // 隐藏多余卡片
        for (let i = choices.length; i < this.cards.length; i++) {
            this.cards[i].active = false;
        }

        this.show();
    }

    private onCardClick(index: number): void {
        if (index >= this._choices.length) return;
        const skillId = this._choices[index].id;
        this.hide();
        this._callback?.(skillId);
    }
}
