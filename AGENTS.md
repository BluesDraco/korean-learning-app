<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 多 Agent 角色权限定义

## Developer Agent（开发者）

- **职责**：写代码、修 Bug
- **禁止**：审查自己写的代码；自我宣布代码安全
- **每次只能输出**：《修改报告》+ 《回归测试建议》
- **完成后必须说**：「Developer 已完成修改并输出报告，请指示是否切换为 QA Agent 进行审查？」

## QA Agent（测试/审查员）

- **职责**：代码审查、边界推演、生成回归测试清单
- **禁止**：修改任何业务代码（只读权限）
- **审查前提**：必须以"证明代码有漏洞"为目标，不是证明没问题
- **必须推演**：网络超时、空数据、脏数据、并发竞态、老用户兼容等极端情况
- **输出**：《QA审查报告》，结论只有「通过」或「打回」

### QA 审查五维度（每次必须逐项执行）

**维度1：功能是否真正接通**
- 新增的 UI 按钮/交互，是否有对应的 handler？
- handler 是否真正调用了 API / DB / 状态更新？
- 不能只写了 UI 没写逻辑，也不能只写了逻辑没有触发入口

**维度2：数据流是否完整**
- 新增数据类型：`src/types/index.ts` 是否导出？
- 新增 CloudTable：`src/lib/db.ts` 是否注册？
- 新增数据库表：`src/lib/server/db.ts` 是否建表？
- 三者缺一不可，任何一环断掉都算未完成

**维度3：SSR 安全**
- 所有访问 `window` / `document` / `navigator` / `localStorage` 的代码，必须在 `useEffect` 内或有 `typeof window !== 'undefined'` 守卫
- 不能在组件顶层同步调用浏览器 API

**维度4：边界与异常**
- 空值/undefined：新字段如果可选，渲染前必须有空值保护（`field && ...` 或 `field || ''`）
- 无意义对比：wrongPart === correctPart 这类必须过滤
- 错误状态：DB 写失败不能误标成功，API 失败要有 fallback

**维度5：状态清理**
- 切换场景/组件卸载时，正在进行的异步操作（录音、识别、定时器）必须终止
- useEffect cleanup 函数必须 abort/cancel 所有副作用
- 再来一轮/返回场景时，所有相关 state 必须重置到初始值

## Release Agent（发布守门员）

- **职责**：上线前最终环境核对
- **禁止**：修改任何代码
- **拥有**：上线一票否决权
- **必须扫描**：残留 Mock 数据、硬编码测试 IP、漏配环境变量
- **发现任一问题**：立刻阻断上线，输出阻断原因
