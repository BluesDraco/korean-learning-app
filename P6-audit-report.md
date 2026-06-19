## 【语法P1-P6全面审查报告】

### 一、结构性合规（connectionRules / scenarios / cardExamples / mistakes）

| 内容 | 状态 |
|---|---|
| connectionRules 结构: 66/66 已迁移为 ConnectionRule[] | ✅ P1-L11、P2-L11 仍为 string[] ❌ |
| scenarios ≥ 6条/课 | ✅ P1-L11=5、P2-L11=5 不足 ❌ |
| cardExamples ≥ 4条/课 | ✅ P1-L11=2、P2-L11=3 不足 ❌ |
| mistakes ≥ 4条/课 | ✅ 全部达标 |
| KPOV 场景 ≤1条/卡 | ✅ 全部达标 |

### 二、数据完整性

| 内容 | 状态 |
|---|---|
| linkedGrammarIds → grammar-new.ts ID 一致性 | ✅ 全部有效（指向 grammar-new.ts 的 gp-XX ID） |
| structures 格式有效性 | ✅ 无孤立 token / 无重复 ko: |
| specialQuiz / quickTable / readingGuide | ✅ 仅 P1 少量使用，格式正确 |

### 三、汉韩混排（禁止汉字与韩文字符直连）

| 章节 | 状态 |
|---|---|
| P1 (L01-L11) | ❌ 大量残留：connectionRules text/examples 字段（如"词干받침 있는"、没받침"）、structures.zh（如"名词没받침 있는"）、overviewHtml、quickTable |
| P2 (L01-L11) | ❌ 同样大量残留，connectionRules 和 mistakes.note 字段 |
| P3 (L01-L11) | ⚠️ 少量残留：structures.zh（词干/받침 混排）、个别 mistakes.note |
| P4 (L01-L11) | ⚠️ 少量残留：structures.zh、connectionRules 个别字段 |
| P5 (L01-L11) | ⚠️ 少量残留：structures.zh、connectionRules 个别字段、l11 practice summary |
| P6 (L01-L11) | ✅ 刚清理完毕 |

### 四、内容准确性（抽样检查范围有限）

未逐卡核对教材原文，以下情况需人工确认：
- P1-P2 的部分 connectionRules 使用混合语言描述（"词干받침 없는"等），可能影响学习者理解
- 部分语法点间的 compare 对比描述可能存在不够准确的情况

### 五、待修复项（按严重程度排序）

1. **P1-L11 升级**：connectionRules string[]→ConnectionRule[]、补充 1 条 scenario、补充 2 条 cardExamples
2. **P2-L11 升级**：connectionRules string[]→ConnectionRule[]、补充 1 条 scenario、补充 1 条 cardExamples
3. **P1-P5 混排清理**：范围较广（P1、P2 尤其严重），涉及 connectionRules、structures、quickTable、overviewHtml 等多个字段。是否批量修复需决策。

### 六、总结

**通过，但有阻塞项待修复。** 
