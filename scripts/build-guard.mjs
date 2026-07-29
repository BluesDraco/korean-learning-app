// Build edition guard — prevents deploying wrong edition to wrong server.
// Called by package.json build scripts before next build.

import { readFileSync } from 'fs';

const target = process.argv[2];

if (target === 'domestic') {
  try {
    const env = readFileSync('.env.local', 'utf8');
    if (/^NEXT_PUBLIC_EDITION\s*=\s*overseas/m.test(env)) {
      console.error('');
      console.error('⛔ BLOCKED: .env.local contains NEXT_PUBLIC_EDITION=overseas');
      console.error('   This is the DOMESTIC build (torikorean.com → Shanghai).');
      console.error('   If you meant to deploy overseas, use: npm run build:overseas');
      console.error('');
      process.exit(1);
    }
  } catch (_) {
    // .env.local missing — OK for domestic (Next.js loads defaults)
  }
  console.log('✓ Build guard: domestic (CNY)');
} else if (target === 'overseas') {
  if (process.env.NEXT_PUBLIC_EDITION !== 'overseas') {
    console.error('');
    console.error('⛔ BLOCKED: NEXT_PUBLIC_EDITION is not "overseas"');
    console.error('   This is the OVERSEAS build (torikorean.cn → Hong Kong).');
    console.error('   Check that .env.overseas exists and sets NEXT_PUBLIC_EDITION=overseas');
    console.error('');
    process.exit(1);
  }
  console.log('✓ Build guard: overseas (USD)');
} else {
  console.error('Usage: node scripts/build-guard.mjs <domestic|overseas>');
  process.exit(1);
}
