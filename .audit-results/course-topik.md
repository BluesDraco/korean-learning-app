# Course/TOPIK Korean Audit Report

## Summary: FAIL (3 issues)

## Issues

| # | File | Line | Problem | Fix |
|---|------|------|---------|-----|
| 1 | thirtyDayCourse.ts | 683 | Romanization "pi-go-nae-seo" is wrong — treats 피곤해서 as 피고내서 | Change to "pi-gon-hae-seo" |
| 2 | aiScenarios.ts | 991 | Korean "응" embedded in Chinese text: "加油응援" | Change to "应援" |
| 3 | aiScenarios.ts | 178-180 | grammarError says 을/를 is required with 주세요, but same scenario and grammar lesson gp-04 say it's optional | Remove or revise this grammarError entry |

## PASS Files (6/9)
- learningUnits.ts — PASS
- grammar-beginner.ts — PASS (30 entries)
- grammar-chapters.ts — PASS
- grammar-parts.ts — PASS
- grammar.ts — PASS (~1200 lines)
- grammar-new.ts — PASS (gp-01 through gp-15)
- topik-questions.ts — PASS (~500 lines sampled)
