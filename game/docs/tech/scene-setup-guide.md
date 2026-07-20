# 场景搭建指南

> 在 Cocos Creator 编辑器中按此文档搭建节点树和挂载组件

## 1. 创建工程

1. 打开 Cocos Creator 3.8+
2. 新建空项目 → 选择 2D 模板
3. 将 `assets/scripts/` 文件夹拖入工程

## 2. 场景列表

| 场景 | 用途 |
|------|------|
| `main.scene` | 常驻场景（管理器节点，不销毁） |
| `home.scene` | 主界面 |
| `battle.scene` | 战斗场景 |

## 3. main.scene（常驻管理器）

```
Canvas
└── GameRoot (空节点)
    ├── GameManager       ← 挂 GameManager.ts
    ├── EventManager      ← 挂 EventManager.ts
    ├── ResManager        ← 挂 ResManager.ts
    ├── AudioManager      ← 挂 AudioManager.ts
    ├── UIManager         ← 挂 UIManager.ts
    ├── SaveManager       ← 挂 SaveManager.ts
    └── TimeManager       ← 挂 TimeManager.ts
```

**设置**：
- GameRoot 节点在 GameManager.onLoad() 中调用 `director.addPersistRootNode(this.node.parent)` 使其跨场景常驻
- Canvas 设置 Design Resolution: 720×1280, Fit Height

## 4. battle.scene（核心战斗）

```
Canvas (720×1280, Fit Height)
├── BattleRoot (空节点)
│   ├── Map (空节点，放地面Tilemap或背景Sprite)
│   │   └── Background (Sprite, 720×1280 背景图)
│   │
│   ├── Player (空节点)
│   │   ├── PlayerSprite (Sprite, 128×128 角色图)
│   │   └── WeaponPivot (空节点, 武器挂点)
│   │       └── Weapon (Sprite, 64×64 武器图)
│   │   ← 挂 PlayerController.ts
│   │
│   ├── Monsters (空节点, 怪物容器)
│   │   ← 挂 MonsterSpawner.ts
│   │
│   ├── Bullets (空节点, 子弹容器)
│   │
│   └── ExpGems (空节点, 经验宝石容器)
│
├── BattleSystem (空节点)
│   ├── ← 挂 BattleManager.ts
│   ├── ← 挂 CollisionSystem.ts
│   ├── ← 挂 LevelSystem.ts
│   └── ← 挂 RogueSkillSystem.ts
│
└── UI (空节点, UI层)
    ├── HUD (空节点)
    │   ├── HpBar (ProgressBar)
    │   ├── ExpBar (ProgressBar)
    │   ├── WaveText (Label, "第X波")
    │   └── LevelText (Label, "Lv.X")
    │
    ├── Joystick (空节点, 左下角)
    │   ├── JoystickBg (Sprite, 160×160 底盘)
    │   └── JoystickStick (Sprite, 64×64 摇杆)
    │   ← 挂 Joystick.ts (stick属性拖入JoystickStick)
    │
    └── SkillPanel (空节点, 默认隐藏)
        ├── SkillCard1 (Button + Sprite + Label)
        ├── SkillCard2
        └── SkillCard3
```

## 5. 组件属性连接

### PlayerController
| 属性 | 拖入 |
|------|------|
| joystick | → Joystick 节点 |

### MonsterSpawner
| 属性 | 拖入 |
|------|------|
| normalPrefab | → 普通怪预制体 |
| elitePrefab | → 精英怪预制体 |
| bossPrefab | → Boss预制体 |
| playerNode | → Player 节点 |

### CollisionSystem
| 属性 | 拖入 |
|------|------|
| playerNode | → Player 节点 |

### BattleManager
| 属性 | 拖入 |
|------|------|
| spawner | → MonsterSpawner 所在节点 |
| collision | → CollisionSystem 所在节点 |
| levelSystem | → LevelSystem 所在节点 |
| player | → Player 节点 |
| playerNode | → Player 节点 |

### RogueSkillSystem
| 属性 | 拖入 |
|------|------|
| player | → Player 节点 |
| levelSystem | → LevelSystem 所在节点 |

### Joystick
| 属性 | 拖入 |
|------|------|
| stick | → JoystickStick 节点 |

**Joystick 节点设置**：
- 添加 UITransform 组件，Content Size: 300×300
- 锚点 (0, 0)，位置放左下角 (50, 50)

## 6. 预制体（Prefabs）

在 `assets/resources/prefabs/` 下创建：

### monster_normal.prefab
```
Node (空节点)
├── Sprite (64×64 怪物图)
← 挂 Monster.ts
```

### monster_elite.prefab
```
Node (空节点)
├── Sprite (96×96 精英怪图)
← 挂 Monster.ts
```

### monster_boss.prefab
```
Node (空节点)
├── Sprite (192×192 Boss图)
← 挂 Monster.ts
```

### bullet.prefab
```
Node (空节点)
├── Sprite (32×32 子弹图)
← 挂 BulletBase.ts
```

### exp_gem.prefab
```
Node (空节点)
├── Sprite (24×24 宝石图)
← 挂 ExpGem.ts
```

## 7. Canvas 设置

| 属性 | 值 |
|------|-----|
| Design Resolution | 720 × 1280 |
| Fit Height | ✅ |
| Fit Width | ❌ |

## 8. 启动流程

1. 构建设置中将 `main.scene` 设为启动场景
2. `GameManager.onLoad()` 中加载 `home.scene`
3. 点击开始按钮 → 加载 `battle.scene`
4. 战斗结束 → 返回 `home.scene`
