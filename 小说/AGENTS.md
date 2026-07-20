# 长篇网文连载 — AI Agent 团队

> 与游戏开发独立，不经过游戏总监调度。工作区根目录为 `小说/`。

## 入口 Agent

| Agent | 文件 | 说明 |
|-------|------|------|
| 📖 **连载主笔** | [novel-writer.md](.agents/novel-writer.md) | 写章流程、台账、底审；写某书前先加载该书 `作者Agent.md` |
| 🔎 **章节审稿** | [chapter-reviewer.md](.agents/chapter-reviewer.md) | 八段式审稿：情节/设定/语言/人物/结尾/综合分/主题/一句话总结 |

默认仍以主笔为写章入口；需要单独查文、找问题、做精修建议时走审稿 Agent。

## 默认写章约定

用户只说 `【书名】写第XXX章` 时，默认等价于：

```
【书名】写第XXX章：先读该书作者Agent、关键约束、章节总表、伏笔台账、时间线、当前10章章纲和上一章正文/记录；按平台口径写正文；写完做底审和平台审；同步章节记录、章节总表、时间线、人物、关系、物品/能力、伏笔、思维笔记及触发的09-20号台账。
```

用户无需额外补 `写完同步账本`。只有点名 `只给建议 / 只审不改 / 轻量写章` 时，才改变默认流程。

## 单书作者 Agent

| 书 | 人设摘要 | 文件 |
|----|----------|------|
| 全球迷雾 | 资深番茄 · 规则怪谈/末世悬疑 | [作者Agent.md](全球迷雾：我能校正万物词条/作者Agent.md) |
| 复苏年代 | 资深起点 · 都市高武/灵气复苏 | [作者Agent.md](复苏年代：我能看破一切/作者Agent.md) |
| 三国 | 资深番茄 · 争霸爽文/黄巾开局 | [作者Agent.md](三国：从黄巾开始抢天下/作者Agent.md) |

说明与模板：[book-author-agents.md](.agents/book-author-agents.md)

## 绑定 Skill / 插件

| 资源 | 路径 | 何时用 |
|------|------|--------|
| novel-serial-writing | [.agents/skills/novel-serial-writing/](.agents/skills/novel-serial-writing/) | **默认**写章 |
| novel-serial-writing-lite | [.agents/skills/novel-serial-writing-lite/](.agents/skills/novel-serial-writing-lite/) | 用户点名轻量路径 |
| 平台插件 | [.agents/platforms/](.agents/platforms/) | 书内 `18_` 声明的 `tomato` / `webnovel-generic` |

## 快速口令

```
【书名】写第061章                     → 默认读上下文、写正文、底审、平台审、同步账本
【书名】先填第061章章节记录，再写正文
【书名】检查第043-048章连续性      → 可交给章节审稿 Agent
【书名】审第061章                   → 读者视角 + 编辑视角双审
【书名】按番茄口径审第061章
【书名】给第061章精修建议
按模板初始化新书【书名】               → 含创建 作者Agent.md
轻量写章 + 书名                       → lite（须点名）
```

未写书名 → 两个 Agent 都必须追问，禁止猜测。

## 当前书库与插件

| 书名 | 目录 | 启用插件 |
|------|------|----------|
| 全球迷雾：我能校正万物词条 | `全球迷雾：我能校正万物词条/` | `tomato` |
| 复苏年代：我能看破一切 | `复苏年代：我能看破一切/` | `webnovel-generic` |
| 三国：从黄巾开始抢天下 | `三国：从黄巾开始抢天下/` | `webnovel-generic` |

## 辅助资源

- `canvases/` — 章节评分与复盘 Canvas
- `_scores_embed.txt` — 评分嵌入数据
