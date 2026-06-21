# Reading/Articles Korean Audit Report

## Summary: FAIL (3 issues)

## Issues

| # | File | Line | Problem | Fix |
|---|------|------|---------|-----|
| 1 | articles.ts | 71 | zh says "大酱汤" but Korean says `김치찌개` (泡菜汤/kimchi stew), not 된장찌개 | Change "大酱汤" to "泡菜汤" |
| 2 | reading-new.ts | 249 | Chinese period `。` in Korean sentence | Change to `.` |
| 3 | knowledge.ts | 301 | note says "收音ㅊ不发音" but 무릎 has 받침 ㅍ, not ㅊ | Change to "收音ㅍ" |

## PASS Files (5/8)
- articleMeta.ts — PASS
- articleLearning.ts — PASS
- tedxTalks.ts — PASS
- pictureBooks.ts — PASS
- koreanHotPosts.ts — PASS
