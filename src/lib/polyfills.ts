// Polyfills for older browsers. Runs once on client bundle load.
// Safe to import multiple times — guarded by feature detection.

if (typeof window !== 'undefined' && typeof crypto !== 'undefined') {
  // crypto.randomUUID: iOS < 15.4, Chrome < 92, Safari < 15.4
  if (!crypto.randomUUID) {
    // RFC 4122 v4 UUID via crypto.getRandomValues (widely supported)
    (crypto as unknown as { randomUUID: () => `${string}-${string}-${string}-${string}-${string}` }).randomUUID = function () {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      // Per RFC 4122: set version (4) and variant (10xx)
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
      return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}` as `${string}-${string}-${string}-${string}-${string}`;
    };
  }
}
