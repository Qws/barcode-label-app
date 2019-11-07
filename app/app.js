const electron = require('electron');
const fs = require('fs');
const pdf = require('html-pdf');
const templateManager = require("./template-manager");
const JsBarcode = require('jsbarcode');

const appPath = electron.remote.app.getAppPath();
const templatesPath = appPath + "\\templates\\";
const binPath = appPath + "\\bin\\";
const fileName = "label-template.html";
let config = {
    "height":"3cm",
    "width":"5cm",
    "type":"pdf"
}
let barcode //the human readable barcode.

function createLabel(){
    let barcodeOption = {"value": barcode}
    let html = templateManager.createBarCodeHTML(barcodeOption, "file:\\\\\\" + templatesPath + "image.png");
    
    
    console.log("Label path: "+templatesPath);
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
    });
}

document.getElementById("btn-print-barcode").onclick = () => {
    let print = electron.remote.require('./main').print;
    let option = {
        "color":false,
    };
    print(option);
}
document.getElementById("btn-create-pdf").onclick = () => {createLabel();}
document.getElementById("btn-barcode-generator").onclick = () => {
  let barcodeArray = [];
  let c = 0;
  while (c < 13)
  {
    barcodeArray[c] = Math.floor((Math.random() * 9) + 0);
    c++;
  }
  c = 0;
  barcode = "";
  while (c < 13)
  {
    barcode = barcode + barcodeArray[c].toString();
    c++;
  }
  JsBarcode("#canvas", barcode, {"width":2, "height":25, "fontSize":25});
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