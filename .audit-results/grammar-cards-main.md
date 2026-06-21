# Grammar Cards Main File (P1-P6) Korean Audit Report

File: `src/data/grammar-cards.ts` (12,146 lines, ~60 cards)

## Summary: FAIL

## CRITICAL: 39 Cards Missing specialQuiz

P3-l01 through P6-l10 — **39 non-isPractice cards have no specialQuiz field**. P1 and P2 have 19 specialQuiz entries (all verified correct). P3-P6 cards need specialQuiz added.

## FAIL: wrong == correct (3 cases)

| # | Card | Problem | Fix |
|---|------|---------|-----|
| 1 | card-p2-l05 mistakes[0] | wrong="저의 = 제（一律替换）" — not a Korean error, just usage note | Replace with actual error like `나의의 이름은...` |
| 2 | card-p5-l03 mistakes[2] | wrong and correct are IDENTICAL: `아마 갈 거예요.` (only Chinese parenthetical differs) | Delete or replace with real error like `아마 꼭 갈 거예요.` |
| 3 | card-p6-l01 mistakes[1] | wrong and correct are IDENTICAL: `날씨가 좋겠군요.` | Delete or replace with `날씨가 좋겠어요.` |

## FAIL: wrong field contains Chinese meta-text (7 cases)

| # | Card | Problem |
|---|------|---------|
| 4 | card-p3-l02 mistakes[2] | wrong has Chinese parenthetical |
| 5 | card-p3-l09 mistakes[1] | wrong is meta-description, not Korean error |
| 6 | card-p3-l10 mistakes[3] | wrong uses "=" between two correct forms |
| 7 | card-p5-l06 mistakes[1] | wrong uses "/" between forms + Chinese |
| 8 | card-p5-l06 mistakes[2] | wrong has Chinese parenthetical |
| 9 | card-p5-l07 mistakes[3] | wrong is meta-description, not Korean |
| 10 | card-p5-l09 mistakes[2] | wrong is meta-description, not Korean |

## FAIL: correct field has mixed content (2 cases)

| # | Card | Problem |
|---|------|---------|
| 11 | card-p3-l10 mistakes[3] | correct has two forms + Chinese explanation |
| 12 | card-p5-l06 mistakes[1] | correct uses "vs" with two forms |

## PASS
- connectionRules — all Korean forms correct
- cardExamples — 조사 (은/는, 이/가, 을/를, (으)로, (이)나) all correct
- scenarios — ko/zh matching
- P1/P2 specialQuiz — all 19 verified correct (options[answer] verified, distractors verified wrong)

## Audit Coverage
- [x] specialQuiz — P1/P2 PASS, P3-P6 MISSING
- [x] mistakes — 13 FAIL items
- [x] cardExamples — PASS
- [x] connectionRules — PASS
- [x] scenarios — PASS
- [x] 조사/어미 — PASS
