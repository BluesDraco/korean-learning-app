import subprocess
import json
import sys
import time

url = 'https://api.deepseek.com/v1/chat/completions'
api_key = 'sk-920ca2d19ce049e5ad68bd7e27b10070'

batches = [
    # Batch 1: Unit 3, words 1-30
    '건강, 걷기, 등산, 수영, 줄넘기, 체조, 체중, 효과, 꾸준히, 달리기, 땀, 마라톤, 몸무게, 몸살, 무리하다, 반복하다, 식습관, 신체, 유산소 운동, 줄이다, 체력, 최소한, 충분하다, 피하다, 활동적이다, 근육, 긴장하다, 늘이다, 단백질, 당기다',
    # Batch 2: Unit 3, words 31-60
    '면역, 부상, 스트레스, 스트레칭, 아령, 염증, 운동화, 자세, 저하되다, 지방, 진단, 처방, 체육관, 탄수화물, 통증, 혈압, 호흡, 회복, 관절, 생활 습관, 운동을 거르다, 운동 부족, 운동을 꾸준히 하다, 근력 운동을 하다, 스트레칭을 하다, 건강을 유지하다, 몸무게를 줄이다, 체중이 늘다, 체력이 떨어지다, 식습관을 바꾸다',
    # Batch 3: Unit 4, words 1-30
    '감기, 기침, 두통, 설사, 소화, 식욕, 열, 약, 증상, 진찰, 처방전, 체온, 콧물, 통원, 피부, 혈액, 회복, 구역질, 근육통, 만성, 면역력, 발열, 변비, 보험, 부작용, 빈혈, 소독, 수술, 수혈, 식중독',
    # Batch 4: Unit 4, words 31-61
    '심장, 약국, 알레르기, 응급, 입원, 입원실, 재활, 주사, 진통제, 처방, 탈수, 트림, 피로, 혈당, 혈압, 혈액형, 호전되다, 마취, 붓다, 가렵다, 따갑다, 체온을 재다, 약을 먹다, 병원에 가다, 입원하다, 퇴원하다, 주사를 맞다, 처방전을 받다, 식전에 먹다, 식후에 먹다, 하루에 세 번 먹다',
]

all_results = []

for i, words in enumerate(batches):
    print(f"Processing batch {i+1}/4...", file=sys.stderr)

    prompt = f"""你是一个韩语例句生成助手。请为以下延世韩国语词汇，每个词生成2个自然的韩语例句（附中文翻译）。

要求：
1. 例句要自然、符合日常用语，难度适合中级韩语学习者
2. 中文翻译要准确，使用简体中文
3. 输出纯JSON格式，不要有任何markdown包裹

结构如下：
[
  {{
    "word": "词",
    "examples": [
      {{"text": "韩语例句1", "translation": "中文翻译1"}},
      {{"text": "韩语例句2", "translation": "中文翻译2"}}
    ]
  }}
]

词汇列表：{words}

只输出JSON数组，不要有任何说明文字。"""

    payload = {
        'model': 'deepseek-chat',
        'messages': [{'role': 'user', 'content': prompt}],
        'temperature': 0.7,
        'max_tokens': 4000
    }

    payload_str = json.dumps(payload, ensure_ascii=False)

    result = subprocess.run(
        [
            'curl', '-s', '--max-time', '120',
            '-X', 'POST', url,
            '-H', 'Content-Type: application/json',
            '-H', f'Authorization: Bearer {api_key}',
            '-d', payload_str
        ],
        capture_output=True,
        encoding='utf-8'
    )

    if result.returncode != 0:
        print(f"curl error batch {i+1}: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    try:
        resp = json.loads(result.stdout)
        content = resp['choices'][0]['message']['content'].strip()
        # Strip markdown code fences if present
        if content.startswith('```'):
            lines = content.split('\n')
            content = '\n'.join(lines[1:-1])
        batch_data = json.loads(content)
        all_results.extend(batch_data)
        print(f"Batch {i+1} done: {len(batch_data)} words", file=sys.stderr)
    except Exception as e:
        print(f"Parse error batch {i+1}: {e}", file=sys.stderr)
        print(f"Raw response: {result.stdout[:500]}", file=sys.stderr)
        sys.exit(1)

    if i < len(batches) - 1:
        time.sleep(2)

output_path = 'C:/Users/Administrator/Desktop/korean-learning-app/vocab_examples_3_4.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(all_results, f, ensure_ascii=False, indent=2)

print(f"Done! Total words: {len(all_results)}", file=sys.stderr)
print(f"Saved to: {output_path}", file=sys.stderr)
