import { NodePool, Prefab, Node, instantiate, _decorator } from 'cc';
import { Singleton } from './Singleton';

const { ccclass } = _decorator;

/**
 * 通用对象池 — 基于 NodePool
 * 割草游戏核心：大量怪物/子弹复用，避免 GC 卡顿
 */
@ccclass('ObjectPool')
export class ObjectPool extends Singleton<ObjectPool> {
    private readonly _pools: Map<string, NodePool> = new Map();
    private readonly _prefabs: Map<string, Prefab> = new Map();

    /** 注册预制体 */
    public registerPrefab(name: string, prefab: Prefab): void {
        this._prefabs.set(name, prefab);
        if (!this._pools.has(name)) {
            this._pools.set(name, new NodePool(name));
        }
    }

    /** 预热：提前实例化指定数量 */
    public warmUp(name: string, count: number): void {
        const prefab = this._prefabs.get(name);
        if (!prefab) throw new Error(`[ObjectPool] 未注册预制体: ${name}`);
        const pool = this._pools.get(name)!;
        for (let i = 0; i < count; i++) {
            const node = instantiate(prefab);
            pool.put(node);
        }
    }

    /** 获取节点 */
    public get(name: string): Node {
        const pool = this._pools.get(name);
        if (!pool) throw new Error(`[ObjectPool] 未注册池: ${name}`);
        if (pool.size() > 0) {
            return pool.get()!;
        }
        const prefab = this._prefabs.get(name);
        if (!prefab) throw new Error(`[ObjectPool] 未注册预制体: ${name}`);
        return instantiate(prefab);
    }

    /** 回收节点 */
    public put(name: string, node: Node): void {
        const pool = this._pools.get(name);
        if (!pool) throw new Error(`[ObjectPool] 未注册池: ${name}`);
        pool.put(node);
    }

    /** 清空指定池 */
    public clear(name: string): void {
        const pool = this._pools.get(name);
        if (pool) pool.clear();
    }

    /** 清空所有池 */
    public clearAll(): void {
        this._pools.forEach((pool) => pool.clear());
    }
}
