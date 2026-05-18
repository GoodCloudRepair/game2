import { Component, director, _decorator } from 'cc';

const { ccclass } = _decorator;

/**
 * 单例基类 — 继承 Component，自动挂载持久节点
 * 用法：class MyMgr extends Singleton<MyMgr> {}
 */
@ccclass('Singleton')
export abstract class Singleton<T extends Singleton<T>> extends Component {
    private static _instances: Map<string, Singleton<any>> = new Map();

    public static getInstance<T extends Singleton<T>>(this: new () => T): T {
        const name = (this as any).name || this.toString();
        if (!Singleton._instances.has(name)) {
            throw new Error(`[Singleton] ${name} 未初始化，请确保场景中存在该节点`);
        }
        return Singleton._instances.get(name) as T;
    }

    protected onLoad(): void {
        const name = (this.constructor as any).name;
        if (Singleton._instances.has(name)) {
            this.node.destroy();
            return;
        }
        Singleton._instances.set(name, this);
        // 持久节点，切场景不销毁
        director.addPersistRootNode(this.node);
    }

    protected onDestroy(): void {
        const name = (this.constructor as any).name;
        if (Singleton._instances.get(name) === this) {
            Singleton._instances.delete(name);
        }
    }
}
