#!/usr/bin/env node
// Run this once: node scripts/gen-assets.js
// Generates placeholder icon/splash PNGs so EAS doesn't fail

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

// Minimal 1x1 dark PNG (base64)
const PNG_1x1_DARK = Buffer.from(
  '89504e470d0a1a0a0000000d49484452000000010000000108020000009001' +
  '2e000000000c4944415408d76360181800000002ffffc3c9d80000000049454e44ae426082',
  'hex'
);

const files = {
  'icon.png': PNG_1x1_DARK,
  'splash.png': PNG_1x1_DARK,
  'adaptive-icon.png': PNG_1x1_DARK,
  'favicon.png': PNG_1x1_DARK,
};

for (const [name, buf] of Object.entries(files)) {
  const p = path.join(assetsDir, name);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, buf);
    console.log('Created', p);
  } else {
    console.log('Exists, skipping', p);
  }
}
console.log('Done. Replace assets/ with real images before App Store submission.');
