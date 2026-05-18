# 美术风格指南 — 末日废土割草

> 俯视角 2D | 抖音小游戏竖屏 | 美术总量 < 15MB

## 1. 风格定义

### 整体基调
- **色调**: 暗沉暖灰为底，毒绿/血红/电蓝做高亮点缀
- **氛围**: 荒凉但不压抑，带轻度卡通化（保证可读性）
- **光影**: 顶光，地面简单圆形阴影blob，无复杂投影
- **轮廓**: 2px黑色描边（200怪同屏时保证辨识度）

### 主色板

| 用途 | 名称 | Hex | 说明 |
|------|------|-----|------|
| 地面/背景 | 废土灰 | #3D3529 | 大面积底色 |
| 普通怪 | 腐烂绿 | #5B8C3E | 普通变异体主色 |
| 精英怪 | 毒紫 | #8B45A6 | 精英怪区分色 |
| Boss | 血红 | #C43C3C | Boss警示色 |
| UI主色 | 军工橙 | #E87D2F | 按钮/标题/高亮 |
| UI辅色 | 钢铁灰 | #6B7B8D | 面板/边框 |
| 技能/特效 | 电光蓝 | #4FC3F7 | 玩家技能/拾取物 |

### 角色风格
- 比例: 2.5头身（Q版偏写实）
- 线条: 黑色描边2px，内部色块平涂+简单明暗
- 细节: 军事装备感（防毒面具/战术背心/改装武器）

### 怪物风格
- 设计方向: 变异人形/变异动物，肢体夸张变形
- 辨识要求: 每种怪物轮廓差异明显（胖/瘦/高/矮/爬行）
- 颜色区分: 普通=绿色系，精英=紫色系，Boss=红色系
- 动画: 简单2-4帧循环，动作幅度大（远处也能看清在动）

### 场景风格
- 废墟城市: 碎裂路面、锈蚀车辆、倒塌建筑
- 荒漠: 龟裂地面、枯树、沙尘
- 实验室: 金属地板、破碎玻璃、绿色液体

### UI风格
- 工业/军事感: 六角形元素、金属质感边框、铆钉装饰
- 按钮: 橙色渐变 + 金属边框
- 面板: 半透明深灰底 + 钢铁灰边框
- 字体: 无衬线粗体，白色/橙色

## 2. 资源规格

### 角色精灵
| 类型 | 尺寸 | 帧数 | 动作列表 |
|------|------|------|----------|
| 主角 | 128×128 | 4帧/动作 | idle, run, shoot, die |
| 武器 | 64×64 | 静态 | 跟随角色旋转 |

### 怪物精灵
| 类型 | 尺寸 | 帧数 | 数量 | 动作 |
|------|------|------|------|------|
| 普通怪 | 64×64 | 4帧 | 8种 | walk, die |
| 精英怪 | 96×96 | 4帧 | 4种 | walk, attack, die |
| Boss | 192×192 | 6帧 | 4种 | idle, walk, attack, die |

### 场景
| 类型 | 规格 | 数量 |
|------|------|------|
| 地面Tile | 64×64 | 6种变体 |
| 装饰物 | 64~128px | 12种 |
| 背景 | 720×1280 | 每章1张 |

### UI
| 类型 | 规格 |
|------|------|
| 按钮 | 九宫格，高80px |
| 图标（技能/物品） | 96×96 |
| 弹窗 | 九宫格底板 |
| 摇杆 | 底盘160×160 + 杆64×64 |
| 血条 | 宽200×高16 |

### 特效
| 类型 | 尺寸 | 帧数 |
|------|------|------|
| 子弹 | 32×32 | 1-2帧 |
| 击中 | 64×64 | 3帧 |
| 爆炸 | 96×96 | 4帧 |
| 技能特效 | 128×128 | 4帧 |
| 经验宝石 | 24×24 | 静态(3色) |

### 图集限制
- 每张图集: 2048×2048
- 预估图集数: 5张（角色1 + 怪物1 + UI1 + 特效1 + 场景1）
- 总贴图内存: < 15MB

## 3. AI 出图 Prompt 模板

### 角色（Stable Diffusion）
```
Positive: top-down 2D game character sprite sheet, post-apocalyptic survivor, chibi 2.5 head proportion, wearing gas mask and tactical vest, holding {weapon_type}, dark green and orange color scheme, black outline, transparent background, clean flat shading, game asset
Negative: realistic, photo, 3D, blurry, watermark, text, complex background, gradient, multiple characters
Steps: 30, CFG: 7, Size: 512x512
```

### 怪物 — 普通（SD）
```
Positive: top-down 2D game enemy sprite, mutant zombie {variant}, post-apocalyptic, {variant_desc}, green skin, glowing eyes, black outline 2px, transparent background, simple flat color, game asset, clean silhouette
Negative: realistic, photo, 3D, blurry, watermark, background, text, cute, friendly

变体替换:
- bloater: bloated fat body, swollen limbs, slow
- crawler: low crawling pose, long arms, fast
- runner: thin athletic build, sprinting pose
- spitter: distended jaw, acid dripping, ranged
```

### 怪物 — 精英（SD）
```
Positive: top-down 2D game elite enemy sprite, large mutant creature, purple glowing aura, post-apocalyptic, armored mutation, black outline, transparent background, menacing silhouette, game asset
Negative: realistic, photo, 3D, blurry, watermark, background, small, cute
Size: 512x512 (缩放到96x96使用)
```

### 怪物 — Boss（SD）
```
Positive: top-down 2D game boss sprite, massive mutant abomination, red glowing core, post-apocalyptic, multiple limbs, intimidating, detailed, black outline, transparent background, game asset
Negative: realistic, photo, 3D, blurry, watermark, background, small, cute
Size: 768x768 (缩放到192x192使用)
```

### 场景地块（Midjourney）
```
top-down game tile texture, post-apocalyptic {terrain}, cracked {surface}, dark muted colors, seamless tileable, 2D game art, flat lighting --ar 1:1 --v 6 --tile

terrain替换: wasteland / ruined city / desert / laboratory floor
surface替换: asphalt / concrete / sand / metal
```

### UI元素（即梦AI）
```
game UI {element_type}, military industrial style, metallic texture, hexagonal, orange accent glow, dark steel background, clean vector, game asset, transparent background

element_type替换: button / panel frame / icon border / health bar / dialog box
```

### 技能图标（SD）
```
Positive: game skill icon, {skill_visual}, top-down view, circular frame, dark background, glowing {color} effect, clean design, 2D game art
Negative: realistic, photo, text, blurry, complex

skill_visual示例:
- multiple bullets spreading: 多重射击
- lightning bolt chain: 闪电链
- green healing aura: 生命回复
- blue speed lines: 移速提升
- golden coins floating: 金币加成
```

### 通用负面提示词
```
realistic, photographic, 3D render, blurry, low quality, watermark, text, signature, complex background, gradient background, multiple objects, cropped, out of frame
```

### 后处理说明
1. **去背景**: 使用 rembg 或 Photoshop 魔棒去除背景
2. **加描边**: 2px黑色外描边（Photoshop: 图层样式→描边）
3. **缩放**: 按目标尺寸缩放，使用最近邻插值保持像素清晰
4. **裁切**: 统一画布尺寸，角色居中，留2px边距
5. **导出**: PNG-8（UI/图标）或 PNG-24（角色/怪物有半透明）

## 4. 命名规范

```
char_{name}_{action}_{frame}.png     → char_hero01_run_01.png
mob_{type}_{action}_{frame}.png      → mob_bloater_walk_01.png
boss_{name}_{action}_{frame}.png     → boss_mutant_idle_01.png
ui_{category}_{name}_{state}.png     → ui_btn_start_normal.png
fx_{type}_{name}_{frame}.png         → fx_bullet_fire_01.png
tile_{scene}_{type}_{variant}.png    → tile_wasteland_ground_01.png
icon_{category}_{name}.png           → icon_skill_multishot.png
bg_{scene}.png                       → bg_chapter01.png
```

## 5. 首批资源清单（M0-M1）

### P0 — 核心战斗必须（D6前完成）
| 资源 | 数量 | 说明 |
|------|------|------|
| 主角精灵 | 1套(16帧) | 4动作×4帧 |
| 普通怪 | 3种(24帧) | 每种walk4+die4 |
| 子弹 | 3种 | 直线/扇形/环形 |
| 击中特效 | 2种 | 普通击中+暴击 |
| 经验宝石 | 3种 | 小/中/大 |
| 地面Tile | 4种 | 第1章地面 |
| 摇杆UI | 1套 | 底盘+杆 |
| 血条 | 1套 | 玩家+怪物 |

### P1 — 完整体验（D12前完成）
| 资源 | 数量 | 说明 |
|------|------|------|
| 精英怪 | 2种 | walk+attack+die |
| Boss | 1种 | 第1章Boss |
| 技能图标 | 15个 | 对应技能池 |
| 3选1弹窗UI | 1套 | 技能选择界面 |
| 战斗HUD | 1套 | 血条/经验条/波次提示 |
| 场景装饰 | 6种 | 废墟碎片/车辆/路灯 |

### P2 — 主界面（D20前完成）
| 资源 | 数量 | 说明 |
|------|------|------|
| 主界面背景 | 1张 | 720×1280 |
| 按钮组 | 1套 | 开始/设置/商城 |
| 角色展示 | 1张 | 主界面立绘 |
| 图标组 | 10个 | 金币/材料/元宝等 |
