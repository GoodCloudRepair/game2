# 抖音小游戏构建配置指南

## 1. 构建设置

### 基本配置
- **构建平台**：字节跳动小游戏
- **设计分辨率**：720 × 1280（竖屏 9:16）
- **适配模式**：SHOW_ALL + 顶部对齐
- **引擎模块裁剪**：去掉 3D 物理、Terrain、Tiled Map 等不用的模块

### 分包策略
抖音小游戏首包限制 **4MB**，必须分包：

| 包名 | 内容 | 加载时机 |
|------|------|----------|
| main | 框架代码 + 启动场景 + 基础UI | 启动即加载 |
| battle | 战斗资源（怪物、特效、地图） | 进入战斗前 |
| hero | 角色皮肤、动画 | 主界面异步加载 |
| ui | 非核心UI（商店、设置、排行） | 按需加载 |

### Cocos 分包配置
在 `assets/bundles/` 下每个文件夹的 Inspector 中设置为 Bundle：
- Priority: battle > hero > ui
- 压缩类型: 合并依赖 (Merge All JSON)

## 2. 竖屏适配方案

### Canvas 设置
```
设计分辨率: 720 x 1280
适配策略: Fit Height
```

### 安全区适配
```typescript
// 获取抖音安全区信息
const systemInfo = tt.getSystemInfoSync();
const safeArea = systemInfo.safeArea;
// 顶部状态栏 + 底部导航栏留白
```

### 刘海屏处理
- 顶部 UI 下移 statusBarHeight
- 底部交互按钮上移 screenHeight - safeArea.bottom

### 不同机型适配
- iPhone X 系列：底部 34px 安全区
- 安卓全面屏：底部导航栏高度不一
- 折叠屏：锁定竖屏，忽略横屏

## 3. 抖音 SDK 接入要点

### 3.1 登录 (tt.login)
```typescript
// 获取临时登录凭证，发送到服务端换取 openid
tt.login({
    success(res) {
        const code = res.code; // 发送到服务端
    },
    fail(err) {
        console.error('登录失败', err);
    }
});
```

**注意事项：**
- code 有效期 5 分钟，需立即使用
- 服务端用 code 换 session_key + openid
- 不要在客户端存储 session_key

### 3.2 激励视频广告 (tt.createRewardedVideoAd)
```typescript
const videoAd = tt.createRewardedVideoAd({
    adUnitId: 'your_ad_unit_id'
});

// 监听关闭事件
videoAd.onClose((res) => {
    if (res && res.isEnded) {
        // 发放奖励
    }
});

// 显示广告
videoAd.show().catch(() => {
    // 广告未加载完，重新加载
    videoAd.load().then(() => videoAd.show());
});
```

**注意事项：**
- 提前 load，不要等用户点击才加载
- onClose 必须判断 isEnded，用户可能中途关闭
- 广告实例全局复用，不要重复创建
- 需处理广告加载失败的降级方案

### 3.3 支付 (tt.requestGamePayment)
```typescript
tt.requestGamePayment({
    mode: 'game',
    env: 0, // 0=正式环境
    currencyType: 'CNY',
    platform: 'android', // 或 ios
    buyQuantity: 100, // 购买游戏币数量
    customId: 'order_123', // 自定义订单号
    extraInfo: '{}', // 透传参数
    success(res) {
        // 支付成功，服务端验证
    },
    fail(err) {
        // 支付失败或取消
    }
});
```

**注意事项：**
- iOS 和 Android 支付流程不同
- 必须服务端验证支付结果（回调通知）
- 游戏币兑换比例需在后台配置
- 沙箱环境测试时 env 设为 1

## 4. 包体优化策略

### 代码优化
- 开启 Terser 压缩
- Tree Shaking 去除未使用代码
- 引擎模块裁剪（去掉 3D、物理等）

### 资源优化
- **图片**：使用 ASTC 4x4 / ETC2 压缩纹理，合图 Atlas
- **音频**：BGM 用 MP3 64kbps，SFX 用 MP3 短音效
- **动画**：骨骼动画用 DragonBones，帧动画合图
- **配置表**：JSON 压缩，大表分包加载

### 首包瘦身清单
1. resources 目录只放启动必需资源
2. 大资源全部放 bundles 分包
3. 去掉未使用的引擎模块
4. 图片压缩到合理质量（70-80%）
5. 删除 console.log（发布时自动去除）

### 加载策略
- 启动场景极简，只有 Loading UI
- 分包预加载：主界面时后台加载战斗包
- 资源按需加载 + LRU 缓存释放

## 5. 常见坑和解决方案

### 坑1：首次音频播放无声
**原因**：小游戏要求用户交互后才能播放音频
**方案**：在首次触摸事件中调用一次空音频播放解锁

### 坑2：localStorage 写入失败
**原因**：存储空间满（10MB 上限）或写入过于频繁
**方案**：
- 控制存档数据大小，定期清理
- 写入加 try-catch，失败时提示用户
- 关键数据做增量保存

### 坑3：切后台回来白屏
**原因**：WebGL context lost
**方案**：监听 `tt.onShow` 事件，必要时重新加载场景

### 坑4：内存溢出闪退
**原因**：小游戏内存限制约 1GB，纹理未释放
**方案**：
- 切场景时释放不用的 Bundle
- 对象池有上限，超出直接销毁
- 定期调用 `cc.assetManager.releaseUnusedAssets()`

### 坑5：分包加载失败
**原因**：网络不稳定或 CDN 问题
**方案**：加载失败重试 3 次，仍失败则提示用户检查网络

### 坑6：iOS 和 Android 表现不一致
**原因**：渲染管线差异、字体渲染差异
**方案**：
- 使用 BMFont 替代系统字体
- 避免使用 Stencil（部分安卓机不支持）
- 真机测试覆盖 iOS + 主流安卓机型

### 坑7：帧率不稳定
**原因**：GC 导致卡顿
**方案**：
- update() 中零内存分配（不 new 对象）
- 使用对象池复用所有频繁创建的节点
- 避免字符串拼接，用模板缓存
