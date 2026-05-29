#!/bin/bash
# 韩语学习网 — Google Fonts 彻底清除 + 重建
# 在服务器上运行：bash deploy-font-fix.sh

set -e

export PATH=/www/server/nodejs/v26.2.0/bin:$PATH
cd /www/wwwroot/torikorean.com

echo "=== 1. 解压覆盖源文件 ==="
tar -xzf font-fix-v2.tar.gz
rm -f font-fix-v2.tar.gz

echo "=== 2. 验证源文件已更新 ==="
if grep -q 'fonts.googleapis\|fonts.gstatic' src/app/layout.tsx; then
  echo "❌ 错误：layout.tsx 仍然包含 Google Fonts！"
  grep 'fonts.googleapis\|fonts.gstatic' src/app/layout.tsx
  exit 1
fi
echo "✅ layout.tsx 已确认无 Google Fonts"

echo "=== 3. 彻底清除所有缓存 ==="
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
echo "✅ 缓存已清除"

echo "=== 4. 重新构建（约2-3分钟）==="
npm run build

echo "=== 5. 验证构建产物 ==="
if grep -r 'fonts.googleapis\|fonts.gstatic' .next/server/ .next/static/ 2>/dev/null; then
  echo "❌ 错误：构建产物中仍有 Google Fonts！"
  exit 1
fi
echo "✅ 构建产物已确认无 Google Fonts"

echo "=== 6. 重启服务 ==="
pm2 restart 0
pm2 save

echo ""
echo "=== ✅ 全部完成！==="
echo "请访问 https://torikorean.com 验证"
echo "按 F12 → Network → 搜索 'google' → 应该没有任何结果"
