// src/main.js
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path')
const { mouse, keyboard, Key } = require('@nut-tree/nut-js');  // 同步 require
const os = require('os');

const axios = require('axios');

const installExtension = require('electron-devtools-installer').default;
const { VUEJS3_DEVTOOLS } = require('electron-devtools-installer');


const VUE3_DEVTOOLS_ID = 'ljjemllljcmogpfapbkkighbhhppjdbg';


const isDev = !app.isPackaged; // 使用 app.isPackaged 来检测开发模式
let mainWindow;


async function createWindow() {

  const { width, height } = screen.getPrimaryDisplay().size;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar: true,  // 隐藏默认的菜单栏
    menu: null,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,          // 推荐关闭 Node 集成
      contextIsolation: true,          // 启用上下文隔离
      enableRemoteModule: false
    }
  });

  if (isDev) {
    const devURL = 'http://localhost:3000'; // 确保端口一致
    mainWindow.loadURL(devURL);

    // try {
    //   // 强制加载 Vue DevTools
    //   const extensionName = await installExtension(VUEJS3_DEVTOOLS);
    //   console.log(`已安装扩展: ${extensionName}`);
    //   mainWindow.webContents.openDevTools();
    // } catch (err) {
    //   console.error('安装扩展时出错:', err);
    // }


    try {
      const extensionName = await installExtension(VUE3_DEVTOOLS_ID);
      console.log(`已安装扩展: ${extensionName}`);
      mainWindow.webContents.openDevTools();
    } catch (err) {
      console.error('安装扩展时出错:', err);
    }


  } else {
    const prodPath = path.join(__dirname, '../dist/vue/index.html');
    mainWindow.loadFile(prodPath);
    console.log(`Loading production file: ${prodPath}`);

  }



  // 监听来自渲染进程的打印请求
  ipcMain.on('print-request', (event, printData, depId) => {
    printContentToWindow(printData, depId);
  });

  console.log('Window created');


}

ipcMain.handle('get-os-info', () => {
  return {
    platform: os.platform(),
    arch: os.arch(),
  };
});

ipcMain.on('trigger-enter-key', () => {
  console.log('Received trigger-enter-key');
  keyboard.pressKey(Key.Enter);
  keyboard.releaseKey(Key.Enter);
});


function printContentToWindow(printContent, depId) {
  const printWindow = new BrowserWindow({
    show: false, // 不显示打印窗口
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(printContent));

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print({
      marginsType: 0, // 0 = default, 1 = none, 2 = minimum
      printBackground: false,
      deviceName: '',// 空字符串使用默认打印机
      margins: {
        marginType: 'none' // 或使用具体的数值，如 { top: 0, bottom: 0, left: 0, right: 0 }
      },

    }, (success, error) => {
      if (success) {
        console.log('打印成功', depId);
        savePrintBill(depId);
      } else {
        console.log('打印失败', error, depId);
      }
    });
  });
}

function savePrintBill(depId) {
  //   console.log('保存成功', depId);
  const apiUrl = isDev
    ? `http://192.168.0.100:8080/nongxinle_master_war_exploded/api/nxdepartmentbill/saveAccountBillPrinter/${depId}`
    : `https://grainservice.club:8443/nongxinle/api/nxdepartmentbill/saveAccountBillPrinter/${depId}`;

  // 发起请求
  axios.get(apiUrl)
    .then(response => {
      console.log('保存成功:', response.data);
      console.log('保存成功:', mainWindow);
      if (mainWindow) {
        //
        console.log('在这里要刷新/vue/src/views/Bills.vue 中的fetchCustomerList 方法，应该怎么实现？');
        mainWindow.webContents.send('refresh-customer-list');
      }
      
    })
    .catch(error => {
      console.error('保存失败:', error.message);
    });

}



app.whenReady().then(() => {
  createWindow();

  // 对于 macOS，当所有窗口关闭时重新激活应用的处理
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();

  });
});

app.on('window-all-closed', () => {
  // 对于 Windows 和 Linux，在所有窗口关闭后退出应用
  if (process.platform !== 'darwin') app.quit();
});
