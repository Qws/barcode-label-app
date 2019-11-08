const {app, BrowserWindow} = require('electron');
let contents; //webContents

function createWindow(){
	let win = new BrowserWindow({
		"width":800,
		"height":400,
		webPreferences:{
			nodeIntegration: true
		}
		});
		win.loadFile("./app/index.html");
		contents = win.webContents;
	}
	exports.print = (option = {}, callback = null) => {
	if(callback === null){
		contents.print(option);
	}
	else{
		contents.print(option, callback);
	}
}

console.log("loaded main.js");
app.on('ready', createWindow);