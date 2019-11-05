const electron = require('electron');
const fs = require('fs');
const pdf = require('html-pdf');
const templateManager = require("./template-manager");
const JsBarcode = require('jsbarcode');

const templatesFolder = "./templates/";
const fileName = "label-template.html";
let config = {
    "height":"3cm",
    "width":"5cm"
}

function createLabel(){
    let html = templateManager.createHtmlLabel();
    let path = templatesFolder + fileName;
    //create template html file and then build a pdf version from it.
    fs.writeFile(path, html, (error)=>{
      if (!error) {
        var html = fs.readFileSync(path, 'utf8');
        pdf.create(html, config).toFile('./bin/label.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/bin/label.pdf' }
        });
      }
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
  let result = "";
  while (c < 13)
  {
    result = result + barcodeArray[c].toString();
    c++;
  }
  JsBarcode("#canvas", result);
}