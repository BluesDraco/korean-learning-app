# QA 审查报告

> 由 QA Agent 在收到修改报告后填写。审查前提：以"证明代码有漏洞"为出发点，而非"证明没问题"。
> 禁止修改任何业务代码。

---

## 基本信息

- **审查时间**: YYYY-MM-DD HH:mm
- **审查文件**:
- **对应修改报告**:

---

## 维度1：功能是否真正接通

- [ ] 新增 UI 按钮/交互有对应 handler
- [ ] handler 真正调用了 API / DB / 状态更新
- [ ] 无只写 UI 没写逻辑的情况

发现问题：

---

## 维度2：数据流是否完整

- [ ] 新增类型已在 `src/types/index.ts` 导出
- [ ] 新增 CloudTable 已在 `src/lib/db.ts` 注册
- [ ] 新增数据库表已在 `src/lib/server/db.ts` 建表

发现问题：

---

## 维度3：SSR 安全

- [ ] 无在组件顶层同步访问 `window` / `document` / `navigator` / `localStorage`
- [ ] 所有浏览器 API 访问在 `useEffect` 内或有 `typeof window !== 'undefined'` 守卫

发现问题：

---

## 维度4：边界与异常

- [ ] 可选字段渲染前有空值保护（`field && ...` 或 `field || ''`）
- [ ] 无 wrongPart === correctPart 类无意义对比
- [ ] DB 写失败不误标成功，API 失败有 fallback

发现问题：

---

## 维度5：状态清理

- [ ] 组件卸载时异步操作（录音、识别、定时器）已终止
- [ ] useEffect cleanup 函数已 abort/cancel 所有副作用
- [ ] 再来一轮/返回场景时所有相关 state 重置到初始值

发现问题：

---

## 极端场景推演

| 场景 | 推演结果 | 风险等级 |
|---|---|---|
| 网络超时 / 请求失败 | | 高/中/低/无 |
| 空数据 / null / undefined | | 高/中/低/无 |
| 脏数据 / 格式异常输入 | | 高/中/低/无 |
| 老用户数据兼容（IndexedDB schema）| | 高/中/低/无 |
| iOS Safari | | 高/中/低/无 |
| 多次快速点击 / 并发竞态 | | 高/中/低/无 |

---

## 回归测试清单

- [ ] 主流程：
- [ ] 边界情况：
- [ ] 跨浏览器：iOS Safari / 微信 / Chrome / Edge
- [ ] 其他：

---

## 审查结论

- [ ] **通过** — 可提交 Release Agent 进行上线检查
- [ ] **打回** — 原因如下：

> 打回原因：

---

**交接语（通过时）**：「QA 审查通过，请指示是否切换为 Release Agent 进行上线检查？」
**交接语（打回时）**：「QA 审查打回，请将问题反馈给 Developer Agent 修复后重新提交审查。」
