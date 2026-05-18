import { _decorator } from 'cc';
import { Singleton } from './Singleton';
import { SaveManager } from './SaveManager';

const { ccclass } = _decorator;

/**
 * 时间管理 — 服务器时间同步 + 离线时长计算
 * 放置挂机核心：离线收益依赖准确的离线时长
 */
@ccclass('TimeManager')
export class TimeManager extends Singleton<TimeManager> {
    private _serverOffset: number = 0;
    private static readonly LAST_ONLINE_KEY: string = 'last_online_ts';

    /** 同步服务器时间 */
    public syncServerTime(serverTimestamp: number): void {
        this._serverOffset = serverTimestamp - Date.now();
    }

    /** 获取当前服务器时间(ms) */
    public get now(): number {
        return Date.now() + this._serverOffset;
    }

    /** 获取当前服务器时间(秒) */
    public get nowSec(): number {
        return Math.floor(this.now / 1000);
    }

    /** 计算离线时长(秒) */
    public getOfflineDuration(): number {
        const save = SaveManager.getInstance<SaveManager>();
        const lastOnline = save.get<number>(TimeManager.LAST_ONLINE_KEY, 0);
        if (lastOnline <= 0) return 0;
        const duration = Math.floor((this.now - lastOnline) / 1000);
        return Math.max(0, duration);
    }

    /** 记录当前在线时间戳 */
    public recordOnlineTime(): void {
        const save = SaveManager.getInstance<SaveManager>();
        save.set(TimeManager.LAST_ONLINE_KEY, this.now);
        save.saveLocal();
    }

    protected onDestroy(): void {
        this.recordOnlineTime();
        super.onDestroy();
    }
}
