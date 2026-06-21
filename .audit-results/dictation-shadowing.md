# Dictation & Shadowing Korean Audit Report

## Summary: FAIL (1 critical, 2 minor)

## CRITICAL Issues

| # | File | Problem | Fix |
|---|------|---------|-----|
| 1 | subs/WvX4hDBkFiE.json + subs/WvX4hDBkFiE-zh.json | Korean has 317 subtitle lines, Chinese has 306. `buildSubtitles` in shadowingClips.ts aligns by array index, so from ~line 38 onward all Chinese translations are misaligned with Korean. | Split Chinese subtitles to match Korean granularity, or refactor buildSubtitles to use relative timestamps instead of array index. |

## Minor Issues

| # | File | Line | Problem | Fix |
|---|------|------|---------|-----|
| 2 | shadowingClips.ts | 78,89,100,112,122 | Chinese punctuation `。` used after Korean text | Replace with `.` |
| 3 | dictationSentences.ts | 17 | `여기가 어디예요?` → "这里是哪里？" slightly awkward | Change to "这是哪里？" |

## PASS Files
- dictationSentences.ts — Korean sentences grammatically correct, particles correct
- dictationWords.ts — 100 words, spelling correct, translations appropriate
- shadowingClips.ts — Korean descriptions correct
- subs/index.ts — N/A
