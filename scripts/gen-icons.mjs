import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'tmp/tori-source.png');

async function png(outAbs, size) {
  await sharp(src).resize(size, size, { fit: 'cover' }).png({ quality: 92, compressionLevel: 9 }).toFile(outAbs);
  const stat = await fs.stat(outAbs);
  console.log(`✅ ${path.relative(root, outAbs)}  ${size}x${size}  ${(stat.size / 1024).toFixed(1)}KB`);
}

async function ico(outAbs) {
  const sizes = [16, 32, 48];
  const bufs = await Promise.all(
    sizes.map((s) => sharp(src).resize(s, s, { fit: 'cover' }).ensureAlpha().png({ force: true, compressionLevel: 9 }).toColorspace('srgb').toBuffer())
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  const entries = Buffer.alloc(16 * sizes.length);
  const dataChunks = [];
  let offset = 6 + 16 * sizes.length;
  sizes.forEach((s, i) => {
    const b = bufs[i];
    const p = i * 16;
    entries.writeUInt8(s === 256 ? 0 : s, p + 0);
    entries.writeUInt8(s === 256 ? 0 : s, p + 1);
    entries.writeUInt8(0, p + 2);
    entries.writeUInt8(0, p + 3);
    entries.writeUInt16LE(1, p + 4);
    entries.writeUInt16LE(32, p + 6);
    entries.writeUInt32LE(b.length, p + 8);
    entries.writeUInt32LE(offset, p + 12);
    offset += b.length;
    dataChunks.push(b);
  });
  const out = Buffer.concat([header, entries, ...dataChunks]);
  await fs.writeFile(outAbs, out);
  const stat = await fs.stat(outAbs);
  console.log(`✅ ${path.relative(root, outAbs)}  ico(16,32,48)  ${(stat.size / 1024).toFixed(1)}KB`);
}

await png(path.join(root, 'public/icon-192.png'), 192);
await png(path.join(root, 'public/icon-512.png'), 512);
await png(path.join(root, 'public/apple-touch-icon.png'), 180);
await ico(path.join(root, 'src/app/favicon.ico'));
console.log('\n🎉 done');
