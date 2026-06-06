# HANDBOOK.md — 运维手册：账号、部署、调试、Skills

## 一、所有账号密码

### 服务器
| 项目 | 值 |
|---|---|
| IP | `207.57.134.171` |
| SSH 端口 | `17478` (不是 22!) |
| SSH 用户 | `root` |
| SSH 密码 | (存储在用户本地, 未记录在文件中) |
| 项目路径 | `/www/wwwroot/torikorean.com/` |
| Node.js 路径 | `/www/server/nodejs/v26.2.0/bin/` |
| PM2 路径 | `/www/server/nodejs/*/bin/pm2` |

### 宝塔面板 (baota.cn)
| 项目 | 值 |
|---|---|
| 账号 | `929989569` |
| 密码 | `134220` |
| 面板地址 | `https://207.57.134.171:36365/48a7fc77` |
| 面板用户 | `znlg3nmg` |
| 面板密码 | `ce46c73a` |

### Turso 数据库
| 项目 | 值 |
|---|---|
| 管理后台 | https://app.turso.tech/wwl929989569/databases/draco |
| 数据库名 | `draco` |
| 区域 | aws-ap-northeast-1 (Tokyo) |
| 连接 URL | `libsql://draco-wwl929989569.aws-ap-northeast-1.turso.io` |
| Auth Token | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...` (见 .env.local) |

### DeepSeek API Keys
| Key | 变量名 | 用途 |
|---|---|---|
| `sk-920ca2d1...` | `DEEPSEEK_TRANSLATE_KEY` | 翻译接口 |
| `sk-5505c8ee...` | `DEEPSEEK_LOOKUP_KEY` | 查词接口 |
| `sk-84dfabf2...` | `DEEPSEEK_ANALYZE_KEY` | 句子分析 |
| `sk-53cea5de...` | `DEEPSEEK_CHAT_KEY` | AI 对话 |
| `sk-540514d2...` | `DEEPSEEK_VOICE_KEY` | 语音接口 |
| `sk-93d56783...` | `DEEPSEEK_HANDWRITING_KEY` | 手写识别 |
| `sk-21df278f...` | `DEEPSEEK_NEWS_KEY` | 韩娱新闻处理 |
| `sk-学习方案接口的Key` | `DEEPSEEK_PLAN_KEY` | 学习方案 (未配置真实 key) |

### COS (腾讯云对象存储)
- Bucket: `torikorean-1436752408.cos.ap-hongkong.myqcloud.com`
- 区域: 香港 (ap-hongkong)
- 无 CORS 配置

### JWT
- Secret: `8TyZAvOKZm4mslhVMigLWKqglCpqeSfAMSypjDLrrYEXbpGBalQpZv2LF69Rf043`

## 二、部署流程

### 标准部署 (每次改完代码后)

```bash
# 1. 本地打包 (排除不需要的目录)
cd C:/Users/Administrator/Desktop/korean-learning-app
rm -rf .next
tar --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='*.tar.gz' -czf ../source.tar.gz .

# 2. 上传到服务器 (注意端口 17478)
scp -P 17478 ../source.tar.gz root@207.57.134.171:/www/wwwroot/torikorean.com/

# 3. 服务器构建 + 重启
ssh -p 17478 root@207.57.134.171 \
  "export PATH=/www/server/nodejs/v26.2.0/bin:\$PATH && \
   cd /www/wwwroot/torikorean.com && \
   tar -xzf source.tar.gz && \
   npm run build && \
   pm2 restart torikorean"

# 4. 验证
curl -sI https://torikorean.com
# 预期: HTTP/1.1 200 OK

# 5. 清理本地
rm ../source.tar.gz
```

### 快速部署 (只改了几个源文件, 不用重新 npm install)

```bash
# 用 scp 逐个传源文件, 然后直接在服务器上 build
scp -P 17478 "本地文件路径" root@207.57.134.171:/www/wwwroot/torikorean.com/对应路径
ssh -p 17478 root@207.57.134.171 \
  "export PATH=/www/server/nodejs/v26.2.0/bin:\$PATH && \
   cd /www/wwwroot/torikorean.com && \
   npm run build && \
   pm2 restart torikorean"
```

### PM2 常用命令

```bash
ssh -p 17478 root@207.57.134.171 "/www/server/nodejs/*/bin/pm2 list"
ssh -p 17478 root@207.57.134.171 "/www/server/nodejs/*/bin/pm2 logs torikorean --lines 50"
ssh -p 17478 root@207.57.134.171 "/www/server/nodejs/*/bin/pm2 restart torikorean"
ssh -p 17478 root@207.57.134.171 "/www/server/nodejs/*/bin/pm2 stop torikorean"
```

### 注意事项
- **必须在服务器上构建！** Windows 构建的 `@libsql/client` 在 Linux 上会报模块找不到
- SSH 端口是 17478, 不是 22
- 用 tar 打包时排除 `node_modules`、`.next`、`.git`、旧的 `*.tar.gz`
- 构建大约需要 2-3 分钟
- 部署期间服务会短暂中断 (PM2 restart 有 ~5 秒冷启动)

## 三、如何自动查 Bug / 验证

### 每次修改后必须跑的三步
```bash
npx tsc --noEmit        # 类型检查
npm run lint            # ESLint
npm run build           # 生产构建, 确认不卡在 tracing/静态生成阶段
```

### 全局代码扫描 (用 grep 自查)

```bash
# 硬编码颜色 (非设计定稿的颜色)
grep -rn '#[0-9a-fA-F]\{6\}' src/app --include='*.tsx' | grep -v 'kpop/\[id\]'

# 潜在安全风险
grep -rn 'sk-\|api_key\|secret\|password' src --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | grep -v '.env'

# 无 Suspense 包裹的 useSearchParams
grep -rn 'useSearchParams()' src --include='*.tsx'

# setState 在 render 期间调用 (简单的模式匹配)
grep -rn 'set[A-Z]' src/app --include='*.tsx' | grep -v 'const\|=>\|function\|useCallback\|useEffect\|\.then'
```

### 检查生产环境

```bash
# 检查首页状态
curl -sI https://torikorean.com

# 检查特定歌曲音频
curl -sI "https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/audio/kpop/{videoId}.webm"

# 查看 PM2 日志
ssh -p 17478 root@207.57.134.171 "/www/server/nodejs/*/bin/pm2 logs torikorean --lines 100 --nostream"
```

### 客户端调试
- 打开 Chrome DevTools → Network 标签, 过滤 `.webm`, 确认音频返回 200
- Console 标签看有没有 React 报错
- Application → IndexedDB → ToriKoreanDB 看本地数据是否正常

## 四、项目 Skills

### Tori Toolkit Skill
此项目有一个配套的 skill 定义在用户记忆系统中 (`tori-toolkit-skill.md`)，包含：
- 12 阶段工作流
- 五分组导航设计原则
- KPOP 跟唱 + 韩娱热帖核心体验描述
- 验证标准

这个 skill 在 Claude Code CLI 中可以通过 `/tori-toolkit` 调用。

### 其他相关记忆
用户的 Claude Code 记忆系统中存有以下项目相关信息：
- `korean-app-overview.md` — 项目架构文档
- `pronunciation-module-design.md` — 发音模块完整设计
- `session-recap-2026-05-27.md` — 虚拟键盘 + 管理后台会话
- `session-recap-2026-06-01.md` — Bug 修复 + daily/course 重构
- `feedback_code_quality.md` — 代码验证规则
- `feedback_no-assuming-plans.md` — Plan 模式使用规则
- `communication-preferences.md` — 沟通偏好

这些文件位于 `C:\Users\Administrator\.claude\projects\C--Users-Administrator\memory\`

## 五、紧急排查

### 网站打不开
1. `ssh -p 17478 root@207.57.134.171 "/www/server/nodejs/*/bin/pm2 list"` — 确认 torikorean 进程在线
2. 如果不在线: `pm2 restart torikorean`
3. `curl -sI https://torikorean.com` — 确认 nginx 正常

### 音频不能播放
1. 检查 COS 文件是否存在: `curl -sI "https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/audio/kpop/{videoId}.webm"`
2. 检查浏览器 Console 是否有 CORS 或 404 错误
3. 确认代码中没有 `crossOrigin='anonymous'` (会导致 Chrome 阻止 COS 请求)

### 构建失败
1. 确认在服务器上构建，不是 Windows
2. 确认 Node.js 路径: `/www/server/nodejs/v26.2.0/bin/`
3. 查看完整 build 输出，定位失败模块
4. 如果卡在 "Tracing" 阶段，检查 `next.config.ts` 的 `outputFileTracingExcludes`
