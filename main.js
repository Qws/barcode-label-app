const {app, BrowserWindow} = require('electron');

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
console.log("loaded main.js");
app.on('ready', createWindow);