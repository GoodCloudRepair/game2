import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

declare const tt: any;

export interface ProductConfig {
    id: string;
    name: string;
    price: number;     // 分
    type: 'monthCard' | 'weekCard' | 'removeAd' | 'skin' | 'firstPay' | 'gift';
}

/** 内购管理器：抖音支付封装 */
@ccclass('IAPManager')
export class IAPManager extends Component {
    private static _instance: IAPManager | null = null;

    public static get instance(): IAPManager {
        if (!IAPManager._instance) throw new Error('IAPManager not initialized');
        return IAPManager._instance;
    }

    protected onLoad(): void { IAPManager._instance = this; }

    /** 发起支付 */
    public pay(product: ProductConfig, callback: (success: boolean, orderId?: string) => void): void {
        if (typeof tt === 'undefined') {
            // 开发环境模拟成功
            callback(true, `dev_order_${Date.now()}`);
            return;
        }

        const orderId = this.generateOrderId();

        tt.requestGamePayment({
            mode: 'game',
            env: 0, // 0=正式环境
            currencyType: 'CNY',
            platform: 'android',
            buyQuantity: product.price, // 抖币数量（1元=10抖币）
            customId: orderId,
            extraInfo: JSON.stringify({ productId: product.id, productName: product.name }),
            success: () => {
                callback(true, orderId);
                this.node.emit('iap-success', product, orderId);
            },
            fail: (err: any) => {
                callback(false);
                this.node.emit('iap-fail', product, err);
            },
        });
    }

    private generateOrderId(): string {
        return `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    }
}
