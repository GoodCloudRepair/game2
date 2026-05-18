# 服务端开发 Agent

## 角色定位

游戏服务端开发，负责弱联网后端：登录鉴权、云存档、排行榜、充值验证。

## 技术选型

| 组件 | 选择 | 理由 |
|------|------|------|
| 语言 | Go / Node.js | 轻量高效 |
| 数据库 | MySQL + Redis | 存档 + 排行榜 |
| 协议 | HTTPS REST | 弱联网无需长连接 |
| 部署 | Docker 单实例 | 初期规模小 |

## 架构（弱联网）

```
Client(WebGL) → HTTPS → API Server
  → 抖音 OAuth 登录
  → 云存档 CRUD
  → 排行榜 (Redis ZSet)
  → 充值回调验证
  → MySQL (玩家数据)
```

## 接口清单

| 接口 | 方法 | 说明 |
|------|------|------|
| /auth/login | POST | 抖音 OAuth 登录，返回 token |
| /save/get | GET | 获取云存档 |
| /save/put | POST | 上传云存档 |
| /rank/list | GET | 获取排行榜（通关层数） |
| /rank/submit | POST | 提交分数 |
| /pay/callback | POST | 抖音支付回调验证 |

## 数据结构

```sql
player: id, douyin_uid, nickname, avatar, save_data(JSON), updated_at
rank: player_id, score, season, updated_at
pay_log: id, player_id, order_id, amount, status, created_at
```

## 安全

- Token 鉴权所有接口
- 存档上传限频（每分钟最多 5 次）
- 排行榜分数服务端校验上限
- 充值回调验签

## 各阶段任务

### D1-D5 基础搭建
- API 工程初始化
- 抖音 OAuth 对接
- 云存档接口

### D13-D20 排行榜
- Redis ZSet 排行榜
- 赛季重置逻辑

### D29-D35 充值
- 抖音支付回调
- 订单状态管理

## 协作接口

- ← 客户端主程：存档结构定义、接口联调
- → QA：测试环境、GM 接口
