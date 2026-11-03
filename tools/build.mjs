// Builds two outputs from src/index.html:
//   dist/web         -> own website (Vercel). No CrazyGames SDK, no purchases, no ads. Installable PWA.
//   dist/crazygames  -> index.html to upload to the CrazyGames Developer Portal (upload index.html itself, not a zip).
import {readFileSync, writeFileSync, mkdirSync, cpSync, rmSync} from 'node:fs';
const src = readFileSync('src/index.html', 'utf8');
const MARK = "const BUILD='crazygames';";
if (!src.includes(MARK)) throw new Error('BUILD marker missing in src/index.html');
rmSync('dist', {recursive: true, force: true});

// CrazyGames
mkdirSync('dist/crazygames', {recursive: true});
writeFileSync('dist/crazygames/index.html', src);

// Web
const version = Date.now().toString(36);
const head = `<meta name="description" content="Ten ninja villages. Ten warlords. One shinobi. Storm enemy castles, master the five elements and fuse them into combined jutsu.">
<meta name="theme-color" content="#121831">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">
<link rel="apple-touch-icon" href="/icons/icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta property="og:type" content="website">
<meta property="og:title" content="Shinobi Siege">
<meta property="og:description" content="Ten ninja villages. Ten warlords. One shinobi.">
<meta property="og:image" content="/og.png">
<meta name="twitter:card" content="summary_large_image">`;
const sw = `<script>if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));</script>`;
let web = src.replace(MARK, "const BUILD='web';")
  .replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
  .replace('</title>', '</title>\n' + head)
  .replace('</body>', sw + '\n</body>');
mkdirSync('dist/web', {recursive: true});
cpSync('public', 'dist/web', {recursive: true});
writeFileSync('dist/web/index.html', web);
writeFileSync('dist/web/sw.js', readFileSync('tools/sw.js', 'utf8').replace('__VERSION__', version));
console.log('built dist/web and dist/crazygames (version ' + version + ')');
