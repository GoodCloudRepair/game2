import { _decorator, Label, Node, Button } from 'cc';
import { UIBase } from './UIBase';
import { IAPManager, ProductConfig } from '../sdk/IAPManager';
const { ccclass, property } = _decorator;

/** 商城界面 */
@ccclass('ShopUI')
export class ShopUI extends UIBase {
    @property(Node)
    private readonly btnMonthCard: Node | null = null;

    @property(Node)
    private readonly btnWeekCard: Node | null = null;

    @property(Node)
    private readonly btnRemoveAd: Node | null = null;

    @property(Node)
    private readonly btnFirstPay: Node | null = null;

    @property(Node)
    private readonly btnClose: Node | null = null;

    private static readonly PRODUCTS: ProductConfig[] = [
        { id: 'month_card', name: '月卡', price: 3000, type: 'monthCard' },
        { id: 'week_card', name: '周卡', price: 1200, type: 'weekCard' },
        { id: 'remove_ad', name: '去广告', price: 6800, type: 'removeAd' },
        { id: 'first_pay', name: '首充礼包', price: 600, type: 'firstPay' },
    ];

    protected onEnable(): void {
        this.btnMonthCard?.on(Button.EventType.CLICK, () => this.buyProduct('month_card'), this);
        this.btnWeekCard?.on(Button.EventType.CLICK, () => this.buyProduct('week_card'), this);
        this.btnRemoveAd?.on(Button.EventType.CLICK, () => this.buyProduct('remove_ad'), this);
        this.btnFirstPay?.on(Button.EventType.CLICK, () => this.buyProduct('first_pay'), this);
        this.btnClose?.on(Button.EventType.CLICK, () => this.hide(), this);
    }

    protected onDisable(): void {
        this.btnMonthCard?.off(Button.EventType.CLICK);
        this.btnWeekCard?.off(Button.EventType.CLICK);
        this.btnRemoveAd?.off(Button.EventType.CLICK);
        this.btnFirstPay?.off(Button.EventType.CLICK);
        this.btnClose?.off(Button.EventType.CLICK);
    }

    private buyProduct(productId: string): void {
        const product = ShopUI.PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        IAPManager.instance.pay(product, (success, orderId) => {
            if (success) {
                this.node.emit('purchase-success', product, orderId);
            }
        });
    }
}
