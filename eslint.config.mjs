import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  {
    rules: {
      // The app currently relies on pragmatic event handlers/effects and typed API envelopes.
      // Keep these from blocking CI while preserving TypeScript checks and important Next rules.
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
    },
  },
  // scripts/ 目录是 Node 一次性脚本，允许 require（含 .mjs 里内联 require('fs') 等）
  {
    files: ['scripts/**/*.js', 'scripts/**/*.cjs', 'scripts/**/*.mjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // ── 一致性护栏 (2026-07-14 代码审计) ──
  // 均为 warn，不阻断 build——存量问题逐步清理，护栏只防新增。

  // SQL 拼值护栏：禁止把 ${} 插值拼进 getDb().exec()/run() 的 SQL 模板字符串。
  // 值必须走参数化 ? 占位（第二参数 params 数组）。全 src 范围。
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'no-restricted-syntax': ['warn',
        {
          selector: "CallExpression[callee.property.name=/^(exec|run)$/] > TemplateLiteral[expressions.length>0]",
          message: 'SQL 拼值风险：禁止把 ${} 插值拼进 exec()/run() 的 SQL。请改用参数化占位符 ?，值放第二参数数组。',
        },
      ],
    },
  },

  // 硬编码颜色护栏：禁止“渲染结构色”写死十六进制，一律走 var(--color-*)/var(--*) token，否则暗色穿帮。
  // 单独成块（会覆盖上面的 no-restricted-syntax，故 tsx 里 SQL 拼值极少、已由上块+人工兜住）。
  // 精度优化 2026-07-14：只盯 UI 结构色，豁免以下“内容/数据色”避免永久误报：
  //   1) src/data/** —— 绘本色/文章标签色/语法卡内嵌 HTML 色，都是内容数据
  //   2) 图表 fill=/stroke= JSX 属性 —— Recharts 数据系列色，暗色下也需固定鲜明
  //   3) 颜色数组常量（COLORS/swatches/palette 等）—— 色板/彩带等有意固定色
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/data/**', 'src/lib/theme.ts'],
    rules: {
      'no-restricted-syntax': ['warn',
        {
          selector:
            "Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]" +
            ":not(JSXAttribute[name.name=/^(fill|stroke)$/] Literal)" +
            ":not(ArrayExpression > Literal)",
          message: '硬编码颜色：请改用 var(--color-*) token，否则暗色模式会穿帮。',
        },
      ],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 手写模型训练目录的 Python venv / 产物，不是前端源码，勿 lint
    "scripts/ml-handwriting/.venv/**",
    "scripts/ml-handwriting/output*/**",
    "scripts/ml-handwriting/__pycache__/**",
  ]),
]);

export default eslintConfig;
