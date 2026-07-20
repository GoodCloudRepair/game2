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

const COLD = [
  { ch: "051", a: 7.6, status: "已微改仍冷", action: "前300字先给知微动作/危险，再放周姓示范；自报示范压到1次" },
  { ch: "056", a: 7.7, status: "未改·优先", action: "开篇即退件实体代价；回头=退件用旁人样例当场演一次" },
  { ch: "052", a: 7.7, status: "已微改仍冷", action: "外格推进改成侧窗半秒险，少半页读牌" },
  { ch: "055", a: 7.8, status: "未改·优先", action: "空夹启动+知微屋内轻响同屏；补「接夹=入局」身体反应" },
  { ch: "063", a: 7.8, status: "偏规则账", action: "认出哥字靠折痕动作，不靠念规则；林照只留一句制动" },
  { ch: "049", a: 7.8, status: "已补小胜", action: "保持；若再改只加知微指尖反馈，不加新规则" },
  { ch: "053", a: 7.8, status: "爽感一般", action: "借声挂存改成可听见/可看见的失败瞬间" },
  { ch: "041", a: 7.9, status: "流程感", action: "进教楼前3屏先给知微踩列选择，再解释铃声" },
];

const BATCH = [
  {
    batch: "A · 必改4章",
    impact: "最高",
    chapters: "055 / 056 / 051 / 052",
    goal: "把谷底从7.6-7.8抬到约8.1+",
    why: "未改或仍冷，且落在学校最长同构带中心，掉读最狠",
  },
  {
    batch: "B · 次改3章",
    impact: "高",
    chapters: "053 / 063 / 041",
    goal: "切断「读牌→读牌」连击",
    why: "功能正确但情绪钩弱，改成本低",
  },
  {
    batch: "C · 观察不重写",
    impact: "中",
    chapters: "043-044 / 046-050 / 054 / 057-058",
    goal: "复读体感，忌再堆规则名",
    why: "已多轮实体险/微校正，再改易越改越密",
  },
  {
    batch: "D · 高光勿动",
    impact: "-",
    chapters: "045 / 065 / 067（及064）",
    goal: "只做去AI感与声线",
    why: "段内追读锚点，大改会伤留存",
  },
];

const PRINCIPLES = [
  {
    title: "1. 每2-3冷章必有一次「人的反应」",
    body: "知微主动留痕、林照外窗救一手、沈辞失控边缘。规则可以冷，人不能连续三章只当读牌机。",
  },
  {
    title: "2. 先演代价，后挂牌子",
    body: "番茄读者先看见「有人被退件/被抽脚/被撕袖」，再接受规则句。现有好改法（054/057）要复制到055/056。",
  },
  {
    title: "3. 禁止新增规则名",
    body: "039-067信息密度已爆。精修只替换承载方式：物证、身体、旁人样例、半秒险。",
  },
  {
    title: "4. 章内目标一句话写死",
    body: "开篇3屏内让读者知道「这一章要拦什么坏事」。功能过渡章（046/055）最容易丢这个。",
  },
  {
    title: "5. 情绪奖励提前，别全堆065",
    body: "065/067很强，但前面太长。051-056之间至少再加一次可见小胜或兄妹半同步（动作级，不认亲）。",
  },
];

export default function SchoolRetentionPlan() {
  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1000 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="warning" size="sm">
            039-067 回澜中学
          </Pill>
          <Pill tone="info" size="sm">
            留存抬升方案
          </Pill>
          <Pill tone="neutral" size="sm">
            不改卷目标
          </Pill>
        </Row>
        <H1>学校段怎么改才能少掉读</H1>
        <Text tone="secondary">
          问题不是断钩，是29章连续换关。留存从039约176人掉到067约107人（约-40%剩余读者）。
          目标：段均吸引从8.09抬向8.3+，谷底章不低于8.0。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="8.09" label="段均吸引（全卷最低）" tone="warning" />
        <Stat value="176→107" label="039→067 留存" tone="danger" />
        <Stat value="7.6" label="谷底051" tone="danger" />
        <Stat value="9.1" label="段内峰值065" tone="success" />
      </Grid>

      <UsageBar
        total={29}
        topLeftLabel="已改过仍可复读"
        topRightLabel="约14章已动刀 / 29"
        segments={[
          { id: "done", value: 14, color: "green" },
          { id: "todo", value: 8, color: "orange" },
          { id: "ok", value: 7, color: "blue" },
        ]}
      />

      <Callout tone="warning" title="核心原则：少加规则，多加代价与人">
        学校线剧情连续、结构正确，番茄掉读来自「读完一关又是一关」。
        改法应对标054/057的成功路径——实体险、旁人样例、知微/林照半拍反应——而不是再发明新流程名。
      </Callout>

      <Divider />

      <Stack gap={12}>
        <H2>改文五原则</H2>
        <Grid columns={1} gap={8}>
          {PRINCIPLES.map((p) => (
            <div key={p.title}>
              <Card>
                <CardBody style={{ padding: 12 }}>
                  <Text weight="semibold" size="small">
                    {p.title}
                  </Text>
                  <Text size="small" tone="secondary">
                    {p.body}
                  </Text>
                </CardBody>
              </Card>
            </div>
          ))}
        </Grid>
      </Stack>

      <Stack gap={12}>
        <H2>分批优先级</H2>
        <Table
          headers={["批次", "影响", "章次", "目标", "原因"]}
          rows={BATCH.map((b) => [b.batch, b.impact, b.chapters, b.goal, b.why])}
          rowTone={["warning", "info", undefined, "success"]}
        />
      </Stack>

      <Stack gap={12}>
        <H2>冷章逐条改法（可直接开改）</H2>
        <Table
          headers={["章", "吸引", "状态", "具体改法"]}
          columnAlign={["left", "right", "left", "left"]}
          rows={COLD.map((c) => [c.ch, String(c.a), c.status, c.action])}
          rowTone={COLD.map((c) =>
            c.status.includes("优先") || c.a <= 7.7
              ? ("warning" as const)
              : undefined,
          )}
        />
      </Stack>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>055 外应先走东回廊 · 样例改法</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· 开篇不要先铺白单，先让空黑夹自己撞窗框</Text>
              <Text size="small">· 同屏：知微旧名室内一声轻响（不能回头）</Text>
              <Text size="small">· 沈辞接夹前手抖/耳血一线，明确「接了就回不去」</Text>
              <Text size="small">· 删掉重复解释「外应是什么」，用林照一句「别接平」代替</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>056 回头的人算退件 · 样例改法</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· 前300字：旁人回头一瞬，当场被夹成退件拖走</Text>
              <Text size="small">· 「退件」不要靠沈辞内心长解，靠可见残件外形</Text>
              <Text size="small">· 林照分手走外窗时给伤口/玻璃划痕代价</Text>
              <Text size="small">· 章末钩子保持单向廊，但加「夹已走到第一拐」紧迫感</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Callout tone="info" title="预期效果（模型口径）">
        若A批4章各抬约+0.4吸引，并在051-056插入1次兄妹半同步小胜：段均有望到~8.25，
        067节点留存有机会从107抬到约115-120（仍远低于开篇，但能少杀一批泛读）。
        不要指望学校段追上108-120；目标是「少掉」，不是「变高光带」。
      </Callout>

      <Callout tone="danger" title="明确不要做">
        · 合并删章重写整段（伤结构与伏笔）· 提前兄妹重逢/认亲 · 新增大型支线/新角色 ·
        再发明一套「核称/并格」新名词 · 把065高光前移导致后段空
      </Callout>

      <Text tone="tertiary" size="small">
        依据：13_番茄读者章节评分 · 046-058风险摘要 · 思维笔记C21-C58学校写法约束
      </Text>
    </Stack>
  );
}
