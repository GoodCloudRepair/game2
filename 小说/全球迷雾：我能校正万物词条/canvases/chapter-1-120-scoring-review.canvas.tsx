import {
  Card, CardHeader, CardBody,
  Grid, Row, Stack,
  H1, H2, H3, Text, Code,
  Table, Stat, Pill,
  Divider,
  useHostTheme,
} from "cursor/canvas";

// ── 卷01 arcs (1-120) ──

const arcs = [
  { range: "001-005", name: "开篇·第一次词条", chs: 5, appeal: 8.58, cohesion: 9.00, retention: 512, burden: 5.4, ai: 3.8, satisfaction: 7.0, verdict: "高开" },
  { range: "006-010", name: "雾气蔓延·编目师", chs: 5, appeal: 8.36, cohesion: 8.82, retention: 360, burden: 5.4, ai: 4.2, satisfaction: 6.0, verdict: "稳定" },
  { range: "011-020", name: "医院·十七号揭秘", chs: 10, appeal: 8.17, cohesion: 8.73, retention: 287, burden: 5.6, ai: 5.1, satisfaction: 5.7, verdict: "稳中有压" },
  { range: "021-030", name: "医院深处·旧城过渡", chs: 10, appeal: 8.22, cohesion: 8.75, retention: 227, burden: 5.4, ai: 4.5, satisfaction: 5.9, verdict: "稳盘" },
  { range: "031-045", name: "学校·补名体系", chs: 15, appeal: 8.15, cohesion: 8.62, retention: 179, burden: 6.7, ai: 4.9, satisfaction: 5.2, verdict: "负担上升" },
  { range: "046-060", name: "学校深处·旧名室走廊", chs: 15, appeal: 8.34, cohesion: 8.84, retention: 128, burden: 8.0, ai: 5.1, satisfaction: 5.4, verdict: "高密度" },
  { range: "061-075", name: "来源柜·校时伏笔", chs: 15, appeal: 8.57, cohesion: 9.09, retention: 97, burden: 7.7, ai: 4.6, satisfaction: 6.8, verdict: "情绪爆发" },
  { range: "076-090", name: "文修回流·前沿廊", chs: 15, appeal: 8.89, cohesion: 9.23, retention: 54, burden: 8.2, ai: 4.5, satisfaction: 7.9, verdict: "全卷高潮" },
  { range: "091-100", name: "入核·半称相认", chs: 10, appeal: 8.98, cohesion: 9.27, retention: 36, burden: 8.2, ai: 4.4, satisfaction: 8.1, verdict: "情感巅峰" },
  { range: "101-110", name: "偏环·真门名倒写", chs: 10, appeal: 9.05, cohesion: 9.26, retention: 26, burden: 7.9, ai: 4.5, satisfaction: 7.5, verdict: "代价升级" },
  { range: "111-120", name: "灰潮·锁门·卷二开场", chs: 10, appeal: 9.06, cohesion: 9.23, retention: 17, burden: 7.5, ai: 4.5, satisfaction: 7.8, verdict: "收束有力" },
];

// High-point chapters with good/bad
const highlights = [
  { ch: 1, title: "没有编号的档案", star: true, appeal: 9.0, satisfaction: 9.0, ai: 2.8,
    good: "首句念妹名即定调+旧录音三悬念叠加+章末转录机自亮父旧声三重压→全书最纯好奇驱动；三线并进(旧录音+妹妹+父遗言)无一浪费",
    bad: "作为开章唯一的'演示'是编号设定本身——需要读者先接受'失名'概念，但对开章而言完全可接受" },
  { ch: 4, title: "第一个词条", star: true, appeal: 8.9, satisfaction: 8.0, ai: 2.8,
    good: "怪物'回家'女认夫触发攻击→首见词条纯行动展示无UI→耳血代价即时落地→月票夹情感奖励→克制的'编目'提示→完美能力初显章",
    bad: "唯一可挑剔的是程越许晴稍显功能化出场，但这在开篇铺垫阶段是必要的" },
  { ch: 64, title: "联络单先核谁来接", star: false, appeal: 8.5, satisfaction: 7.5, ai: 4.8, cohesion: 9.3,
    good: "三章兄称三证(家录→校纸→联单)高密度收束→'哥'在多张联单出现已被系统认作真实→至暗处长线回收",
    bad: "联单翻阅段略偏信息陈列，需要读者自行连接前三章的分散线索" },
  { ch: 65, title: "回听格只放她认的称", star: true, appeal: 9.0, satisfaction: 8.0, ai: 4.0, cohesion: 9.8,
    good: "灰盒三段录音(完整姓名无应→编号无应→呼吸+压低的'哥')全感官→全书情感最真瞬间→林照'别接'截停克制",
    bad: "概念(回听格/误应作错向/全句不留只存有应/外称牵引)在情感冲击下容易被略过但读者若注意则负担略升" },
  { ch: 77, title: "回流件不走民用修复单", star: true, appeal: 9.0, satisfaction: 8.5, ai: 4.5,
    good: "三线合并(回流件+民修口+挂单去向)→沈辞专业判断(热封口补刀/民修口套日常)→杜衡'三根线并到一起'收束干净→从未登记→协查→随行地位阶梯上升",
    bad: "概念负载中高(文修回流件/民用修复单/申请签码/旧档间)需前文积累" },
  { ch: 84, title: "样带系不作单独档", star: true, appeal: 9.2, satisfaction: 8.0, ai: 4.5,
    good: "顾焰不挂实验教学法(先毁再复原)极有力→样带和17号互为钩子→沈辞在修复中心接到的盘就是给知微配的→恶意深但确认更强",
    bad: "样带系/观察号/挂带一条并多退系等概念需要读者跟踪实验全程，注意力集中要求高" },
  { ch: 91, title: "入核口不收完整人", star: true, appeal: 9.2, satisfaction: 8.8, ai: 4.5, cohesion: 9.8,
    good: "核心逆转：不完整从劣势变优势→'还没写完的人更好进'→全书最爽规则翻转→摘签退痕身份剥离全动作→宁少不可满",
    bad: "入核口/完整旧称退回外窗/活-在等概念在翻转瞬间抛出，读者可能需回看确认" },
  { ch: 99, title: "静名槽不放完整亲称", star: true, appeal: 9.2, satisfaction: 8.5, ai: 4.0,
    good: "'哥'念头即退+沈辞想'小微'名全脸又退→挖出半称'小…'停顿用指节停+气息压残拍→知微以前嫌'小微'土+求他时先放'小'再吞半截全身体记忆→系统隔开兄妹用极窄方式重新触到对方",
    bad: "几无短板；唯一可提是静名槽/完整亲称退/意满退等概念层在极高情感冲击下容易被忽视" },
  { ch: 114, title: "她先认出半个称", star: true, appeal: 9.3, satisfaction: 9.0, ai: 4.0,
    good: "全书最温情：知微主动推浅白=她先认出不是被刺激反应的残响→沈辞'我不说满'→顾焰复放被退'不可复制主动性'→她用半个称认出他+他用不碰接住→一尺之隔→9.0",
    bad: "几无短板；仅有的半称前痕/动亲退等概念在情感中自然消化" },
  { ch: 117, title: "近似改名不作稳定能力", star: true, appeal: 9.0, satisfaction: 8.5, ai: 4.5,
    good: "近似改名一息燃尽→能借力不能握住→四齿咬合+外锁全卡→真门旧边四字终结卷01→父亲'不争新名'克制",
    bad: "黑箱拆条件(缺源位/缺读口/不可拆/不可预置/不可单人复现)偏技术项，但终结位置可以接受" },
  { ch: 120, title: "城防局递来临时证", star: true, appeal: 9.0, satisfaction: 8.1, ai: 4.0,
    good: "卷01终结+卷二开场：知微活/敲两下回蜷指→临时证监管借用/编目师候选钩子→杜衡'保护你'→顾焰复核标记暂不撤→多重权力关系在收尾铺开",
    bad: "临时证/监管借用/不得离开封控区/正名迟钝/异常能力评估五个新概念同时引入，但作为卷末过渡可以接受" },
];

// Risk chapters with specific problems
const risks = [
  { ch: 16, title: "被提送前不要说话", appeal: 7.9, satisfaction: 4.3, ai: 6.6, burden: 7.0,
    problem: "规则硬但流程感重，医院中转段连续三章(15-17)观众开始疲劳" },
  { ch: 17, title: "推床的人不看脸", appeal: 7.8, satisfaction: 4.1, ai: 6.3, burden: 7.0,
    problem: "中转章偏冷，靠知微留言托住情绪但无大破局，医院后半段最低谷" },
  { ch: 27, title: "不要替别人答到", appeal: 7.8, satisfaction: 4.3, ai: 6.6, burden: 7.0,
    problem: "暂泊点秩序清楚但场景偏功能——进入新区域的规则介绍章，推情节>给情绪" },
  { ch: 41, title: "缺考的人先补名字", appeal: 7.9, satisfaction: 4.3, ai: 6.3, burden: 7.0,
    problem: "补名室规则清楚但偏流程，学校补名体系中间章的同构疲劳开始显现" },
  { ch: 43, title: "先写姓不补后字", appeal: 7.9, satisfaction: 4.4, ai: 4.3, burden: 7.0,
    problem: "已压缩连续示范并补知微小动作，但同构疲劳仍存在——三章后(45)才被兄妹线提神" },
  { ch: 126, title: "安置名单不收本人签", appeal: 7.8, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "签名纸自改+本人签固化错名有设定味，但整章偏签名流程推演——卷二开篇制度拆解已露疲态" },
  { ch: 136, title: "岗位名先改值守表", appeal: 7.5, satisfaction: 3.5, ai: 6.5, burden: 9.0,
    problem: "全章体制互咬无主角空间，连续手续摊牌(岗位名→值守表→胸牌→体系攻击)" },
];

export default function Canvas() {
  const { tokens } = useHostTheme();
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
        <H1>第001–120章评分分析 — 优劣总览</H1>
        <Text style={{ color: muted, fontSize: 13 }}>
          数据来源：21_系统评分.md · 卷一核心评估 · 2026-07-30
        </Text>
      </Stack>

      {/* Arc overview table */}
      <Card>
        <CardHeader><H3>十一段弧线概览</H3></CardHeader>
        <CardBody>
          <Table
            columns={[
              { title: "段", width: 100 },
              { title: "章节", width: 80 },
              { title: "名称", width: 150 },
              { title: "吸引", width: 56 },
              { title: "爽憋", width: 56 },
              { title: "AI感", width: 56 },
              { title: "负担", width: 56 },
              { title: "留存", width: 56 },
              { title: "判定", width: 100 },
            ]}
            rows={arcs.map((a) => ({
              cells: [
                <Code>{a.range}</Code>,
                <Text style={{ color: muted }}>{a.chs}章</Text>,
                <Text style={{ fontWeight: 500, fontSize: 12 }}>{a.name}</Text>,
                <Text style={{ color: a.appeal >= 9 ? positive : a.appeal < 8.2 ? negative : text, fontWeight: 500 }}>
                  {a.appeal.toFixed(2)}
                </Text>,
                <Text style={{ color: a.satisfaction >= 7.5 ? positive : a.satisfaction < 5.5 ? negative : muted, fontWeight: 500 }}>
                  {a.satisfaction.toFixed(1)}
                </Text>,
                <Text style={{ color: a.ai >= 5 ? negative : muted }}>{a.ai.toFixed(1)}</Text>,
                <Text style={{ color: a.burden >= 8 ? negative : muted }}>{a.burden.toFixed(1)}</Text>,
                <Text style={{ color: muted }}>{Math.round(a.retention)}</Text>,
                <Pill tone={a.verdict === "高开" || a.verdict.includes("高潮") || a.verdict.includes("巅峰") || a.verdict.includes("爆发") ? "success" : a.verdict.includes("有力") ? "accent" : "neutral"}>{a.verdict}</Pill>,
              ],
            }))}
          />
        </CardBody>
      </Card>

      <Divider />

      {/* Trend summary cards */}
      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader><H3>吸引趋势</H3></CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Stat size="lg" label="开篇011-120" value="8.84" tone="accent" subtitle="001-120章均" />
              <Stat size="lg" label="最低段" value="8.15" tone="warning" subtitle="031-045 学校补名体系" />
              <Stat size="lg" label="最高段" value="9.06" tone="success" subtitle="111-120 灰潮·锁门" />
              <Text style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>
                全书呈V+J型：7.8–8.3(医院中段)→8.3–8.5(学校分岔)→8.5–9.5(来源柜后)→9.0–9.3(卷末)
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><H3>爽憋演变</H3></CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Stat size="lg" label="卷均" value="6.9" tone="accent" subtitle="001-120" />
              <Stat size="lg" label="最低段" value="5.2" tone="warning" subtitle="031-045 压抑区" />
              <Stat size="lg" label="峰值段" value="8.1" tone="success" subtitle="091-100 入核半称" />
              <Text style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>
                压抑(3.5–5.5)持续至064(联络单)才翻转为7.5；065–120维持在7.0–9.0高爽区间
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><H3>AI感与负担</H3></CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Stat size="lg" label="AI感均" value="3.8" tone="success" subtitle="001-020(最原生)" />
              <Stat size="lg" label="AI最高段" value="5.1" tone="warning" subtitle="046-060(学校走廊)" />
              <Stat size="lg" label="负担高峰" value="8.2" tone="warning" subtitle="076-100 概念密集段" />
              <Text style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>
                前20章AI感2.5-4.3极优→学校段上升至4.5-6.6→来源柜后回落至4.0-4.5。负担从5.0波动升至8.5峰值
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Divider />

      {/* High-point chapters: good & bad */}
      <Stack gap={12}>
        <H2>高光章节 · 优劣势并列</H2>
        <Text style={{ color: muted, fontSize: 13 }}>
          以下章节在严苛尺度下吸引≥8.5且爽憋≥7.5，同时列出结构性短板
        </Text>
        <Grid columns={2} gap={12}>
          {highlights.map((h) => (
            <Card key={h.ch}>
              <CardHeader trailing={h.star ? <Pill tone="accent">⭐核心</Pill> : <Pill tone="neutral">高光</Pill>}>
                <Row gap={8}>
                  <Code>{String(h.ch).padStart(3, "0")}</Code>
                  <Text style={{ fontWeight: 600, color: text }}>{h.title}</Text>
                </Row>
              </CardHeader>
              <CardBody>
                <Stack gap={8}>
                  <Row gap={12}>
                    <Stat size="sm" label="吸引" value={h.appeal.toFixed(1)} tone="accent" />
                    <Stat size="sm" label="爽憋" value={h.satisfaction.toFixed(1)} tone={h.satisfaction >= 8 ? "success" : "neutral"} />
                    <Stat size="sm" label="AI感" value={h.ai.toFixed(1)} tone={h.ai <= 4 ? "success" : "neutral"} />
                    {h.cohesion ? <Stat size="sm" label="衔接" value={String(h.cohesion)} tone="success" /> : null}
                  </Row>
                  <Stack gap={2}>
                    <Text style={{ fontSize: 11, color: positive, fontWeight: 600 }}>✓ 长处</Text>
                    <Text style={{ fontSize: 12, color: text, lineHeight: 1.6 }}>{h.good}</Text>
                  </Stack>
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
          爽憋≤4.5 或 AI感≥6.0 的章节集中在医院/暂泊点/学校早期，核心问题是规则介绍主导叙事与同构疲劳
        </Text>
        <Table
          columns={[
            { title: "章", width: 52 },
            { title: "标题", width: 200 },
            { title: "吸引", width: 56 },
            { title: "爽憋", width: 56 },
            { title: "AI感", width: 56 },
            { title: "问题诊断", width: 440 },
          ]}
          rows={risks.map((r) => ({
            tone: r.satisfaction <= 3.5 ? "warning" as const : "neutral" as const,
            cells: [
              <Code>{String(r.ch).padStart(3, "0")}</Code>,
              <Text style={{ fontWeight: 500 }}>{r.title}</Text>,
              <Text style={{ color: r.appeal < 8 ? negative : text }}>{r.appeal}</Text>,
              <Text style={{ color: r.satisfaction <= 4 ? negative : muted, fontWeight: r.satisfaction <= 3.5 ? 600 : 400 }}>
                {r.satisfaction}
              </Text>,
              <Text style={{ color: r.ai >= 6 ? negative : muted }}>{r.ai}</Text>,
              <Text style={{ fontSize: 12, lineHeight: 1.5, color: muted }}>{r.problem}</Text>,
            ],
          }))}
        />
      </Stack>

      <Divider />

      {/* Volume 1 synthesis */}
      <Card>
        <CardHeader><H3>卷一综合判断</H3></CardHeader>
        <CardBody>
          <Stack gap={12}>
            <Row gap={24}>
              <Stat size="md" label="整体走势" value="V+J型" tone="success" subtitle="开高→中压→爆发→高潮" />
              <Stat size="md" label="AI感最优" value="001-020" tone="success" subtitle="2.5–4.3，全书原生感最强段" />
              <Stat size="md" label="情感高点" value="114章" tone="accent" subtitle="半个称认出他→9.0爽憋" />
              <Stat size="md" label="最弱段" value="031-045" tone="warning" subtitle="学校补名·负担上升·同构疲劳" />
            </Row>
            <Stack gap={6}>
              <Row justify="space-between">
                <Text style={{ fontSize: 12, fontWeight: 600, color: text }}>核心优势</Text>
              </Row>
              <Text style={{ fontSize: 12, color: text, lineHeight: 1.7 }}>
                前20章AI感极低(2.5–4.3)，全部靠感官先行+电影白描驱动——这是全书最强的语言资产。医院中期(011-020)稳定维持5.7以上爽憋，比卷二制度段高出一个层次。
                来源柜之后(061–120)进入全书最佳结构：规则密度高但不让读者失去情绪支点，每6-8章安排一次情感爆发(064/065/067/069/070/077/084/088/091/096/099/114)。
              </Text>
            </Stack>
            <Stack gap={6}>
              <Row justify="space-between">
                <Text style={{ fontSize: 12, fontWeight: 600, color: negative }}>核心风险</Text>
              </Row>
              <Text style={{ fontSize: 12, color: muted, lineHeight: 1.7 }}>
                学校走廊段(046-060)AI感系统性上升至4.8-5.2，沈辞内省段偏长(如047/048/059章出现130-170行的推论段落)。补名体系(039-045)出现同构疲劳——连续五章围绕"姓/尾字/核旧位/排旧位"拆解，大部分章节缺乏爽点突破。
                负担感从046章起跳升至8.0+并持续到100章，概念网密度对读者注意力要求较高。
              </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      <Text style={{ fontSize: 11, color: muted, textAlign: "right" }}>
        2026-07-30 · 数据来源：21_系统评分.md · 101-120已按严苛重评标准更新
      </Text>
    </Stack>
  );
}
