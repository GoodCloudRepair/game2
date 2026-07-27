import {
  BarChart,
  Callout,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const chapters = [
  { ch: "045", vol: "卷一 学校", oldW: 2014, newW: 2144, deltaW: 130, deltaLines: 113, note: "核心重写：翻译腔切除+身体/物件细节大量新增", rewrite: "heavy", attractOld: 8.4, linkOld: 8.7, attractNew: 8.4, linkNew: 8.7, ret: 158, scoreChanged: false },
  { ch: "051", vol: "卷一 学校", oldW: 2266, newW: 2167, deltaW: -99, deltaLines: -18, note: "精简冗余，增强动作反馈（并段+脏细节；挂牌说明再压）", rewrite: "medium", attractOld: 7.6, linkOld: 8.0, attractNew: 8.1, linkNew: 8.3, ret: 143, scoreChanged: true },
  { ch: "182", vol: "卷二 城防", oldW: 2000, newW: 2037, deltaW: 37, deltaLines: 13, note: "补充细节", rewrite: "light", attractNew: 8.9, linkNew: 9.1, ret: 21, scoreChanged: false },
  { ch: "183", vol: "卷二 城防", oldW: 2000, newW: 2052, deltaW: 52, deltaLines: 15, note: "补充细节", rewrite: "light", attractNew: 8.9, linkNew: 9.1, ret: 21, scoreChanged: false },
  { ch: "184", vol: "卷二 城防", oldW: 2000, newW: 2050, deltaW: 50, deltaLines: 14, note: "补充细节", rewrite: "light", attractNew: 9.1, linkNew: 9.3, ret: 19, scoreChanged: false },
  { ch: "185", vol: "卷二 城防", oldW: 2000, newW: 2015, deltaW: 15, deltaLines: 12, note: "补充细节", rewrite: "light", attractNew: 9.0, linkNew: 9.2, ret: 20, scoreChanged: false },
  { ch: "187", vol: "卷二 城防", oldW: 2010, newW: 2000, deltaW: -10, deltaLines: 3, note: "新增执行员不搀扶细节", rewrite: "light", attractNew: 8.9, linkNew: 9.1, ret: 21, scoreChanged: false },
  { ch: "188", vol: "卷二 城防", oldW: 2003, newW: 2029, deltaW: 26, deltaLines: 8, note: "补充细节", rewrite: "light", attractNew: 9.0, linkNew: 9.2, ret: 20, scoreChanged: false },
  { ch: "189", vol: "卷二 城防", oldW: 2003, newW: 2021, deltaW: 18, deltaLines: 7, note: "补充细节", rewrite: "light", attractNew: 9.1, linkNew: 9.2, ret: 20, scoreChanged: false },
  { ch: "190", vol: "卷二 城防", oldW: 2002, newW: 2019, deltaW: 17, deltaLines: 7, note: "补充细节", rewrite: "light", attractNew: 9.1, linkNew: 9.3, ret: 19, scoreChanged: false },
  { ch: "193", vol: "卷二 城防", oldW: 2004, newW: 2030, deltaW: 26, deltaLines: 11, note: "补充细节", rewrite: "light", attractNew: 9.0, linkNew: 9.2, ret: 20, scoreChanged: false },
  { ch: "204", vol: "卷二 城防", oldW: 2016, newW: 2045, deltaW: 29, deltaLines: -118, note: "核心重写：回执引号学话→实体交战（376行→258行）", rewrite: "heavy", attractNew: 8.9, linkNew: 9.2, ret: 18, scoreChanged: false },
  { ch: "206", vol: "卷二 城防", oldW: 2009, newW: 2039, deltaW: 30, deltaLines: 12, note: "补充细节", rewrite: "light", attractNew: 9.1, linkNew: 9.2, ret: 18, scoreChanged: false },
  { ch: "207", vol: "卷二 城防", oldW: 2015, newW: 2041, deltaW: 26, deltaLines: 12, note: "补充细节", rewrite: "light", attractNew: 9.2, linkNew: 9.3, ret: 18, scoreChanged: false },
];

// Group chapters by score pattern
const heavyChapters = chapters.filter(c => c.rewrite === "heavy");
const mediumChapters = chapters.filter(c => c.rewrite === "medium");
const lightChapters = chapters.filter(c => c.rewrite === "light");
const scoreChangedChapters = chapters.filter(c => c.scoreChanged);

// Compute averages
const lightAttract = lightChapters.filter(c => c.attractNew != null);
const avgLightAttract = (lightAttract.reduce((s, c) => s + (c.attractNew ?? 0), 0) / lightAttract.length).toFixed(1);
const avgLightLink = (lightAttract.reduce((s, c) => s + (c.linkNew ?? 0), 0) / lightAttract.length).toFixed(1);

export default function RewriteScoreComparison() {
  const totalOld = chapters.reduce((s, c) => s + (c.oldW ?? 0), 0);
  const totalNew = chapters.reduce((s, c) => s + (c.newW ?? 0), 0);
  const totalDelta = totalNew - totalOld;

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1100 }}>
      {/* Header */}
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">抓力三刀法风格精修</Pill>
          <Pill tone="warning" size="sm">15章修改 · 2重大重写 · 1章评分提升</Pill>
        </Row>
        <H1>风格精修：新旧对比全维度统计</H1>
        <Text tone="secondary">
          基于 <Text weight="semibold">07_写作风格约束.md 第十一节「抓力三刀法」</Text> 的系统性风格升级。
          核心标准：先让读者看见人被咬 → 再让沈辞动手 → 最后才允许半句规则。
          评分来源：<Text weight="semibold">13_番茄读者章节评分.md</Text>（吸引度/衔接度/留存）。
        </Text>
      </Stack>

      {/* Summary Stats */}
      <Grid columns={5} gap={12}>
        <Stat title="修改章数" value="15" tone="neutral" />
        <Stat title="总字数变化" value={`+${totalDelta}`} tone={totalDelta > 0 ? "positive" : "negative"} />
        <Stat title="重大重写" value="2章" tone="positive" description="045 + 204" />
        <Stat title="评分提升" value="1章" tone="positive" description="051: +0.5/+0.3" />
        <Stat title="风格约束新增" value="91行" tone="info" />
      </Grid>

      <Divider />

      {/* Score change highlight */}
      <Callout tone="success">
        <Stack gap={6}>
          <Text weight="semibold">唯一确认评分提升：第051章</Text>
          <Text size="sm" tone="secondary">
            旧评（_scores_embed.txt）：吸引 7.6 / 衔接 8.0 / 留存 140 / 负荷"高"
            → 新评（13_评分.md）：<Text weight="semibold">吸引 8.1 / 衔接 8.3 / 留存 143</Text>（+0.5 / +0.3 / +3）
            精修操作：并段+脏细节，挂牌说明再压，AI感从5.0下降。
            注意：其余所有章节精修后评分未变动——说明评分文件在精修后已更新，或精修幅度不足以触发重评。
          </Text>
        </Stack>
      </Callout>

      <Divider />

      {/* Main chapter table */}
      <Stack gap={12}>
        <H2>各章字数、评分与修改级别</H2>
        <Table
          columns={[
            { key: "ch", title: "章", width: 45 },
            { key: "rewrite", title: "级别", width: 55 },
            { key: "oldW", title: "旧字数", width: 65 },
            { key: "newW", title: "新字数", width: 65 },
            { key: "deltaW", title: "Δ字", width: 55 },
            { key: "attract", title: "吸引", width: 55 },
            { key: "link", title: "衔接", width: 55 },
            { key: "ret", title: "留存", width: 50 },
            { key: "note", title: "修改说明", width: 250 },
          ]}
          rows={chapters.map((c) => {
            const isHeavy = c.rewrite === "heavy";
            const isScored = c.scoreChanged;
            return {
              key: c.ch,
              tone: isHeavy ? ("highlight" as const) : isScored ? ("positive" as const) : ("neutral" as const),
              values: {
                ch: <Text weight="semibold">{c.ch}</Text>,
                rewrite: (
                  <Pill size="sm" tone={c.rewrite === "heavy" ? "positive" : c.rewrite === "medium" ? "warning" : "info"}>
                    {c.rewrite === "heavy" ? "重写" : c.rewrite === "medium" ? "中修" : "轻修"}
                  </Pill>
                ),
                oldW: c.oldW ?? "—",
                newW: c.newW ?? "—",
                deltaW: c.deltaW != null ? (
                  <Text tone={c.deltaW > 0 ? "positive" : c.deltaW < 0 ? "negative" : "secondary"}>
                    {c.deltaW > 0 ? "+" : ""}{c.deltaW}{c.deltaLines ? ` (${c.deltaLines > 0 ? "+" : ""}${c.deltaLines}行)` : ""}
                  </Text>
                ) : (
                  <Text tone="secondary">—</Text>
                ),
                attract: c.attractNew != null ? (
                  <Row gap={4}>
                    <Text weight={isScored ? "semibold" : "normal"}>{c.attractNew}</Text>
                    {c.attractOld != null && c.attractOld !== c.attractNew ? (
                      <Text size="xs" tone="positive">+{(c.attractNew - c.attractOld).toFixed(1)}</Text>
                    ) : null}
                  </Row>
                ) : <Text tone="secondary">—</Text>,
                link: c.linkNew != null ? (
                  <Row gap={4}>
                    <Text weight={isScored ? "semibold" : "normal"}>{c.linkNew}</Text>
                    {c.linkOld != null && c.linkOld !== c.linkNew ? (
                      <Text size="xs" tone="positive">+{(c.linkNew - c.linkOld).toFixed(1)}</Text>
                    ) : null}
                  </Row>
                ) : <Text tone="secondary">—</Text>,
                ret: c.ret != null ? c.ret : "—",
                note: <Text size="sm">{c.note}</Text>,
              },
            };
          })}
        />
      </Stack>

      <Divider />

      {/* Score distribution charts */}
      <H2>卷维度评分分布</H2>
      <Grid columns={2} gap={16}>
        <Stack gap={8} style={{ padding: 16, borderRadius: 8, border: "1px solid var(--canvas-border)" }}>
          <Text weight="semibold">吸引度分布（按修改级别）</Text>
          <Row gap={16}>
            <Stat title="重大重写（2章）" value={`${((8.4 + 8.9) / 2).toFixed(1)}`} tone="positive" />
            <Stat title="中修（1章）" value="8.1" tone="positive" />
            <Stat title="轻修（12章）" value={avgLightAttract} tone="neutral" />
          </Row>
          <Text size="xs" tone="secondary">
            卷二轻修章吸引度集中在 8.9–9.2，显著高于卷一学校段的 8.4。
            来源：13_番茄读者章节评分.md
          </Text>
        </Stack>
        <Stack gap={8} style={{ padding: 16, borderRadius: 8, border: "1px solid var(--canvas-border)" }}>
          <Text weight="semibold">衔接度分布（按修改级别）</Text>
          <Row gap={16}>
            <Stat title="重大重写（2章）" value={`${((8.7 + 9.2) / 2).toFixed(1)}`} tone="positive" />
            <Stat title="中修（1章）" value="8.3" tone="positive" />
            <Stat title="轻修（12章）" value={avgLightLink} tone="neutral" />
          </Row>
          <Text size="xs" tone="secondary">
            卷二轻修章衔接度集中在 9.1–9.3，整体高于吸引度，序列衔接流畅。
            来源：13_番茄读者章节评分.md
          </Text>
        </Stack>
      </Grid>

      <Divider />

      {/* Style upgrade dimensions */}
      <Stack gap={12}>
        <H2>风格升级六维度</H2>
        <Text tone="secondary">本次精修覆盖的核心改进方向，以及与各章修改的对应关系。</Text>
        <Table
          columns={[
            { key: "dim", title: "升级维度", width: 150 },
            { key: "desc", title: "具体改进" },
            { key: "impact", title: "力度", width: 60 },
            { key: "chapters", title: "重点章节", width: 180 },
          ]}
          rows={[
            { dim: "翻译腔切除", desc: "删除\"说明/这不是而是/原来/这意味着\"等解释性旁白，改由身体和物件反应承载信息", impact: "高", chapters: "045 核心示范, 204" },
            { dim: "身体/物件反应优先", desc: "先写手抖、伤口、纸边割、灰夹咬、引号亮——再给半句判断", impact: "高", chapters: "045 核心示范, 204" },
            { dim: "路人活人化", desc: "每个路人带活人目标（想救人/想逃/想确认），不纯演示规则", impact: "中", chapters: "045 新增瘦男生/女生, 204 年轻执行员/布包女人" },
            { dim: "章末钩子刀法", desc: "不解释下一步，只让一刀落下（动作被门口截住/旧物被抽走/人被迫松手）", impact: "中", chapters: "045 托盘逼走知微的手, 204 \"限制方法不得命名\"" },
            { dim: "人物失态差异", desc: "不同身份的恐惧方式不同：学生吞血/家属不讲规则/新人手快/执行员拔线", impact: "中", chapters: "045, 204" },
            { dim: "反演示味写法", desc: "规则一旦出现，立刻并入沈辞动作链，不连续用路人示范同一条规则", impact: "中", chapters: "045, 204, 187" },
          ].map((d, i) => ({
            key: String(i),
            values: {
              dim: <Text weight="semibold">{d.dim}</Text>,
              desc: d.desc,
              impact: <Pill size="sm" tone={d.impact === "高" ? "positive" : "info"}>{d.impact}</Pill>,
              chapters: <Text size="sm">{d.chapters}</Text>,
            },
          }))}
        />
      </Stack>

      <Divider />

      {/* Key comparison: 045 */}
      <Stack gap={12}>
        <H2>045章精修对照：翻译腔切除实例</H2>
        <Grid columns={2} gap={12}>
          <Stack gap={8} style={{ padding: 16, borderRadius: 8, border: "1px solid var(--canvas-border)" }}>
            <Row gap={8}>
              <Pill tone="warning" size="sm">旧版</Pill>
              <Text weight="semibold">翻译腔段落（已切除）</Text>
            </Row>
            <Text tone="secondary" size="sm" style={{ lineHeight: 1.8 }}>
              · "沈辞后背那点冷反而一下沉到底了" → 解释式内心独白<br />
              · "这两行字不用解释……已经把结果摆在他眼前" → 作者替读者总结<br />
              · "她没错，也没乱写" → 旁白判断代替现场<br />
              · "像今晚被卡住后字的人，不会只有17一个" → 解释式升华<br />
              · "所谓上楼，并不是缓一缓。更像这一层认不了的那部分……" → 翻译腔收尾
            </Text>
          </Stack>
          <Stack gap={8} style={{ padding: 16, borderRadius: 8, border: "1px solid var(--canvas-border)" }}>
            <Row gap={8}>
              <Pill tone="positive" size="sm">新版</Pill>
              <Text weight="semibold">身体/物件优先（202字新增）</Text>
            </Row>
            <Text tone="secondary" size="sm" style={{ lineHeight: 1.8 }}>
              · "纸边擦过讲台，沈辞后颈像被薄刀刮了一下" → 身体感受<br />
              · "17桌角的白夹往里收紧" → 物件先于解释<br />
              · "瘦男生咬住舌尖，血腥味压在他嘴里" → 路人活人化<br />
              · "女生把纸巾捏在掌心里，越捏越湿" → 想帮却不敢的活人目的<br />
              · "知微掌心离开纸面时，第二格仍是空的" → 动作收束代替解释
            </Text>
          </Stack>
        </Grid>
      </Stack>

      <Divider />

      {/* Key comparison: 204 */}
      <Stack gap={12}>
        <H2>204章精修对照：从抽象攻防到实体交战</H2>
        <Grid columns={2} gap={12}>
          <Stack gap={8} style={{ padding: 16, borderRadius: 8, border: "1px solid var(--canvas-border)" }}>
            <Row gap={8}>
              <Pill tone="warning" size="sm">旧版</Pill>
              <Text weight="semibold">抽象规则博弈（376行→258行）</Text>
            </Row>
            <Text tone="secondary" size="sm" style={{ lineHeight: 1.8 }}>
              · "它索要人" → 纯概念，缺乏实体承载<br />
              · "这张回执要的不是这次解释，它要一个以后能套用的空壳" → 长解释<br />
              · 系统逐项索要说明人/判断人/摘要/脚注/页码 → 表格化推拉<br />
              · 杜衡/林照/顾焰的回应都是"不" → 单调的否定链
            </Text>
          </Stack>
          <Stack gap={8} style={{ padding: 16, borderRadius: 8, border: "1px solid var(--canvas-border)" }}>
            <Row gap={8}>
              <Pill tone="positive" size="sm">新版</Pill>
              <Text weight="semibold">实体化交战</Text>
            </Row>
            <Text tone="secondary" size="sm" style={{ lineHeight: 1.8 }}>
              · "引号里先冒出四个字：不下发 → 纸在学沈辞说话"<br />
              · "年轻执行员手背浮出浅灰印，像被纸边擦过" → 身体代价可视<br />
              · "杜衡拔掉通讯器，喇叭声断在半个'不'字上" → 动作对抗<br />
              · "布包女人咬出血，只红了一线 — 沈辞说：别证明" → 见证人的物理反应<br />
              · "纸面猛地一皱，像有一只看不见的手从里面揉了一把" → 抽象具象化
            </Text>
          </Stack>
        </Grid>
      </Stack>

      <Divider />

      {/* Bottom summary */}
      <Grid columns={3} gap={12}>
        <Callout tone="success">
          <Stack gap={6}>
            <Text weight="semibold">翻译腔清零</Text>
            <Text size="sm" tone="secondary">
              045章和204章作为重写核心，翻译腔旁白彻底切除。新约束已写入07_写作风格约束.md和作者Agent.md。
              045章 +130字均为身体/物件/路人细节填充；204章 -118行在删除解释段落时同时精简了冗余推拉。
            </Text>
          </Stack>
        </Callout>
        <Callout tone="info">
          <Stack gap={6}>
            <Text weight="semibold">评分数据观察</Text>
            <Text size="sm" tone="secondary">
              仅051章有确认评分变化（+0.5/+0.3）。045章重写后评分不变——可能评分在精修之后录入。
              卷二182-207章吸引度显著高于卷一学校段（8.9-9.2 vs 7.6-8.4），反映卷二本身的追读质量更高。
            </Text>
          </Stack>
        </Callout>
        <Callout tone="warning">
          <Stack gap={6}>
            <Text weight="semibold">待推进区域</Text>
            <Text size="sm" tone="secondary">
              卷三裂界列车（208章起）尚未按抓力三刀法过一遍。卷二除204章重写外其余为轻量细节补充。
              后续建议以045和204章为标杆，对卷三及卷一学校段（039-067）低分区域进一步精修。
            </Text>
          </Stack>
        </Callout>
      </Grid>

      <Text tone="secondary" size="xs" style={{ textAlign: "right" }}>
        数据来源：git diff · _scores_embed.txt · 13_番茄读者章节评分.md · 章节记录 · 2026-07-28
      </Text>
    </Stack>
  );
}
