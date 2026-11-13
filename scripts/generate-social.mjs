import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { site } from '../src/config.mjs';
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;');
const scene = (await fs.readFile(new URL('../src/assets/images/learning-scene.svg', import.meta.url))).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f8f6ef"/><path d="M0 592h1200v38H0z" fill="#21543f"/>
<g transform="translate(58 46)" stroke="#21543f" stroke-width="3" fill="none"><circle cx="23" cy="23" r="20"/><path d="M23 3v12m0 16v12M3 23h12m16 0h12M9 9l9 9m10 10 9 9M9 37l9-9m10-10 9-9"/></g>
<text x="118" y="80" font-family="Arial,sans-serif" font-size="31" font-weight="bold" fill="#21543f">${escape(site.name)}</text>
<text x="60" y="162" font-family="Arial,sans-serif" font-size="14" letter-spacing="2" fill="#21543f">ONE-ON-ONE ONLINE TUITION · CLASSES 1–9</text>
<g font-family="Georgia,serif" font-size="64" fill="#243e32"><text x="56" y="253">A little guidance.</text><text x="56" y="329">A stronger grip.</text><text x="56" y="405" font-style="italic" fill="#21543f">A confident child.</text></g>
<text x="60" y="477" font-family="Arial,sans-serif" font-size="21" fill="#576459">Your child’s pace. Wherever you call home.</text>
<rect x="60" y="510" width="252" height="49" rx="7" fill="#21543f"/><text x="84" y="542" font-family="Arial,sans-serif" font-size="20" fill="#f8f6ef">Book a Demo Class ↗</text>
<image x="658" y="88" width="510" height="485" href="data:image/svg+xml;base64,${scene}"/>
</svg>`;
await fs.mkdir(new URL('../public/images/',import.meta.url),{recursive:true});
await fs.writeFile(new URL('../public/images/social-share.svg',import.meta.url),svg);
await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(fileURLToPath(new URL('../public/images/social-share.png',import.meta.url)));
console.log('Generated original social-share.svg and social-share.png (1200 × 630).');
