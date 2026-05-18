import { _decorator, Component, JsonAsset, resources } from 'cc';
const { ccclass } = _decorator;

/** 配表加载器：加载 JSON 配表到内存 */
@ccclass('ConfigLoader')
export class ConfigLoader extends Component {
    private static _instance: ConfigLoader | null = null;
    private readonly _configs: Map<string, any[]> = new Map();

    public static get instance(): ConfigLoader {
        if (!ConfigLoader._instance) throw new Error('ConfigLoader not initialized');
        return ConfigLoader._instance;
    }

    protected onLoad(): void {
        ConfigLoader._instance = this;
    }

    /** 加载所有配表 */
    public async loadAll(): Promise<void> {
        const tables = ['heroes', 'weapons', 'monsters', 'skills', 'stages'];
        const promises = tables.map(name => this.loadOne(name));
        await Promise.all(promises);
    }

    private loadOne(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            resources.load(`configs/${name}`, JsonAsset, (err, asset) => {
                if (err) { reject(err); return; }
                this._configs.set(name, asset.json as any[]);
                resolve();
            });
        });
    }

    public get<T>(tableName: string): T[] {
        return (this._configs.get(tableName) ?? []) as T[];
    }

    public getById<T extends { id: number }>(tableName: string, id: number): T | undefined {
        return this.get<T>(tableName).find(item => item.id === id);
    }
}
