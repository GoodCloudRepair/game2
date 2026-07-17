import {
  Callout,
  Divider,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const PHASES = [
  { range: "001-010", name: "开局", j: 8.44, l: 8.89, ai: "4.5", note: "硬钩+生活毛边" },
  { range: "011-024", name: "医院", j: 8.25, l: 8.81, ai: "5.0", note: "流程顺，中段略冷" },
  { range: "025-038", name: "旧城", j: 8.2, l: 8.76, ai: "5.0", note: "追线清楚" },
  { range: "039-067", name: "学校", j: 8.24, l: 8.62, ai: "5.5", note: "全书谷底；精修后抬" },
  { range: "046-058", name: "精修带", j: 8.3, l: 8.67, ai: "5.2", note: "已实测AI感" },
  { range: "068-072", name: "收束入口", j: 8.54, l: 8.92, ai: "4.8", note: "兄妹同场" },
  { range: "073-082", name: "官方", j: 8.44, l: 8.8, ai: "5.0", note: "换层顺" },
  { range: "083-087", name: "三域", j: 8.38, l: 8.78, ai: "5.5", note: "抽象门槛" },
  { range: "088-102", name: "核心", j: 8.77, l: 8.99, ai: "4.5", note: "顺序感最强" },
  { range: "103-107", name: "封门前", j: 8.74, l: 9.02, ai: "5.0", note: "103-104偏规则" },
  { range: "108-120", name: "卷尾", j: 9.01, l: 9.16, ai: "4.2", note: "追读峰值" },
  { range: "121-133", name: "卷二前段", j: 8.95, l: 9.14, ai: "5.0", note: "体制特色稳；手续同质" },
];

export default function FullNovelScores() {
  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1040 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            全书总览
          </Pill>
          <Pill tone="warning" size="sm">
            已评 001-133
          </Pill>
          <Pill tone="neutral" size="sm">
            134-138 正文有、分未评
          </Pill>
        </Row>
        <H1>全篇小说评分总览</H1>
        <Text tone="secondary">
          精彩=吸引抓力；衔接=钩子接住（均越高越好）。AI感为段级估计（越高越像模板）；046-058
          为实测，其余为同口径估计。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="8.51" label="001-133 均精彩" tone="info" />
        <Stat value="8.87" label="001-133 均衔接" tone="success" />
        <Stat value="8.46 / 8.84" label="卷一120章 精彩/衔接" />
        <Stat value="8.95 / 9.14" label="卷二121-133" tone="success" />
      </Grid>

      <Callout tone="success" title="总判：全书在番茄口径上属中上偏强；衔接强于精彩">
        卷一收束与卷二开篇都在高位。真正拖后腿的是学校中段（已精修抬升）和局部手续/规则同质。千人模型读到133约剩42人，属深读漏斗，不是章分崩盘。
      </Callout>

      <Divider />

      <H2>分阶段</H2>
      <Table
        headers={["范围", "阶段", "精彩", "衔接", "AI感", "判断"]}
        columnAlign={["left", "left", "right", "right", "right", "left"]}
        rows={PHASES.map((p) => [
          p.range,
          p.name,
          String(p.j),
          String(p.l),
          p.ai,
          p.note,
        ])}
        rowTone={PHASES.map((p) =>
          p.j >= 8.9
            ? ("success" as const)
            : p.j < 8.3
              ? ("warning" as const)
              : undefined,
        )}
      />

      <Grid columns={2} gap={12}>
        <Stack gap={8}>
          <H2>全书高光（精彩≥9.1）</H2>
          <Text size="small">119 / 114（9.2）· 133 / 122 / 117 / 109 / 097 / 065（9.1）</Text>
          <Text size="small">卷尾情感与卷二反读/联系人最稳</Text>
        </Stack>
        <Stack gap={8}>
          <H2>仍偏低（精彩≤7.9）</H2>
          <Text size="small">017 / 027 / 063（7.8）· 013/016/033/041/043/044/049/061（7.9）</Text>
          <Text size="small">多为流程过渡或规则账；学校精修后谷底已不是7.6档</Text>
        </Stack>
      </Grid>

      <H2>AI感（全书怎么看）</H2>
      <Stack gap={6}>
        <Text size="small">最好：开篇生活毛边、核心/卷尾人险、东回廊「走起来」（≈4.2–4.5）</Text>
        <Text size="small">中等：医院/旧城/官方流程、卷二体制段（≈5.0）</Text>
        <Text size="small">偏高：学校称呼挂牌、三域抽象、卷二连续抽屉手续（≈5.5–6.0）</Text>
        <Text size="small">全书未逐章打AI感；若要全表，建议只对≤8.2精彩章补评，避免重复通读。</Text>
      </Stack>

      <Callout tone="info" title="和「掉人」的关系">
        精彩8.5+仍会掉千人留存——那是漏斗。看质量应看段均与冷章，不看绝对人数从55→42。
      </Callout>

      <Text tone="tertiary" size="small">
        数据源：13_番茄读者章节评分.md · 含2026-07-17学校精修回填 · 卷二评至133
      </Text>
    </Stack>
  );
}
