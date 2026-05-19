import { _decorator, Component, sys } from 'cc';
const { ccclass } = _decorator;

declare const tt: any; // 抖音小游戏全局对象

/** 抖音SDK封装：登录、分享、用户信息 */
@ccclass('DouyinSDK')
export class DouyinSDK extends Component {
    private static _instance: DouyinSDK | null = null;
    private _token: string = '';
    private _openId: string = '';

    public static get instance(): DouyinSDK {
        if (!DouyinSDK._instance) throw new Error('DouyinSDK not initialized');
        return DouyinSDK._instance;
    }

    public get openId(): string { return this._openId; }
    public get isDouyin(): boolean { return typeof tt !== 'undefined'; }

    protected onLoad(): void { DouyinSDK._instance = this; }

    /** 登录 */
    public login(): Promise<string> {
        if (!this.isDouyin) return Promise.resolve('dev_token');

        return new Promise((resolve, reject) => {
            tt.login({
                success: (res: any) => {
                    this._token = res.code;
                    // 实际项目中需将code发送到服务端换取openId
                    this._openId = res.anonymousCode ?? 'unknown';
                    resolve(this._token);
                },
                fail: (err: any) => reject(new Error(err.errMsg)),
            });
        });
    }

    /** 分享 */
    public share(title: string, imageUrl?: string): void {
        if (!this.isDouyin) return;

        tt.shareAppMessage({
            title,
            imageUrl: imageUrl ?? '',
            query: '',
        });
    }

    /** 获取用户信息 */
    public getUserInfo(): Promise<{ nickName: string; avatarUrl: string }> {
        if (!this.isDouyin) return Promise.resolve({ nickName: '开发者', avatarUrl: '' });

        return new Promise((resolve, reject) => {
            tt.getUserInfo({
                success: (res: any) => resolve(res.userInfo),
                fail: (err: any) => reject(new Error(err.errMsg)),
            });
        });
    }

    /** 设置剪贴板（用于口令分享） */
    public setClipboard(text: string): void {
        if (!this.isDouyin) return;
        tt.setClipboardData({ data: text });
    }
}
