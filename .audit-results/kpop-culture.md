# KPOP/Culture Korean Audit Report

## Summary: FAIL

## CRITICAL Issues

| # | File | Lines | Problem | Fix |
|---|------|-------|---------|-----|
| 1 | kpopSongs.ts | L698-L751 | Lovesick Girls (blackpink-lsg) entire song Chinese translation scrambled — Chinese fields contain Korean text or translations from other songs/lines | Rewrite all Chinese translations for this song |
| 2 | expressions.ts | L869-L1897 | idiom-085 ~ idiom-187 (103 entries) example/exampleZh all use placeholder text "선생님, 이 표현은 무슨 뜻이에요?" / "老师，这个表达是什么意思？" | Write real usage example sentences for each idiom |
| 3 | expressions.ts | L869-L1897 | idiom-085 ~ idiom-187 actualMeaning is in Korean instead of Chinese (inconsistent with idiom-001~084 which use Chinese) | Translate to Chinese |
| 4 | expressions.ts | L891 | idiom-087 굴뚝같다 literalMeaning is "心急如焚" — this is the figurative meaning, not literal. 굴뚝=烟囱, literal should be "像烟囱一样" | Fix literalMeaning |
| 5 | expressions.ts | L951 | idiom-093 배꼽(을) 잡다 literalMeaning is "捧腹大笑" — this is figurative. Literal should be "抓住肚脐" | Fix literalMeaning |

## PASS Files
- kpopHotPosts.ts — Korean from Naver News, correct
- kpopTracks.ts — WORD_DICT Korean vocabulary correct
- korea.ts — All cultural terms, food names, historical periods correct
- writingExercises.ts — Korean correct
- typingLevels.ts — Korean correct
