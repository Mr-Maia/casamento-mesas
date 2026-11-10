// Gera public/index.html (só leitura) e public/admin.html (edição) a partir de src/app.html.
// Uso: node build.mjs && firebase deploy
import fs from 'node:fs';

const TOKEN = '/*__ADMIN__*/null';
const src = fs.readFileSync('src/app.html', 'utf8');
const { path } = JSON.parse(fs.readFileSync('admin.config.json', 'utf8'));
if (!src.includes(TOKEN)) throw new Error('src/app.html perdeu o marcador ' + TOKEN);

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/index.html', src.replace(TOKEN, 'null'));
fs.writeFileSync('public/admin.html', src.replace(TOKEN, JSON.stringify({ path })));
fs.copyFileSync('src/countdown.html', 'public/countdown.html');
console.log('public/index.html (leitura), public/admin.html (edição) e public/countdown.html gerados');
