import {
  Card, CardHeader, CardBody,
  Grid, Row, Stack,
  H1, H2, H3, Text, Code,
  Table, Stat, Pill,
  Divider,
  useHostTheme,
} from "cursor/canvas";

// ── extracted data from 21_系统评分.md ──

const segments = [
  { range: "121-150", name: "城防局·安置调度", count: 30, appeal: 8.10, cohesion: 8.83, retention: 26, burden: 8.2, ai: 5.1, satisfaction: 5.4, verdict: "需观察" },
  { range: "151-180", name: "文修复核·父线半门", count: 30, appeal: 8.12, cohesion: 8.91, retention: 19, burden: 7.9, ai: 4.8, satisfaction: 5.7, verdict: "需观察" },
  { range: "181-200", name: "边线外勤·人工旁观", count: 20, appeal: 7.83, cohesion: 8.78, retention: 18, burden: 8.2, ai: 5.4, satisfaction: 4.9, verdict: "⚠需观察" },
  { range: "201-220", name: "内栏失名·改名边界", count: 20, appeal: 8.07, cohesion: 8.87, retention: 17, burden: 7.9, ai: 5.0, satisfaction: 5.3, verdict: "需观察" },
  { range: "221-240", name: "改名口·裂界预编", count: 20, appeal: 8.26, cohesion: 8.98, retention: 15, burden: 7.8, ai: 4.4, satisfaction: 6.0, verdict: "稳盘" },
  { range: "241-260", name: "裂界实核·谁能走", count: 20, appeal: 8.16, cohesion: 8.94, retention: 13, burden: 7.8, ai: 4.8, satisfaction: 5.9, verdict: "稳盘" },
];

// Highlights with both strengths and weaknesses
const highlights = [
  { ch: 125, title: "同名替换先改编制表", star: true, appeal: 8.5, satisfaction: 7.0, ai: 4.0,
    good: "韩立川实证有画面冲击；第二次失名从管理表切入概念新鲜；旧痕稳名有微胜",
    bad: "概念密度高(编制表/名单口/广播联动/电子vs纸质)；表格屏幕交互占比偏高" },
  { ch: 145, title: "复核名单不验整名", star: true, appeal: 8.5, satisfaction: 7.5, ai: 3.5,
    good: "三人同填死名'周岷'悬念极强；旧痕分人给活人辨识力；三位待核者守物身体化",
    bad: "概念层次丰富(复核名单/整名核验/同填/旧痕/无名转送)，读者可能需回看" },
  { ch: 160, title: "更高复核席不验完整来源", star: true, appeal: 8.8, satisfaction: 7.0, ai: 4.0,
    good: "刮痕毛边实证+红章预削全专业判断驱动；更高权力被沈辞限制是控场胜利；父线一角钩强",
    bad: "概念层次深(更高复核席/完整来源/预刮/预断/旁证印/父线一角)，信息压力大" },
  { ch: 214, title: "源位灰痕不得同步入证", star: true, appeal: 8.8, satisfaction: 7.0, ai: 4.0,
    good: "拒绝妹妹作能力燃料；证背裂痕从同步到拒绝全程身体化；兄妹保护+改名边界双钩",
    bad: "系统对话占比高(不入证将降低…/可否作亲属参照…等反推链条)" },
  { ch: 226, title: "稳定触及不得作完整改名", star: true, appeal: 8.8, satisfaction: 7.5, ai: 3.5,
    good: "第一次稳定触碰改名边缘不破边界；证角缺损和能力说明空页是强能力高光",
    bad: "概念项(稳定触及/完整改名/证角缺损/能力说明)需前文积累才能完全共鸣" },
  { ch: 245, title: "第一批适格对象不得默认全城", star: true, appeal: 8.8, satisfaction: 7.0, ai: 4.0,
    good: "灰框落地+人群沉默+抱孩子全身体；反直觉拒绝全城默认；生死选择催更",
    bad: "概念层(适格对象/默认全城/灰框/未适格/已实核边界)密度仍高" },
  { ch: 254, title: "静默参照不替醒来", star: false, appeal: 8.5, satisfaction: 7.0, ai: 4.0,
    good: "白桥借知微作参照情绪强；兄妹软肋与医疗边界高压并存；同组高光章",
    bad: "需要前文积累（数章规则铺垫后才有此情绪爆发点）" },
  { ch: 260, title: "留置边只回未完成项", star: true, appeal: 8.8, satisfaction: 7.0, ai: 4.0,
    good: "留置复核把前四章错误来源回压；三项接入条件成强钩；收束有力",
    bad: "留置边/未完成项/独立承压/本人边/活项未裁五个概念同时抛出" },
];

// Risk chapters with specific problems
const risks = [
  { ch: 142, title: "任务单不准自动派人", appeal: 7.8, satisfaction: 4.0, ai: 6.0, burden: 9.0,
    problem: "屏幕文本占半数篇幅(任务一→三→责任栏→逾期…)，全章被动防御无情绪突破" },
  { ch: 148, title: "最终调度单位不写候选人", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "全章偏行政流程推演，候选人变单位/组长纯概念操作，无情绪突破" },
  { ch: 153, title: "文修回流件不离封袋", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "父亲线推进但无情绪，封袋核验偏冷鉴定流程，缺现场后果" },
  { ch: 167, title: "缺项回执不退给候选人", appeal: 7.5, satisfaction: 3.5, ai: 6.2, burden: 8.5,
    problem: "退样签收+备注绕路纯手续，回执格式+签收偏机械推演" },
  { ch: 177, title: "完整指令折痕不接父线", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "复盘抄送偏系统，三栏分存有效但无情绪，指令格式偏机械" },
  { ch: 192, title: "外勤复盘不得生成模板", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "匿名简报+流程卡偏手册，连续规则拆栏感显著，无情绪突破" },
  { ch: 196, title: "总表外沿巡检只作本次人工旁观", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "制度化风险无突破，人工旁观事项/责任人/见证口偏表格流程" },
  { ch: 204, title: "上级回执不得索要说明人", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "制度感强，说明人/短句/脚注/空章偏格式，同构感高" },
];

export default function Canvas() {
  const { tokens } = useHostTheme();

  // shared accent
  const accent = tokens.accent;
  const negative = tokens.warning ?? "#d97706";
  const positive = tokens.success ?? "#059669";
  const surface = tokens.surface ?? "#1e1e2e";
  const text = tokens.text ?? "#cdd6f4";
  const muted = tokens.muted ?? "#6c7086";

  return (
    <Stack gap={24} padding={24} style={{ background: tokens.background, minHeight: "100vh" }}>
      {/* Header */}
      <Stack gap={4}>
        <H1>第121–260章严苛评分 — 优劣分析</H1>
        <Text style={{ color: muted, fontSize: 13 }}>
          基准：最严苛尺度（AI感上调1.5–2.5分，爽憋下调1.5–2.5分，负担补全至7.0–9.0）· 数据来源：21_系统评分.md（2026-07-30重评）
        </Text>
      </Stack>

      {/* Segment overview */}
      <Card>
        <CardHeader>
          <H3>分段概览</H3>
        </CardHeader>
        <CardBody>
          <Grid columns={3} gap={12}>
            {segments.map((sg) => {
              const isWarn = sg.verdict.includes("⚠");
              return (
                <Stack key={sg.range} gap={6} padding={12}
                  style={{
                    background: isWarn ? "rgba(217,119,6,0.08)" : surface,
                    borderRadius: 8,
                    border: isWarn ? `1px solid ${negative}` : `1px solid ${tokens.border ?? "#313244"}`,
                  }}
                >
                  <Row justify="space-between">
                    <Code style={{ fontSize: 12 }}>{sg.range}</Code>
                    <Pill tone={isWarn ? "warning" : "neutral"}>{sg.verdict}</Pill>
                  </Row>
                  <Text style={{ fontSize: 13, color: text, fontWeight: 500 }}>{sg.name}</Text>
                  <Row gap={12}>
                    <Stat size="sm" label="吸引" value={sg.appeal.toFixed(2)} tone={sg.appeal < 8 ? "warning" : "neutral"} />
                    <Stat size="sm" label="爽憋" value={sg.satisfaction.toFixed(1)} tone={sg.satisfaction < 5.5 ? "warning" : "neutral"} />
                    <Stat size="sm" label="AI感" value={sg.ai.toFixed(1)} tone={sg.ai > 5 ? "warning" : "neutral"} />
                  </Row>
                  <Text style={{ fontSize: 11, color: muted }}>{sg.count}章 · 衔接{Number(sg.cohesion).toFixed(2)} · 负担{Number(sg.burden).toFixed(1)}</Text>
                </Stack>
              );
            })}
          </Grid>
        </CardBody>
      </Card>

      <Divider />

      {/* High-point chapters: good & bad */}
      <Stack gap={12}>
        <H2>高光章节 · 优劣势</H2>
        <Text style={{ color: muted, fontSize: 13 }}>
          以下章节在严苛评分下仍保持吸引≥8.5且爽憋≥7.0，但各自存在结构性短板
        </Text>
        <Grid columns={2} gap={12}>
          {highlights.map((h) => (
            <Card key={h.ch}>
              <CardHeader trailing={h.star ? <Pill tone="accent">⭐高光</Pill> : <Pill tone="neutral">高光</Pill>}>
                <Row gap={8}>
                  <Code>{h.ch}</Code>
                  <Text style={{ fontWeight: 600, color: text }}>{h.title}</Text>
                </Row>
              </CardHeader>
              <CardBody>
                <Stack gap={8}>
                  {/* Scores */}
                  <Row gap={16}>
                    <Stat size="sm" label="吸引" value={h.appeal.toFixed(1)} tone="accent" />
                    <Stat size="sm" label="爽憋" value={h.satisfaction.toFixed(1)} tone="success" />
                    <Stat size="sm" label="AI感" value={h.ai.toFixed(1)} tone={h.ai > 4 ? "warning" : "success"} />
                  </Row>
                  {/* Good */}
                  <Stack gap={2}>
                    <Text style={{ fontSize: 11, color: positive, fontWeight: 600 }}>✓ 长处</Text>
                    <Text style={{ fontSize: 12, color: text, lineHeight: 1.6 }}>{h.good}</Text>
                  </Stack>
                  {/* Bad */}
                  <Stack gap={2}>
                    <Text style={{ fontSize: 11, color: negative, fontWeight: 600 }}>✗ 短板</Text>
                    <Text style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>{h.bad}</Text>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Stack>

      <Divider />

      {/* Risk chapters */}
      <Stack gap={12}>
        <H2>风险章节 · 问题诊断</H2>
        <Text style={{ color: muted, fontSize: 13 }}>
          爽憋≤4.0 或 AI感≥6.0 的章节，核心问题均指向手续/表格/系统屏幕交互主导叙事
        </Text>

        <Table
          columns={[
            { title: "章", width: 52 },
            { title: "标题", width: 220 },
            { title: "吸引", width: 56 },
            { title: "爽憋", width: 56 },
            { title: "AI感", width: 56 },
            { title: "问题", width: 360 },
          ]}
          rows={risks.map((r) => ({
            tone: r.satisfaction <= 3.5 ? "warning" as const : "neutral" as const,
            cells: [
              <Code>{r.ch}</Code>,
              <Text style={{ fontWeight: 500 }}>{r.title}</Text>,
              <Text style={{ color: r.appeal < 8 ? negative : text }}>{r.appeal}</Text>,
              <Text style={{ color: r.satisfaction <= 3.5 ? negative : muted, fontWeight: r.satisfaction <= 3.5 ? 600 : 400 }}>
                {r.satisfaction}
              </Text>,
              <Text style={{ color: r.ai >= 6 ? negative : muted }}>{r.ai}</Text>,
              <Text style={{ fontSize: 12, lineHeight: 1.5, color: muted }}>{r.problem}</Text>,
            ],
          }))}
        />
      </Stack>

      <Divider />

      {/* Summary */}
      <Card>
        <CardHeader>
          <H3>综合判断</H3>
        </CardHeader>
        <CardBody>
          <Stack gap={10}>
            <Row gap={24}>
              <Stat size="md" label="最强段" value="221-240" tone="success" subtitle="改名口·裂界预编 — 吸引8.26 爽憋6.0" />
              <Stat size="md" label="最弱段" value="181-200" tone="warning" subtitle="边线外勤·人工旁观 — 吸引7.83 爽憋4.9" />
              <Stat size="md" label="全书平均" value="8.30 / 6.0" tone="neutral" subtitle="吸引 / 爽憋（121–260段均）" />
            </Row>
            <Stack gap={4}>
              <Text style={{ fontSize: 12, color: text, lineHeight: 1.6 }}>
                <Text style={{ color: negative, fontWeight: 600 }}>核心风险：</Text>181–200段20章连续制度拆解（外勤窗口/半步/目标/影号/回执/复盘/排程/旁观/封存号/巡检），平均爽憋仅4.9，创全书最低。
              </Text>
              <Text style={{ fontSize: 12, color: text, lineHeight: 1.6 }}>
                <Text style={{ color: positive, fontWeight: 600 }}>最佳区域：</Text>221–240段改名口/裂界预编，兄妹线高光密集（214/223/226/228），情绪+规则双驱动，爽憋回升至6.0。
              </Text>
              <Text style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>
                <Text style={{ color: muted, fontWeight: 600 }}>结构性短板：</Text>卷二/卷三体制表格+屏幕交互占比过高，导致AI感系统性偏高（4.5–6.5区间），远高于卷一的2.5–4.5。手续链同构风险在126–128/142–143/147–148/167–173/177–178/181–200/201–204/210–211等段反复出现。
              </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      {/* Changelog */}
      <Text style={{ fontSize: 11, color: muted, textAlign: "right" }}>
        严苛重评日期：2026-07-30 · 读第121/125/142/160/214/245/260章校准 · 其余以模板化评分覆盖
      </Text>
    </Stack>
  );
}
