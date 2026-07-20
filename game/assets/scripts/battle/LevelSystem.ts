import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;

/** 局内等级系统：经验累积→升级→触发技能选择 */
@ccclass('LevelSystem')
export class LevelSystem extends Component {
    private _level: number = 1;
    private _exp: number = 0;
    private _expToNext: number = 10;
    private _expBonus: number = 0; // 经验加成比例

    public get level(): number { return this._level; }
    public get exp(): number { return this._exp; }
    public get expToNext(): number { return this._expToNext; }
    public get progress(): number { return this._exp / this._expToNext; }

    public reset(): void {
        this._level = 1;
        this._exp = 0;
        this._expToNext = 10;
        this._expBonus = 0;
    }

    public addExpBonus(bonus: number): void {
        this._expBonus += bonus;
    }

    public addExp(amount: number): void {
        const actual = Math.floor(amount * (1 + this._expBonus));
        this._exp += actual;

        while (this._exp >= this._expToNext) {
            this._exp -= this._expToNext;
            this._level++;
            this._expToNext = Math.floor(10 * Math.pow(1.12, this._level - 1));
            this.node.emit('level-up', this._level);
        }

        this.node.emit('exp-changed', this._exp, this._expToNext, this._level);
    }
}
