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

/** 精彩=番茄吸引；衔接=钩子接住；AI感越高越像模板（越差） */
const ROWS = [
  { ch: "046", title: "上楼只带姓牌", j: 8.5, l: 8.8, ai: 5.5, dJ: "+0.6", dL: "+0.5", note: "转角卡人立住" },
  { ch: "047", title: "待尾区不收并肩人", j: 8.4, l: 8.7, ai: 5.0, dJ: "+0.3", dL: "+0.3", note: "白线切林照" },
  { ch: "048", title: "沈姓先核旧位", j: 8.0, l: 8.5, ai: 5.5, dJ: "0", dL: "0", note: "本轮改动少" },
  { ch: "049", title: "不要替十七排旧位", j: 7.9, l: 8.3, ai: 5.5, dJ: "+0.1", dL: "+0.1", note: "小胜仍偏轻" },
  { ch: "050", title: "旧名室先收半个人", j: 8.8, l: 8.9, ai: 5.5, dJ: "+0.3", dL: "+0.2", note: "段内小高潮" },
  { ch: "051", title: "旧称不收自己报", j: 8.0, l: 8.3, ai: 6.0, dJ: "+0.4", dL: "+0.3", note: "仍偏挂牌" },
  { ch: "052", title: "门外称先挂外格", j: 8.1, l: 8.4, ai: 5.8, dJ: "+0.4", dL: "+0.3", note: "侧窗险有效" },
  { ch: "053", title: "主称不能借别人叫", j: 8.0, l: 8.4, ai: 6.0, dJ: "+0.2", dL: "+0.2", note: "样例声响够" },
  { ch: "054", title: "并来源前不翻沈字", j: 8.4, l: 8.7, ai: 5.0, dJ: "+0.1", dL: "+0.1", note: "抽脚险保持" },
  { ch: "055", title: "外应先走东回廊", j: 8.3, l: 8.8, ai: 4.5, dJ: "+0.5", dL: "+0.7", note: "走起来了" },
  { ch: "056", title: "回头的人算退件", j: 8.4, l: 8.9, ai: 4.5, dJ: "+0.7", dL: "+0.9", note: "抬幅最大" },
  { ch: "057", title: "空夹先过人后贴线", j: 8.5, l: 9.0, ai: 4.5, dJ: "+0.3", dL: "+0.6", note: "撕袖+误并" },
  { ch: "058", title: "候并不站本位", j: 8.6, l: 9.0, ai: 4.8, dJ: "+0.5", dL: "+0.7", note: "知微半寸已补" },
];

function avg(nums: number[]) {
  return Math.round((nums.reduce((s, n) => s + n, 0) / nums.length) * 100) / 100;
}

export default function School046058TripleScore() {
  const jAvg = avg(ROWS.map((r) => r.j));
  const lAvg = avg(ROWS.map((r) => r.l));
  const aiAvg = avg(ROWS.map((r) => r.ai));

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1040 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            改后三维度
          </Pill>
          <Pill tone="success" size="sm">
            046-058
          </Pill>
        </Row>
        <H1>学校精修段 · 衔接 / 精彩 / AI感</H1>
        <Text tone="secondary">
          精彩≈番茄吸引抓力（越高越好）。衔接=钩子接住（越高越好）。AI感=模板同构感（越高越像AI，越差）。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(jAvg)} label="均精彩（旧≈7.96）" tone="success" />
        <Stat value={String(lAvg)} label="均衔接（旧≈8.29）" tone="success" />
        <Stat value={String(aiAvg)} label="均AI感（越低越好）" tone="warning" />
        <Stat value="+0.3~0.4" label="精彩/衔接抬幅" tone="info" />
      </Grid>

      <Callout tone="success" title="总判：精彩与衔接明显抬升；AI感东回廊段最好">
        056/055/058 抬幅最大。051-053 仍是三维度里最弱（精彩刚过8、AI感偏高）。058
        知微半寸补上后，衔接接059很稳。
      </Callout>

      <Divider />

      <Table
        headers={["章", "标题", "精彩", "衔接", "AI感", "精彩Δ", "衔接Δ", "判断"]}
        columnAlign={[
          "left",
          "left",
          "right",
          "right",
          "right",
          "right",
          "right",
          "left",
        ]}
        rows={ROWS.map((r) => [
          r.ch,
          r.title,
          String(r.j),
          String(r.l),
          String(r.ai),
          r.dJ,
          r.dL,
          r.note,
        ])}
        rowTone={ROWS.map((r) =>
          r.j >= 8.5
            ? ("success" as const)
            : r.ai >= 5.8
              ? ("warning" as const)
              : undefined,
        )}
      />

      <Grid columns={2} gap={12}>
        <Stack gap={8}>
          <H2>高光</H2>
          <Text size="small">050 半人身体感（精彩8.8）</Text>
          <Text size="small">056 回头诱导（精彩+0.7 / 衔接+0.9）</Text>
          <Text size="small">057–058 候并链（衔接9.0）</Text>
        </Stack>
        <Stack gap={8}>
          <H2>仍偏AI / 偏冷</H2>
          <Text size="small">051–053：挂牌说明句多，AI感6.0档</Text>
          <Text size="small">046/050：画面强，但「不是/更像」句式仍密</Text>
          <Text size="small">049：小胜在，抓力仍段内偏低</Text>
        </Stack>
      </Grid>

      <Callout tone="info" title="口径备忘">
        AI感不是「是不是AI写的」，是读者体感：短句流水线、不是/而是、脸色变了、系统亮字连拍。东回廊「走起来」后AI感降到4.5，说明动作化有效。
      </Callout>

      <Text tone="tertiary" size="small">
        评估：改后046-058 · 2026-07-17 · 已回填吸引/衔接至评分表
      </Text>
    </Stack>
  );
}
