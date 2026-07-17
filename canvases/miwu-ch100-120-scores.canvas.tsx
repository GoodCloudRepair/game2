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
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  UsageBar,
} from "cursor/canvas";

const CHAPTERS = [
  { ch: "100", title: "认回的人不从正环出", a: 8.8, l: 9.0, ret: 67, tag: "高光", note: "正环不出切向封门" },
  { ch: "101", title: "偏环只许缓释线", a: 8.7, l: 9.0, ret: 66, tag: "高光", note: "缓释+全城回雾钩" },
  { ch: "102", title: "定层一动全城回雾", a: 8.9, l: 9.1, ret: 66, tag: "高光", note: "代价可视化到城市" },
  { ch: "103", title: "封门装置先锁外名", a: 8.6, l: 9.0, ret: 65, tag: "风险", note: "外勤代价稳，偏功能" },
  { ch: "104", title: "内名读口不收公章", a: 8.5, l: 8.8, ret: 64, tag: "风险", note: "段内最冷规则章" },
  { ch: "105", title: "原链人先读", a: 8.8, l: 9.1, ret: 64, tag: "高光", note: "同链三节不可替代" },
  { ch: "106", title: "旧句只留半扇门", a: 9.0, l: 9.1, ret: 63, tag: "高光", note: "别替门取新名" },
  { ch: "107", title: "怪潮先走旧流程", a: 8.8, l: 9.1, ret: 63, tag: "高光", note: "旧流程回涌" },
  { ch: "108", title: "外线不断内名不稳", a: 8.9, l: 9.1, ret: 62, tag: "正常", note: "外线回执结构立住" },
  { ch: "109", title: "文昌路站不收回头人", a: 9.1, l: 9.2, ret: 61, tag: "高光", note: "回扣开篇，拒灾前" },
  { ch: "110", title: "真门名开始倒写", a: 9.0, l: 9.2, ret: 60, tag: "正常", note: "倒写第一笔+反读" },
  { ch: "111", title: "灰潮先冲外栏", a: 8.8, l: 9.1, ret: 60, tag: "偏弱", note: "大场面，新鲜度略弱" },
  { ch: "112", title: "第一栏失守不等于撤城", a: 8.9, l: 9.1, ret: 59, tag: "正常", note: "撤城争议强冲突" },
  { ch: "113", title: "共鸣项不可替换", a: 9.0, l: 9.2, ret: 59, tag: "正常", note: "规则自证不可替换" },
  { ch: "114", title: "她先认出半个称", a: 9.2, l: 9.2, ret: 58, tag: "高光", note: "兄妹强回收峰值" },
  { ch: "115", title: "三息够读一笔门", a: 9.0, l: 9.1, ret: 58, tag: "正常", note: "归档止信息价值高" },
  { ch: "116", title: "活项被门反读", a: 8.9, l: 9.1, ret: 57, tag: "偏弱", note: "代价压迫章" },
  { ch: "117", title: "近似改名不作稳定能力", a: 9.1, l: 9.2, ret: 57, tag: "高光", note: "能力高光不越级" },
  { ch: "118", title: "真门旧边只锁一次", a: 9.0, l: 9.1, ret: 56, tag: "正常", note: "一次性裁定选择感" },
  { ch: "119", title: "灰门封住留一条缝", a: 9.2, l: 9.3, ret: 56, tag: "高光", note: "卷尾高潮+HL-02" },
  { ch: "120", title: "城防局递来临时证", a: 9.0, l: 9.2, ret: 55, tag: "高光", note: "临时证+编目师候选" },
];

function avg(nums: number[]) {
  return Math.round((nums.reduce((s, n) => s + n, 0) / nums.length) * 100) / 100;
}

const band100 = CHAPTERS;
const band108 = CHAPTERS.filter((c) => Number(c.ch) >= 108);
const band103 = CHAPTERS.filter((c) => Number(c.ch) >= 103 && Number(c.ch) <= 107);

export default function MiwuCh100to120Scores() {
  const aAll = avg(band100.map((c) => c.a));
  const lAll = avg(band100.map((c) => c.l));
  const a108 = avg(band108.map((c) => c.a));
  const l108 = avg(band108.map((c) => c.l));

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1080 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            番茄读者抓力分
          </Pill>
          <Pill tone="warning" size="sm">
            100-120 · 卷01收束带
          </Pill>
          <Pill tone="success" size="sm">
            复核维持原分
          </Pill>
        </Row>
        <H1>第100-120章评分</H1>
        <Text tone="secondary">
          口径：吸引度（前300字/小爽点/规则新鲜度/情绪钩/章末点击欲/信息负担）·
          衔接度（钩子接住/换场顺/断章还想点）。非文学完成度。
        </Text>
        <Text tone="tertiary" size="small">
          源：13_番茄读者章节评分.md · 2026-07-17 复核 · 独立重评差均≤0.1，表分不改
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(aAll)} label="100-120 均吸引" tone="info" />
        <Stat value={String(lAll)} label="100-120 均衔接" tone="success" />
        <Stat value={String(a108)} label="108-120 均吸引" tone="warning" />
        <Stat value="67→55" label="千人留存" />
      </Grid>

      <UsageBar
        total={10}
        topLeftLabel={`段均吸引 ${aAll}`}
        topRightLabel="满分 10"
        segments={[{ id: "a", value: aAll, color: "blue" }]}
      />
      <Spacer size={4} />
      <UsageBar
        total={10}
        topLeftLabel={`段均衔接 ${lAll}`}
        topRightLabel="满分 10"
        segments={[{ id: "l", value: lAll, color: "green" }]}
      />

      <Callout tone="success" title="总判">
        100-120 是全书目前最稳的追读带之一：衔接全程 8.8+，108-120
        段均吸引 9.01。103-104 蓄压偏冷属正常；卷尾高潮在 114 / 117 / 119，落点 120 钩住卷二。
      </Callout>

      <Divider />

      <Stack gap={12}>
        <H2>逐章评分表</H2>
        <Table
          headers={["章", "标题", "吸引", "衔接", "留存", "标签", "判断"]}
          columnAlign={["left", "left", "right", "right", "right", "left", "left"]}
          rows={CHAPTERS.map((c) => [
            c.ch,
            c.title,
            String(c.a),
            String(c.l),
            String(c.ret),
            c.tag,
            c.note,
          ])}
          rowTone={CHAPTERS.map((c) =>
            c.tag === "风险" || c.tag === "偏弱"
              ? ("warning" as const)
              : c.tag === "高光"
                ? ("success" as const)
                : undefined,
          )}
        />
      </Stack>

      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader>最强 3 章</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">119 灰门封住留一条缝 · 9.2/9.3</Text>
              <Text size="small">114 她先认出半个称 · 9.2/9.2</Text>
              <Text size="small">109 文昌路站不收回头人 · 9.1/9.2</Text>
              <Text size="small" tone="tertiary">
                117 近似改名可并列第三
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>最弱 / 风险</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">104 不收公章 · 8.5/8.8（最冷）</Text>
              <Text size="small">103 先锁外名 · 8.6/9.0（功能蓄压）</Text>
              <Text size="small">111 灰潮冲栏 · 8.8/9.1（场面偏）</Text>
              <Text size="small">116 活项反读 · 8.9/9.1（代价章）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>分段均分</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">
                103-107 蓄压：吸引 {avg(band103.map((c) => c.a))} / 衔接{" "}
                {avg(band103.map((c) => c.l))}
              </Text>
              <Text size="small">
                108-120 收束：吸引 {a108} / 衔接 {l108}
              </Text>
              <Text size="small">100-120 整段：吸引 {aAll} / 衔接 {lAll}</Text>
              <Text size="small" tone="tertiary">
                全120章约 8.37 / 8.80
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Callout tone="info" title="卷尾兑现核对">
        兄妹半称回收（114）✓ · 近似改名不稳掌握（117）✓ · 灰门封住留缝（119）✓ ·
        城防局吸纳+编目师候选（120）✓ · 父亲完整真相未透支 ✓
      </Callout>

      <Text tone="tertiary" size="small">
        可选微调（未写入表）：108↓0.1、109↑0.1、114↑0.1、116↓0.1、117↑0.1、119↑0.1、120↓0.1；差均≤0.1，保持现表即可。
      </Text>
    </Stack>
  );
}
