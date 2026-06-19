import_line="import type { GrammarCard } from '@/types';"

extract() {
  local name=$1
  local start=$2
  local end=$3
  echo "$import_line" > grammar-cards-${name}.ts
  echo "" >> grammar-cards-${name}.ts
  echo "export const grammarCards${name^}: GrammarCard[] = [" >> grammar-cards-${name}.ts
  sed -n "${start},${end}p" grammar-cards.ts | grep -v "^export const grammarCards" | grep -v "^import " | sed 's/^];$//' >> grammar-cards-${name}.ts
  echo "];" >> grammar-cards-${name}.ts
}
