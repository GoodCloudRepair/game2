import { Node, Prefab, instantiate, _decorator } from 'cc';
import { Singleton } from './Singleton';
import { ResManager } from './ResManager';

const { ccclass } = _decorator;

/** UI 层级定义 */
export enum UILayer {
    Game = 0,
    UI = 100,
    Popup = 200,
    Loading = 300,
    Toast = 400,
}

interface UIInfo {
    readonly node: Node;
    readonly layer: UILayer;
}

/**
 * UI 管理 — 栈式管理，支持层级和预加载
 * 竖屏小游戏 UI 层级简单，栈式足够
 */
@ccclass('UIManager')
export class UIManager extends Singleton<UIManager> {
    private readonly _stack: UIInfo[] = [];
    private readonly _cache: Map<string, Node> = new Map();
    private _uiRoot: Node | null = null;

    public setUIRoot(root: Node): void {
        this._uiRoot = root;
    }

    /** 打开 UI（从 resources/prefabs/ui/ 加载） */
    public async open(name: string, layer: UILayer = UILayer.UI): Promise<Node> {
        let node = this._cache.get(name);
        if (!node) {
            const prefab = await ResManager.getInstance<ResManager>().load<Prefab>(`prefabs/ui/${name}`, Prefab);
            node = instantiate(prefab);
            this._cache.set(name, node);
        }
        if (!this._uiRoot) throw new Error('[UIManager] 未设置 UIRoot');
        node.setSiblingIndex(layer);
        this._uiRoot.addChild(node);
        node.active = true;
        this._stack.push({ node, layer });
        return node;
    }

    /** 关闭指定 UI */
    public close(name: string): void {
        const node = this._cache.get(name);
        if (!node) return;
        node.removeFromParent();
        node.active = false;
        const idx = this._stack.findIndex((info) => info.node === node);
        if (idx >= 0) this._stack.splice(idx, 1);
    }

    /** 关闭栈顶 UI */
    public closeTop(): void {
        const info = this._stack.pop();
        if (info) {
            info.node.removeFromParent();
            info.node.active = false;
        }
    }

    /** 预加载 UI（不显示） */
    public async preload(name: string): Promise<void> {
        if (this._cache.has(name)) return;
        const prefab = await ResManager.getInstance<ResManager>().load<Prefab>(`prefabs/ui/${name}`, Prefab);
        const node = instantiate(prefab);
        node.active = false;
        this._cache.set(name, node);
    }

    /** 销毁缓存 */
    public destroyUI(name: string): void {
        const node = this._cache.get(name);
        if (node) {
            node.destroy();
            this._cache.delete(name);
        }
    }
}
