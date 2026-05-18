# 数值体系设计文档

> 末日割草+放置挂机 | Cocos Creator 3.8 | 抖音小游戏

## 1. 角色属性体系

### 基础属性（1级初始值）

| 属性 | 缩写 | 初始值 | 说明 |
|------|------|--------|------|
| 攻击力 | ATK | 20 | 子弹基础伤害 |
| 射速 | SPD | 2.0 | 子弹/秒 |
| 暴击率 | CRI | 5% | 暴击概率 |
| 暴击伤害 | CRD | 150% | 暴击倍率 |
| 生命值 | HP | 200 | 最大血量 |
| 护甲 | DEF | 5 | 减伤用 |
| 移速 | MOV | 200 | 像素/秒 |
| 拾取范围 | RNG | 60 | 像素半径 |

### 成长公式

```typescript
// 等级成长（每级）
atk(lv) = 20 + (lv - 1) * 3
hp(lv)  = 200 + (lv - 1) * 15
def(lv) = 5 + (lv - 1) * 1
spd     // 不随等级成长，靠装备和技能提升

// 星级加成（乘算）
starMultiplier = [1.0, 1.0, 1.15, 1.3, 1.5, 1.8, 2.2]  // 0-6星
finalATK = atk(lv) * starMultiplier[star]
```

## 2. 怪物属性

### 三档怪物（第1章基准）

| 类型 | HP | ATK | 速度 | 经验 | 掉落金币 |
|------|-----|-----|------|------|----------|
| 普通怪 | 30 | 5 | 80 | 1 | 2 |
| 精英怪 | 200 | 15 | 60 | 8 | 15 |
| Boss | 2000 | 30 | 50 | 50 | 100 |

### 关卡递增公式

```typescript
// 怪物属性随关卡(stage)递增
monsterHP(stage)  = baseHP * (1 + (stage - 1) * 0.25)
monsterATK(stage) = baseATK * (1 + (stage - 1) * 0.2)
monsterEXP(stage) = baseEXP * (1 + (stage - 1) * 0.15)
goldDrop(stage)   = baseGold * (1 + (stage - 1) * 0.2)
```

### 波次配置规则

```typescript
// 每关 8 波，每波 30 秒
wave[1] = { normal: 8,  elite: 0, interval: 3.0s }
wave[2] = { normal: 12, elite: 0, interval: 2.5s }
wave[3] = { normal: 15, elite: 1, interval: 2.0s }
wave[4] = { normal: 20, elite: 1, interval: 1.8s }
wave[5] = { normal: 25, elite: 2, interval: 1.5s }
wave[6] = { normal: 30, elite: 2, interval: 1.2s }
wave[7] = { normal: 35, elite: 3, interval: 1.0s }
wave[8] = { normal: 0,  elite: 0, boss: 1 }  // Boss波
```

## 3. 战斗公式

```typescript
// 伤害计算
baseDamage = ATK * weaponMult
isCrit = Math.random() < CRI
critMult = isCrit ? CRD : 1.0
armorReduction = targetDEF / (targetDEF + 100)
finalDamage = Math.floor(baseDamage * critMult * (1 - armorReduction))

// 击杀经验
expGain = monsterEXP * (1 + expBonus)  // expBonus来自技能

// 升级经验需求
expToLevel(lv) = Math.floor(10 * Math.pow(1.12, lv - 1))
// lv1→2: 10, lv2→3: 11, lv5→6: 16, lv10→11: 28
```

## 4. 单局节奏（4分钟标准局）

| 时间 | 波次 | 事件 | 玩家等级 |
|------|------|------|----------|
| 0:00-0:30 | 第1波 | 少量怪，熟悉操作 | 1 |
| 0:30-1:00 | 第2波 | 首次升级，选第1个技能 | 2 |
| 1:00-1:30 | 第3波 | 精英首次出现 | 3 |
| 1:30-2:00 | 第4波 | 怪物密度增加 | 4-5 |
| 2:00-2:30 | 第5波 | 技能组合开始成型 | 5-6 |
| 2:30-3:00 | 第6波 | 大量怪物，爽感高峰 | 6-7 |
| 3:00-3:30 | 第7波 | 最高密度 | 7-8 |
| 3:30-4:00 | 第8波 | Boss战 | 8-9 |

## 5. 肉鸽技能池

### 攻击类（权重合计 40）

| ID | 名称 | 基础值 | 每级叠加 | 上限 | 权重 |
|----|------|--------|----------|------|------|
| A1 | 多重射击 | +1发子弹 | +1发 | 5 | 8 |
| A2 | 射速提升 | +20%射速 | +15% | 5 | 8 |
| A3 | 穿透弹 | 穿透1个敌人 | +1个 | 3 | 6 |
| A4 | 范围爆炸 | 击中爆炸半径40px | +20px | 3 | 5 |
| A5 | 暴击强化 | +10%暴击率 | +8% | 5 | 7 |
| A6 | 弹幕环绕 | 2颗环绕弹 | +1颗 | 4 | 6 |

### 防御类（权重合计 30）

| ID | 名称 | 基础值 | 每级叠加 | 上限 | 权重 |
|----|------|--------|----------|------|------|
| D1 | 生命提升 | +20%最大HP | +15% | 5 | 8 |
| D2 | 护盾 | 每30秒获得护盾(20%HP) | CD-3s | 4 | 7 |
| D3 | 生命回复 | 每秒回复1%HP | +0.5% | 5 | 8 |
| D4 | 减伤 | +10%减伤 | +8% | 4 | 7 |

### 辅助类（权重合计 30）

| ID | 名称 | 基础值 | 每级叠加 | 上限 | 权重 |
|----|------|--------|----------|------|------|
| U1 | 移速提升 | +15%移速 | +10% | 4 | 7 |
| U2 | 拾取范围 | +30%拾取范围 | +20% | 5 | 7 |
| U3 | 经验加成 | +20%经验获取 | +15% | 5 | 8 |
| U4 | 金币加成 | +25%金币掉落 | +20% | 5 | 8 |

### 技能选择规则
```typescript
// 3选1：按权重随机抽取3个不同技能
// 已满级技能不再出现
// 稀有度不影响出现概率，只影响权重
```

## 6. 放置挂机

```typescript
// 离线产出（每小时）
goldPerHour = playerPower * 0.5 + 50
materialPerHour = Math.floor(playerPower * 0.1) + 5

// 战力计算
playerPower = ATK * 2 + HP * 0.5 + DEF * 3

// 上限
maxOfflineHours = 8
offlineGold = goldPerHour * Math.min(offlineHours, maxOfflineHours)

// 广告双倍（每日3次）
adDoubleReward = offlineGold * 2

// VIP/月卡加成
monthCardBonus = 1.5  // 月卡玩家离线收益×1.5
```

## 7. 养成消耗曲线

### 升级消耗（金币）
```typescript
levelUpCost(lv) = Math.floor(100 * Math.pow(1.18, lv - 1))
// lv1→2: 100, lv5→6: 187, lv10→11: 427, lv20→21: 2370
```

### 星级消耗（碎片）
| 星级 | 碎片数 | 累计 |
|------|--------|------|
| 1→2 | 10 | 10 |
| 2→3 | 30 | 40 |
| 3→4 | 60 | 100 |
| 4→5 | 120 | 220 |
| 5→6 | 200 | 420 |

### 装备强化（材料）
```typescript
equipUpgradeCost(lv) = Math.floor(20 * Math.pow(1.25, lv - 1))
```

## 8. 经济循环

### 金币产出渠道
| 渠道 | 每日产出 | 占比 |
|------|----------|------|
| 战斗通关 | ~800 | 40% |
| 离线挂机 | ~600 | 30% |
| 广告双倍 | ~300 | 15% |
| 日常任务 | ~200 | 10% |
| 成就 | ~100 | 5% |
| **合计** | **~2000** | 100% |

### 金币消耗去向
| 去向 | 每日消耗 | 占比 |
|------|----------|------|
| 角色升级 | ~1000 | 50% |
| 装备强化 | ~600 | 30% |
| 商店购买 | ~400 | 20% |

### 7日免费玩家进度
| 天数 | 角色等级 | 通关章节 | 战力 |
|------|----------|----------|------|
| D1 | 5 | 1-3 | 150 |
| D3 | 12 | 2-2 | 400 |
| D5 | 18 | 2-8 | 700 |
| D7 | 23 | 3-3 | 1000 |

### 月卡玩家进度（+30%）
| 天数 | 角色等级 | 通关章节 | 战力 |
|------|----------|----------|------|
| D1 | 6 | 1-4 | 180 |
| D3 | 15 | 2-5 | 520 |
| D7 | 28 | 3-8 | 1400 |

## 9. 广告奖励量

| 广告点位 | 奖励 | 每日上限 | 等价手动时间 |
|----------|------|----------|-------------|
| 战斗复活 | 续命30秒+30%HP | 3次 | - |
| 通关双倍 | 金币×2 | 5次 | 30分钟 |
| 离线双倍 | 离线收益×2 | 3次 | 30分钟 |
| 免费宝箱 | 随机材料5-15个 | 3次 | 20分钟 |
| 幸运转盘 | 随机奖励 | 3次 | 15分钟 |
| 技能重选 | 刷新3选1选项 | 不限 | - |

**设计原则**: 每次广告奖励 ≈ 30分钟手动游玩收益，确保玩家有动力观看。

## 10. 配表结构（JSON Schema）

```typescript
// heroes.json
interface HeroConfig {
  id: number;
  name: string;
  rarity: 1 | 2 | 3;  // 普通/稀有/传说
  baseAtk: number;
  baseHp: number;
  baseDef: number;
  growthAtk: number;   // 每级ATK成长
  growthHp: number;
  weaponType: string;  // 默认武器类型
}

// weapons.json
interface WeaponConfig {
  id: number;
  name: string;
  type: 'pistol' | 'shotgun' | 'rifle' | 'launcher';
  damageMult: number;
  fireRate: number;    // 子弹/秒
  bulletCount: number;
  bulletPattern: 'straight' | 'spread' | 'ring' | 'homing';
}

// monsters.json
interface MonsterConfig {
  id: number;
  name: string;
  tier: 'normal' | 'elite' | 'boss';
  baseHp: number;
  baseAtk: number;
  speed: number;
  expReward: number;
  goldReward: number;
}

// skills.json
interface SkillConfig {
  id: string;
  name: string;
  category: 'atk' | 'def' | 'util';
  baseValue: number;
  stackValue: number;
  maxStack: number;
  weight: number;
  description: string;
}

// stages.json
interface StageConfig {
  id: number;
  chapter: number;
  level: number;
  waves: WaveConfig[];
  bossId: number;
  rewardGold: number;
  rewardMaterial: number;
  unlockPower: number;  // 推荐战力
}

interface WaveConfig {
  normalCount: number;
  eliteCount: number;
  spawnInterval: number;  // 秒
  duration: number;       // 秒
}
```
