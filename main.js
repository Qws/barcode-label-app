const {app, BrowserWindow, webContents} = require('electron');

function createWindow(){
  let win = new BrowserWindow({
    "width":400,
    "height":400,
    webPreferences:{
      nodeIntegration: true
    }
  });
  win.loadFile("./app/index.html");
}

exports.Print = () => {
  webContents.Print();
}

console.log("loaded main.js");
app.on('ready', createWindow);