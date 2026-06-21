# Reading/Dictation/Phonetics/Course Korean Audit Report

## Summary

Audited 15 files across Reading/Articles, Dictation/Shadowing, Phonetics/Pronunciation, and Course/Learning modules. Found 1 CRITICAL translation mismatch, 2 HIGH severity issues, and several MEDIUM/LOW issues. The majority of Korean content across all files is grammatically correct, natural, and well-paired with Chinese translations. The biggest category of issues is **Chinese-Korean text mixing in metadata/tips fields** (5 instances), followed by **incorrect pronunciation romanizations** (2 instances), and **translation mismatches** (1 instance).

---

## CRITICAL Issues

| # | File | Content | Problem | Fix |
|---|------|---------|---------|-----|
| 1 | `src/data/articles.ts` line 71 | `특히 김치찌개를 제일 맛있게 만드세요.` with zh `尤其大酱汤做得最美味` | Korean says `김치찌개` (泡菜汤/kimchi stew) but Chinese translation says 大酱汤 (doenjang stew). The fullText-level zh on line 65 correctly says 泡菜汤, confirming the sentence-level zh is wrong. | Change zh to `尤其泡菜汤做得最美味` OR change Korean to `된장찌개` |

---

## HIGH Issues

| # | File | Content | Problem | Fix |
|---|------|---------|---------|-----|
| 2 | `src/data/reading-new.ts` line 321 | `{ word: '신용카드', meaning: '信용卡' }` | Meaning field mixes Chinese (信/卡) with Korean Hangul (용). The correct Chinese is 信用卡. | Change meaning to `信用卡` |
| 3 | `src/data/thirtyDayCourse.ts` line 667 (and 688) | `걱정하다` pronunciation `'geok-ijeong-ha-da'` | Extra `i` syllable in romanization. `걱정` is two syllables: 걱 (geok) + 정 (jeong). Romanization should be `geok-jeong-ha-da`. Same error on line 688: `걱정하지 마세요` → `geok-ijeong-ha-ji` should be `geok-jeong-ha-ji`. | Change to `geok-jeong-ha-da` (line 667) and `geok-jeong-ha-ji` (line 688) |

---

## MEDIUM Issues

| # | File | Content | Problem | Fix |
|---|------|---------|---------|-----|
| 4 | `src/data/pronunciation/content.ts` line 222 | `실제발음` in tips | Missing space. Should be `실제 발음` (two words). | Change to `실제 발음` |
| 5 | `src/data/pronunciation/content.ts` line 352 | `连음` in tips field | Mixed Chinese/Korean. `连` is Chinese, `음` is Korean. | Change to `连音` (all Chinese) or `연음` (all Korean) |
| 6 | `src/data/pronunciation/content.ts` line 359 | `收음` in focus array | Mixed Chinese/Korean. | Change to `收音` (all Chinese) or `받침` (all Korean) |
| 7 | `src/data/pronunciation/content.ts` line 360 | `收음` in tips field | Same as #6. | Same fix as #6 |

---

## LOW Issues

| # | File | Content | Problem | Fix |
|---|------|---------|---------|-----|
| 8 | `src/data/articleLearning.ts` line 28 | `할인` pronunciation `'hal-in'` | Less phonetically accurate. The 연음 rule makes 할인 pronounced as [하린] (ha-rin), not [할인] (hal-in). For comparison, `reading-new.ts` line 31 lists the same word correctly as `ha-rin`. | Change to `ha-rin` for consistency with reading-new.ts |
| 9 | `src/data/shadowingClips.ts` line 78, 89, 100, 111 | Description fields contain `。` (Chinese period) after Korean sentences | In mixed KO+ZH description strings, the Chinese period `。` appears after Korean clauses. Example: `'...자신을 사랑하게 된 이야기。适合中高级学习者...'`. Native Korean text uses `.`, not `。`. However, since these are description fields for a Chinese-speaking audience (not learning content), this is cosmetic. | If these descriptions are user-facing Chinese text, this is acceptable. If treated as Korean text, replace `。` with `.` after Korean portions. |

---

## File-by-File Summary

### READING/ARTICLES

**`src/data/articles.ts`** (5 articles, ~175 lines)
- All Korean sentences are grammatically correct. Particles, verb endings, and honorifics are appropriate.
- 1 CRITICAL: Translation mismatch (article 2, sentence item — 김치찌개 vs 大酱汤)
- 1 note: FullText for article 3 (Seoul Travel) has slightly different sentence segmentation than the individual sentences array (홍대에서는 vs omitted in sentence). Korean content is fine; this is a copy-editing discrepancy not a language error.

**`src/data/articleMeta.ts`** (15 articles, ~128 lines)
- All Korean terms (편의점, 커피 문화, 인사 문화, 명절과 기념일, etc.) are correctly spelled and natural.
- `국과 찌개` correctly distinguishes soup (국) and stew (찌개).
- No issues found.

**`src/data/articleLearning.ts`** (15 learning sets, ~508 lines)
- All Korean keywords are correct.
- All Korean example sentences in `outputExample` fields are natural.
- 1 LOW: `할인` pronunciation is `hal-in` but phonetically should be `ha-rin` (연음).
- Quiz questions and answers are accurate to Korean culture/food knowledge.

**`src/data/koreanHotPosts.ts`** (wrapper file, ~29 lines)
- This is a content gate/filter file wrapping `kpopHotPosts.ts`. No Korean content to audit here.

**`src/data/reading-new.ts`** (~10,505 lines, sampled ~900 across sections)
- Sampled articles: convenience-store-culture, seoul-subway, kpop-fan-culture, korean-cafe, and the B2 advanced article near line 9990.
- All Korean sentences are natural and grammatically rigorous.
- Grammar explanations in notes/grammarNote are pedagogically sound.
- 1 HIGH: `신용카드` meaning given as `信용卡` (mixed ZH/KO) — should be `信用卡`.
- Advanced-level Korean (B2/C1) at line ~9990+ uses authentic academic Korean register (`문어체`, `-는다는 점에서 의의를 지닌다`).

### DICTATION/SHADOWING

**`src/data/dictationSentences.ts`** (28 sentences, ~44 lines)
- All Korean sentences are correct. Particles, word choice, and politeness levels are appropriate.
- No issues found.

**`src/data/dictationWords.ts`** (3 packs x 30-35 words, ~138 lines)
- All Korean words are correctly spelled. Parts of speech are accurate.
- Romanizations are functional approximations for learners.
- No issues found.

**`src/data/shadowingClips.ts`** (5 TEDx clips, ~156 lines)
- Korean titles and descriptions are correct and natural.
- Speaker names in Korean are correctly transcribed.
- 1 LOW: Mixed `。` in description fields (cosmetic).

**`src/data/subs/index.ts`** (wrapper file, ~19 lines)
- Imports only. No Korean content to audit.
- Subtitle JSON files imported here were not individually audited (they are large JSON files of transcript data).

### PHONETICS/PRONUNCIATION

**`src/data/phonetics.ts`** (40 letters + 7 batchim groups, ~75 lines)
- All Korean letter names (기역, 니은, 디귿, etc.) are correct.
- Romanization values match standard Revised Romanization.
- Mnemonic descriptions in Chinese are educational, not Korean content per se.
- No issues found.

**`src/data/phonetics-steps.ts`** (6 progressive steps, ~161 lines)
- All `readingWords` (Korean reading practice words) are correct.
- `titleKo` values (단모음, 이중모음, 기본 자음, 된소리, 받침, 읽기 연습) are all correct Korean linguistic terms.
- No issues found.

**`src/data/pronunciation/letter-map.ts`** (vowel/consonant/batchim focus maps, ~81 lines)
- All letter-to-focus mappings are correct.
- No issues found.

**`src/data/pronunciation/content.ts`** (vowel pairs, syllable drills, consonant pairs, batchim words, linking sounds, common words, common phrases — ~410 lines)
- All Korean text is correct and natural.
- Linking sound explanations are linguistically accurate:
  - `한국어 → 한구거` (연음) — correct
  - `있어요 → 이써요` (연음) — correct
  - `좋아요 → 조아요` (ㅎ 탈락) — correct
  - `없어요 → 업써요` (겹받침 연음) — correct
  - `먹었어요 → 머거써요` (연속 연음) — correct
  - `꽃이 → 꼬치` (구개음화/腭化) — correct
- 4 MEDIUM: Mixed Chinese-Korean text in tips/focus fields (lines 222, 352, 359, 360).

### COURSE/LEARNING

**`src/data/thirtyDayCourse.ts`** (30 days, ~1256 lines)
- All Korean words, sentences, dictations are grammatically correct.
- Cultural notes are accurate (e.g., day 27: `어른께 두 손으로 물건을 드려요`).
- Grammar explanations correctly describe Korean grammar patterns.
- 1 HIGH: `걱정하다` romanization error (lines 667, 688).
- Day 25 `좋을 것 같다` listed as a word (line 1028) — this is a grammar pattern, not a vocabulary item, but it's useful for learners to know as a chunk. Not an error.
- Day 29 pronunciation `'bok-sseu-pa-se-yo'` for `복습하세요` (line 1199) — 복습 (bok-seup) + 하세요. The ㅂ batchim → [p̚] before ㅅ makes it [p̚s'] → effectively [p̚s']. The romanization `bok-sseu-pa-se-yo` is reasonable. No issue.

**`src/data/learningUnits.ts`** (30 units, ~567 lines)
- All unit words, example sentences, and listening sentences are correct.
- Korean idioms (unit 27) are authentic and well-explained:
  - `손이 크다` — "to be generous" (literally "hand is big")
  - `눈이 높다` — "to have high standards" (literally "eyes are high")
  - `발이 넓다` — "to have a wide network" (literally "feet are wide")
  - `입이 무겁다` — "to be tight-lipped" (literally "mouth is heavy")
  - `가는 말이 고와야 오는 말이 곱다` — "what goes around comes around (in speech)"
- No issues found.

---

## Audit Coverage

| File | Lines | Reviewed | Coverage |
|------|-------|----------|----------|
| articles.ts | 175 | Full | 100% |
| articleMeta.ts | 128 | Full | 100% |
| articleLearning.ts | 508 | Full | 100% |
| koreanHotPosts.ts | 29 | Full | 100% |
| reading-new.ts | 10,505 | ~900 sampled (4+ articles + advanced section) | ~9% |
| dictationSentences.ts | 44 | Full | 100% |
| dictationWords.ts | 138 | Full | 100% |
| shadowingClips.ts | 156 | Full | 100% |
| subs/index.ts | 19 | Full | 100% |
| phonetics.ts | 75 | Full | 100% |
| phonetics-steps.ts | 161 | Full | 100% |
| pronunciation/letter-map.ts | 81 | Full | 100% |
| pronunciation/content.ts | 410 | Full | 100% |
| thirtyDayCourse.ts | 1,256 | Full | 100% |
| learningUnits.ts | 567 | Full | 100% |

### Not audited
- `reading-new.ts` remaining ~9,600 lines (only ~9% sampled — the file is 10,505 lines with many articles)
- Individual subtitle JSON files in `src/data/subs/` (WvX4hDBkFiE.json, etc.)
- `kpopHotPosts.ts` (4519 lines — the source data for `koreanHotPosts.ts`)
