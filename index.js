#!/usr/bin/env node

const rgbaToHex = (r, g, b, a = 1) => {
  const toHex = (num) => {
    const hex = num.toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);
  const hexA = a < 1 ? toHex(Math.round(a * 255)) : '';

  return `#${hexR}${hexG}${hexB}${hexA}`;
};

const [r, g, b, aValue] = process.argv.slice(2).map(Number);
const a = parseFloat(aValue) || 1;

if ([r, g, b].some((value) => isNaN(value) || value < 0 || value > 255)) {
  console.error("Invalid RGB values. Please provide RGB values between 0 and 255.");
  process.exit(1);
}

if (isNaN(a) || a < 0 || a > 1) {
  console.error("Invalid alpha value. Please provide a value between 0 and 1.");
  process.exit(1);
}

const hexValue = rgbaToHex(r, g, b, a);

console.log(`RGBA: (${r}, ${g}, ${b}, ${a})`);
console.log(`HEX: ${hexValue}`);

console.log(`\x1b[48;2;${r};${g};${b}m   COLOR   \x1b[0m`);
console.log(`Alpha: ${a} (not visible in ANSI)`);