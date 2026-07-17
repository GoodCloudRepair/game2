import {
  Callout,
  Card,
  CardBody,
  CardHeader,
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

const LATEST5 = [
  {
    ch: "129",
    title: "文修前声不只在旧带里",
    a: 8.9,
    l: 9.2,
    ret: 46,
    tag: "正常",
    note: "核验口核手法；半格签码+新刮痕；避鉴定会",
  },
  {
    ch: "130",
    title: "旧签码不露完整名",
    a: 9.0,
    l: 9.2,
    ret: 45,
    tag: "高光",
    note: "复刻退+补者入格；切亲属登记室",
  },
  {
    ch: "131",
    title: "亲属登记室不认活人口",
    a: 9.0,
    l: 9.1,
    ret: 44,
    tag: "高光",
    note: "活人口述无效；沉默成保护；代办接棒",
  },
  {
    ch: "132",
    title: "代签人先替家属到场",
    a: 8.9,
    l: 9.1,
    ret: 43,
    tag: "观察",
    note: "代领变家属；临时协助挂证；手续略密",
  },
  {
    ch: "133",
    title: "紧急联系人不写真名",
    a: 9.1,
    l: 9.2,
    ret: 42,
    tag: "高光",
    note: "行为当联系人；医护项钩林照/知微",
  },
];

function avg(nums: number[]) {
  return Math.round((nums.reduce((s, n) => s + n, 0) / nums.length) * 100) / 100;
}

export default function MiwuLatest5Scores() {
  const aAvg = avg(LATEST5.map((c) => c.a));
  const lAvg = avg(LATEST5.map((c) => c.l));

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 980 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            番茄读者抓力分
          </Pill>
          <Pill tone="warning" size="sm">
            最新5章 · 129-133
          </Pill>
        </Row>
        <H1>卷二最新五章评分</H1>
        <Text tone="secondary">
          口径同`13_番茄读者章节评分.md`。128已评9.0/9.2，本表从129起。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(aAvg)} label="均吸引" tone="info" />
        <Stat value={String(lAvg)} label="均衔接" tone="success" />
        <Stat value="46→42" label="千人留存" />
        <Stat value="133" label="写到章" tone="warning" />
      </Grid>

      <Callout tone="success" title="总判：签码收束抬高后，登记室新规则仍稳">
        130用`补者入格`收住121-130；131/133规则新鲜度够。132手续略密是唯一观察点；133医护项把人险拉回。
      </Callout>

      <Divider />

      <Table
        headers={["章", "标题", "吸引", "衔接", "留存", "标签", "判断"]}
        columnAlign={["left", "left", "right", "right", "right", "left", "left"]}
        rows={LATEST5.map((c) => [
          c.ch,
          c.title,
          String(c.a),
          String(c.l),
          String(c.ret),
          c.tag,
          c.note,
        ])}
        rowTone={LATEST5.map((c) =>
          c.tag === "高光"
            ? ("success" as const)
            : c.tag === "观察"
              ? ("warning" as const)
              : undefined,
        )}
      />

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>段内最强</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">133 · 行为当紧急联系人（9.1）</Text>
              <Text size="small">130 · 补者入格收束（9.0）</Text>
              <Text size="small">131 · 活人不作凭（9.0）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>写134前</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">医护项已亮：优先拆边界/人险，别再开抽屉说明会</Text>
              <Text size="small">林照被写成家属 = 白床医疗边界失守，钩够硬</Text>
              <Text size="small">132手续余温：134少叠加新手续名</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H2>逐章速评</H2>
      <Stack gap={8}>
        <Text size="small">
          <Text weight="semibold">129</Text>
          {" "}接住核验口；材料并排+只核手法，躲开纯同源开会；半格+新刮痕交130。
        </Text>
        <Text size="small">
          <Text weight="semibold">130</Text>
          {" "}复刻退、补者入格完成小段冷收；父亲线禁贪快说清；任务单切登记室干净。
        </Text>
        <Text size="small">
          <Text weight="semibold">131</Text>
          {" "}活人认亲被退有情绪冲击；合照待核与沉默保护有记忆点。
        </Text>
        <Text size="small">
          <Text weight="semibold">132</Text>
          {" "}代领→家属到场概念狠；临时协助挂证推进主角代价；连写手续略贴警戒线。
        </Text>
        <Text size="small">
          <Text weight="semibold">133</Text>
          {" "}联系人写行为不写名，脑洞与可视化都强；医护项章末把林照/知微线抬死。
        </Text>
      </Stack>

      <Text tone="tertiary" size="small">
        评估：129-133 · 2026-07-17 · 已回填评分表
      </Text>
    </Stack>
  );
}
