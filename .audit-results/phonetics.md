# Phonetics (40音) Korean Audit Report

## Summary: FAIL (9 issues)

## Key Issues (affect pronunciation accuracy)

| # | File | Line | Problem | Fix |
|---|------|------|---------|-----|
| 1 | phonetics-steps.ts | 27 | ㅓ compared to English "aw" (rounded [ɔː]) but ㅓ is unrounded [ʌ] | Compare to "but/cup中的u/uh" |
| 2 | phonetics-steps.ts | 145 | 학교 romanized as 'hak-gyo' but ㄱ+ㄱ triggers tensification → [학꾜] | Fix to 'hak-kkyo' |
| 3 | phonetics-steps.ts | 157 | 반갑습니다 romanized as 'ban-gap-seum-ni-da' but ㅂ+ㅅ → [씁] | Fix to 'ban-gap-sseum-ni-da' |
| 4 | phonetics.ts | 53 | ㅊ compared to Chinese "吃" (retroflex [tʂʰ]) but ㅊ is palatal [tɕʰ] | Compare to Chinese "七" |
| 5 | content.ts | 117 | ㅈ/ㅉ tongue position described as "舌尖轻触上牙后方" — should be tongue blade against alveolar ridge | Fix to "舌面前部抵上齿龈" |

## Minor Issues (text standardization)

| # | File | Line | Problem | Fix |
|---|------|------|---------|-----|
| 6 | content.ts | 271 | 汉韩混排 "侧음" | Change to "侧音" |
| 7 | content.ts | 351 | 汉韩混排 "连음" | Change to "连音" |
| 8 | content.ts | 359-360 | 汉韩混排 "收음"/"비음화" | Change to "收音"/"鼻音化" |
| 9 | content.ts | 352 | 의 used as Chinese 的 | Change to "어디에 的 에 是 ㅔ" |
