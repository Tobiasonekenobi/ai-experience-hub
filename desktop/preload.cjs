const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktopStudio',{
 load:()=>ipcRenderer.invoke('studio:load'),
 save:(key,value)=>ipcRenderer.invoke('studio:save',{key,value}),
 exportPrompt:(title,text)=>ipcRenderer.invoke('studio:export',{title,text}),
 importFiles:()=>ipcRenderer.invoke('studio:import-files'),
 listFiles:()=>ipcRenderer.invoke('studio:list-files'),
 openLibrary:()=>ipcRenderer.invoke('studio:open-library')
});
