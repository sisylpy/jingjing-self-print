// preload.js
console.log('PreloadAAAAAA script loaded----src');

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  
  ipcRenderer: ipcRenderer,
  sendPrintRequest: (printData, depId) => ipcRenderer.send('print-request', printData,depId),
  triggerEnterKey: () => {
  console.log('Preload script loaded----src-triggerEnterKey');
    ipcRenderer.send('trigger-enter-key');
  },
  
  getOSInfo: () => ipcRenderer.invoke('get-os-info'),
  // onRefreshCustomerList: (callback) => ipcRenderer.on('refresh-customer-list', callback),
  onRefreshCustomerList: (callback) => ipcRenderer.on('refresh-customer-list', (event, ...args) => callback(...args)),


  
});
