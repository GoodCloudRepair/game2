import { Asset, AssetManager, assetManager, resources, _decorator } from 'cc';
import { Singleton } from './Singleton';

const { ccclass } = _decorator;

/**
 * 资源管理 — 封装 resources.load 和 AssetBundle 分包加载
 * 抖音小游戏首包<4MB，必须用分包
 */
@ccclass('ResManager')
export class ResManager extends Singleton<ResManager> {
    private readonly _bundles: Map<string, AssetManager.Bundle> = new Map();

    /** 加载 Bundle */
    public async loadBundle(name: string): Promise<AssetManager.Bundle> {
        if (this._bundles.has(name)) {
            return this._bundles.get(name)!;
        }
        return new Promise((resolve, reject) => {
            assetManager.loadBundle(name, (err, bundle) => {
                if (err) {
                    reject(new Error(`[ResManager] 加载Bundle失败: ${name}, ${err.message}`));
                    return;
                }
                this._bundles.set(name, bundle);
                resolve(bundle);
            });
        });
    }

    /** 从 resources 加载资源 */
    public async load<T extends Asset>(path: string, type: new () => T): Promise<T> {
        return new Promise((resolve, reject) => {
            resources.load(path, type, (err, asset) => {
                if (err) {
                    reject(new Error(`[ResManager] 加载失败: ${path}, ${err.message}`));
                    return;
                }
                resolve(asset);
            });
        });
    }

    /** 从指定 Bundle 加载资源 */
    public async loadFromBundle<T extends Asset>(bundleName: string, path: string, type: new () => T): Promise<T> {
        const bundle = this._bundles.get(bundleName);
        if (!bundle) throw new Error(`[ResManager] Bundle未加载: ${bundleName}`);
        return new Promise((resolve, reject) => {
            bundle.load(path, type, (err, asset) => {
                if (err) {
                    reject(new Error(`[ResManager] Bundle资源加载失败: ${bundleName}/${path}`));
                    return;
                }
                resolve(asset);
            });
        });
    }

    /** 释放资源 */
    public release(asset: Asset): void {
        asset.decRef();
    }

    /** 释放 Bundle */
    public releaseBundle(name: string): void {
        const bundle = this._bundles.get(name);
        if (bundle) {
            bundle.releaseAll();
            assetManager.removeBundle(bundle);
            this._bundles.delete(name);
        }
    }
}
