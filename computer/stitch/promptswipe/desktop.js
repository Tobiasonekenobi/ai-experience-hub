const bridge=window.desktopStudio;
if(bridge){
const snapshot=await bridge.load();
for(const [key,value] of Object.entries(snapshot))localStorage.setItem(key,JSON.stringify(value));
window.studioDesktopReady=true;
window.dispatchEvent(new Event('studio-desktop-ready'));
const nativeSet=Storage.prototype.setItem;
Storage.prototype.setItem=function(key,value){nativeSet.call(this,key,value);if(this===localStorage&&/^(aeh_|ai_hub_|promptswipe-)/.test(key))bridge.save(key,JSON.parse(value)).catch(()=>{const toast=document.getElementById('toast');toast.textContent='Kunne ikke gemme til harddisken. Eksportér dit arbejde som tekst.';toast.hidden=false})};
const download=document.getElementById('download');
download.addEventListener('click',async e=>{e.stopImmediatePropagation();try{const title=document.getElementById('card-title').textContent;const text=document.getElementById('prompt-text').textContent;await bridge.exportPrompt(title,title+'\n\n'+text)}catch{alert('Filen kunne ikke gemmes. Prøv igen, eller kopiér prompten.')}},true);
function renderFiles(files){const container=document.getElementById('local-materials');container.replaceChildren();if(!files.length){container.textContent='Dit bibliotek er tomt. Tilføj billeder, noter eller dokumenter til dine projekter.';return}for(const file of files){const p=document.createElement('p');p.textContent=file.name+' · '+(file.size/1048576).toLocaleString('da-DK',{maximumFractionDigits:1})+' MB';container.append(p)}}
document.getElementById('import-material').onclick=async()=>{try{renderFiles(await bridge.importFiles())}catch{alert('Materialet kunne ikke kopieres. Prøv igen.')}};
document.getElementById('open-materials').onclick=()=>bridge.openLibrary();
renderFiles(await bridge.listFiles());
}
