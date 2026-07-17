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

const VOL2 = [
  { ch: "120", a: 9.0, ret: 55, drop: "—" },
  { ch: "121", a: 8.9, ret: 54, drop: "-1" },
  { ch: "122", a: 9.1, ret: 53, drop: "-1" },
  { ch: "125", a: 9.0, ret: 50, drop: "…" },
  { ch: "126", a: 8.8, ret: 49, drop: "-1" },
  { ch: "128", a: 9.0, ret: 47, drop: "…" },
  { ch: "130", a: 9.0, ret: 45, drop: "…" },
  { ch: "132", a: 8.9, ret: 43, drop: "…" },
  { ch: "133", a: 9.1, ret: 42, drop: "-1" },
];

export default function RetentionVsScoreExplain() {
  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 920 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info" size="sm">
            口径澄清
          </Pill>
          <Pill tone="warning" size="sm">
            章分 ≠ 千人留存
          </Pill>
        </Row>
        <H1>为什么分不掉，人还在掉？</H1>
        <Text tone="secondary">
          吸引/衔接是「这一章好不好追」；千人留存是「从第1章起累计还剩多少人」。两套数，别混看。
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat value="8.98" label="129-133 均吸引" tone="success" />
        <Stat value="9.16" label="129-133 均衔接" tone="success" />
        <Stat value="55→42" label="120→133 千人模型" tone="warning" />
      </Grid>

      <Callout tone="success" title="结论：最近五章章分没有掉">
        129-133 吸引都在 8.9–9.1，高于卷一均分 8.42，也高于学校谷底段。掉的是「从开书累计的人数」，不是「这一章变差了」。
      </Callout>

      <Divider />

      <H2>两套指标分别看什么</H2>
      <Table
        headers={["指标", "含义", "会不会一直降", "怎么改善"]}
        rows={[
          [
            "吸引/衔接",
            "单章抓力与接钩",
            "可以升可以降",
            "改本章结构、钩子、密度",
          ],
          [
            "千人留存",
            "1000人读完第1章后，读到本章还剩几人",
            "正常几乎只降（漏斗）",
            "降速变慢＝健康；想抬绝对值只能靠开篇/中段大改",
          ],
        ]}
      />

      <H2>为什么高分章仍会掉人</H2>
      <Stack gap={8}>
        <Text size="small">
          1. 漏斗定律：每章都会筛一点人（疲劳、断更习惯、平台推荐切走）。9.0
          分只表示「掉得少」，不是「零流失」。
        </Text>
        <Text size="small">
          2. 基数已薄：到 120 只剩约 55/1000。后面每章掉 1
          人，看起来「还在掉」，相对流失率其实很低（约 2%/章）。
        </Text>
        <Text size="small">
          3. 前期伤口不可逆：学校段 039-067
          已把泛读滤掉大半；卷二再高分，也接不回那些人。
        </Text>
        <Text size="small">
          4. 卷二题材筛选：体制/手续/失名会再筛一层爽文读者——章分高≠题材合口。
        </Text>
      </Stack>

      <H2>卷二：分稳、人缓降</H2>
      <Table
        headers={["章", "吸引", "千人剩", "章掉"]}
        columnAlign={["left", "right", "right", "right"]}
        rows={VOL2.map((r) => [r.ch, String(r.a), String(r.ret), r.drop])}
      />
      <Text tone="tertiary" size="small">
        120→133：13 章掉 13 人，约 1
        人/章。对照学校长谷底是「分也掉 + 人掉得更快」。当前是健康缓降。
      </Text>

      <Callout tone="info" title="什么时候才算真的「掉评分」">
        吸引连续跌到 ≤8.5，或出现 8.3
        以下冷章，才叫章分掉。126/132 是观察点（手续密），不是崩盘。
      </Callout>

      <H2>若目标是「少掉人」看什么</H2>
      <Stack gap={6}>
        <Text size="small">看章流失率，别看绝对人数：目标约 ≤2%/章（深读段）。</Text>
        <Text size="small">每 5–10 章给一次人险/关系兑现，打断纯手续连写。</Text>
        <Text size="small">绝对留存要从开篇/学校段改；卷二只能「护住剩余真爱粉」。</Text>
      </Stack>

      <Text tone="tertiary" size="small">
        模型说明：千人留存为试点中位数，非后台实数，可按 ±15% 看波动。
      </Text>
    </Stack>
  );
}
