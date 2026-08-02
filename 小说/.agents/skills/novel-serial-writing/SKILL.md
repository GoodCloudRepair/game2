---
name: novel-serial-writing
description: >-
  Routes Chinese serialized-novel tasks to the explicitly named book's own
  author agent and local writing workflow. Use for writing or reviewing chapters,
  maintaining outlines and ledgers, checking continuity, running chapter or volume
  reviews, or initializing a novel. This shared skill only dispatches; it does not
  define prose style, chapter formulas, ledger filenames, platform rules, or
  book-specific mechanics.
---

# 长篇连载任务路由

本 Skill 只分发任务。具体写作、审稿、章纲、台账和平台流程由目标小说目录内的规则执行。

## 1. 确认目标小说

- 从用户请求中取得明确书名。
- 未写书名或无法唯一定位时，先追问，禁止根据最近文件、当前编辑记录或其他作品猜测。
- 定位到目标小说目录后，所有后续读取和写入默认限制在该书目录内；共享平台插件等被书内规则明确引用的资源除外。

## 2. 加载书内执行器

按以下顺序读取，存在即加载：

1. `作者Agent.md`
2. 书内声明的本地 `SKILL.md` 或执行 Skill
3. `00_写作约束与流程.md`
4. 书内入口文件明确要求的其他规则、台账、章纲、模板和平台插件

若 `作者Agent.md` 或书内执行规范缺失，停止具体创作并报告缺项，不得借用其他小说的文件顶替。

加载完成后，将原始用户请求连同书名、卷章号和任务类型交给书内执行器。后续步骤、文件名、字数、审稿标准、台账范围和交付格式全部服从书内规则。

## 3. 识别任务类型

仅做路由分类，不在本 Skill 内实现流程：

- 写章、续写、改写 → 书内标准写章流程
- 审章、连续性检查、精修建议 → 书内审稿流程
- 补章纲、卷纲、总纲 → 书内大纲流程
- 回填台账、复盘 → 书内台账与复盘流程
- 轻量写章 → 仅在用户明确点名时路由到书内轻量 Skill
- 初始化新书 → 路由到书库声明的初始化执行器

## 4. 隔离规则

- 不读取其他小说的正文、作者 Agent、台账、章纲或包装文档作为参考。
- 不把任何单书当作默认范例。
- 不向目标书注入共享 Skill 中未声明的题材机制、文风、节奏模板或台账结构。
- 不把异常、门域、系统、规则、势力、能力等字段视为通用必选项；是否启用由书内规则决定。
- 共享规则与书内规则冲突时，以用户当前指令和目标书内规则为准。

## 5. 分发完成条件

只有在目标书、书内执行器和任务类型均已明确后，才开始具体工作。开始后，本 Skill 不再追加创作约束，仅监督任务未被路由到其他作品。

