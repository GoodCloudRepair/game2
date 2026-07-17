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
  useHostTheme,
} from "cursor/canvas";

const CHAPTERS = [
  {
    ch: "103",
    title: "封门装置先锁外名",
    attract: 8.6,
    link: 9.0,
    ret: 65,
    load: "中高",
    hi: false,
    risk: true,
    note: "外锁暂压外名，城防外勤代价可视，承接稳定",
    detail:
      "首屏直接接102「先锁外名」；四线外名可视+外勤代价托住。中段「外壳/内名」解释偏功能，章末「活项待口」钩子够硬。",
  },
  {
    ch: "104",
    title: "内名读口不收公章",
    attract: 8.5,
    link: 8.8,
    ret: 64,
    load: "高",
    hi: false,
    risk: true,
    note: "公章退、授权退写清权力边界，略偏冷规则但林照提醒有效",
    detail:
      "连续规则章最冷的一章。公章退/授权退概念爽点明确；林照「别替他们答」是情绪救场。章末「原链人先读」接得住。",
  },
  {
    ch: "105",
    title: "原链人先读",
    attract: 8.8,
    link: 9.1,
    ret: 64,
    load: "中",
    hi: true,
    risk: false,
    note: "同链三节把沈辞不可替代落成结构，主角线强",
    detail:
      "阶段性回答「为什么是他」：共鸣项/活项/样残条缺一不读。情绪压抑但结构兑现强，章末半扇门把父亲线抬到方法层。",
  },
  {
    ch: "106",
    title: "旧句只留半扇门",
    attract: 9.0,
    link: 9.1,
    ret: 63,
    load: "中",
    hi: true,
    risk: false,
    note: "父亲旧句「别替门取新名」高价值回收，章末怪潮入线强",
    detail:
      "段内最高光。记忆点句+修门止痕职业隐喻+外线伤亡压迫同时到位。「怪潮先走旧流程」章末点击欲极强。",
  },
  {
    ch: "107",
    title: "怪潮先走旧流程",
    attract: 8.8,
    link: 9.1,
    ret: 63,
    load: "中",
    hi: true,
    risk: false,
    note: "怪潮回收旧流程，不开新副本，外线角色参与感上升",
    detail:
      "四线旧流程回涌画面好；「请从正确的名字回来」回扣开篇。文昌路站末线安静诱导，卷尾收束感成立。",
  },
];

function avg(nums: number[]) {
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100;
}

export default function Chapters103to107Scores() {
  const theme = useHostTheme();
  const attractAvg = avg(CHAPTERS.map((c) => c.attract));
  const linkAvg = avg(CHAPTERS.map((c) => c.link));

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 980 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            番茄读者抓力分
          </Pill>
          <Pill tone="warning" size="sm">
            103-107 · 封门之夜前奏
          </Pill>
          <Pill tone="neutral" size="sm">
            非文学完成度
          </Pill>
        </Row>
        <H1>第103-107章评分复核</H1>
        <Text tone="secondary">
          口径同`13_番茄读者章节评分.md`：吸引度看前300字、小爽点、规则新鲜度、情绪钩、章末点击欲、信息负担；衔接度看钩子接住、换场顺滑、断章还想点。
        </Text>
        <Text tone="tertiary" size="small">
          复核结论：与现表一致，无需改分。段均吸引 {attractAvg} / 衔接 {linkAvg}，高于全书均（约8.27 / 8.74）。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(attractAvg)} label="段均吸引度" tone="info" />
        <Stat value={String(linkAvg)} label="段均衔接度" tone="success" />
        <Stat value="65→63" label="千人留存变化" />
        <Stat value="3" label="高光章（105-107）" tone="warning" />
      </Grid>

      <Callout tone="info" title="相对102章的位置">
        102（吸引8.9 / 衔接9.1）把救妹代价抬到城市级后，103-104必然偏冷规则铺轨；105起结构兑现与父亲回收把分数拉回高位。这是正常的「高潮前蓄压」，不是掉链。
      </Callout>

      <Divider />

      <Stack gap={12}>
        <H2>逐章评分</H2>
        <Table
          headers={["章", "标题", "吸引", "衔接", "留存", "负担", "标签", "番茄向判断"]}
          columnAlign={["left", "left", "right", "right", "right", "left", "left", "left"]}
          rows={CHAPTERS.map((c) => [
            c.ch,
            c.title,
            String(c.attract),
            String(c.link),
            String(c.ret),
            c.load,
            c.hi ? "高光" : c.risk ? "风险观察" : "正常",
            c.note,
          ])}
          rowTone={CHAPTERS.map((c) =>
            c.risk ? ("warning" as const) : c.hi ? ("success" as const) : undefined,
          )}
        />
      </Stack>

      <Stack gap={10}>
        <H2>评分依据（复核备注）</H2>
        {CHAPTERS.map((c) => (
          <div key={c.ch}>
            <Card>
              <CardHeader
                trailing={
                  <Row gap={6}>
                    <Pill size="sm" tone="info">
                      吸引 {c.attract}
                    </Pill>
                    <Pill size="sm" tone="success">
                      衔接 {c.link}
                    </Pill>
                  </Row>
                }
              >
                {c.ch} · {c.title}
              </CardHeader>
              <CardBody>
                <Text size="small" tone="secondary">
                  {c.detail}
                </Text>
              </CardBody>
            </Card>
          </div>
        ))}
      </Stack>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader trailing={<Pill tone="success" size="sm">保住</Pill>}>
            段内优势
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· 章章接钩，衔接整体 8.8+</Text>
              <Text size="small">· 106「别替门取新名」记忆点强</Text>
              <Text size="small">· 107 回扣开篇文昌路站，卷尾感成立</Text>
              <Text size="small">· 外线角色（林照/杜衡）开始真正参战</Text>
              <Text size="small">· 不开新副本，回收旧流程，符合卷尾禁区</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="warning" size="sm">盯住</Pill>}>
            风险与下步
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· 103-104 连续规则铺轨，泛读可能嫌冷</Text>
              <Text size="small">· 现表已标风险：108起必须加外线动作/伤亡</Text>
              <Text size="small">· 文昌路站「回来」诱导已埋，109 不能只讲规则</Text>
              <Text size="small">· 留存 66→63，深读者仍在，跌幅正常</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Callout tone="warning" title="对108的写作提示（来自评分系统风险摘要）">
        封门装置与内名读口连续偏规则后，下一章优先加强外线动作、伤亡和文昌路站现实压迫，避免再连写两章纯读牌。
      </Callout>

      <Text tone="tertiary" size="small">
        源文件：`全球迷雾：我能校正万物词条/13_番茄读者章节评分.md` · 复核日期 2026-07-17 ·
        分值未改动
      </Text>
    </Stack>
  );
}
