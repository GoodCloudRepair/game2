import { EventTarget, _decorator } from 'cc';
import { Singleton } from './Singleton';

const { ccclass } = _decorator;

/**
 * 事件总线 — 基于 EventTarget，全局事件通信
 * 模块间解耦的核心机制
 */
@ccclass('EventManager')
export class EventManager extends Singleton<EventManager> {
    private readonly _eventTarget: EventTarget = new EventTarget();

    public on(event: string, callback: (...args: any[]) => void, target?: object): void {
        this._eventTarget.on(event, callback, target);
    }

    public once(event: string, callback: (...args: any[]) => void, target?: object): void {
        this._eventTarget.once(event, callback, target);
    }

    public off(event: string, callback: (...args: any[]) => void, target?: object): void {
        this._eventTarget.off(event, callback, target);
    }

    public emit(event: string, ...args: any[]): void {
        this._eventTarget.emit(event, ...args);
    }
}
