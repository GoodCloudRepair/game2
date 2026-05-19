import { _decorator, Component, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass } = _decorator;

/** UI基类：提供显示/隐藏动画、生命周期钩子 */
@ccclass('UIBase')
export class UIBase extends Component {
    private _opacity: UIOpacity | null = null;

    protected onLoad(): void {
        this._opacity = this.node.getComponent(UIOpacity) ?? this.node.addComponent(UIOpacity);
    }

    public show(): void {
        this.node.active = true;
        if (this._opacity) {
            this._opacity.opacity = 0;
            tween(this._opacity).to(0.15, { opacity: 255 }).start();
        }
        this.onShow();
    }

    public hide(): void {
        if (this._opacity) {
            tween(this._opacity).to(0.1, { opacity: 0 }).call(() => {
                this.node.active = false;
                this.onHide();
            }).start();
        } else {
            this.node.active = false;
            this.onHide();
        }
    }

    /** 子类重写 */
    protected onShow(): void {}
    protected onHide(): void {}
}
