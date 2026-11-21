import {cards as originalCards} from './cards.js';
import {scoutCards} from './scout.js';
const cards=[...originalCards.map(c=>({...c,source:'PromptSwipe'})),...scoutCards];
const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const initial=read('aeh_studio_favorites',[]);
let favorites=new Set(Array.isArray(initial)?initial.filter(id=>cards.some(c=>c.id===id)):[]);
let projects=read('aeh_studio_projects',[]);if(!Array.isArray(projects))projects=[];
projects=projects.filter(p=>p&&cards.some(c=>c.id===p.cardId)&&typeof p.title==='string'&&p.values&&typeof p.values==='object');
const blank=()=>({subject:'',style:'Filmisk',palette:0,ratio:'16:9',audience:'',output:'Overskuelig trinvis guide',constraints:'',slots:{}});
const palettes=[{name:'Hub · orange & cyan',colors:['#ffb787','#051426','#4cd8e7']},{name:'Violet & lime',colors:['#c6a6ff','#211535','#c8f27e']},{name:'Sort & guld',colors:['#16191e','#d5b777','#f6ecd7']},{name:'Pastel',colors:['#deb6d8','#a5d5e9','#f9efc9']},{name:'Nordlys',colors:['#172a57','#33d7e5','#f0f7ff']},{name:'Skov & creme',colors:['#255c47','#c2e6a4','#fff6df']}];
const styles=['Filmisk','Fotorealistisk','Minimalistisk','3D & rumligt','Neon / cyberpunk','Håndtegnet'];
const groups=['Alle','Visuelt','Læring','Hverdag','Byg & udvikl','Værktøjer','Gemte'];
const urls={ChatGPT:'https://chatgpt.com/',Claude:'https://claude.ai/',Gemini:'https://gemini.google.com/'};
let active=cards.find(c=>c.id===location.hash.split('/')[1])||cards.find(c=>c.id==='product')||cards[0];
let category='Alle',query='',view='studio',values=blank(),drafts={},toastTimer;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,5000)}
function persist(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{toast('Browseren kunne ikke gemme. Hent projektet som tekst i stedet.');return false}}
function filtered(){return cards.filter(c=>(!$('source-filter')?.value||c.source===$('source-filter').value)&&(category==='Alle'||category==='Gemte'&&favorites.has(c.id)||c.group===category)&&(!query||[c.title,c.desc,c.name,c.group].join(' ').toLocaleLowerCase('da').includes(query)))}
function buildPrompt(){
 const references={emne:'det beskrevne emne',projekt:'det beskrevne projekt',produkt:'det beskrevne produkt',brand:'det beskrevne brand',mål:'det beskrevne mål',appidé:'appidéen i projektbeskrivelsen',beskriv:'se min projektbeskrivelse nedenfor'};
 let base=active.prompt.replace(/\[([^\]]+)\]/g,(whole,key)=>values.slots[key]?.trim()|| (values.subject.trim()?(references[key.toLowerCase()]||'oplysningerne i min projektbeskrivelse nedenfor'):whole));
 const lines=[base];
 if(values.subject.trim())lines.push('Mit projekt og ønskede resultat:\n'+values.subject.trim());
 if(active.visual){const pal=palettes[values.palette]||palettes[0];lines.push('Visuel retning: '+values.style+'.','Farveunivers: '+pal.name+' ('+pal.colors.join(', ')+').','Ønsket billedformat: '+values.ratio+'. Brug dette format, hvis grundprompten nævner et andet format.','Bevar centrale detaljer i mine referencebilleder. Fortæl tydeligt, hvis noget ikke kan udledes af materialet.');}
 else {if(values.audience.trim())lines.push('Målgruppe: '+values.audience.trim()+'.');lines.push('Svarformat: '+values.output+'.');}
 if(values.constraints.trim())lines.push('Mine øvrige krav:\n'+values.constraints.trim());
 lines.push('Svar på dansk. Opfind ikke manglende fakta. Spørg kort, hvis oplysninger er nødvendige for at løse opgaven.');
 return lines.join('\n\n');
}
function updatePrompt(){drafts[active.id]=structuredClone(values);$('prompt-text').textContent=buildPrompt();const unresolved=buildPrompt().match(/\[[^\]]+\]/g);$('ready-state').textContent=unresolved?'Tilføj dine oplysninger før brug':values.subject.trim()?'Din retning er klar til AI':'Grundprompt klar · tilpas den her';}
function setTab(prompt){$('tab-settings').setAttribute('aria-selected',String(!prompt));$('tab-prompt').setAttribute('aria-selected',String(prompt));$('tab-settings').tabIndex=prompt?-1:0;$('tab-prompt').tabIndex=prompt?0:-1;$('settings').hidden=prompt;$('prompt-panel').hidden=!prompt;}
function renderOptions(){
 $('styles').innerHTML=styles.map(s=>`<button type="button" data-style="${escapeHTML(s)}" aria-pressed="${values.style===s}">${escapeHTML(s)}</button>`).join('');
 $('palettes').innerHTML=palettes.map((p,i)=>`<button type="button" data-palette="${i}" aria-label="${escapeHTML(p.name)}" aria-pressed="${values.palette===i}" title="${escapeHTML(p.name)}">${p.colors.map(c=>`<i style="background:${c}"></i>`).join('')}</button>`).join('');
 $('palette-name').textContent=(palettes[values.palette]||palettes[0]).name;
 $('ratios').innerHTML=['1:1','16:9','9:16','4:3'].map(r=>`<button type="button" data-ratio="${r}" aria-pressed="${values.ratio===r}">${r}</button>`).join('');
}
function renderForm(){
 for(const field of ['subject','audience','output','constraints'])$(field).value=values[field]||'';
 $('visual-options').hidden=!active.visual;$('text-options').hidden=active.visual;
 $('subject').placeholder=active.visual?'Fx en visuel identitet til min madklub. Den skal føles varm, moderne og uformel.':'Beskriv dit emne, din opgave eller det materiale, du vil have hjælp med.';
 const slots=[...new Set([...active.prompt.matchAll(/\[([^\]]+)\]/g)].map(m=>m[1]))];
 $('slots').replaceChildren();
 slots.forEach((key,index)=>{const label=document.createElement('label');label.htmlFor='slot-'+index;label.textContent=key.charAt(0).toUpperCase()+key.slice(1);const input=document.createElement('input');input.id=label.htmlFor;input.value=values.slots[key]||'';input.placeholder='Skriv her, eller brug beskrivelsen ovenfor';input.addEventListener('input',()=>{values.slots[key]=input.value;updatePrompt()});$('slots').append(label,input)});
 renderOptions();updatePrompt();
}
function renderActive(){
 $('card-group').textContent=active.group+' / '+active.source+(active.status==='eksempel'?' · Eksempel':'');
 $('card-name').textContent=active.name;$('card-title').textContent=active.title;$('card-desc').textContent=active.desc;
 $('preview').src=active.image;$('preview').alt=active.source==='AI Scout'?'Temaillustration til '+active.title:'Originalt eksempel: '+active.title;
 document.querySelector('.preview-label').textContent=active.imageCaption||'INSPIRATION · ORIGINALT KORTEKSEMPEL';
 $('favorite').textContent=favorites.has(active.id)?'♥':'♡';$('favorite').setAttribute('aria-pressed',String(favorites.has(active.id)));$('favorite').setAttribute('aria-label',favorites.has(active.id)?'Fjern kort fra favoritter':'Gem kort som favorit');
 const list=filtered(),index=list.findIndex(c=>c.id===active.id);$('position').textContent=String(index+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0')+' · SWIPE ELLER BRUG PILENE';
 $('prev').disabled=list.length<2;$('next').disabled=list.length<2;
 renderForm();
}
function setActive(id){const next=cards.find(c=>c.id===id);if(!next)return;drafts[active.id]=structuredClone(values);active=next;values=drafts[id]?structuredClone(drafts[id]):blank();history.replaceState(null,'','#studio/'+active.id);setTab(false);render();}
function render(){
 const list=filtered();$('empty').hidden=list.length>0;$('studio').hidden=view!=='studio'||!list.length;$('catalog').hidden=view!=='catalog'||!list.length;
 if(list.length&&!list.some(c=>c.id===active.id)){drafts[active.id]=structuredClone(values);active=list[0];values=drafts[active.id]?structuredClone(drafts[active.id]):blank();}
 $('groups').innerHTML=groups.map(g=>`<button data-group="${escapeHTML(g)}" aria-pressed="${category===g}">${escapeHTML(g)}${g==='Gemte'?' · '+favorites.size:''}</button>`).join('');
 $('match-count').textContent=list.length;$('saved-count').textContent=favorites.size;
 $('card-list').innerHTML=list.map(c=>`<button data-card="${c.id}" aria-pressed="${active.id===c.id}"><img src="${c.image}" alt="" loading="lazy"><span>${escapeHTML(c.title)}<small>${escapeHTML(c.group)}</small></span></button>`).join('');
 if(view==='catalog')$('catalog').innerHTML=list.map(c=>`<button data-card="${c.id}"><img src="${c.image}" alt="" loading="lazy"><div class="card-copy"><small>${escapeHTML(c.group)}${favorites.has(c.id)?' · ♥':''}</small><strong>${escapeHTML(c.title)}</strong><p>${escapeHTML(c.desc)}</p><span class="card-link">Åbn i studiet ↗</span></div></button>`).join('');
 $('catalog-view').setAttribute('aria-pressed',String(view==='catalog'));$('studio-view').setAttribute('aria-pressed',String(view==='studio'));
 if(list.length)renderActive();
}
function navigate(step){const list=filtered();if(!list.length)return;const index=list.findIndex(c=>c.id===active.id);setActive(list[(index+step+list.length)%list.length].id)}
function setView(next){view=next;render()}
function renderProjects(){
 const el=$('projects');el.replaceChildren();
 if(!projects.length){const p=document.createElement('p');p.className='small';p.textContent='En god idé fortjener at blive gemt. Tilpas et kort, og vælg “Gem projekt” – så ligger dit arbejde klar her.';el.append(p);return;}
 projects.forEach(p=>{const card=cards.find(c=>c.id===p.cardId);const article=document.createElement('article');article.className='project';const img=document.createElement('img');img.src=card.image;img.alt='';img.loading='lazy';const content=document.createElement('div');const title=document.createElement('strong');title.textContent=p.title;const meta=document.createElement('small');meta.textContent=card.title;const open=document.createElement('button');open.textContent='Fortsæt →';open.onclick=()=>{category='Alle';query='';$('search').value='';view='studio';drafts[p.cardId]={...blank(),...p.values,slots:p.values.slots||{}};if(active.id===p.cardId)values=structuredClone(drafts[p.cardId]);setActive(p.cardId);$('workspace').scrollIntoView({behavior:'smooth'})};const remove=document.createElement('button');remove.className='delete';remove.textContent='Fjern';remove.setAttribute('aria-label','Fjern gemt projekt: '+p.title);remove.onclick=()=>{const previous=projects;projects=projects.filter(x=>x.id!==p.id);if(!persist('aeh_studio_projects',projects)){projects=previous;return}renderProjects();toast('Projekt fjernet. Dit kort er stadig i kataloget.')};content.append(title,meta,open,remove);article.append(img,content);el.append(article)});
}
document.addEventListener('click',e=>{
 const card=e.target.closest('[data-card]');if(card){view='studio';setActive(card.dataset.card);return;}
 const group=e.target.closest('[data-group]');if(group){category=group.dataset.group;render();return;}
 const style=e.target.closest('[data-style]');if(style){values.style=style.dataset.style;renderOptions();updatePrompt();$('styles').querySelector(`[data-style="${CSS.escape(values.style)}"]`).focus();return;}
 const palette=e.target.closest('[data-palette]');if(palette){values.palette=Number(palette.dataset.palette);renderOptions();updatePrompt();$('palettes').querySelector(`[data-palette="${values.palette}"]`).focus();return;}
 const ratio=e.target.closest('[data-ratio]');if(ratio){values.ratio=ratio.dataset.ratio;renderOptions();updatePrompt();$('ratios').querySelector(`[data-ratio="${values.ratio}"]`).focus();}
});
for(const field of ['subject','audience','output','constraints'])$(field).addEventListener('input',()=>{values[field]=$(field).value;updatePrompt()});
$('search').addEventListener('input',()=>{query=$('search').value.toLocaleLowerCase('da').trim();render()});
$('source-filter').onchange=()=>render();
$('favorite').onclick=()=>{favorites.has(active.id)?favorites.delete(active.id):favorites.add(active.id);persist('aeh_studio_favorites',[...favorites]);render()};
$('saved-top').onclick=()=>{category='Gemte';query='';$('search').value='';view='catalog';render();$('workspace').scrollIntoView({behavior:'smooth'})};
$('reset-filter').onclick=()=>{category='Alle';query='';$('search').value='';$('source-filter').value='';render()};
$('prev').onclick=()=>navigate(-1);$('next').onclick=()=>navigate(1);
$('studio-view').onclick=()=>setView('studio');$('catalog-view').onclick=()=>setView('catalog');
$('tab-settings').onclick=()=>setTab(false);$('tab-prompt').onclick=()=>setTab(true);
for(const id of ['tab-settings','tab-prompt'])$(id).addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const prompt=id==='tab-settings';setTab(prompt);$(prompt?'tab-prompt':'tab-settings').focus()}});
$('provider').onchange=()=>{const p=$('provider').value;$('open-ai').href=urls[p];$('open-ai').textContent='Åbn '+p+' ↗'};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText(buildPrompt());toast('Prompt kopieret. Åbn din AI, og indsæt teksten.')}catch{setTab(true);const range=document.createRange();range.selectNodeContents($('prompt-text'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);toast('Teksten er markeret. Brug Kopiér i din browser eller Ctrl+C.')}};
$('save-project').onclick=()=>{const project={id:crypto.randomUUID(),cardId:active.id,title:values.subject.trim().split('\n')[0].slice(0,100)||active.title,values:structuredClone(values),date:new Date().toISOString()};const next=[project,...projects].slice(0,50);if(persist('aeh_studio_projects',next)){projects=next;renderProjects();toast('Projekt gemt på denne enhed. Du kan fortsætte nedenfor.')}};
$('download').onclick=()=>{const url=URL.createObjectURL(new Blob([active.title+'\n\n'+buildPrompt()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='AI-Studio-'+active.id+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Din prompt er klargjort som tekstfil.')};
$('expand').onclick=()=>{$('large-preview').src=active.image;$('large-preview').alt='Originalt eksempel: '+active.title;$('lightbox').showModal()};$('close-lightbox').onclick=()=>$('lightbox').close();
let start=null;$('swipe-surface').addEventListener('touchstart',e=>{start={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});$('swipe-surface').addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.3){if(dx>0){favorites.add(active.id);persist('aeh_studio_favorites',[...favorites]);toast('Kort gemt som favorit')}navigate(1)}start=null},{passive:true});
document.addEventListener('keydown',e=>{if(e.defaultPrevented||$('lightbox').open||['INPUT','TEXTAREA','SELECT','BUTTON','A','SUMMARY'].includes(e.target.tagName)||view!=='studio')return;if(e.key==='ArrowLeft'){e.preventDefault();navigate(-1)}if(e.key==='ArrowRight'){e.preventDefault();navigate(1)}});
document.addEventListener('scout-prompt',e=>{const id='scout-'+e.detail;if(!cards.some(c=>c.id===id)){toast('Denne prompt er ikke i den importerede samling.');return}category='Alle';query='';$('search').value='';$('source-filter').value='';view='studio';setActive(id);document.dispatchEvent(new CustomEvent('studio-mode'));$('workspace').scrollIntoView({behavior:'smooth'})});
render();renderProjects();
