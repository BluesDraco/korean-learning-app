#!/bin/bash
set -e

URL="https://api.deepseek.com/v1/chat/completions"
API_KEY="sk-920ca2d19ce049e5ad68bd7e27b10070"
OUTPUT="C:/Users/Administrator/Desktop/korean-learning-app/vocab_examples_3_4.json"
TMPDIR="C:/Users/Administrator/Desktop/korean-learning-app/tmp_batches"
mkdir -p "$TMPDIR"

call_api() {
  local batch_num=$1
  local words=$2
  local outfile="$TMPDIR/batch_${batch_num}.json"

  local prompt="你是一个韩语例句生成助手。请为以下延世韩国语词汇，每个词生成2个自然的韩语例句（附中文翻译）。\n\n要求：\n1. 例句要自然、符合日常用语，难度适合中级韩语学习者\n2. 中文翻译要准确，使用简体中文\n3. 输出纯JSON格式，不要有任何markdown包裹\n\n结构如下：\n[\n  {\n    \"word\": \"词\",\n    \"examples\": [\n      {\"text\": \"韩语例句1\", \"translation\": \"中文翻译1\"},\n      {\"text\": \"韩语例句2\", \"translation\": \"中文翻译2\"}\n    ]\n  }\n]\n\n词汇列表：${words}\n\n只输出JSON数组，不要有任何说明文字。"

  # Build JSON payload via a temp file to avoid shell escaping issues
  local payload_file="$TMPDIR/payload_${batch_num}.json"
  cat > "$payload_file" << PAYLOAD
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "user",
      "content": "${prompt}"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 4000
}
PAYLOAD

  echo "Processing batch ${batch_num}..."
  curl -s --max-time 120 \
    -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_KEY" \
    -d @"$payload_file" \
    -o "$TMPDIR/response_${batch_num}.json"

  # Extract content from response
  cat "$TMPDIR/response_${batch_num}.json"
}

call_api 1 "배치1"
