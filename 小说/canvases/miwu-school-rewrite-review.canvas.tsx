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

const ROWS = [
  {
    ch: "046",
    plan: "尾字卡转角",
    status: "到位",
    tone: "success" as const,
    note: "陈姓半截卡楼梯；悟「只带姓牌」",
  },
  {
    ch: "047",
    plan: "白线切林照",
    status: "到位",
    tone: "success" as const,
    note: "脚下白线先切；外窗跟线",
  },
  {
    ch: "050",
    plan: "半人身体感",
    status: "到位",
    tone: "success" as const,
    note: "指温/影子半拍/肩被抽；小高潮立住",
  },
  {
    ch: "051-053",
    plan: "压解释保核",
    status: "大半到位",
    tone: "info" as const,
    note: "动作与知微反应够；051/053仍有规则句偏密",
  },
  {
    ch: "055",
    plan: "东回廊走起来",
    status: "到位",
    tone: "success" as const,
    note: "接夹上路；林照外窗挡偏头",
  },
  {
    ch: "056",
    plan: "回头诱导+走",
    status: "到位",
    tone: "success" as const,
    note: "知微声诱导；林照重敲掐回头；鞋尖退件残痕",
  },
  {
    ch: "057",
    plan: "并件口实体",
    status: "到位",
    tone: "success" as const,
    note: "竹夹撕袖保留；何字误并对照",
  },
  {
    ch: "058",
    plan: "拉知微半寸",
    status: "偏题",
    tone: "warning" as const,
    note: "现为来处单拨半寸/没被并上；未见知微外拉半寸",
  },
];

export default function SchoolRewriteReview() {
  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 960 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            改后复读
          </Pill>
          <Pill tone="success" size="sm">
            046-057 主改点落地
          </Pill>
          <Pill tone="warning" size="sm">
            058 与约定有偏差
          </Pill>
        </Row>
        <H1>学校段改后核对（046-058）</H1>
        <Text tone="secondary">
          对照约定：危险先行、林照被迫分开、050小高潮、称呼压解释、东回廊动作段、058兄妹半寸小胜。
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat value="6/8" label="完全按约定落地" tone="success" />
        <Stat value="1" label="大半到位" tone="info" />
        <Stat value="1" label="需补（058）" tone="warning" />
      </Grid>

      <Callout tone="success" title="总判：这轮改成功，谷底模具已被打断">
        046/047/050/055-057 达到「先看见危险再懂规则」。学校最长连冷带的核心问题（站着读牌）已基本拆掉。
      </Callout>

      <Divider />

      <Table
        headers={["章", "约定改点", "状态", "核对"]}
        rows={ROWS.map((r) => [r.ch, r.plan, r.status, r.note])}
        rowTone={ROWS.map((r) => r.tone)}
      />

      <H2>唯一明显缺口：058</H2>
      <Text size="small">
        约定是：空夹/旧触/半称把知微位置往外拉半寸（可逆小胜）。
        现章高潮是「来处单往外拨半寸 + 没被并上」——小胜有，但对象是流程格，不是知微。
        情绪奖励仍偏弱于约定；建议补一刀可见的知微反应（灰扣浅白外移半寸/指温回一点），并写明会缩回去。
      </Text>

      <H2>次要余量</H2>
      <Stack gap={6}>
        <Text size="small">051–053：核心「旧称不能自报」清楚，但中间仍有挂牌说明句；若再压，只削解释不削样例声响。</Text>
        <Text size="small">056：诱导与掐回头够强；「旁人当场回头变退件」样例仍偏残痕（鞋尖），可接受。</Text>
        <Text size="small">未新增规则名堆叠：合格。</Text>
      </Stack>

      <Callout tone="info" title="建议下一步">
        只补058知微半寸小胜即可收口；其余先复读体感，勿再整段重写。改完可重评046-058段均吸引。
      </Callout>

      <Text tone="tertiary" size="small">
        复读：正文046-058 · 2026-07-17
      </Text>
    </Stack>
  );
}
