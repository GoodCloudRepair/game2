import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  UsageBar,
  useHostTheme,
} from "cursor/canvas";

const VOLUME_ROADMAP = [
  {
    id: "v01",
    name: "卷01 雾降临城",
    status: "进行中",
    tone: "info" as const,
    task: "立住灰雾/门域/失名/识名，完成一城求生与兄妹线第一轮",
    end: "封住城市级灰雾门，被城防局吸纳",
    forbid: "不正式掌握改名；不揭底父亲真相",
  },
  {
    id: "v02",
    name: "卷02 城防局与第二次失名",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "接入官方体系，推进财团与父亲线，首次稳定掌握改名",
    end: "第二轮灾变爆发，妹妹异常共鸣",
    forbid: "不透支编目庭终极真相",
  },
  {
    id: "v03",
    name: "卷03 裂界列车",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "扩地图、完成迁徙线，打开文明级视野",
    end: "灰雾是文明筛选机制的真相炸开",
    forbid: "不提前完成神性体系揭底",
  },
  {
    id: "v04",
    name: "卷04 白塔坠落",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "进入权力核心，父亲线第一次大反转",
    end: "白塔失守，妹妹坠入深层门域",
    forbid: "不提前解决妹妹线",
  },
  {
    id: "v05",
    name: "卷05 废土诸城",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "建立灯港，推进新秩序与城邦试验",
    end: "掌握封名，灯港立住",
    forbid: "不提前完成立名",
  },
  {
    id: "v06",
    name: "卷06 诸神假面",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "远征深层门域，揭开编目庭与上一轮文明",
    end: "获得立名资格，被迫做终局选择",
    forbid: "不提前打完终局战",
  },
  {
    id: "v07",
    name: "卷07 灰海战争",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "回收前文人物势力与伏笔，文明级战争高潮",
    end: "打开通往编目庭本体的大门",
    forbid: "不提前彻底重命名世界",
  },
  {
    id: "v08",
    name: "卷08 重命名世界",
    status: "待拆卷",
    tone: "neutral" as const,
    task: "终局抉择与文明命运决断",
    end: "重命名世界，以代价换取自由结局",
    forbid: "不再新增更大体系",
  },
];

const V1_STAGES = [
  { id: "s1", label: "失序开篇 001-010", done: 10, total: 10 },
  { id: "s2", label: "儿童医院 011-024", done: 14, total: 14 },
  { id: "s3", label: "旧城追索 025-038", done: 14, total: 14 },
  { id: "s4", label: "回澜中学 039-070", done: 32, total: 32 },
  { id: "s5", label: "官方收容 071-080", done: 10, total: 10 },
  { id: "s6", label: "财团旧档 081-090", done: 10, total: 10 },
  { id: "s7", label: "门域核心 091-102", done: 12, total: 12 },
  { id: "s8", label: "封门之夜 103-120", done: 5, total: 18 },
];

const PLOT_LINES = [
  {
    line: "兄妹线",
    now: "受限回认已完成半步；知微以源位/压线参与封门，仍不能完整救出",
    next: "108-114 稳内名；114 半个称强回收；卷尾留后遗症",
    tone: "warning" as const,
  },
  {
    line: "父亲线",
    now: "106 露出「别替门取新名 / 回旧边 / 锁其所止」，只给方法边界",
    next: "115 方法部分回收；完整立场与是否背叛留到卷02-04",
    tone: "neutral" as const,
  },
  {
    line: "官方/财团",
    now: "公章与授权均被内名读口退回；原链三节确认沈辞不可替代",
    next: "111-118 外线断流程；120 城防局临时证吸纳",
    tone: "info" as const,
  },
  {
    line: "能力线",
    now: "仍以识名破局；读规则、绕物回认、原链读口",
    next: "117 近似改名爆发一次，不作稳定掌握",
    tone: "success" as const,
  },
  {
    line: "灰门/编目庭",
    now: "核心是整理场；外名暂锁、怪潮走旧流程、文昌路站末线未断",
    next: "119 封门留监测缝；编目庭本体留到卷06+",
    tone: "warning" as const,
  },
];

const NEAR_TERM = [
  { ch: "108", title: "外线不断内名不稳", point: "内外协同断旧流程" },
  { ch: "109", title: "文昌路站不收回头人", point: "回扣开篇，放弃倒退救法" },
  { ch: "110", title: "真门名开始倒写", point: "读门反噬，近似改名前兆" },
  { ch: "111-113", title: "灰潮冲栏 / 共鸣不可替换", point: "大场面 + 拒绝牺牲知微" },
  { ch: "114-117", title: "半称回收 → 近似改名", point: "情感兑现转封门推进" },
  { ch: "118-120", title: "锁真门旧边 → 临时证", point: "卷尾落点：封门 + 被吸纳" },
];

const CHARACTERS = [
  {
    name: "沈辞",
    role: "男主 · 编目师",
    state: "原链活项，不可替代读口；目标从带离知微转为先封门再释",
  },
  {
    name: "沈知微",
    role: "妹妹 · 共鸣项",
    state: "定层二环源位；清醒可压线，不能直认、不能正环带离",
  },
  {
    name: "林照",
    role: "女主 · 战地医生",
    state: "封门外线关键托底：断姓卷、救伤、提醒不替权力答",
  },
  {
    name: "杜衡",
    role: "城防局",
    state: "维持外锁与封控；公章进不了读口，仍靠他压住门外",
  },
  {
    name: "顾焰",
    role: "财团镜像",
    state: "外缘记录/黑箱校验；可确认原链，不可替代读名",
  },
  {
    name: "沈父",
    role: "缺席悬念轴",
    state: "到过核心里路；留下「别替门取新名」半句方法",
  },
];

export default function QuanqiuMiwuOverview() {
  const theme = useHostTheme();
  const written = 107;
  const v1Target = 120;
  const stageDone = V1_STAGES.reduce((a, s) => a + s.done, 0);
  const stageTotal = V1_STAGES.reduce((a, s) => a + s.total, 0);

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <Pill tone="info" size="sm">
            规则怪谈 · 末世悬疑
          </Pill>
          <Pill tone="warning" size="sm">
            卷01 封门之夜
          </Pill>
          <Pill tone="neutral" size="sm">
            番茄连载向
          </Pill>
        </Row>
        <H1>全球迷雾：我能校正万物词条</H1>
        <Text tone="secondary">
          世界被灰雾与门域切碎后，档案修复员沈辞觉醒「编目师」，能看见并校正万物词条。
          从一城求生走到文明战争，最终要决定：人类要不要接受被编目、被管理的永恒安全。
        </Text>
        <Text tone="tertiary" size="small">
          数据来源：13_整书总纲 / 11_卷级规划 / 02_章节总表 / 17_卷尾看板 · 截至第107章 · 2026-07-17
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={`${written}/${v1Target}`} label="卷01 已写章节" tone="info" />
        <Stat value="约22.5万" label="已写字数（估）" />
        <Stat value="约25万×8" label="全书目标规模" />
        <Stat value="识名" label="当前能力上限" tone="success" />
      </Grid>

      <Callout tone="warning" title="当前执行点">
        第107章已落：怪潮沿旧流程回涌，文昌路站末线未断。下一章起承接「外线不断 /
        内名不稳」——优先处理文昌路站末线、真门名倒写、封门命中旧边。禁止新增大型势力、新地图长支线、正式改名进阶。
      </Callout>

      <Divider />

      <Stack gap={12}>
        <H2>卷01 阶段进度</H2>
        <Text tone="secondary" size="small">
          八阶段结构：前七段已写完；封门之夜 103-120 已写 5/18，处于卷尾收束区。
        </Text>
        <UsageBar
          total={stageTotal}
          topLeftLabel={`卷01 进度 ${Math.round((written / v1Target) * 100)}%`}
          topRightLabel={`${written} / ${v1Target} 章`}
          segments={[
            { id: "done", value: written, color: "blue" },
            { id: "remain", value: v1Target - written, color: "gray" },
          ]}
        />
        <Spacer size={4} />
        <Grid columns={2} gap={10}>
          {V1_STAGES.map((s) => {
            const complete = s.done >= s.total;
            const active = s.id === "s8";
            return (
              <div key={s.id}>
                <Card variant={active ? "borderless" : "default"}>
                  <CardBody style={{ padding: 12 }}>
                    <Row gap={8} align="center" justify="space-between">
                      <Text weight="semibold" size="small">
                        {s.label}
                      </Text>
                      <Pill
                        tone={complete ? "success" : active ? "warning" : "neutral"}
                        size="sm"
                      >
                        {complete ? "完成" : active ? "进行中" : "未开"}
                      </Pill>
                    </Row>
                    <Spacer size={6} />
                    <UsageBar
                      total={s.total}
                      topRightLabel={`${s.done}/${s.total}`}
                      segments={[
                        {
                          id: s.id,
                          value: s.done,
                          color: complete ? "green" : active ? "orange" : "blue",
                        },
                      ]}
                    />
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </Grid>
        <Text tone="tertiary" size="small">
          阶段合计核对：{stageDone}/{stageTotal}（封门之夜按 103-120 计 18 章）
        </Text>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>此刻剧情位置</H2>
        <Grid columns="1.2fr 1fr" gap={12}>
          <Card>
            <CardHeader>第107章收束后的局面</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text>
                  外名已被城防装置暂锁，但内名读口不收公章与财团授权。沈辞、知微共鸣项、样残条构成「同链三节」，原链成立后才可读。
                </Text>
                <Text>
                  父亲旧句钉死错误封门法：别替门取新名，要回旧边、锁其所止。怪潮不乱冲，而是沿医院腕带、学校姓卷、旧城回程车、文昌路站广播牌反向回涌——外线每断一处，内名才稳一寸。
                </Text>
                <Text weight="semibold">
                  核心转变：救人 = 先封门。带离知微会牵动全城回雾。
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>世界观四根主轴</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Row gap={8} align="start">
                  <Pill size="sm" tone="info">
                    灰雾
                  </Pill>
                  <Text size="small" tone="secondary">
                    筛选与收容属性的规则污染，让区域脱离正常命名体系
                  </Text>
                </Row>
                <Row gap={8} align="start">
                  <Pill size="sm" tone="info">
                    门域
                  </Pill>
                  <Text size="small" tone="secondary">
                    灰雾深层与现实连接的异空间；医院/学校/核心各有规则
                  </Text>
                </Row>
                <Row gap={8} align="start">
                  <Pill size="sm" tone="warning">
                    失名
                  </Pill>
                  <Text size="small" tone="secondary">
                    名字即存在定义；抹名导致异化、混乱与重组
                  </Text>
                </Row>
                <Row gap={8} align="start">
                  <Pill size="sm" tone="neutral">
                    编目庭
                  </Pill>
                  <Text size="small" tone="secondary">
                    「稳定高于一切」的古老管理系统；卷01只露逻辑影子
                  </Text>
                </Row>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={12}>
        <H2>主线状态盘</H2>
        <Table
          headers={["线索", "当前状态", "近期走向", "热度"]}
          rows={PLOT_LINES.map((p) => [
            p.line,
            p.now,
            p.next,
            p.tone === "warning"
              ? "高压"
              : p.tone === "info"
                ? "推进"
                : p.tone === "success"
                  ? "克制"
                  : "长线",
          ])}
          rowTone={PLOT_LINES.map((p) =>
            p.tone === "warning" ? ("warning" as const) : undefined,
          )}
        />
      </Stack>

      <Stack gap={12}>
        <H2>角色在场</H2>
        <Grid columns={3} gap={10}>
          {CHARACTERS.map((c) => (
            <div key={c.name}>
              <Card>
                <CardBody style={{ padding: 12 }}>
                  <Stack gap={4}>
                    <Text weight="semibold">{c.name}</Text>
                    <Text size="small" tone="tertiary">
                      {c.role}
                    </Text>
                    <Text size="small" tone="secondary">
                      {c.state}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          ))}
        </Grid>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>近程路线：108 → 120</H2>
        <Text tone="secondary" size="small">
          章纲预案已齐；正文从 108 承接。卷尾硬目标：城市级灰门封堵、兄妹强回收但留后遗症、城防局吸纳、近似改名仅征兆。
        </Text>
        <Table
          headers={["章段", "标题/功能", "关键落点"]}
          columnAlign={["left", "left", "left"]}
          rows={NEAR_TERM.map((n) => [n.ch, n.title, n.point])}
        />
        <Callout tone="info" title="卷尾三件套（不可缺）">
          ① 战局不可逆：灰门封住但留监测缝 · ② 关系重大变化：知微幸存带后遗症，沈辞被正式吸纳 · ③
          真相开一层：门要把城市改写成可管理档案；编目师候选词条浮出
        </Callout>
      </Stack>

      <Stack gap={12}>
        <H2>八卷总览 · 全书走向</H2>
        <Text tone="secondary" size="small">
          约 200 万字长篇。力量阶：灰印→铁律→银塔→金冕→圣座→天启。编目师成长：识名→改名→借名→夺名→封名→立名。
        </Text>
        <Stack gap={8}>
          {VOLUME_ROADMAP.map((v, i) => (
            <div key={v.id}>
              <Card variant={i === 0 ? "borderless" : "default"}>
                <CardBody style={{ padding: 12 }}>
                  <Grid columns="160px 1fr 1fr 1fr" gap={10} align="start">
                    <Stack gap={4}>
                      <Text weight="semibold" size="small">
                        {v.name}
                      </Text>
                      <Pill tone={v.tone} size="sm">
                        {v.status}
                      </Pill>
                    </Stack>
                    <Stack gap={2}>
                      <Text size="small" tone="tertiary">
                        核心任务
                      </Text>
                      <Text size="small">{v.task}</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text size="small" tone="tertiary">
                        卷尾落点
                      </Text>
                      <Text size="small">{v.end}</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text size="small" tone="tertiary">
                        禁止透支
                      </Text>
                      <Text size="small" tone="secondary">
                        {v.forbid}
                      </Text>
                    </Stack>
                  </Grid>
                </CardBody>
              </Card>
            </div>
          ))}
        </Stack>
      </Stack>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>终局必须回答</CardHeader>
          <CardBody>
            <Stack gap={6}>
              {[
                "灰雾与门域为何出现",
                "编目庭是敌人、工具，还是正确但恐怖的秩序",
                "沈父当年做了什么、为何必须失踪",
                "知微为何成为共鸣关键点，还能不能当普通人活",
                "沈辞能力来源：天赋、设计，还是遗留程序",
                "人类要不要接受被命名、被编号、被稳定",
              ].map((q) => (
                <div key={q}>
                  <Text size="small">· {q}</Text>
                </div>
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>结局方向（已定）</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small">类型：带代价的胜利</Text>
              <Text size="small" tone="secondary">
                沈父：死亡或融入规则系统
              </Text>
              <Text size="small" tone="secondary">
                知微：活下来，但不再完全是最初那个普通女孩
              </Text>
              <Text size="small" tone="secondary">
                沈辞：放弃成神，重命名世界，失去绝大多数力量，只留记录历史之能
              </Text>
              <Text size="small" weight="semibold">
                世界：从「被管理副本」变回「自由世界」
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Stack gap={12}>
        <H2>卷01 收束控制</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill tone="success" size="sm">必须回收</Pill>}>
              本卷硬目标
            </CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">· 受限但有效的兄妹回认（部分完成）</Text>
                <Text size="small">· 知微=城市级定层关键（已明确）</Text>
                <Text size="small">· 识名卷01上限展示，不稳掌握改名</Text>
                <Text size="small">· 父亲到过核心并留方法（106 已给）</Text>
                <Text size="small">· 第一扇城市级灰雾门封堵（进行中）</Text>
                <Text size="small">· 沈辞被城防局吸纳（卷尾未完成）</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="deleted" size="sm">禁止</Pill>}>
              卷尾前禁区
            </CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">· 新大型势力 / 归零会实质登场</Text>
                <Text size="small">· 新城市地图长支线</Text>
                <Text size="small">· 新完整能力阶位 / 正式改名</Text>
                <Text size="small">· 新亲缘角色</Text>
                <Text size="small">· 与封门无关的新门域副本</Text>
                <Text size="small">· 大段解释编目庭终极真相</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Card>
        <CardHeader>卖点与平台包装（已定）</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Row gap={8} wrap>
              <Pill size="sm">作者 · 春秋烽火</Pill>
              <Pill size="sm" tone="info">
                副标：听见名字，别答应
              </Pill>
              <Pill size="sm" tone="warning">
                封面A · 文昌路站地铁口
              </Pill>
            </Row>
            <Text size="small" tone="secondary">
              短简介承诺：灰雾应名即死 + 词条校正能力 + 妹妹被编成
              17号，必须在不能直呼姓名的规则里认回来。长线承诺：从一城封门到文明编目，查清父亲失踪、编目庭与自身来源。
            </Text>
            <H3>主角爽点公式</H3>
            <Text size="small">
              不是战力碾压，而是规则识别 → 规则利用 → 规则改写。前三章已兑现：磁带点名、应名即死、不应门里名字、识名首次破局。
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Stack gap={4}>
        <Text tone="tertiary" size="small">
          一句话现状：卷01 写到 89% 章段进度，正卡在「封门之夜」内外协同段；全书仍处第一卷立规则与入局阶段，真正的文明战争要到卷07。
        </Text>
        <Text tone="tertiary" size="small">
          下一步写作：第108章起按章纲推进外线断流程 → 文昌路站末线 → 真门名倒写，直奔 119-120 卷尾落点。
        </Text>
      </Stack>
    </Stack>
  );
}
