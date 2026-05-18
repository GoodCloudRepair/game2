import { sys, _decorator } from 'cc';
import { Singleton } from './Singleton';

const { ccclass } = _decorator;

/**
 * 存档管理 — localStorage + 云存档接口预留
 * 抖音小游戏 localStorage 上限 10MB，需控制存档大小
 */
@ccclass('SaveManager')
export class SaveManager extends Singleton<SaveManager> {
    private static readonly SAVE_KEY: string = 'game_save';
    private _data: Record<string, any> = {};
    private _dirty: boolean = false;

    protected onLoad(): void {
        super.onLoad();
        this._loadLocal();
    }

    public get<T>(key: string, defaultVal: T): T {
        const val = this._data[key];
        return val !== undefined ? val as T : defaultVal;
    }

    public set(key: string, value: any): void {
        this._data[key] = value;
        this._dirty = true;
    }

    /** 立即保存到本地 */
    public saveLocal(): void {
        if (!this._dirty) return;
        const json = JSON.stringify(this._data);
        sys.localStorage.setItem(SaveManager.SAVE_KEY, json);
        this._dirty = false;
    }

    private _loadLocal(): void {
        const raw = sys.localStorage.getItem(SaveManager.SAVE_KEY);
        if (raw) {
            try {
                this._data = JSON.parse(raw);
            } catch {
                this._data = {};
            }
        }
    }

    public clearLocal(): void {
        this._data = {};
        sys.localStorage.removeItem(SaveManager.SAVE_KEY);
    }

    // ===== 云存档接口预留 =====
    public async saveToCloud(): Promise<void> {
        throw new Error('[SaveManager] 云存档未实现');
    }

    public async loadFromCloud(): Promise<void> {
        throw new Error('[SaveManager] 云存档未实现');
    }
}
