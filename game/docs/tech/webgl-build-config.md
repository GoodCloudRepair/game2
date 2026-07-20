# 抖音WebGL小游戏构建配置文档

## 一、Unity工程目录结构

```
Assets/
├── Art/                    # 美术资源
│   ├── Sprites/            # 2D精灵图
│   ├── Animations/         # 动画
│   ├── Effects/            # 特效
│   ├── UI/                 # UI图集
│   └── Fonts/              # 字体
├── Audio/                  # 音频资源
│   ├── BGM/
│   └── SFX/
├── Prefabs/                # 预制体
│   ├── Characters/         # 角色
│   ├── Enemies/            # 怪物
│   ├── Bullets/            # 子弹/技能
│   ├── Effects/            # 特效
│   └── UI/                 # UI面板
├── Resources/              # Resources加载资源
│   └── UI/                 # UI预制体（UIManager加载）
├── Scenes/                 # 场景
├── Scripts/                # 代码
│   ├── Framework/          # 框架层
│   │   └── Core/           # 核心管理器
│   ├── Gameplay/           # 玩法逻辑
│   │   ├── Character/      # 角色系统
│   │   ├── Enemy/          # 怪物系统
│   │   ├── Weapon/         # 武器/技能
│   │   ├── Idle/           # 挂机系统
│   │   └── Level/          # 关卡系统
│   ├── UI/                 # UI逻辑
│   └── Data/               # 数据定义/配置表
├── Settings/               # URP/渲染设置
└── Plugins/                # 第三方插件/SDK
    └── DouyinSDK/          # 抖音SDK预留
```

## 二、包体优化策略

### 2.1 目标
- 首包 ≤ 10MB（抖音小游戏要求）
- 总资源 ≤ 30MB
- 首屏加载 ≤ 3秒

### 2.2 构建设置
```
Player Settings:
- Compression Format: Brotli（抖音平台支持）
- Code Stripping: High
- IL2CPP Code Generation: Faster (Smaller) builds
- Managed Stripping Level: High
- Exception Handling: None（发布版）

WebGL Memory:
- Initial Memory Size: 32MB
- Maximum Memory Size: 256MB
- Memory Growth Mode: Geometric
```

### 2.3 资源优化
| 资源类型 | 格式 | 压缩 | 说明 |
|---------|------|------|------|
| 精灵图 | PNG | ASTC 6x6 / ETC2 | 使用图集打包 |
| UI图片 | PNG | Sprite Atlas | 合并DrawCall |
| 音频BGM | OGG | 128kbps | 流式加载 |
| 音频SFX | WAV→OGG | 64kbps | 短音效 |
| 字体 | TMP SDF | - | 只保留中文常用3500字 |
| 动画 | AnimationClip | 压缩关键帧 | 降低精度 |

### 2.4 代码优化
- 禁用反射（WebGL下性能极差）
- 避免LINQ（产生GC）
- 使用struct代替class做数据容器
- 对象池复用所有频繁创建的对象
- 避免string拼接，使用StringBuilder

## 三、URP 2D 设置

### 3.1 渲染管线配置
```
Universal Render Pipeline Asset (2D):
- HDR: Off
- Anti Aliasing: None（像素风不需要）
- SRP Batcher: On
- Dynamic Batching: On

Renderer 2D Data:
- Transparency Sort Mode: Custom Axis (0, 1, 0)
- Default Material: Sprite-Lit-Default 或 Sprite-Unlit-Default
```

### 3.2 光照（按需）
- 如果不需要2D光照效果，使用Unlit材质，性能更好
- 如需氛围光照，限制Light2D数量 ≤ 4个
- 禁用Shadow Caster 2D（WebGL性能杀手）

### 3.3 Camera设置
```
Main Camera:
- Projection: Orthographic
- Size: 根据竖屏适配计算
- Background Type: Solid Color
- Post Processing: Off（WebGL下慎用）
```

## 四、竖屏适配方案（9:16）

### 4.1 分辨率策略
```csharp
// 设计分辨率：540 x 960（9:16基准）
// 适配策略：宽度固定，高度自适应

public class ScreenAdapter : MonoBehaviour
{
    private const float DesignWidth = 540f;
    private const float DesignHeight = 960f;
    private const float DesignAspect = 9f / 16f;

    void Start()
    {
        var cam = Camera.main;
        float screenAspect = (float)Screen.width / Screen.height;
        
        if (screenAspect > DesignAspect)
        {
            // 比设计更宽，以高度为基准
            cam.orthographicSize = DesignHeight / 2f / 100f;
        }
        else
        {
            // 比设计更窄，以宽度为基准
            float targetHeight = DesignWidth / screenAspect;
            cam.orthographicSize = targetHeight / 2f / 100f;
        }
    }
}
```

### 4.2 Canvas设置
```
Canvas Scaler:
- UI Scale Mode: Scale With Screen Size
- Reference Resolution: 540 x 960
- Screen Match Mode: Match Width Or Height
- Match: 0.5（宽高各占一半权重）
```

### 4.3 安全区适配
- 顶部预留状态栏高度（约44px）
- 底部预留抖音导航栏（约80px）
- UI内容区域在安全区内布局

## 五、抖音SDK接入预留

### 5.1 SDK功能清单
| 功能 | 接口 | 优先级 |
|------|------|--------|
| 登录 | tt.login() | P0 |
| 用户信息 | tt.getUserInfo() | P0 |
| 广告（激励视频） | tt.createRewardedVideoAd() | P0 |
| 分享 | tt.shareAppMessage() | P1 |
| 支付 | tt.requestGamePayment() | P1 |
| 云存档 | tt.cloud.* | P1 |
| 排行榜 | tt.setUserCloudStorage() | P2 |
| 录屏 | tt.getGameRecorder() | P2 |

### 5.2 JS桥接预留
```csharp
// Assets/Plugins/DouyinSDK/DouyinBridge.cs
using System.Runtime.InteropServices;

public static class DouyinBridge
{
    [DllImport("__Internal")]
    public static extern void TT_Login(string callbackObj, string callbackMethod);

    [DllImport("__Internal")]
    public static extern void TT_ShowRewardedAd(string adId, string callbackObj, string callbackMethod);

    [DllImport("__Internal")]
    public static extern void TT_Share(string title, string imageUrl);

    [DllImport("__Internal")]
    public static extern void TT_Pay(string orderId, int amount, string callbackObj, string callbackMethod);

    [DllImport("__Internal")]
    public static extern void TT_SaveCloudData(string key, string value);

    [DllImport("__Internal")]
    public static extern string TT_LoadCloudData(string key);
}
```

### 5.3 对应的.jslib文件（构建时放入Plugins）
```javascript
// Assets/Plugins/DouyinSDK/douyin.jslib
mergeInto(LibraryManager.library, {
    TT_Login: function(callbackObj, callbackMethod) {
        // 抖音登录实现
    },
    TT_ShowRewardedAd: function(adId, callbackObj, callbackMethod) {
        // 激励视频广告
    },
    // ... 其他接口
});
```

## 六、性能预算

| 指标 | 目标值 | 说明 |
|------|--------|------|
| FPS | ≥ 30 | WebGL稳定30帧即可 |
| DrawCall | ≤ 50 | 使用SpriteAtlas合批 |
| 同屏怪物 | ≤ 100 | 对象池管理 |
| 内存 | ≤ 128MB | WebGL内存受限 |
| GC | ≤ 1次/分钟 | 避免频繁分配 |
| 首包大小 | ≤ 10MB | 抖音平台要求 |

## 七、注意事项

1. **WebGL不支持多线程** - 所有逻辑单线程执行，避免阻塞主线程
2. **WebGL不支持本地文件IO** - 使用PlayerPrefs或IndexedDB
3. **音频限制** - 需要用户交互后才能播放音频（浏览器策略）
4. **网络请求** - 使用UnityWebRequest，不支持Socket（需WebSocket）
5. **内存不可回收** - WebGL的内存只增不减，需严格控制峰值
6. **字体裁剪** - 中文字体必须裁剪，否则包体爆炸
