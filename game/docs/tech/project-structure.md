# 工程目录结构

## 末日废土割草+放置挂机 — 抖音小游戏

```
game2/
├── assets/
│   ├── scripts/
│   │   ├── framework/          # 基础框架层
│   │   │   ├── Singleton.ts        # 单例基类
│   │   │   ├── EventManager.ts     # 事件总线
│   │   │   ├── ObjectPool.ts       # 对象池
│   │   │   ├── ResManager.ts       # 资源管理
│   │   │   ├── AudioManager.ts     # 音频管理
│   │   │   ├── UIManager.ts        # UI管理
│   │   │   ├── SaveManager.ts      # 存档管理
│   │   │   ├── TimeManager.ts      # 时间管理
│   │   │   └── GameManager.ts      # 游戏总管理
│   │   ├── game/               # 玩法逻辑层
│   │   │   ├── battle/             # 战斗系统（割草核心）
│   │   │   ├── idle/               # 放置挂机系统
│   │   │   ├── hero/               # 角色系统
│   │   │   ├── enemy/              # 怪物系统
│   │   │   ├── weapon/             # 武器系统
│   │   │   └── skill/              # 技能系统
│   │   ├── ui/                 # UI 脚本层
│   │   │   ├── home/               # 主界面
│   │   │   ├── battle/             # 战斗HUD
│   │   │   ├── shop/               # 商店
│   │   │   └── common/             # 通用组件
│   │   ├── data/               # 数据层
│   │   │   ├── config/             # 配置表定义
│   │   │   └── model/              # 数据模型
│   │   └── platform/           # 平台层
│   │       └── douyin/             # 抖音SDK封装
│   ├── resources/              # 动态加载资源（首包）
│   │   ├── prefabs/ui/            # UI预制体
│   │   ├── audio/                 # 音频
│   │   └── config/                # JSON配置表
│   ├── bundles/                # 分包资源（按需加载）
│   │   ├── battle/                # 战斗资源包
│   │   ├── hero/                  # 角色资源包
│   │   └── ui/                    # UI资源包
│   └── scenes/
│       ├── launch.scene           # 启动场景
│       ├── home.scene             # 主界面场景
│       └── battle.scene           # 战斗场景
├── docs/tech/
│   ├── project-structure.md       # 本文件
│   └── douyin-build-guide.md      # 抖音构建指南
└── settings/                  # Cocos Creator 项目设置
```

## 架构分层

```
┌─────────────────────────────────┐
│         Platform (抖音SDK)       │
├─────────────────────────────────┤
│         UI Layer (界面)          │
├─────────────────────────────────┤
│       Game Logic (玩法逻辑)      │
├─────────────────────────────────┤
│       Framework (基础框架)       │
├─────────────────────────────────┤
│       Cocos Creator Engine       │
└─────────────────────────────────┘
```

## 设计原则

1. **单一职责** — 每个 Manager 只管一件事
2. **单例持久** — 管理器挂载持久节点，跨场景存活
3. **事件驱动** — 模块间通过 EventManager 解耦
4. **对象池复用** — 割草游戏大量实体必须池化
5. **分包加载** — 首包控制在 4MB 以内
6. **离线计算** — 放置收益基于 TimeManager 离线时长
