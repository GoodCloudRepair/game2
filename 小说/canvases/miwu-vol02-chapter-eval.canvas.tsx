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
  UsageBar,
} from "cursor/canvas";

const WRITTEN = [
  { ch: "121", title: "临时证不准过夜", a: 8.9, l: 9.2, ret: 54, tag: "开篇", note: "候选字+监测半径，换卷立住" },
  { ch: "122", title: "评估不测能力只测反读", a: 9.1, l: 9.2, ret: 53, tag: "高光", note: "官方也怕；调度污染；HL-02双钩" },
  { ch: "123", title: "候选字不归城防印", a: 8.9, l: 9.1, ret: 52, tag: "正常", note: "印盖不上/黑箱写不进；文修半页到位" },
  { ch: "124", title: "灰痕先认第二新号", a: 8.9, l: 9.1, ret: 51, tag: "正常", note: "两下按腕+灰痕先应；安置区待调" },
  { ch: "125", title: "同名替换先改编制表", a: 9.0, l: 9.1, ret: 50, tag: "高光", note: "编制失名小高潮；文修红章克制" },
  { ch: "126", title: "安置名单不收本人签", a: 8.8, l: 9.0, ret: 49, tag: "观察", note: "签名固化错名好；手续感略升" },
  { ch: "127", title: "床位号先替亲属答", a: 8.9, l: 9.1, ret: 48, tag: "正常", note: "与126差异够；十七床同步；复核截取钩" },
  { ch: "128", title: "复核通道截走半页报告", a: 9.0, l: 9.2, ret: 47, tag: "高光", note: "抽空半页可视；截路径非结果；文修核验口钩" },
];

const NEXT = [
  { ch: "129", focus: "文修前声同源", watch: "少开会，优先核验口现场" },
  { ch: "130", focus: "旧签码半格收束", watch: "亲属登记室任务单" },
];

function avg(nums: number[]) {
  return Math.round((nums.reduce((s, n) => s + n, 0) / nums.length) * 100) / 100;
}

export default function Volume2ChapterEvalV2() {
  const aAvg = avg(WRITTEN.map((c) => c.a));
  const lAvg = avg(WRITTEN.map((c) => c.l));

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1040 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            番茄读者抓力分
          </Pill>
          <Pill tone="warning" size="sm">
            卷02 · 已写121-127
          </Pill>
          <Pill tone="success" size="sm">
            开篇段均 {aAvg}
          </Pill>
        </Row>
        <H1>卷二章节评估（刷新）</H1>
        <Text tone="secondary">
          相对上次只评到122：现已写满开篇五章+安置区两章。口径同`13_番茄读者章节评分.md`。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(aAvg)} label="121-127 均吸引" tone="info" />
        <Stat value={String(lAvg)} label="121-127 均衔接" tone="success" />
        <Stat value="54→48" label="千人留存模型" />
        <Stat value="7/120" label="卷二进度" tone="warning" />
      </Grid>

      <UsageBar
        total={10}
        topLeftLabel={`段均吸引 ${aAvg}`}
        topRightLabel="目标开篇≥8.8"
        segments={[{ id: "a", value: aAvg, color: "blue" }]}
      />

      <Callout tone="success" title="总判：开篇段达标，换卷特色已打出">
        121-125 完成「体制框人→官方也怕→候选非城防→灰痕敏感→编制失名」五连，功能清晰。
        125 小高潮成立且父亲钩克制。126-127 进入安置手续，概念仍新，但开始接近规则密度警戒线。
      </Callout>

      <Divider />

      <Stack gap={12}>
        <H2>已写逐章评分</H2>
        <Table
          headers={["章", "标题", "吸引", "衔接", "留存", "标签", "判断"]}
          columnAlign={["left", "left", "right", "right", "right", "left", "left"]}
          rows={WRITTEN.map((c) => [
            c.ch,
            c.title,
            String(c.a),
            String(c.l),
            String(c.ret),
            c.tag,
            c.note,
          ])}
          rowTone={WRITTEN.map((c) =>
            c.tag === "高光"
              ? ("success" as const)
              : c.tag === "观察"
                ? ("warning" as const)
                : undefined,
          )}
        />
      </Stack>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>段内最强</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">122 · 反读评估 / 不稳定变量（9.1）</Text>
              <Text size="small">125 · 编制表同名替换小高潮（9.0）</Text>
              <Text size="small">121 · 换卷冷启动（8.9）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>需要盯</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">126 · 签名手续后，若128再「纸面截取」易连冷</Text>
              <Text size="small">127 已用床位差异托住；128要用截取动作+半页物证</Text>
              <Text size="small">连续识名代价（耳血）别写成无感背景</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Stack gap={12}>
        <H2>123-127 速评</H2>
        <Stack gap={8}>
          <Text size="small">
            <Text weight="semibold">123</Text>
            {" "}系统失败动作化基本做到（印/黑箱/耳鸣感），半页文修附注收得住；中段对峙略长但不像纯会议。
          </Text>
          <Text size="small">
            <Text weight="semibold">124</Text>
            {" "}兄妹疼感回补必要；灰痕先于设备认号很准；开篇从评估室走回医疗略过渡，后半抬回来。
          </Text>
          <Text size="small">
            <Text weight="semibold">125</Text>
            {" "}卷二特色落地：管理名被替换。文修红章未炸父亲签码，正确。章末床位号报错自然接126。
          </Text>
          <Text size="small">
            <Text weight="semibold">126</Text>
            {" "}「本人签固化错名」脑洞强；死人进亲属栏狠。手续线开始密，是段内相对最冷。
          </Text>
          <Text size="small">
            <Text weight="semibold">127</Text>
            {" "}床位载体与签名口做出差异；十七床↔白床同步有情绪；复核截取钩给128。
          </Text>
        </Stack>
      </Stack>

      <Stack gap={12}>
        <H2>下三章提醒</H2>
        <Table
          headers={["章", "应推进", "防什么"]}
          rows={NEXT.map((n) => [n.ch, n.focus, n.watch])}
        />
      </Stack>

      <Callout tone="warning" title="128写前一句话">
        安置区手续已连写两章。128若再纯「截报告」，读者会觉得还在填表。优先：截取可见（纸被抽走/通道亮红）、半页旧标注贴脸、少开解释会。
      </Callout>

      <Text tone="tertiary" size="small">
        评估：正文121-127 · 2026-07-17 刷新 · 建议同步13_番茄读者章节评分.md
      </Text>
    </Stack>
  );
}
