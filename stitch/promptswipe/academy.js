import {tracks,tools} from './scout.js';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let completed;try{completed=JSON.parse(localStorage.getItem('aeh_studio_learning'))||[]}catch{completed=[]}if(!Array.isArray(completed))completed=[];
completed=completed.filter(id=>tracks.some(t=>t.modules.some(m=>m.id===id)));
let current=tracks[0],module=current.modules[0];
function mode(learn){$('academy').hidden=!learn;$('workspace').hidden=learn;$('nav-learn').classList.toggle('active',learn);$('nav-create').classList.toggle('active',!learn);if(learn)render()}
function render(){
 $('academy-count').textContent=completed.length+' af 44 moduler gennemført';
 $('tracks').innerHTML=tracks.map(t=>`<button data-track="${esc(t.id)}" aria-pressed="${t.id===current.id}"><span class="eyebrow">${esc(t.category)}</span><strong>${esc(t.title)}</strong><p>${esc(t.summary)}</p><small>${t.modules.length} moduler · ${t.modules.reduce((n,m)=>n+m.minutes,0)} min · ${esc(t.source)}<span>${t.modules.filter(m=>completed.includes(m.id)).length}/${t.modules.length} gennemført</span></small></button>`).join('');
 $('lesson-title').textContent=current.title;$('lesson-summary').textContent=current.summary;
 $('lesson-state').textContent=current.source==='udkast'?'KILDE: AI SCOUT · UDKAST · IKKE FAGLIGT GENNEMGÅET':'KILDE: AI SCOUT · GENNEMGÅET';
 $('module-list').innerHTML=current.modules.map((m,i)=>`<button data-module="${esc(m.id)}" aria-pressed="${m.id===module.id}"><span>${completed.includes(m.id)?'✓':String(i+1).padStart(2,'0')}</span><strong>${esc(m.title)}<small>${m.minutes} minutter</small></strong></button>`).join('');
 $('module-title').textContent=module.title;$('module-summary').textContent=module.summary;
 $('lesson-steps').innerHTML=module.steps.map(s=>`<li>${esc(s)}</li>`).join('');$('exercise').textContent=module.exercise;
 $('module-prompts').innerHTML=module.promptIds.map(id=>`<button class="secondary" data-scout-prompt="${esc(id)}">Åbn øvelsens prompt i studiet ↗</button>`).join('');
 $('mark-module').checked=completed.includes(module.id);
 const related=tools.filter(t=>module.toolIds.includes(t.id));
 $('related-tools').textContent=related.length?'Relevante værktøjer: '+related.map(t=>t.name).join(', '):'';
}
$('nav-learn').onclick=()=>{mode(true);$('academy').scrollIntoView({behavior:'smooth'})};
$('nav-create').addEventListener('click',()=>mode(false));document.addEventListener('studio-mode',()=>mode(false));
$('saved-top').addEventListener('click',()=>mode(false));document.querySelector('.launch').addEventListener('click',()=>mode(false));
document.addEventListener('click',e=>{const track=e.target.closest('[data-track]');if(track){current=tracks.find(t=>t.id===track.dataset.track);module=current.modules[0];render();$('lesson').scrollIntoView({behavior:'smooth'});return}const mod=e.target.closest('[data-module]');if(mod){module=current.modules.find(m=>m.id===mod.dataset.module);render();return}const prompt=e.target.closest('[data-scout-prompt]');if(prompt)document.dispatchEvent(new CustomEvent('scout-prompt',{detail:prompt.dataset.scoutPrompt}))});
$('mark-module').onchange=()=>{const old=completed;completed=$('mark-module').checked?[...new Set([...completed,module.id])]:completed.filter(id=>id!==module.id);try{localStorage.setItem('aeh_studio_learning',JSON.stringify(completed));$('learning-save-error').hidden=true}catch{completed=old;$('learning-save-error').hidden=false}render()};
$('tool-grid').innerHTML=tools.map(t=>{let url='';try{const u=new URL(t.url);if(u.protocol==='https:')url=u.href}catch{}return `<article class="tool-card"><span class="eyebrow">${esc(t.category)} · ${t.source==='testet'?'TESTET':'EKSEMPEL'}</span><h3>${esc(t.name)}</h3><p>${esc(t.tagline)}</p><details><summary>Hvad kan det bruges til?</summary><p>${esc(t.about)}</p><ul>${t.goodFor.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><strong>Vær opmærksom på</strong><ul>${t.watchOut.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>${url?`<a class="secondary" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Åbn værktøjet ↗</a>`:''}</article>`}).join('');
render();
