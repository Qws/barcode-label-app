const electron = require('electron');
const fs = require('fs');
const pdf = require('html-pdf');
const templateManager = require("./template-manager");
const JsBarcode = require('jsbarcode');
const printer = require('./printer');

const appPath = electron.remote.app.getAppPath();
const templatesPath = appPath + "\\templates\\";
const binPath = appPath + "\\bin\\";
const fileName = "label-template.html";
const statusMessage = {ready:"Ready", working:"Working..."};
let config = {
	"height":"3cm",
	"width":"5cm",
	"type":"pdf"
}
let barcode //the human readable barcode.
let barcodeDigitLimit = 11;

window.onload = ()=>{
	let inputBarcode = document.getElementById("input-barcode");
	inputBarcode.oninput = ()=>{
		if(inputBarcode.value.length < 13){
			let barcode = inputBarcode.value;
			JsBarcode("#canvas", barcode, {"width":1.3, "height":35});
			saveCanvasToSystem();
		}
		else{
			inputBarcode.value = inputBarcode.value.substr(0, 13); //removes any character after 13
		}
	}
}

function createLabel(){
	let barcodeOption = {"value": barcode}
	let html = templateManager.createBarCodeHTML(barcodeOption, "file:\\\\\\" + templatesPath + "image.png");
	console.log("Label path: "+templatesPath);
    document.getElementById("label-status").innerHTML = statusMessage.working;
	fs.exists(templatesPath, (exist)=>{
		if (exist === false){
			fs.mkdirSync(templatesPath);
		}
		fs.writeFile(templatesPath + fileName, html, (error)=>{
			if (!error) {
				let path = templatesPath + fileName;
				createPDF(path);//Read template html file and then build a pdf version from it.
			}
			else{
				console.log(error);
			}
		});
	});
}

let createPDF = (path)=>{
	console.log(config);
	console.log("creating PDF on path: " + path);
	var html = fs.readFileSync(path, 'utf8');
	if(config.type === undefined){
		config.type = ".pdf";
	}
	pdf.create(html, config).toFile(binPath +'label.'+config.type, function(err, res) {
		if (err) return console.log(err);
		console.log(res); // { filename: '/bin/label.pdf' }
        openPDF();
        document.getElementById("label-status").innerHTML = statusMessage.ready;
	});
}

document.getElementById("btn-create-pdf").onclick = () => {createLabel();}
document.getElementById("btn-barcode-generator").onclick = () => {
	let barcodeArray = [];
	let c = 0;
	while (c <= barcodeDigitLimit){
		barcodeArray[c] = Math.floor((Math.random() * 9) + 0);
		c++;
	}
	c = 0;
	barcode = "";
	while (c <= barcodeDigitLimit){
		barcode = barcode + barcodeArray[c].toString();
		c++;
	}
	generateBarcode(barcode);
	document.getElementById("input-barcode").value = barcode;
	saveCanvasToSystem();
}

let saveCanvasToSystem = ()=>{
	let canvas = document.getElementById("canvas");
	var image = canvas.toDataURL("image/png");
	console.log(image);
	const correctImg = image.replace("data:image/png;base64,", "");
	console.log(correctImg);
	let buff = Buffer.from(correctImg, "base64"); //converts base64 to binary buffer
	fs.writeFileSync("./templates/image.png", buff);
}

let openPDF = () =>{
	let path = binPath + "\label.pdf";
	path = path.replace(/\//g,"\\");
	let shell = electron.remote.shell;
	shell.openItem(path);
}

let generateBarcode = (barcode, type="EAN13")=>{
	let options = {"width":1.5, "height":70, "margin":0, "format":type}
	if(type === false){
		options.format = null;
	}
	JsBarcode("#canvas", barcode, options);
}