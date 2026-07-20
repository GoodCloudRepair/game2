import { _decorator } from 'cc';
import { Singleton } from './Singleton';
import { EventManager } from './EventManager';
import { TimeManager } from './TimeManager';
import { SaveManager } from './SaveManager';

const { ccclass } = _decorator;

/** 游戏状态 */
export enum GameState {
    None = 0,
    Loading,
    Home,
    Battle,
    Pause,
}

/**
 * 游戏总管理器 — 初始化所有子系统，管理游戏状态
 * 作为唯一入口，挂载在场景持久节点上
 */
@ccclass('GameManager')
export class GameManager extends Singleton<GameManager> {
    private _state: GameState = GameState.None;

    public get state(): GameState {
        return this._state;
    }

    protected onLoad(): void {
        super.onLoad();
        this._state = GameState.Loading;
    }

    /** 游戏初始化 */
    public async init(): Promise<void> {
        this._state = GameState.Home;
    }

    public changeState(state: GameState): void {
        const prev = this._state;
        this._state = state;
        EventManager.getInstance<EventManager>().emit('game_state_changed', state, prev);
    }

    /** 定时保存（建议每30秒调用一次） */
    public autoSave(): void {
        TimeManager.getInstance<TimeManager>().recordOnlineTime();
        SaveManager.getInstance<SaveManager>().saveLocal();
    }
}
