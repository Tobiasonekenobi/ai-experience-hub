// Bygger appen og lægger dist/ på gh-pages-branchen (GitHub Pages).
// Brug: npm run deploy
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';

const run = (cmd, cwd = '.') => execSync(cmd, { cwd, stdio: 'inherit' });
const remote = execSync('git remote get-url origin').toString().trim();
const dir = '.deploy';

run('npm run build');
rmSync(dir, { recursive: true, force: true });
cpSync('dist', dir, { recursive: true });
// Stitch-versionen udgives som undermappe /stitch/, hvis den ligger ved siden af projektet
const stitch = '../stitch-ai-experience-hub';
if (existsSync(`${stitch}/index.html`)) {
  cpSync(`${stitch}/index.html`, `${dir}/stitch/index.html`);
  cpSync(`${stitch}/stitch_ai_experience_hub`, `${dir}/stitch/stitch_ai_experience_hub`, { recursive: true });
}
writeFileSync(`${dir}/.nojekyll`, '');
run('git init -q -b gh-pages', dir);
run('git add -A', dir);
run(`git commit -q -m "Udgiv ${new Date().toISOString().slice(0, 10)}"`, dir);
run(`git push -f ${remote} gh-pages`, dir);
rmSync(dir, { recursive: true, force: true });
console.log('Udgivet til gh-pages');
