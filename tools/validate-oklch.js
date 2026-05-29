/**
 * OKLCH Validator
 * Scans files for common non-OKLCH color patterns.
 */
const fs = require('fs');
const path = require('path');

const target = process.argv[2] || '.';
const HEX_REGEX = /#[0-9a-fA-F]{3,8}/g;
const RGB_REGEX = /rgb\(|rgba\(/g;
const HSL_REGEX = /hsl\(|hsla\(/g;

function scan(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') scan(fullPath);
    } else if (/\.(tsx|css|ts|js)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (HEX_REGEX.test(content) || RGB_REGEX.test(content) || HSL_REGEX.test(content)) {
        console.log(`❌ Non-OKLCH color found in: ${fullPath}`);
      }
    }
  });
}

console.log(`🔍 Scanning ${target} for non-OKLCH colors...`);
scan(target);
